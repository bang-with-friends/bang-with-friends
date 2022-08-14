import { Game } from './Game';
import EventManager from 'common/lib/EventManager';
import * as Events from 'common/lib/Events';

const makeGameId = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 4; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * 26));
  }
  return result;
};

class BangGame {
  game = new Game(makeGameId());
  eventManager = new EventManager();

  attachEventListeners = () => {
    // TODO: Attach event listeners to check for player elimination, game over, deck shuffle
  }

  playTurn = (currPlayer: string) => {
    this.eventManager.onEvent(new Events.PlayerTurnBeginEvent({player: currPlayer}));
    this.eventManager.onEvent(new Events.PlayerDrawPhaseBeginEvent({player: currPlayer}));
    this.eventManager.onEvent(new Events.PlayerPlayPhaseBeginEvent({player: currPlayer}));
  }
}

export default (BangGame);
