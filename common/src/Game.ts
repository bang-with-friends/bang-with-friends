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
  turn: number;
  state: GameState;
  players: Map<string, Player>;
  numPlayers: number;
  playerOrder: string[];
  activePlayers: string[];

  startGame = () => {
    this.state = GameState.PLAYING;
  };

  constructor(id: string) {
    this.id = id;
    this.deck = shuffleDeck(makeDeck());
    this.discard = [];
    this.turn = -1;
    this.state = GameState.WAITING;
    this.players = new Map();
    this.numPlayers = 0;
    this.playerOrder = [];
    this.activePlayers = [];
  }
}
