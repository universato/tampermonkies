// ==UserScript==
// @name         fjord_bootcamp_keyboard_pagination
// @name:ja      フィヨルドブートキャンプ･キーページネーション
// @namespace    https://greasyfork.org/ja/users/570127
// @version      0.1.10
// @description  Fjord Bootcampで左右のキーで移動できるようになります
// @description:ja  Fjord Bootcampで左右のキーで移動できるようになります
// @author       universato
// @license      CC0
// @match        https://bootcamp.fjord.jp/*
// @supportURL   https://twitter.com/universato
// ==/UserScript==

(function() {
    document.addEventListener('keydown', function (event) {
        const activeTagName = document.activeElement.tagName;
        if (activeTagName.match(/^(INPUT|TEXTAREA)$/)) { return; }

        let element;
        const pathnames = location.pathname.split('/');
        const flag0 = (pathnames[1] === 'reports') && pathnames[2];
        const flag1 = (pathnames[1] === 'current_user') && pathnames[2].match(/^(questions|reports|watches)$/);
        const flag2 = pathnames[1].match(/^(announcements|events|notifications|pages|questions|reports|searchables|users)$/);
        if (flag0){
            if (event.key === 'ArrowLeft'){
                element = document.querySelector('a.page-content-prev-next__item-link.is-prev');
            }else if(event.key === 'ArrowRight'){
                element = document.querySelector('a.page-content-prev-next__item-link.is-next');
            }
        } else if (flag1 || flag2){
           if (event.key === 'ArrowLeft'){
                element = document.querySelector('a.pagination__item-link.is-prev');
            }else if(event.key === 'ArrowRight'){
                element = document.querySelector('a.pagination__item-link.is-next');
            }
        }
        element?.click();
    }, false);
})();
