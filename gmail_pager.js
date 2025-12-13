// ==UserScript==
// @name         Gmail pagination Key Shortcut
// @name:ja      Gmailページネーション キーショートカット
// @namespace    https://greasyfork.org/ja/users/570127
// @version      2025.12.14.1
// @description  paginate Gmail by arrow keys
// @description:ja  Gmailで左右のキーでメールを移動します。
// @author       universato
// @license      MIT
// @match        https://mail.google.com/mail/u/0/*
// @supportURL   https://twitter.com/universato
// ==/UserScript==

(function () {
  document.addEventListener('keydown', function (event) {
    // 入力中は無視
    const tag = document.activeElement.tagName;
    if (/^(INPUT|TEXTAREA)$/.test(tag)) return;

    const isInbox =
      location.href === 'https://mail.google.com/mail/u/0/#inbox';

    /* =====================
       Inbox（一覧画面）
       ===================== */
    if (isInbox) {
      let element = null;

      if (event.key === 'ArrowLeft') {
        element = document.getElementById(':m9'); // 前
      }

      if (event.key === 'ArrowRight') {
        element = document.getElementById(':ma'); // 次
      }

      if (!element) return;

      // Inbox は Gmail の keydown を殺さない
      // （capture も preventDefault もしない）

      element.focus();
      ['mousedown', 'mouseup', 'click'].forEach(type => {
        element.dispatchEvent(
          new MouseEvent(type, {
            bubbles: true,
            cancelable: true
          })
        );
      });

      return; // ★ Inbox 処理はここで終了
    }

    /* =====================
       個別メール表示
       ===================== */
    let element = null;

    if (event.key === 'ArrowLeft') {
      element = document.querySelector(
        'div.T-I.J-J5-Ji.adg.T-I-awG.T-I-ax7.T-I-Js-IF.L3'
      );
    }

    if (event.key === 'ArrowRight') {
      element = document.querySelector(
        'div.T-I.J-J5-Ji.adg.T-I-awG.T-I-ax7.T-I-Js-Gs.L3'
      );
    }

    if (!element) return;

    // 個別表示では Arrow の既存挙動を潰す
    event.preventDefault();
    event.stopPropagation();

    element.click();
  }, false); // ★ bubble フェーズ
})();
