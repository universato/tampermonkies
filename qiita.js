// ==UserScript==
// @name         Qiita記事マークダウンリンク生成
// @version      2024.7.15
// @description  Qiita記事へのリンクをMarkdown記法で生成する
// @author       universato
// @match        https://qiita.com/*/items/*
// @match        https://qiita.com/*
// ==/UserScript==

// fukuchan-sanの動かなくなっていたユーザースクリプトと同じアイディア。
// 何も表示されないのが最大の欠点だけど、わかってる分には使いやすそう。
// Create Linkを使えば良さそうだけど。

// Qiita記事リンク生成 https://greasyfork.org/ja/scripts/397378-qiita記事リンク生成

// JavaScriptでクリップボードにテキストをコピーする - arms inc. Engineers' Blog https://tech.arms-soft.co.jp/entry/2022/07/27/090000
// JavaScriptでクリップボードにテキストをコピーする(Codepen) https://codepen.io/takayo-nakamura/pen/qBoaVza

// さらにキーショートカットでコピーしたり移動できるようにした。
// ログインユーザー名が取得しにくくなってた。

"use strict";

const paths = location.pathname.split('/');

window.onload = function() {
  // ページがロードされたら実行するコード

  if(paths[2] === "items"){
    const md_copy_div = document.createElement('div');
    md_copy_div.textContent = 'MD';

    // ここのHTMLタグが変わりやすい。
    const container = document.querySelector("section.style-1hl01qi");

    // navigator.clipboardが使えるときだけ、アイコンを追加する。iOSでは使えないらしい。
    if(navigator.clipboard){
      container.append(md_copy_div);
    }

    md_copy_div.addEventListener('click', () => {
      const markdown_link = `[${document.title}](${location.href})`;
      navigator.clipboard.writeText(markdown_link);
    })
  }
};

// Shortcuts to switch version by key
(function() {
  document.addEventListener('keydown', function (event) {
      const activeTagName = document.activeElement.tagName;
      const in_textarea = ['TEXTAREA', 'INPUT'].includes(activeTagName);
      const invalid_input = event.key.match(/[^mdnps]/);
      if(in_textarea || invalid_input){ return false; }
      if(event.ctrlKey || event.metaKey){ return false; }
      if(paths[2] === 'new' || paths[3] === 'edit'){ return false; }

      if(event.key === 'n'){
        location.href = 'https://qiita.com/drafts/new';
      }else if(event.key.match(/[ds]/)){
          // drafts, 下書き(shitagaki)
          location.href = "https://qiita.com/drafts";
      }else if(event.key.match(/[p]/)){
          // private, 限定公開(gentei kokai)
          // const user_id = document.querySelector('[TODO]');
          // location.href = `https://qiita.com/${user_id}/private`;
      }else if(event.key === 'm'){
        const md_link = `[${document.title}](${location.href})`;
        navigator.clipboard.writeText(md_link);
      }
  }, false);
})();
