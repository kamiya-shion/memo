# HOC（高階コンポーネント） Pattern

## 概要

- 別のコンポーネントを受け取るコンポーネント
- 複数のコンポーネントで同じロジックを再利用するならこのパターンが有用

## 例

例えば、特定のスタイルを共通で適用したい場合は以下のようにする

```jsx
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```

また、データ取得する際に、Loading...と表示したい場合について考える。

```jsx
import React, { useEffect, useState } from "react";

export default function withLoader(Element, url) {
  return (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      }

      getData();
    }, []);

    if (!data) {
      return <div>Loading...</div>;
    }

    return <Element {...props} data={data} />;
  };
}
```

このように、高階コンポーネントパターン（HOC）を使用すると、**全てのロジックを一箇所にまとめながら複数のコンポーネントに同じロジックを提供**できる。

## 参考

https://www.patterns.dev/react/hoc-pattern/
https://codesandbox.io/embed/withhover-withloader-whhh0
