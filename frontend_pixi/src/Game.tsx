import { useEffect } from 'react';
import { Text, useApp } from '@inlet/react-pixi/legacy';
import useStageSize from './common/useStageSize';

const Game = () => {
  const app = useApp();
  const stageSize = useStageSize();

  useEffect(() => {
    app.resize();
  }, []);

  console.log(stageSize);

  return (
    <Text text='Hello, world!' />
  );
};

export default Game;
