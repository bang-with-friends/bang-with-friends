import { GameCard } from './Cards';

export enum EventName {
  game_start = 'game_start',
  shuffle_cards = 'shuffle_cards',
  start_turn = 'start_turn',
  end_turn = 'end_turn',
  play_card = 'play_card',
  discard_card = 'discard_card',
  draw_card = 'draw_card',
  health = 'health'
}

export enum SourceKind {
  deck = 'deck',
  discard = 'discard',
  playerHand = 'playerHand',
  playerBoard = 'playerBoard',
}

export interface GameEvent {
  name: EventName;
  data: any;
}

export class GameStartEvent implements GameEvent {
  name = EventName.game_start;
  data = null;
}

export class ShuffleCardsEvent implements GameEvent {
  name = EventName.shuffle_cards;
  data = null;
}

export interface StartTurnData {
  prevPlayer: String,
  nextPlayer: String,
}

export class StartTurnEvent implements GameEvent {
  constructor (data: StartTurnData) {
    this.data = data;
  }
  
  name = EventName.start_turn;
  data: StartTurnData;
}

export interface EndTurnData {
  player: String,
}

export class EndTurnEvent implements GameEvent {
  constructor (data: EndTurnData) {
    this.data = data; 
  }
  
  name = EventName.end_turn;
  data: EndTurnData;
}

export interface PlayCardData {
  sourcePlayer: String,
  targetPlayer?: String,
  card: GameCard
}

export class PlayCardEvent implements GameEvent {
  constructor (data: PlayCardData) {
    this.data = data;
  }

  name = EventName.play_card;
  data: PlayCardData;
}

export interface DiscardCardData {
  sourcePlayer: String,
  card: GameCard
}

export class DiscardCardEvent implements GameEvent {
  constructor (data: DiscardCardData) {
    this.data = data;
  }

  name = EventName.discard_card;
  data: DiscardCardData;
}

export interface DrawCardData {
  sourceKind: SourceKind,
    sourceData?: {
      player: String,
      location: Number
  }
}

export class DrawCardEvent implements GameEvent {
  constructor (data: DrawCardData) {
    this.data = data;
  }
  data: DrawCardData;
  name = EventName.draw_card;
}

export interface HealthData {
  player: String,
  change: Number
}

export class HealthEvent implements GameEvent {
  constructor (data: HealthData) {
    this.data = data;
  }
  data: HealthData;
  name = EventName.health;
}