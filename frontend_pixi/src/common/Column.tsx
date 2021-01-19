import { ComponentProps } from 'react';
import { Container } from '@inlet/react-pixi/legacy';
import * as PIXI from 'pixi.js-legacy';
import useStatefulRef from '../common/useStatefulRef';

type ContainerProps = ComponentProps<typeof Container>;

type PropsFromContainer = ContainerProps & {
  children: ContainerProps['children'];
};

interface IColumnPropsSetHeight {
  mainAxisAlignment: 'space-between' | 'space-around' | 'end';
  height: number;
}

interface IColumnPropsVariableHeight {
  mainAxisAlignment: 'start';
}

type IColumnProps = PropsFromContainer
  & (IColumnPropsSetHeight | IColumnPropsVariableHeight)
  & { crossAxisAlignment?: 'start' | 'center' | 'end' };

const Column = (props: IColumnProps) => {
  const containerRef = useStatefulRef<PIXI.Container>(null);

  const {
    mainAxisAlignment,
    crossAxisAlignment = 'center',
    anchor = 0.5,
    height,
    children,
    ...rest
  } = props;

  const childArray = Array.isArray(children) ? children : [children];

  let yAnchor: number;
  if (typeof anchor === 'number') {
    yAnchor = anchor;
  } else if (Array.isArray(anchor)) {
    yAnchor = anchor[1] ?? anchor[0];
  } else {
    yAnchor = anchor.y;
  }

  const pixiChildren = containerRef.current?.children ?? [];

  const heights: number[] = childArray.map((_child, i) => {
    if (pixiChildren.length === 0) return 0;
    return pixiChildren[i].getBounds().height;
  });

  const widths: number[] = childArray.map((_child, i) => {
    if (pixiChildren.length === 0) return 0;
    return pixiChildren[i].getBounds().width;
  });

  const totalHeight = heights.reduce((total, height) => total + height);
  const halfWidth = widths.reduce((max, width) => Math.max(max, width)) / 2;
  const remaining = (height ?? totalHeight) - totalHeight;

  let padding = 0;
  if (mainAxisAlignment === 'space-around' || mainAxisAlignment === 'space-between') {
    if (mainAxisAlignment === 'space-around') {
      padding = remaining / childArray.length;
    } else if (childArray.length === 1) {
      padding = 0;
    } else {
      padding = remaining / (childArray.length - 1);
    }
  }

  let cumulativeHeight: number;
  switch (mainAxisAlignment) {
    case 'space-around':
      cumulativeHeight = padding / 2;
      break;
    case 'end':
      cumulativeHeight = remaining;
      break;
    default: 
      cumulativeHeight = 0;
      break;
  }
  cumulativeHeight -= (height ?? totalHeight) * yAnchor;

  const positionedChildren = childArray.map((child, i) => {
    let xPos = -widths[i] / 2;
    if (crossAxisAlignment === 'start') {
      xPos = -halfWidth;
    } else if (crossAxisAlignment === 'end') {
      xPos += halfWidth + xPos;
    }

    const component = (
      <Container
        key={`column-${i}`}
        x={xPos}
        y={cumulativeHeight}
        anchor={0}
      >
        {child}
      </Container>
    );
    cumulativeHeight += heights[i] + padding;

    return component;
  });

  return (
    <Container
      ref={containerRef}
      {...rest}
    >
      {positionedChildren}
    </Container>
  );
};

export default Column;
