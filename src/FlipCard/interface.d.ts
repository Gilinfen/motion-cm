export interface FlipCardProps<T extends object> {
  /** 组件所需要的数据 */
  datas: {
    /** 数据 */
    cardList: T[];
    /** 数据唯一字段 */
    id: keyof T;
  };
  /** 卡片开始移动 */
  onCardStart?: () => void;
  /** 卡片移动 */
  onCard?: () => void;
  /** 卡片结束移动 */
  onCardEnd?: () => void;
  /** 标题render */
  render?: (item: T, i: number, arr: T[]) => JSX.Element;
}

export interface FlipCardRef<T> {
  pushPost: (value: T) => void;
}
