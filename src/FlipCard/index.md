---
highlighter: prism
---

# FlipCard

无限翻牌动画

```tsx
import { FlipCard } from 'motion-cm';

type FlipCardProps = Array<{
  value: number;
  label: string;
}>;

export default () => {
  return (
    <FlipCard<FlipCardProps>
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
  );
};
```

`FlipCardProps<T extends object>`

| API         | 说明                   | 类型                                            | 默认值 |
| :---------- | ---------------------- | ----------------------------------------------- | ------ |
| datas       | 组件所需要的数据       | `{cardList: T[], id: keyof T}`                  | -      |
| onCardStart | 卡片开始移动           | `() => void`                                    | -      |
| onCard      | 卡片移动               | `() => void`                                    | -      |
| onCardEnd   | 卡片结束移动           | `() => void`                                    | -      |
| render      | 自定义 render 内容元素 | `(item: T, i: number, arr: T[]) => JSX.Element` | -      |
