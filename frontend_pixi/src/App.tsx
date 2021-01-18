import Game from './Game';
import './App.css';
import { Stage } from '@inlet/react-pixi/legacy';

const App = () => (
  <Stage
    options={{
      backgroundColor: 0x141428,
      antialias: true,
      resizeTo: window,
    }}
  >
    <Game />
  </Stage>
);

export default App;
