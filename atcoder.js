// ==UserScript==
// @name         AtCoder_CustomTest_Run_Shortcut
// @namespace    https://greasyfork.org/ja/users/570127
// @version      0.1.6
// @description  AtCoderのコードテストにおいてCtrl+Enterで実行ができるようになります。You can run by using Ctrl + Enter in Custom Test of AtCoder
// @author       universato
// @grant        none
// @match        https://atcoder.jp/contests/*/custom_test
// @match        https://atcoder.jp/contests/*/custom_tets*
// @license      MIT
// @supportURL   https://twitter.com/universato
// ==/UserScript==

(function() {
  document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter'){
          const elements = document.getElementsByClassName('btn btn-primary');
          for(let element of elements){
              if(element.innerText === '実行'){
                  element.click();
              }
          }
      }
  });
})();
