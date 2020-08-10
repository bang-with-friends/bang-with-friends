import { Game } from 'common/lib/Game';
import { GameEvent } from 'common/lib/Events';

class Store {
  game?: Game;
  eventHistory: GameEvent[];

  constructor() {
    this.eventHistory = [];
  }
}

