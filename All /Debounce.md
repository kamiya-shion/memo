## 概要

Debounce（デバウンス） とは、ある関数の実行頻度を制御するテクニックのこと。
特に、「短時間に何度も呼ばれるイベント」があるときに、**最後の呼び出しだけを実行**するようにしたい場合に使う。

## シチュエーション

- ユーザーが検索ボックスに文字を入力するとき
- ウィンドウサイズが変わるたびに処理を走らせたいとき（resize イベント）
- スクロール中に位置を検知したいとき（scroll イベント）

これらのイベントはものすごい頻度で発火するので、そのたびに重い処理（API コールや DOM 操作など）を実行してしまうと、パフォーマンスが低下してしまう。
そのため、Debounce テクニックを使用して最後の呼び出しだけを実行するようにすると良い。

# Debounce の仕組み

1. イベントが発火すると「ちょっと待って！」とタイマーをセット
2. 一定時間内に再度発火されたら、前のタイマーをキャンセル
3. 最後の発火から指定時間が経過したときだけ、関数を実行！

# 例

```ts
const debounce = <T>(func: (...args: T[]) => void, delay: number) => {
  let timeoutID: number | undefined = undefined;

  return (...args: T[]) => {
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => func(...args), delay);
  };
};

const search = debounce((query) => {
  console.log(`検索中...: ${query}`);
}, 500);

search("a");
search("ab");
search("abc");

// "検索中...: abc"
```
