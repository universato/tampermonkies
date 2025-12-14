# Tampermonkies


[Greasy Fork](https://greasyfork.org)

# Memo

### 無名関数の即時実行

```js
(function(){

})();
```

### イベントリスナーの登録。キーのショートカットの追加

```js
document.addEventListener('keydown', function (event) {});
document.addEventListener('keydown', function (event) {}, false);
```

第3引数のデフォルトは`false`らしいので、わざわざ指定する意味はないとのこと。  
`false`だと、親よりも子を優先して捕捉する。
`document`は1番大きい親なので、イベント捕捉時に最後に実行されると考えていいのかもしれない。
`false`を書かなくてもいいが書いてあると、`addEventListener`の終わりがわかりやすい気がする。

###  イベントのキー

```js
event.ctrlKey // Macのcontrol(^)
event.metaKey // Macのcommand(⌘)
event.key === 'Enter'
```

### クラスでの要素の取得

```js
let elements = document.getElementsByClassName('btn btn-primary');

for(let i = 0; i < elements.length; ++i){
Array.prototype.forEach.call(elements, function(element){})
for (let element of Array.from(elements)) {}
for (let element of elements) {}
```

`getElementsByClassName`で取得した要素は、配列のように扱える。
存在しない要素に`[]`でアクセスすると、配列と同じく`undefined`となる。



### 入力中の除外

```js
document.activeElement.tagName // 'TEXTAREA'
// フォーカスしてアクティブな要素がわかる。
```

`tagName`は全て大文字のstringでのタグ名が返ってくる。  
`<textarea>`や`<input>`内にフォーカスしてるときは、
普通に入力でキーを打つ可能性があるので、
キーでのショートカットは反応しないようにする。

###

```js
location.pathname // '/path/to'
location.pathname.split('/'); // ['', 'path', 'to']
```

`/`始まりの`string`が返ってくる。  
`split('/')`とすると、0番目の要素は空文字列になる。  

### 古いincludeと今のmatch

```js
// @include
// @match
```

`@include`は古くて安全ではないらしい。  
`@match`でURLの対象を決める。

### 非推奨のKeyCode

キー入力によるショーットカットを作る際の注意事項。

`keyCode`は非推奨。  
数値だけ見ててもわかりにくいからね、積極的に変更していきたい。

2017年6月3日 [keyCode が deprecated になってた](http://var.blog.jp/archives/70803410.html)

```js
event.keyCode === 37        // deprecated
event.key === 'ArrowLeft'   // new
```


```js
document.getElementById('pager_last');
// 返り値は、HTMLelementかnullらしい。Elementは単数形。
```

```js
window.location.toString()
location.toString()
location.pathname
location.search
```
URLの文字列をとってきてる。
`window`は不要。


### アルゴ式

データベース入門は、｢模範解答を示す｣と｢クエリを試す｣が同じ。  

Copyボタンクリックだと、`uncaught (in promise) DOMException: Document is not focused.`と怒られる。

### AtCoderコードテスト

実行の度に`(Ctrl + Enter)`の表記が消えてしまう。仕方ない。  

ちゃんと`(Run|実行)`があるか試さないと、誤判定しそうだけど、誤判定したときに対策すればいいか……。← 誤判定した。

`@match`で判定するURLのスペルを間違えてて、`?lang=ja`や`?lang=en`がつくときに全く効かなかった……。

見えないところに`a.btn.btn-primary`のタグが別にあることがあったので、
`Run|実行`と書かれたものをボタンとしてクリックする。

Macは「⌘ + Enter」と表記するようにしようと思ったが、Ctrl+Enterでも実行できるため、わざわざ表現を変えるような実装は必要ないかもしれない。


### REx

｢次の問題へ｣も｢解答する｣もクラスは同じだが、`a`タグと`input`タグで分けられている。

### るりま

2桁の数字の入力で、バージョンを変更する。
RubyリファレンスマニュアルのURLの2つ目のパスがバージョンになっている。
少し変則的で、

- 1.8.7, 1.9.3
- 2.0.0, 2.1.0, ……, 2.7.0
- 3.0, 3.1, ……, 3.4, 3.5, master

のような形になっている。
3.x系になると、マイナーバージョン止まりになるのがわかりやすいですね。
なお、1.x系は、英語版には存在しない。

入力のバージョンは数字とドットのみだが、
URLのバージョンは、`master`,`latest`も存在する。

結局、マイナーバージョンごとにドキュメントがあるので、
入力もマイナーバージョンだけまでで判断して良い。

マイナーバージョン未満は、読者は意識する必要はない。

存在しないバージョンを入力。
- 1.1 ~ 1.8 → 1.8.7。
- 2.8 ~ 2.9 → 2.7。
- それ以外 → master
