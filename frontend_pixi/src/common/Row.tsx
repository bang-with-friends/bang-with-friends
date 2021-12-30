import { ComponentProps } from 'react';
// import { Container } from '@inlet/react-pixi/legacy';
import { Container } from '@inlet/react-pixi';
// import * as PIXI from 'pixi.js-legacy';
import * as PIXI from 'pixi.js';
import useStatefulRef from '../common/useStatefulRef';

type ContainerProps = ComponentProps<typeof Container>;

type PropsFromContainer = ContainerProps & {
  children: ContainerProps['children'];
};

interface IRowPropsSetHeight {
  mainAxisAlignment: 'space-between' | 'space-around' | 'end';
  width: number;
}

interface IRowPropsVariableHeight {
  mainAxisAlignment: 'start';
}

type IRowProps = PropsFromContainer
  & (IRowPropsSetHeight | IRowPropsVariableHeight)
  & { crossAxisAlignment?: 'start' | 'center' | 'end'; a?: any };

const Row = (props: IRowProps) => {
  const containerRef = useStatefulRef<PIXI.Container>(null);

  const {
    mainAxisAlignment,
    crossAxisAlignment = 'center',
    anchor = 0.5,
    width,
    children,
    ...rest
  } = props;

  const childArray = Array.isArray(children) ? children : [children];

  let xAnchor: number;
  if (typeof anchor === 'number') {
    xAnchor = anchor;
  } else if (Array.isArray(anchor)) {
    xAnchor = anchor[0];
  } else {
    xAnchor = anchor.x;
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

  const halfHeight = heights.reduce((max, height) => Math.max(max, height)) / 2;
  const totalWidth = widths.reduce((total, width) => total + width);
  const remaining = (width ?? totalWidth) - totalWidth;

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

  let cumulativeWidth: number;
  switch (mainAxisAlignment) {
    case 'space-around':
      cumulativeWidth = padding / 2;
      break;
    case 'end':
      cumulativeWidth = remaining;
      break;
    default: 
      cumulativeWidth = 0;
      break;
  }
  cumulativeWidth -= (width ?? totalWidth) * xAnchor;

  const positionedChildren = childArray.map((child, i) => {
    let yPos = -heights[i] / 2;
    if (crossAxisAlignment === 'start') {
      yPos = -halfHeight;
    } else if (crossAxisAlignment === 'end') {
      yPos += halfHeight + yPos;
    }

    const component = (
      <Container
        key={`row-${i}`}
        x={cumulativeWidth}
        y={yPos}
        anchor={0}
      >
        {child}
      </Container>
    );
    cumulativeWidth += widths[i] + padding;

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

export default Row;
