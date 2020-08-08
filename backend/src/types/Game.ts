import { GameCard } from './Cards';
import { GameEvent } from './Events';

export enum Role {
  SHERIFF = 'SHERIFF',
  VICE = 'VICE',
  RENEGADE = 'RENEGADE',
  OUTLAW = 'OUTLAW',
  NONE = 'NONE'
}

export class Player {
  constructor (id: String, name: String, maxHealth: Number) {
    this.id = id;
    this.name = name;
    this.role = Role.NONE; 
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.cards = {hand: [], board: []}
    this.alive = true;
    // this.character = ??
  }

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
}

export interface CharacterEffect {
  event: GameEvent,
  func: (data: any) => Event[]
}

export class Character {
  constructor (name: String, text: String, effect: CharacterEffect[]) {
    this.name = name;
    this.text = text;
    this.effect = effect;
  }

  name: String;
  text: String;
  effect: CharacterEffect[]
}

export enum GameState {
  waiting = 'waiting',
  playing = 'playing',
  completed = 'completed'
}

export class Game {
  constructor (id: String, code: String, deck: GameCard[], discard: GameCard[], state: GameState) {
    this.id = id;
    this.code = code;
    this.deck = deck;
    this.discard = [];
    this.turn = '',
    this.state = GameState.waiting
  }

  id: String;
  code: String;
  deck: GameCard[];
  discard: GameCard[];
  turn: String;
  state: GameState;
}