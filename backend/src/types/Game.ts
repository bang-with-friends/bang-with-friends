import { GameCard, makeDeck } from './Cards';
import { GameEvent } from './Events';

export enum Role {
  SHERIFF = 'SHERIFF',
  VICE = 'VICE',
  RENEGADE = 'RENEGADE',
  OUTLAW = 'OUTLAW',
  NONE = 'NONE'
}

export class Player {

  id: String;
  name: String;
  role: Role;
  maxHealth: Number;
  currentHealth: Number;
  cards: {
    hand: GameCard[],
    board: GameCard[],
  }

  alive: Boolean;
  // character: Character;

  constructor (id: String, name: String) {
    this.id = id;
    this.name = name;
    this.role = Role.NONE; 
    this.maxHealth = -1;
    this.currentHealth = -1;
    this.cards = {hand: [], board: []}
    this.alive = true;
    // this.character = ??
  }
}

export interface CharacterEffect {
  event: GameEvent,
  func: (data: any) => Event[]
}

export class Character {

  name: String;
  text: String;
  effect: CharacterEffect[]

  constructor (name: String, text: String, effect: CharacterEffect[]) {
    this.name = name;
    this.text = text;
    this.effect = effect;
  }
}

export enum GameState {
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
  COMPLETED = 'COMPLETED'
}

export class Game {

  id: String;
  deck: GameCard[];
  discard: GameCard[];
  turn: String;
  state: GameState;

  constructor (id: String) {
    this.id = id;
    this.deck = makeDeck();
    this.discard = [];
    this.turn = '',
    this.state = GameState.WAITING
  }
  
}
