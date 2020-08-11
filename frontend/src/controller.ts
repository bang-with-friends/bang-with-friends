import { Game } from 'common/lib/Game';
import { GameEvent } from 'common/lib/Events';

import io from 'socket.io-client';

export default class Store {
  initialized = false;

  socket?: SocketIOClient.Socket;

  state: {
    game?: Game;
    eventHistory: GameEvent[];
  }

  constructor() {
    this.state = {
      eventHistory: [],
    };
  }

  initialize(_code: string, _name: string) {
    this.socket = io('http://localhost:5000');
    this.socket.on('event', this.handleEvent);
    // pushEvent(new PlayerJoinEvent({ code, name }));

    this.initialized = true;
  }

  pushEvent(event: GameEvent) {
    if (!this.initialized /* && event.name != EventName.PLAYER_JOIN */) {
      this.handleError('Game has not yet been initialized.');
      return;
    }

    if (!this.socket) {
      this.handleError('Connection failed.');
      return;
    }

    this.socket.emit('event', event);
    this.state.eventHistory = [...this.state.eventHistory, event];
  }

  handleEvent(data: GameEvent) {
    console.log(this.initialized);
    console.log(data);
  }

  handleError(message: string) {
    console.log(this.initialized);
    console.log(message);
  }
}
