import { GameCard, makeDeck, shuffleDeck } from './Cards';
import { Player } from './Player';

export enum GameState {
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
  COMPLETED = 'COMPLETED',
}

export class Game {
  id: string;
  deck: GameCard[];
  discard: GameCard[];
  turn: string;
  state: GameState;
  players: Map<string, Player>;
  playerOrder: string[];
  activePlayers: string[];

  startGame = () => {
    this.state = GameState.PLAYING;
  };

  constructor(id: string) {
    this.id = id;
    this.deck = shuffleDeck(makeDeck());
    this.discard = [];
    this.turn = '';
    this.state = GameState.WAITING;
    this.players = new Map();
    this.playerOrder = [];
    this.activePlayers = [];
  }
}
