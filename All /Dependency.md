# 依存(Dependency)

## 依存とはなにか

以下の関数を見てどう思うだろうか。

```ts
const doSomething = () => {
  const human = new Human();
  // do something...
};
```

この関数 doSomething は Human クラスに依存している状態である。

依存とは、「あるコードが別のコードに頼って動いている状態」のこと。

つまり、doSomething の中で Human を使っている
→ doSomething は Human が存在することを前提にしている（＝依存している）

## なぜ「依存」が意識されるのか？

主に次のような理由から。

- 保守性

  たとえば Human クラスの実装が変わると、doSomething にも影響が及ぶ可能性がある。

- テストのしやすさ

  Human に依存していると、テスト時に Human をモック化したくなる。
  直接 new Human() していると差し替えが難しい。

- 再利用性と柔軟性

  Human 固定だと、Animal など他の種類のオブジェクトに差し替えられない。

## 依存を緩和するには(DIP: Dependency Inversion Principle)

たとえば以下のように 依存性注入（Dependency Injection） という方法がある。

```ts
const doSomething = (being: Human) => {
  // do something with being...
};
```

あるいは、インターフェースを使うと、より抽象的な依存にできる。

```ts
interface Being {
  speak(): void;
}

class Human implements Being {
  speak() {
    console.log("Hi");
  }
}

const doSomething = (being: Being) => {
  being.speak();
};
```

このようにすれば、doSomething は Being（抽象）に依存することになり、柔軟性が増す。

ちなみに、インターフェースを使った方法は、依存性逆転の原則（DIP: Dependency Inversion Principle）に則った方法だと言える。

> 上位のモジュール（ビジネスロジック）は、下位のモジュール（詳細実装）に依存すべきでない。
> 両者ともに 抽象（インタフェース） に依存すべきである。

つまり、設計の「上のレイヤー」が「下の具体クラス」に直接依存するのではなく、インタフェースを間に挟もうという発想。

DIP を採用することで得られるメリットをまとめると次のようになる。

- 「抽象」に依存することで、具体的な実装を簡単に差し替えられる
- モックやスタブが簡単に作れて、ユニットテストがしやすくなる
- 具体的なクラスの変更が、使っている側に波及しづらくなる

  たとえば Human クラスの内部構造が変わっても、Being インタフェースが変わらなければ、依存先（利用者側）は無傷。

- 「何をするか」と「どうやるか」を明確に分けられる

  インタフェース（抽象）により、**契約（interface）と実装（concrete class）**を明確に分離

ただし、実際には、DIP を厳密に守ると、インタフェースだらけになって過剰設計になることも。なので、

- 「外部とつながる層」や「変わりやすいところ」には DIP を適用

- 「変わらないし再利用もされない部分」では、シンプルに直接依存

と メリハリをつけるのが、実務ではとても大事。
