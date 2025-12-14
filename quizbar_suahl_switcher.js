// ==UserScript==
// @name         クイズバースアール店舗切り替えショートカット (Quizbar Suahl Switcher)
// @name:ja      クイズバースアール店舗切り替えショートカット
// @name:en      Quizbar Suahl Switcher: クイズバースアール店舗切り替えショートカット
// @namespace    https://greasyfork.org/ja/users/570127
// @version      2025.12.14.18
// @description  クイズバースアールの予約カレンダー等の切り替えキーボードショートカット a:秋葉原, i:池袋, k:蒲田, o:大阪, n:名古屋, d:日, w:週
// @description:ja クイズバースアールの予約カレンダー等の切り替えキーボードショートカット a:秋葉原, i:池袋, k:蒲田, o:大阪, n:名古屋, d:日, w:週
// @description:en Switch Area of Quizbar Suahl (@Japan) by key shortcut
// @author       universato
// @match        https://airrsv.net/quizbar-suahl-*/*
// @match        https://suahl.com/shoplist/*
// @match        https://suahl.com/recruit/*
// @license      MIT
// @grant        none
// ==/UserScript==

// Shortcuts to switch by shortcut key
(function() {
  'use strict';

  const locationMap = {
    a: 'akihabara',
    i: 'ikebukuro',
    k: 'kamata',
    o: 'osaka',
    n: 'nagoya',
  };

  document.addEventListener('keydown', function (event) {

    // console.log(`[Quizbar Suahl Switcher]: ${event.key}`);

    const paths = location.pathname.split('/');

    // airrsv.netの個別ページは、キーショットカットが動作しないように除外する。
    // true  ← 一覧:airrsv.net/quizbar-suahl-akihabara/calendar
    // false ← 個別:airrsv.net/quizbar-suahl-akihabara/calendar/menuDetail/?schdlId=T003D81DDC
    if(location.hostname === 'airrsv.net' && !paths[2].match(/calendar|policy|contact/) && paths[3] === 'menuDetail'){
      return false;
    }

    // テキストエリア内の入力であれば、終了。
    const activeTagName = document.activeElement.tagName;
    const inTextarea = ['TEXTAREA', 'INPUT'].includes(activeTagName);
    if(inTextarea){ return false; }

    if(event.ctrlKey || event.metaKey){ return false; }

    const invalidInput = event.key.match(/^[^aikondw]$/); // a:秋葉原, i:池袋, k:蒲田, o:大阪, n:名古屋, d:日, w:週
    if(invalidInput){ return false; }

    if (event.key === 'ArrowLeft'){
      document.querySelector('li.ctlListItem.listPrev')?.click();
      return;
    }else if(event.key === 'ArrowRight'){
      document.querySelector('li.ctlListItem.listNext')?.click();
      return;
    }else if(event.key === 'd'){
      document.querySelector('#btnDay')?.click();
      return;
    }else if(event.key === 'w'){
      document.querySelector('#btnWeek')?.click();
      return;
    }

    let currentLocation;
    if(location.hostname === 'suahl.com' && activeTagName !== 'IFRAME'){
      currentLocation = paths[2];
    }else{
      currentLocation = paths[1].split('-')[2];
    }

    const nextLocation = locationMap[event.key];
    if(!currentLocation || !nextLocation){ return false; }

    location.href = location.href.replace(currentLocation, nextLocation);

  }, false);
})();
