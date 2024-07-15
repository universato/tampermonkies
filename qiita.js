// ==UserScript==
// @name         Qiita記事マークダウンリンク生成
// @version      0.2
// @description  Qiita記事へのリンクをMarkdown記法で生成する
// @author       universato
// @match        https://qiita.com/*/items/*
// @match        https://qiita.com/*
// ==/UserScript==

// fukuchan-sanの動かなくなっていたユーザースクリプトを修正した上で、クリックだけで動作するようにした。
// 何も表示されないのが最大の欠点だけど、わかってる分には使いやすそう。

// Qiita記事リンク生成 https://greasyfork.org/ja/scripts/397378-qiita%E8%A8%98%E4%BA%8B%E3%83%AA%E3%83%B3%E3%82%AF%E7%94%9F%E6%88%90

// JavaScriptでクリップボードにテキストをコピーする - arms inc. Engineers' Blog https://tech.arms-soft.co.jp/entry/2022/07/27/090000
// JavaScriptでクリップボードにテキストをコピーする(Codepen) https://codepen.io/takayo-nakamura/pen/qBoaVza

"use strict;"

const paths = location.pathname.split('/');

if(paths[2] === "items"){
    const span = document.createElement("span");
    span.classList.add("fa", "fa-link");

    const div = document.createElement("div");
    div.classList.add("css-ag7bw5");
    div.append(span);
    // div.addEventListener("click", () => prompt(document.title, `[${document.title}](${location.href})`));

    const container = document.querySelector(".css-yrmhnf");

    // navigator.clipboardが使えるときだけ、アイコンを追加する。iOSでは使えないらしい。
    if(navigator.clipboard){
      container.append(div);
    }

    // クリップボードへコピー
    div.addEventListener('click', () => {
      const tagValue = `[${document.title}](${location.href})`;
      navigator.clipboard.writeText(tagValue).then(function () {});
    })
}

// Shortcuts to switch version by key
(function() {
  'use strict';
  document.addEventListener('keydown', function (event) {
      const activeTagName = document.activeElement.tagName;
      const in_textarea = ['TEXTAREA', 'INPUT'].includes(activeTagName);
      const invalid_input = event.key.match(/[^dgnps]/);
       if(in_textarea || invalid_input){ return false; }

      if(paths[2] === 'new' || paths[3] === 'edit'){ return false }

      const user_id = document.querySelector('.st-NewHeader_loginUser > img').alt;

     // const paths = location.pathname.split('/');
      //const current_version = paths[2];

      if(event.ctrlKey || event.metaKey){ return false; }

     if(event.key.match(/[ds]/)){
          // drafts, 下書き(shitagaki)
          location.href = "https://qiita.com/drafts";
      }else if(event.key.match(/[gp]/)){
          // private, 限定公開(gentei kokai)
          location.href = `https://qiita.com/${user_id}/private`;
      }else if(event.key === 'n'){
          location.href = 'https://qiita.com/drafts/new';
      }
  }, false);
})();
