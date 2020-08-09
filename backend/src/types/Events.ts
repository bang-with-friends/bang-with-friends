import { CardType, GameCard } from './Cards';
import { Player } from './Player';

export enum EventName {
  GAME_START = 'GAME_START',
  SHUFFLE_CARDS = 'SHUFFLE_CARDS',
  START_TURN = 'START_TURN',
  END_TURN = 'END_TURN',
  PLAY_CARD = 'PLAY_CARD',
  DISCARD_CARD = 'DISCARD_CARD',
  PICK_CARD = 'PICK_CARD',
  HEALTH = 'HEALTH'
}

export enum SourceKind {
  DECK = 'DECK',
  DISCARD = 'DISCARD',
  PLAYER_HAND = 'PLAYER_HAND',
  PLAYER_BOARD = 'PLAYER_BOARD',
  GENERAL_STORE = 'GENERAL_STORE',
}

export abstract class GameEvent {
  name: EventName;
  data: any;

  constructor(name: EventName, data: any) {
    this.name = name;
    this.data = data;
  }
}

export class GameStartEvent extends GameEvent {
  constructor() {
    super(EventName.START_TURN, null);
  }
}

export class ShuffleCardsEvent extends GameEvent {
  constructor() {
    super(EventName.SHUFFLE_CARDS, null);
  }
}

export interface StartTurnData {
  prevPlayer: string,
  nextPlayer: string,
}

export class StartTurnEvent extends GameEvent {
  constructor(data: StartTurnData) {
    super(EventName.START_TURN, data);
  }
}

export interface EndTurnData {
  player: string,
}

export class EndTurnEvent extends GameEvent {
  constructor(data: EndTurnData) {
    super(EventName.END_TURN, data);
  }
}

export interface PlayCardData {
  sourcePlayer: string,
  targetPlayer?: string,
  card: GameCard
}

export class PlayCardEvent extends GameEvent {
  constructor(data: PlayCardData) {
    super(EventName.PLAY_CARD, data);
  }
}

export interface DiscardCardData {
  sourcePlayer: string,
  card: GameCard
}

export class DiscardCardEvent extends GameEvent {
  constructor(data: DiscardCardData) {
    super(EventName.DISCARD_CARD, data);
  }
}

export interface PickCardData {
  sources: {
    player?: string;
    sourceKind: SourceKind;
    canView: boolean;
  }[];
  receiver: {
    kind: SourceKind;
    player?: string;
  };
  optionCount?: number;
  filter: CardType[];
  selectCount: number;
  optional: boolean;
  picker?: string;
}

export class PickCardEvent extends GameEvent {
  constructor(data: PickCardData) {
    super(EventName.PICK_CARD, data);
  }
}

export interface PlayerUpdateData {
  player: string,
  field: keyof Player,
  newValue: any,
}

export class PlayerUpdateEvent extends GameEvent {
  constructor(data: PlayerUpdateData) {
    super(EventName.HEALTH, data);
  }
}
