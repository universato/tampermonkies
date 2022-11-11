// ==UserScript==
// @name         Rconv run shortcut
// @name:ja     Rconv 実行ショートカット
// @namespace    https://greasyfork.org/ja/users/570127
// @version      1.0.0
// @description  You can run the code by using Ctrl + Enter in Rconv.
// @description:ja RconvにおいてCtrl+Enterで実行できるようになります。
// @author       universato
// @grant        none
// @match       https://rconv.ongaeshi.me/*
// @license      MIT
// @supportURL   https://twitter.com/universato
// ==/UserScript==

(function() {
    document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter'){
            document.querySelector('#run').click();
        }
    });
})();
