// import * as PIXI from 'pixi.js-legacy';
import * as PIXI from 'pixi.js';
// import { PixiComponent } from '@inlet/react-pixi/legacy';
import { PixiComponent } from '@inlet/react-pixi';

type Point = { x: number, y: number };

const drawRect = (
  instance: PIXI.Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
  borderRadii: [number, number, number, number],
) => {
  const points: Point[] = [];
  points.push({ // 0: top left after curve
    x: x + borderRadii[0],
    y,
  });
  points.push({ // 1: top right before curve
    x: x + width - borderRadii[1],
    y,
  });
  points.push({ // 2: top right after curve
    x: x + width,
    y: y + borderRadii[1],
  });
  points.push({ // 3: bottom right before curve
    x: x + width,
    y: y + height - borderRadii[2],
  });
  points.push({ // 4: bottom right after curve
    x: x + width - borderRadii[2],
    y: y + height,
  });
  points.push({ // 5: bottom left before curve
    x: x + borderRadii[3],
    y: y + height,
  });
  points.push({ // 6: bottom left after curve
    x,
    y: y + height - borderRadii[3],
  });
  points.push({ // 7: top left before curve
    x,
    y: y + borderRadii[3],
  });

  const corners: Point[] = [];
  corners.push({ x: x + borderRadii[0], y: y + borderRadii[0] }); // 0: top left
  corners.push({ x: x + width - borderRadii[0], y: y + borderRadii[0] }); // 1: top right
  corners.push({ // 2: bottom right
    x: x + width - borderRadii[0],
    y: y + height - borderRadii[0],
  });
  corners.push({ x: x + borderRadii[0], y: y + height - borderRadii[0] }); // 3: bottom left

  instance.moveTo(points[0].x, points[0].y);

  instance.lineTo(points[1].x, points[1].y);
  instance.arc(corners[1].x, corners[1].y, borderRadii[1], Math.PI * 3 / 2, 0);
  instance.lineTo(points[3].x, points[3].y);
  instance.arc(corners[2].x, corners[2].y, borderRadii[2], 0, Math.PI / 2);
  instance.lineTo(points[5].x, points[5].y);
  instance.arc(corners[3].x, corners[3].y, borderRadii[3], Math.PI / 2, Math.PI);
  instance.lineTo(points[7].x, points[7].y);
  instance.arc(corners[0].x, corners[0].y, borderRadii[0], Math.PI, Math.PI * 3 / 2);
};

interface IRectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: number;
  opacity?: number;
  borderRadius?: number | [number, number, number, number]; // top left to bottom left, clockwise
  borderWidth?: number;
  borderStroke?: number;
  borderOpacity?: number;
}

const Rectangle = PixiComponent<IRectangleProps, PIXI.Graphics>('Rectangle', {
  create: () => new PIXI.Graphics(),
  applyProps: (instance, _, props) => {
    const {
      x,
      y,
      width,
      height,
      borderRadius = 0,
      fill = 0,
      opacity = 1,
      borderWidth = 0,
      borderStroke = 0,
      borderOpacity = 0,
    } = props;

    let borderRadii: [number, number, number, number];
    if (Array.isArray(borderRadius)) {
      borderRadii = borderRadius;
    } else {
      const b = borderRadius;
      borderRadii = [b, b, b, b];
    }

    const drawInnerRect = () => drawRect(
      instance,
      x + borderWidth,
      y + borderWidth,
      width,
      height,
      borderRadii,
    );

    const drawOuterRect = () => drawRect(
      instance,
      x,
      y,
      width + borderWidth * 2,
      height + borderWidth * 2,
      borderRadii,
    );

    instance.clear();

    // draw the border as a rectangle
    instance.beginFill(borderStroke, borderOpacity);
    drawOuterRect();
    instance.endFill();

    // empty out the fill of the inner rectangle
    instance.beginHole();
    drawInnerRect();
    instance.endHole();

    // draw the inner rectangle
    instance.beginFill(fill, opacity);
    drawInnerRect();
    instance.endFill();
  },
});

export default Rectangle;
