# FlipCard

无限翻牌动画

```tsx
import { FlipCard, FlipCardRef } from 'motion-cm';
import { useRef } from 'react';

type CardListProps = Array<{
  value: number;
  label: string;
}>;

export default () => {
  const ref = useRef<FlipCardRef<CardListProps>>(null);
  const onClick = () => {
    ref.current.pushPost({
      value: 3,
      label: 'C',
    });
  };
  return (
    <>
      <FlipCard<CardListProps>
        ref={ref}
        datas={{
          cardList: [
            {
              value: 1,
              label: 'A',
            },
            {
              value: 2,
              label: 'B',
            },
          ],
          id: 'value',
        }}
        style={{
          height: 200,
        }}
        render={(item) => (
          <div
            style={{
              background: '#fff',
              width: 200,
              height: 200,
              border: '2px solid #333',
              fontSize: '150px',
              textAlign: 'center',
            }}
          >
            {item.label}
          </div>
        )}
      />
      <button onClick={onClick}>push</button>
    </>
  );
};
```

## API

### Props

`FlipCardProps<T extends object>`

| 参数        | 说明                   | 类型                                            | 默认值 |
| :---------- | ---------------------- | ----------------------------------------------- | ------ |
| datas       | 组件所需要的数据       | `{cardList: T[], id: keyof T}`                  | -      |
| onCardStart | 卡片开始移动           | `() => void`                                    | -      |
| onCard      | 卡片移动               | `() => void`                                    | -      |
| onCardEnd   | 卡片结束移动           | `() => void`                                    | -      |
| render      | 自定义 render 内容元素 | `(item: T, i: number, arr: T[]) => JSX.Element` | -      |

### Ref

`FlipCardRef<T>`

| 参数     | 说明         | 类型                 | 默认值 |
| :------- | ------------ | -------------------- | ------ |
| pushPost | 外部插入数据 | `(value: T) => void` | -      |
