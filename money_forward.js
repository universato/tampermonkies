// ==UserScript==
// @name         MoneyFoward
// @namespace    https://greasyfork.org/ja/users/570127
// @version      0.4.1
// @description  MoneyFoward MEを便利にするユーザースクリプト
// @description:ja MoneyFoward MEを便利にするユーザースクリプト
// @author       universato
// @match        https://moneyforward.com/bs/portfolio
// @match        https://moneyforward.com/cf
// @match        https://moneyforward.com/accounts/show/*
// @license      MIT
// @grant        none
// ==/UserScript==

function numberFromTable(rows, i, j){
  return Number(rows[i].cells[j].innerText.replace(/,/g,"").replace(/\n.*/, "").replace("円",""));
}

function numberFromCell(cell){
  return Number(cell.innerText.replace(/,/g,"").replace(/\n.*/, "").replace("円",""));
}

const tableElem = document.querySelector('table.table-bordered.table-pns');
if(tableElem){
  const rowElems = tableElem.rows;

  let acquisitionCost = 0;
  let presentValue = 0;
  let profitLoss = 0;

  for (let i = 1; i < rowElems.length; i++) {
      acquisitionCost += numberFromTable(rowElems, i, 1);
      presentValue += numberFromTable(rowElems, i, 2);
      profitLoss += numberFromTable(rowElems, i, 3);
  }

  const container = document.querySelector("#portfolio_det_pns");

  const colorClass= profitLoss > 0 ? "plus-color" : "minus-color";

  const newTable = `
  <table class="table table-bordered table-pns" style="width: 80%;">
  <tbody>
  <tr>
  <td>　　　　　　　　合　　　　計　　　　　　</td>
  <td class="number">${acquisitionCost.toLocaleString()}円</td>
  <td class="number">${presentValue.toLocaleString()}円</td>
  <td class="number"><span class="${colorClass}">${profitLoss.toLocaleString()}円</span></td>
  <td class="number"><span class="${colorClass}">　　${(profitLoss / acquisitionCost * 100).toFixed(2)}%</span></td>
  <td class="entry-date">　　　　　　</td>
  </tr>
  </tbody>

  </table>
  `;

  const tableDiv = document.createElement("div");
  tableDiv.innerHTML = newTable;
  container.appendChild(tableDiv);
  //container.innerHTML += newTable;
}

const tableElemEq = document.querySelector('table.table-bordered.table-eq');
if(tableElemEq){
  const rowElems = tableElemEq.rows;

  let acquisitionCost = 0;
  let marketValue = 0;
  let dayBefore = 0;
  let profitLoss = 0;

  for (let i = 1; i < rowElems.length; i++) {
      const hoyusu = numberFromTable(rowElems, i, 2);
      const heikin_shutoku_tanka = numberFromTable(rowElems, i, 3);
      acquisitionCost += heikin_shutoku_tanka * hoyusu;

      marketValue += numberFromTable(rowElems, i, 5);
      dayBefore += numberFromTable(rowElems, i, 6);
      profitLoss += numberFromTable(rowElems, i, 7);
  }

  const container = document.querySelector("#portfolio_det_eq");

  const colorClass= profitLoss > 0 ? "plus-color" : "minus-color";

  const newTable = `
  <table class="table table-bordered table-pns">
  <tbody>
  <tr>
  <td>　　　　</td>
  <td>　　　　　　　　　　　　　　　　　　　　　　　</td>
  <td>　　</td>
  <td class="number">取得原価${acquisitionCost .toLocaleString()}円</td>
  <td class="number">${marketValue .toLocaleString()}円</td>
  <td class="number">${dayBefore.toLocaleString()}円</td>
  <td class="number"><span class="${colorClass}">${profitLoss.toLocaleString()}円</span></td>
  <td class="number"><span class="${colorClass}">　　${(profitLoss / acquisitionCost * 100).toFixed(2)}%</span></td>
  <td class="entry-date">　　　　　　</td>
  </tr>
  </tbody>

  </table>
  `;

  const tableDiv = document.createElement("div");
  tableDiv.innerHTML = newTable;
  container.appendChild(tableDiv);
  //container.innerHTML += newTable;
}



function hiddenZeros(){
  const cfDetailTable = document.querySelector("#cf-detail-table");
  if(cfDetailTable){
      const rows = document.querySelectorAll(".transaction_list.js-cf-edit-container");
      for(const row of rows){
          if(row.children[3].innerText === '0'){
              row.style.display = "none";
          }
      }
  }
}

function hiddenSmalls(){
  const cfDetailTable = document.querySelector("#cf-detail-table");
  if(cfDetailTable){
      const rows = document.querySelectorAll(".transaction_list.js-cf-edit-container");
      for(const row of rows){
          if(Math.abs(numberFromCell(row.children[3])) < 1000){
              row.style.display = "none";
          }
      }
  }
}


hiddenZeros();

function displayAll(){
  const cfDetailTable = document.querySelector("#cf-detail-table");
  if(cfDetailTable){
      const rows = document.querySelectorAll(".transaction_list.js-cf-edit-container");
      for(const row of rows){
          row.style.display = "table-row";
      }
  }
}

const footerLinks = document.querySelector(".footer_links");
if(footerLinks){
  const hiddenButton = document.createElement("button");
  const hiddenText = document.createTextNode("ゼロ円を非表示");
  hiddenButton.appendChild(hiddenText);
  hiddenButton.setAttribute("class", "button");
  hiddenButton.addEventListener('click', hiddenZeros);
  footerLinks.appendChild(hiddenButton);

  const hiddenSmallsButton = document.createElement("button");
  const hiddenSmallsText = document.createTextNode("1000円未満を非表示");
  hiddenSmallsButton.appendChild(hiddenSmallsText);
  hiddenSmallsButton.setAttribute("class", "button");
  hiddenSmallsButton.addEventListener('click', hiddenSmalls);
  footerLinks.appendChild(hiddenSmallsButton);

  const displayAllButton = document.createElement("button");
  const displayText = document.createTextNode("全て表示");
  displayAllButton.appendChild(displayText);
  displayAllButton.setAttribute("class", "button");
  displayAllButton.addEventListener('click', displayAll);
  footerLinks.appendChild(displayAllButton);
}


newButtons = document.querySelectorAll("button.cf-new-btn.btn.modal-switch.btn-warning");
newButton = newButtons[newButtons.length - 1];
newButton.style.position = "fixed";
newButton.style.right = "20px";
newButton.style.bottom = "200px";
