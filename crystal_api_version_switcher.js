// ==UserScript==
// @name          Crystal API version switcher
// @name:ja      Crystal APIバージョンスイッチャー
// @namespace
// @version       1.0.1
// @description    You can changel version of Crystal API by key shortcut
// @description:ja  Crystal APIのバージョンをキーボードのショートカットで切り替えます
// @author        universato
// @match         https://crystal-lang.org/api/*/*.html
// @match         https://crystal-lang.org/reference/*
// @icon
// @grant         none
// ==/UserScript==

// Shortcuts to switch version by key
(function() {
  'use strict';
  document.addEventListener('keydown', function (event) {
      const activeTagName = document.activeElement.tagName;
      const in_textarea = ['TEXTAREA', 'INPUT'].includes(activeTagName);
      const invalid_input = event.key.match(/[^lm]/);
       if(in_textarea || invalid_input){ return false; }

      const paths = location.pathname.split('/');
      const current_version = paths[2];

     if(event.key === 'l'){
          location.href = location.href.replace(current_version, 'latest');
      }else if(event.key === 'm'){
          location.href = location.href.replace(current_version, 'master');
      }
  }, false);
})();
