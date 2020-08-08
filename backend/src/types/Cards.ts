import  { GameEvent } from './Events';

export enum CardSuit {
  HEARTS = 'HEARTS',
  SPADES = 'SPADES',
  CLUBS = 'CLUBS',
  DIAMONDS = 'DIAMONDS'  
}

export enum CardKind {
  STATUS = 'STATUS',
  ACTION = 'ACTION',
}

export interface CardStatus {
  view?: Number,
  reach?: Number,
  barrel?: Boolean,
  dynamite?: Boolean,
  jail?: Boolean,
  volcanic?: Boolean,
  gun?: Boolean
}

export abstract class GameCard {
  abstract suit: CardSuit;
  abstract number: Number;
  abstract playable: Boolean;

  static kind: CardKind;
  static title: String;
  static text: String;
  static status: CardStatus

  static action: () => GameEvent[];
}

export class Bang implements GameCard {
  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  static kind = CardKind.ACTION;
  static title = 'Bang';
  static text = 'WIP';
  static status = {

  }

  static action: () => GameEvent[];
}
