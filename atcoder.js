// ==UserScript==
// @name           AtCoder_CustomTest_Run_Shortcut
// @name:ja        AtCoderカスタムテスト実行ショートカット
// @namespace      https://greasyfork.org/ja/users/570127
// @version        0.1.11
// @description    You can run by using Ctrl + Enter in Custom Test of AtCoder
// @description:ja AtCoderのコードテストにおいてCtrl+Enterで実行ができるようになります。
// @author         universato
// @grant          none
// @match          https://atcoder.jp/contests/*/custom_test
// @match          https://atcoder.jp/contests/*/custom_test*
// @license        MIT
// @supportURL     https://twitter.com/universato
// ==/UserScript==

const element = document.querySelector('a.btn.btn-primary');
if(element.innerText.match(/^(Run|実行)$/)){ element.innerText += ' (Ctrl + Enter)'; }

(function() {
  document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter'){
          document.querySelector('a.btn.btn-primary').click();
      }
  });
})();
