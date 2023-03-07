import clsx from 'clsx';
import type {
  AnimationControls,
  HTMLMotionProps,
  TargetAndTransition,
  VariantLabels,
} from 'framer-motion';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import * as React from 'react';

import './index.scss';

import { FlipCardProps, FlipCardRef } from './interface';

export default React.forwardRef(function FlipCard<T extends object>(
  {
    datas: { cardList, id },
    render,
    className,
    onCardStart,
    onCardEnd,
    ...pre
  }: FlipCardProps<T> & React.ComponentPropsWithoutRef<'ul'>,
  ref: React.ForwardedRef<FlipCardRef<T>>,
) {
  const [card, setCard] = React.useState<FlipCardProps<T>['datas']['cardList']>(
    [],
  );

  const [LiStyleOne, setLiStyleOne] = React.useState<React.CSSProperties>({});

  const [LiStyleTow, setLiStyleTow] = React.useState<React.CSSProperties>({});

  const [isStyle, setIsStyle] = React.useState<'one' | 'two'>('one');

  const [animate, setAnimate] = React.useState<
    | boolean
    | AnimationControls
    | TargetAndTransition
    | VariantLabels
    | { [key: string]: any }
  >({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
  });
  const [isLAndR, setIsLAndR] = React.useState<'left' | 'right'>();

  React.useEffect(() => {
    setCard([cardList[0], cardList[1]]);
  }, [cardList]);

  const isZindex = (index: number) => {
    const zIndex10 = {
      display: 'block',
      zIndex: 1,
    };
    const zIndex0 = {
      display: 'block',
      zIndex: 0,
    };

    if (index === 0) {
      setLiStyleOne(zIndex10);
      setLiStyleTow(zIndex0);
    } else {
      setLiStyleOne(zIndex0);
      setLiStyleTow(zIndex10);
    }
  };

  const pushPost = (value: T) => {
    const bolck = {
      display: 'block',
      zIndex: 1,
    };
    const none = {
      display: 'none',
      zIndex: 0,
    };
    setLiStyleOne(bolck);
    setLiStyleTow(none);
    setIsStyle('one');
    setAnimate({
      scale: [0.5, 1],
      isPush: true,
    });
    setCard(() => {
      const index = cardList.findIndex((item) => item[id] === value[id]);
      if (index === 0) return [cardList[0], cardList[1]];
      if (index === cardList.length - 1)
        return [cardList[cardList.length - 1], cardList[0]];
      return [value, cardList[index + 1]];
    });
  };

  const onDragStart = (index: number) => {
    isZindex(index);
    onCardStart?.();
  };

  const onDrag = (e: TouchEvent | MouseEvent | PointerEvent, info: PanInfo) => {
    const { x, y } = info.offset;

    if ((y >= 20 && x >= 20) || (x >= 20 && y <= -20)) {
      // 一、四象限
      setIsLAndR('left');
    } else if ((x <= -20 && y >= 20) || (x <= -20 && y <= -20)) {
      // 二、三象限
      setIsLAndR('right');
    }
  };

  const onDragEnd = (info: PanInfo, index: number) => {
    const { x, y } = info.offset;
    const mx = x >= 30 || x <= -30;
    const my = y >= 30 || y <= -30;

    if (mx || my) {
      setAnimate({
        x: [x, x * 10],
        y: [y, y * 10],
        opacity: [1, 0],
      });

      const postsIndex = cardList.findIndex(
        (val) => val[id] === card[index][id],
      );
      if (postsIndex === cardList.length - 2) {
        setCard([cardList[postsIndex + 1], cardList[0]]);
      } else if (postsIndex === cardList.length - 1) {
        setCard([cardList[0], cardList[1]]);
      } else {
        setCard([cardList[postsIndex + 1], cardList[postsIndex + 2]]);
      }
      const bolck = {
        display: 'block',
        zIndex: 1,
      };
      const none = {
        display: 'none',
        zIndex: 0,
      };
      if (index === 0) {
        setCard((state) => [...state.reverse()]);
        setLiStyleOne(none);
        setLiStyleTow(bolck);
        setIsStyle('two');
      } else {
        setLiStyleOne(bolck);
        setLiStyleTow(none);
        setIsStyle('one');
      }
      setAnimate({
        x: [0],
        y: [0],
        scale: [0.9, 1],
        isDrag: true,
      });
    }
  };

  const onDragMethods = (i: number): HTMLMotionProps<'li'> => {
    const liPtops: HTMLMotionProps<'li'> = {
      whileDrag: {
        rotate: [0, isLAndR === 'left' ? 3 : isLAndR ? -3 : 0],
      },
      animate,
      drag: true,
      dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
      dragTransition: { bounceStiffness: 500, bounceDamping: 50 },
      dragElastic: 1,
      onDragStart: () => {
        onDragStart(i);
      },
      onDragEnd: (e, info) => {
        onDragEnd(info, i);
      },
      onDrag,
      onAnimationComplete(definition) {
        const { isPush, isDrag } = definition as {
          isPush: boolean;
          isDrag: boolean;
        };
        if (isPush) {
          setAnimate({
            x: 0,
            y: 0,
            scale: [1],
          });
        } else if (isDrag) {
          onCardEnd?.();
        }
      },
    };
    if (i === 0)
      return {
        className: 'flipCard-slider-one',
        style: {
          ...LiStyleOne,
        },
        ...(isStyle === 'one'
          ? liPtops
          : {
              animate: {
                scale: 0.9,
              },
            }),
      };
    return {
      className: 'flipCard-slider-tow',
      style: {
        ...LiStyleTow,
      },
      ...(isStyle === 'two'
        ? liPtops
        : {
            animate: {
              scale: 0.9,
            },
          }),
    };
  };

  React.useImperativeHandle(ref, () => ({
    pushPost: (value: T) => pushPost(value),
  }));

  return (
    <ul className={clsx('flipCard-ul', className)} {...pre}>
      <AnimatePresence>
        {card.map((item, i, arr) => (
          <motion.li {...onDragMethods(i)} key={i}>
            {render?.(item, i, arr)}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
});
