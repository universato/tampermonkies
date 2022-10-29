// ==UserScript==
// @name         fjord_bootcamp_keyboard_pagination
// @namespace    https://greasyfork.org/ja/users/570127
// @version      0.1.5
// @description  Fjord Bootcampで左右のキーで移動できるようになります
// @author       universato
// @license      CC0
// @match        https://bootcamp.fjord.jp/*
// @supportURL   https://twitter.com/universato
// ==/UserScript==

(function() {
    document.addEventListener('keydown', function (event) {
        const activeTagName = document.activeElement.tagName;
        if (['TEXTAREA', 'INPUT'].includes(activeTagName)){ return; }

        let elements = [];
        const pathnames = location.pathname.split('/');
        const flag0 = pathnames[1] === 'reports' && pathnames[2];
        const flag1 = pathnames[1] === 'current_user' && ['questions', 'reports', 'watches'].includes(pathnames[2]);
        const flag2 = ['announcements', 'notifications', 'pages', 'questions', 'reports', 'searchables', 'users', 'events'].includes(pathnames[1]);
        if (flag0){
            if (event.key === 'ArrowLeft'){
                elements = document.getElementsByClassName('page-content-prev-next__item-link is-prev');
            }else if(event.key === 'ArrowRight'){
                elements = document.getElementsByClassName('page-content-prev-next__item-link is-next');
            }
        } else if (flag1 || flag2){
           if (event.key === 'ArrowLeft'){
                elements = document.getElementsByClassName('pagination__item-link is-prev');
            }else if(event.key === 'ArrowRight'){
                elements = document.getElementsByClassName('pagination__item-link is-next');
            }
        }
        elements[0]?.click();
    }, false);
})();
