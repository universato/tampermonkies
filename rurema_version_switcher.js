// ==UserScript==
// @name          Ruby reference manaul version switcher
// @name:ja      るりまバージョンスイッチャー for Rubyリファレンスマニュアル
// @namespace     https://greasyfork.org/ja/users/570127
// @version       2025.12.14.1
// @description    Switch version of Ruby reference manual by key shortcut
// @description:ja  るりまのバージョンをキーボードのショートカットで切り替えます
// @author        universato
// @match         https://docs.ruby-lang.org/ja/*/*.html
// @match         https://docs.ruby-lang.org/en/*/*.html
// @icon          https://www.google.com/s2/favicons?sz=64&domain=ruby-lang.org
// @license       MIT
// @grant         none
// ==/UserScript==

// en: master, 2.0.0 ~ 2.7.0, 3.0 ~
// ja: en + latest, 1.8.7, 1.9.3

// '2.6' -> '2.6.0'
// '3.1' -> '3.1'
function rurema_version(version){
    if(version.match(/1\.[0-8]/)){ return '1.8.7'; }
    else if(version === '1.9'){ return '1.9.3'; }
    else if(version.match(/2\.[0-7]/)){ return version + '.0'; }
    else if(version.match(/2\.[7-9]/)){ return '2.7.0'; }
    else if(version.match(/3\.[0-5]/)){ return version; }
    else{ return 'master'; }
}

const VERSIONS = {
    1.8: '1.8.7',
    1.9: '1.9.7',
    2.0: '2.0.0',
    2.1: '2.1.0',
    2.2: '2.2.0',
    2.3: '2.3.0',
    2.4: '2.4.0',
    2.5: '2.5.0',
    2.6: '2.6.0',
    2.7: '2.7.0',
    2.8: '2.7.0',
    2.9: '2.7.0',
    3.0: '3.0',
    3.1: '3.1',
    3.2: '3.2',
    3.3: '3.3',
    3.4: '3.4',
    3.5: '3.5',
};


var key_input = "";

// Shortcuts to switch version by numeric key
(function() {
  document.addEventListener('keydown', function (event) {
      const activeTagName = document.activeElement.tagName;
      const in_textarea = ['TEXTAREA', 'INPUT'].includes(activeTagName);
      const invalid_input = event.key.match(/[^0-9.lm]/);

      // テキストエリア内の入力、数字・ドット以外の入力であれば、終了。
      if(in_textarea || invalid_input){
          key_input = '';
          return false;
      }

      if(event.ctrlKey || event.metaKey){ return false; }

      // 入力はいったん最後の3文字以内にする
      key_input = (key_input + event.key).slice(-3);

      // この時点で、入力は2文字か3文字。
      // 最後の入力(末尾2桁)が数字なら、ドット付きのマイナーバージョンまでの形にする。
      if(key_input.match(/[0-9][0-9]$/)){
          const n = key_input.length;
          key_input = key_input[n - 2] + '.' + key_input[n - 1];
      }

      console.log(`[version switcher]: ${key_input}`);

      const paths = location.pathname.split('/');
      const language = paths[1];
      const current_version = paths[2];

      // バージョンを期待するところ、数字・ドット以外の文字があれば終了する。
      if(current_version === 'master'){}
      else if(current_version === 'latest'){}
      else if(current_version.match(/[1-9]\.[0-9](\.[0-9])?/)){}
      else{
          console.log("[version switcher] not version url");
          key_input = '';
          return false;
      }

      // 英語版ドキュメントはversion 1.xがなさそうなので、終了する。
      if(language === 'en' && key_input.match(/1\.[0-9]/)){
          console.log("[version switcher] en don't support 1.x ");
          return false;
      }

      // 1.0 ~ 4.9のときに限り、バージョンを変更する。
      if(key_input.match(/[1-4]\.[0-9]/)){
          location.href = location.href.replace(current_version, rurema_version(key_input));
      }else if(event.key === 'l' && language === 'ja'){
          location.href = location.href.replace(current_version, 'latest');
      }else if(event.key === 'm'){
          location.href = location.href.replace(current_version, 'master');
      }
  }, false);
})();
