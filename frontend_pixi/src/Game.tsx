import { useEffect, useState } from 'react';
import { Text, useApp } from '@inlet/react-pixi/legacy';
import Centered from './common/Centered';
import Column from './common/Column';
import Row from './common/Row';

const Game = () => {
  const app = useApp();

  useEffect(() => {
    app.resize();

    const onRightClick = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };

    window.addEventListener('contextmenu', onRightClick);

    return () => window.removeEventListener('contextmenu', onRightClick);
  }, []);

  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);

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
          click={(e) => {
            e.stopPropagation();

            if (e.data.originalEvent.altKey) {
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
    </Centered>
  );
};

export default Game;
