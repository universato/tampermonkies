// ==UserScript==
// @name         Ruby REx
// @name:ja      RExのページ移動をキーボード操作で
// @namespace    https://greasyfork.org/ja/users/570127
// @version      1.0.0
// @description  You can turn page by left and right key shortcut. 左右のキーで、ページを移動できます。
// @description:ja RExで、右キーで｢解答する｣、左キーで｢前の問題へ｣となります。
// @author       universato
// @license      MIT
// @match        https://rex.libertyfish.co.jp/exam_histories/*
// @supportURL   https://twitter.com/universato
// ==/UserScript==

(function() {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft'){
            document.querySelector('a.pull-left').click(); // 前の問題へ
        }else if(event.key === 'ArrowRight'){
            document.querySelector('input.pull-right').click(); // 解答する
        }
    });
})();
