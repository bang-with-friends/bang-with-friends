import { Container } from '@inlet/react-pixi/legacy';
import useStageSize from './useStageSize';

const Centered: typeof Container = (props) => {
  const stageSize = useStageSize();

  return (
    <Container
      x={stageSize.width / 2}
      y={stageSize.height / 2}
      anchor={0.5}
      {...props}
    />
  );
};

export default Centered;
