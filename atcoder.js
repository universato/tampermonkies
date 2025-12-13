// ==UserScript==
// @name           AtCoder CustomTest Run Shortcut
// @name:ja        AtCoderカスタムテスト実行ショートカット
// @namespace      https://greasyfork.org/ja/users/570127
// @version        2025.12.14.1
// @description    You can run by using Ctrl + Enter in Custom Test of AtCoder
// @description:ja AtCoderのコードテストにおいてCtrl+Enterで実行ができるようになります。Macは、⌘+Enter。
// @author         universato
// @grant          none
// @match          https://atcoder.jp/contests/*/custom_test
// @match          https://atcoder.jp/contests/*/custom_test*
// @license        MIT
// @supportURL     https://twitter.com/universato
// ==/UserScript==

const buttons = document.querySelectorAll('a.btn.btn-primary');
for(let button of buttons){
  if(button.innerText.match(/^(Run|実行)$/)){
    if(/Mac|iPhone|iPad/.test(navigator.userAgent)){
        button.innerHTML += ' <small> (⌘ + Enter)</small>';
    }else{
        button.innerHTML += ' <small> (Ctrl + Enter)</small>';
    }
  }
}

(function() {
  document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter'){
          const buttons = document.querySelectorAll('a.btn.btn-primary');
          for(let button of buttons){
              if(button.innerText.match(/^(Run|実行)/)){
                  button.click();
              }
          }
      }
  });
})();
