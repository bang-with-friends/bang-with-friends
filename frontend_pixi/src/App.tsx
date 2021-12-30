import Game from './Game';
import './App.css';
// import { Stage } from '@inlet/react-pixi/legacy';
import { Stage } from '@inlet/react-pixi';

const App = () => (
  <Stage
    options={{
      // backgroundColor: 0x141428,
      backgroundColor: 0x00FF00,
      antialias: true,
      resizeTo: window,
    }}
  >
    <Game />
  </Stage>
);

export default App;
