// ==UserScript==
// @name         クイズバースアール店舗切り替えショートカット (Quizbar Suahl Switcher)
// @name:ja      クイズバースアール店舗切り替えショートカット
// @name:en      Quizbar Suahl Switcher: クイズバースアール店舗切り替えショートカット
// @namespace    https://greasyfork.org/ja/users/570127
// @version      2025.12.14.4
// @description  クイズバースアールの予約カレンダー等の切り替えキーボードショートカット a:秋葉原, i:池袋, k:蒲田, o:大阪, n:名古屋, d:日, w:週
// @description:ja クイズバースアールの予約カレンダー等の切り替えキーボードショートカット a:秋葉原, i:池袋, k:蒲田, o:大阪, n:名古屋, d:日, w:週
// @description:en Switch Area of Quizbar Suahl (@Japan) by key shortcut
// @author       universato
// @match        https://airrsv.net/*
// @match        https://airrsv.net/quizbar-suahl-akihabara/calendar
// @match        https://airrsv.net/quizbar-suahl-ikebukuro/calendar
// @match        https://airrsv.net/quizbar-suahl-kamata/calendar
// @match        https://airrsv.net/quizbar-suahl-osaka/calendar
// @match        https://airrsv.net/quizbar-suahl-nagoya/calendar
// @match        https://suahl.com/shoplist/*
// @license      MIT
// @grant        none
// ==/UserScript==

// Shortcuts to switch by shortcut key
(function() {
  'use strict';
  document.addEventListener('keydown', function (event) {

      // console.log(`[Quizbar Suahl Switcher]: ${event.key}`);

      // テキストエリア内の入力であれば、終了。
      const activeTagName = document.activeElement.tagName;
      const in_textarea = ['TEXTAREA', 'INPUT'].includes(activeTagName);
      if(in_textarea){ return false; }

      if(event.ctrlKey || event.metaKey){ return false; }

      const invalid_input = event.key.match(/^[^aikondw]$/); // a:秋葉原, i:池袋, k:蒲田, o:大阪, n:名古屋, d:日, w:週
      if(invalid_input){ return false; }

      if (event.key === 'ArrowLeft'){
          document.querySelector('li.ctlListItem.listPrev').click();
          return;
      }else if(event.key === 'ArrowRight'){
          document.querySelector('li.ctlListItem.listNext').click();
          return;
      }else if(event.key === 'd'){
          document.querySelector('#btnDay').click();
          return;
      }else if(event.key === 'w'){
          document.querySelector('#btnWeek').click();
          return;
      }

      const paths = location.pathname.split('/');
      const current_location = paths[1];

      let next_location;
      if(event.key === 'a'){
          next_location = 'quizbar-suahl-akihabara';
      }else if(event.key === 'i'){
          next_location = 'quizbar-suahl-ikebukuro';
      }else if(event.key === 'k'){
          next_location = 'quizbar-suahl-kamata';
      }else if(event.key === 'o'){
          next_location = 'quizbar-suahl-osaka';
      }else if(event.key === 'n'){
          next_location = 'quizbar-suahl-nagoya';
      }else{
          return false;
      }

      location.href = location.href.replace(current_location, next_location);

  }, false);
})();
