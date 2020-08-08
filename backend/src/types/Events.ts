import { GameCard } from './Cards';

export enum EventName {
  GAME_START = 'GAME_START',
  SHUFFLE_CARDS = 'SHUFFLE_CARDS',
  START_TURN = 'START_TURN',
  END_TURN = 'END_TURN',
  PLAY_CARD = 'PLAY_CARD',
  DISCARD_CARD = 'DISCARD_CARD',
  DRAW_CARD = 'DRAW_CARD',
  HEALTH = 'HEALTH'
}

export enum SourceKind {
  DECK = 'DECK',
  DISCARD = 'DISCARD',
  PLAYER_HAND = 'PLAYER_HAND',
  PLAYER_BOARD = 'PLAYER_BOARD',
}

export abstract class GameEvent {

  name: EventName;
  data: any;

  constructor (name: EventName, data: any) {
    this.name = name;
    this.data = data;
  }
}

export class GameStartEvent extends GameEvent {
  constructor () {
    super(EventName.START_TURN, null);
  }
}

export class ShuffleCardsEvent extends GameEvent {
  constructor () {
    super(EventName.SHUFFLE_CARDS, null);
  }
}

export interface StartTurnData {
  prevPlayer: String,
  nextPlayer: String,
}

export class StartTurnEvent extends GameEvent {

  constructor (data: StartTurnData) {
    super(EventName.START_TURN, data);
  }
  
} 

export interface EndTurnData {
  player: String,
}

export class EndTurnEvent extends GameEvent {

  constructor (data: EndTurnData) {
    super(EventName.END_TURN, data);
  }
  
}

export interface PlayCardData {
  sourcePlayer: String,
  targetPlayer?: String,
  card: GameCard
}

export class PlayCardEvent extends GameEvent {

  constructor (data: PlayCardData) {
    super(EventName.PLAY_CARD, data);
  }

}

export interface DiscardCardData {
  sourcePlayer: String,
  card: GameCard
}

export class DiscardCardEvent extends GameEvent {

  constructor (data: DiscardCardData) {
    super(EventName.DISCARD_CARD, data);
  }

}

export interface DrawCardData {
  sourceKind: SourceKind,
    sourceData?: {
      player: String,
      location: Number
  }
}

export class DrawCardEvent extends GameEvent {

  constructor (data: DrawCardData) {
    super(EventName.DRAW_CARD, data);
  }

}

export interface HealthData {
  player: String,
  change: Number
}

export class HealthEvent extends GameEvent {

  constructor (data: HealthData) {
    super(EventName.HEALTH, data);
  }

}
