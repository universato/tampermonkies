// ==UserScript==
// @name         Qiita記事マークダウンリンク生成
// @version      0.2
// @description  Qiita記事へのリンクをMarkdown記法で生成する
// @author       universato
// @match        https://qiita.com/*/items/*
// ==/UserScript==

// fukuchan-sanの動かなくなっていたユーザースクリプトを修正した上で、クリックだけで動作するようにした。
// 何も表示されないのが最大の欠点だけど、わかってる分には使いやすそう。

// Qiita記事リンク生成 https://greasyfork.org/ja/scripts/397378-qiita%E8%A8%98%E4%BA%8B%E3%83%AA%E3%83%B3%E3%82%AF%E7%94%9F%E6%88%90

// JavaScriptでクリップボードにテキストをコピーする - arms inc. Engineers' Blog https://tech.arms-soft.co.jp/entry/2022/07/27/090000
// JavaScriptでクリップボードにテキストをコピーする(Codepen) https://codepen.io/takayo-nakamura/pen/qBoaVza

"use strict;"

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
