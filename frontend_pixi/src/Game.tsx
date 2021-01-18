import { useEffect, useState } from 'react';
import { Text, useApp } from '@inlet/react-pixi/legacy';

import { CardSuit, CardType } from 'common/lib/Cards';

import Centered from './common/Centered';
import Column from './common/Column';
import Row from './common/Row';
import Card from './sprites/Card';

const Game = () => {
  const app = useApp();

  useEffect(() => {
    if (!app) return;

    requestAnimationFrame(() => app.resize());

    const onRightClick = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };

    window.addEventListener('contextmenu', onRightClick);

    return () => window.removeEventListener('contextmenu', onRightClick);
  }, [app]);

  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [scale, setScale] = useState(1);

  return (
    <Centered>
      <Row
        mainAxisAlignment='space-between'
        crossAxisAlignment='center'
        width={800}
        anchor={0.5}
      >
        <Text
          x={xPos}
          y={yPos}
          interactive={true}
          accessible={true}
          cursor='pointer'
          text='Hello, world!'
          scale={scale}
          click={(e) => {
            e.stopPropagation();

            if (e.data.originalEvent.shiftKey) {
              setScale((old) => old * 1.25);
            } else if (e.data.originalEvent.altKey) {
              setYPos((old) => old + 10);
            } else {
              setXPos((old) => old + 10);
            }
          }}
          rightclick={(e) => {
            e.stopPropagation();

            if (e.data.originalEvent.altKey) {
              setYPos((old) => old - 10);
            } else {
              setXPos((old) => old - 10);
            }
          }}
        />
        <Text text='Hi!' />
        <Text text='Hi!' />
        <Text text='Hi!' />
        <Text text='Hi!' />
        <Text text={`Hi
there.`} />
        <Text text='Hello!' />
      </Row>
      <Card draggable suit={CardSuit.DIAMONDS} type={CardType.JAIL} number={9} />
    </Centered>
  );
};

export default Game;
