// ==UserScript==
// @name              Ruby rex
// @namespace    https://greasyfork.org/ja/users/570127
// @version      0.0.6
// @description  You can turn page by left and right key shortcut. 左右のキーで、ページを移動できます。
// @author       universato
// @license      MIT
// @match        https://rex.libertyfish.co.jp/exam_histories/*
// @supportURL   https://twitter.com/universato
// ==/UserScript==

(function() {
  document.addEventListener('keydown', function (event) {
      let elements = []
      if (event.key === 'ArrowLeft'){
          elements = document.getElementsByClassName('btn btn-w-md btn-gap-v btn-default pull-left');
      }else if(event.key === 'ArrowRight'){
          elements = document.getElementsByClassName('btn btn-w-md btn-gap-v btn-default pull-right');
      }
      if (elements[1]){
          elements[1].click();
      }
  });
})();
