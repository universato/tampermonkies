// ==UserScript==
// @name         Greasy Fork editor adjuster
// @namespace    https://greasyfork.org/ja/users/570127
// @version      2025.12.14.1
// @description  Automatically adjusts the height of the Greasy Fork editor textarea based on the number of lines.
// @description:ja Greasy Forkのソースエディタのテキストエリアの高さを行数に応じて高くします。
// @author       universato
// @match        https://greasyfork.org/*
// @license      MIT
// @grant        none
// ==/UserScript==

const textarea = document.querySelector("#script_version_code");
if(textarea){
    let numberOfLines = textarea.value.split('\n').length;
    textarea.style.height = (20 * Math.min(44, Math.max(12, numberOfLines))) + "px";
}
