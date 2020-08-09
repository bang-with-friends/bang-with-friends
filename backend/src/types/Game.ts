import { GameCard, makeDeck, shuffleDeck } from './Cards';
import { GameEvent } from './Events';

export enum Role {
  SHERIFF = 'SHERIFF',
  VICE = 'VICE',
  RENEGADE = 'RENEGADE',
  OUTLAW = 'OUTLAW',
}

export class Player {
  id: String;
  name: String;
  role?: Role;
  character?: Character;
  maxHealth: Number;
  currentHealth: Number;
  alive: Boolean;
  cards: {
    hand: GameCard[],
    board: GameCard[],
  };

  constructor(id: String, name: String) {
    this.id = id;
    this.name = name;
    this.maxHealth = -1;
    this.currentHealth = -1;
    this.cards = { hand: [], board: [] };
    this.alive = true;
  }
}

export interface CharacterEffect {
  event: GameEvent;
  func: (data: any) => Event[];
}

export class Character {
  name: String;
  text: String;
  effect: CharacterEffect[];

  constructor(name: String, text: String, effect: CharacterEffect[]) {
    this.name = name;
    this.text = text;
    this.effect = effect;
  }
}

export enum GameState {
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
  COMPLETED = 'COMPLETED',
}

export class Game {
  id: String;
  deck: GameCard[];
  discard: GameCard[];
  turn: String;
  state: GameState;

  constructor(id: String) {
    this.id = id;
    this.deck = shuffleDeck(makeDeck());
    this.discard = [];
    this.turn = '';
    this.state = GameState.WAITING;
  }
}
