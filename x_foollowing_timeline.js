// ==UserScript==
// @name         X:Following Timeline
// @name:ja      X:フォローTL
// @namespace    https://greasyfork.org/ja/users/570127
// @version      1.6.0
// @description  Switch to "Following" once, and cycle Home tabs with ← →
// @description:ja  「フォロー中」を最初のTLとして 左右矢印キーでタブ移動。
// @match        https://x.com/home*
// @grant        none
// @license      MIT
// ==/UserScript==

(() => {
  'use strict';

  const FOLLOWING_LABELS = ['フォロー中', 'Following'];
  const MAX_RETRY = 10;
  const RETRY_DELAY_MS = 300;

  /* ========= utils ========= */

  const getTabs = () =>
    Array.from(document.querySelectorAll('[role="tab"]'));

  const getSelectedIndex = (tabs) =>
    tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');

  /* ========= initial switch (once) ========= */

  let retryCount = 0;

  function switchToFollowingOnce() {
    const tabs = getTabs();
    if (!tabs.length) {
      if (++retryCount < MAX_RETRY) {
        setTimeout(switchToFollowingOnce, RETRY_DELAY_MS);
      }
      return;
    }

    tabs[1].click();
    return;

    const followingTab = tabs.find(tab => {
      const label = tab.textContent || '';
      return FOLLOWING_LABELS.some(l => label === l || label.includes(l));
    });

    if (!followingTab) return;
    if (followingTab.getAttribute('aria-selected') === 'true') return;

    followingTab.click();
  }

  switchToFollowingOnce();

  /* ========= arrow key navigation ========= */

  document.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    if (activeElement?.isContentEditable) return;
    const activeTag = activeElement?.tagName;
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    const paths = location.pathname.split('/');
    if (paths[4] === 'photo') return;

    const tabs = getTabs();
    if (tabs.length < 2) return;

    const currentIndex = getSelectedIndex(tabs);
    if (currentIndex === -1) return;

    const direction = event.key === 'ArrowLeft' ? -1 : 1;
    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    tabs[nextIndex].click();
  });
})();
