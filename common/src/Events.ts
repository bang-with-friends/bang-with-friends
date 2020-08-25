import { CardType, GameCard } from './Cards';
import { Player } from './Player';

export enum EventName {
  GAME_START = 'GAME_START',
  SHUFFLE_CARDS = 'SHUFFLE_CARDS',
  START_TURN = 'START_TURN',
  END_TURN = 'END_TURN',
  PLAY_CARD = 'PLAY_CARD',
  PICK_CARD = 'PICK_CARD',
  PLAYER_UPDATE = 'PLAYER_UPDATE',
  PLAYER_JOINED = 'PLAYER_JOINED',
  PLAYER_ELIM = 'PLAYER_ELIM',
  ADD_PLAYER = 'ADD_PLAYER',
  REVEAL_CARD = 'REVEAL_CARD',
  CARD_PICKED = 'CARD_PICKED',
  MOVE_CARD = 'MOVE_CARD',
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
  canceled: boolean;

  constructor(name: EventName, data: any) {
    this.name = name;
    this.data = data;
    this.canceled = false;
  }

  stopPropagation() {
    this.canceled = true;
  }
}

export class GameStartEvent extends GameEvent {
  constructor() {
    super(EventName.GAME_START, null);
  }
}

export class ShuffleCardsEvent extends GameEvent {
  constructor() {
    super(EventName.SHUFFLE_CARDS, null);
  }
}

// current refers to the player whose turn is starting
export interface StartTurnData {
  currentId: string,
  nextId: string,
}

export class StartTurnEvent extends GameEvent {
  constructor(data: StartTurnData) {
    super(EventName.START_TURN, data);
  }
}

export class EndTurnEvent extends GameEvent {
  constructor() {
    super(EventName.END_TURN, null);
  }
}

export interface PlayCardData {
  sourceId: string,
  targetId?: string,
  card: GameCard
}

export class PlayCardEvent extends GameEvent {
  constructor(data: PlayCardData) {
    super(EventName.PLAY_CARD, data);
  }
}

export interface PickCardData {
  sources: {
    playerId?: string;
    kind: SourceKind;
    canView: boolean;
  }[];
  receiver: {
    kind: SourceKind;
    playerId?: string;
  };
  optionCount?: number;
  filter: CardType[];
  selectCount: number;
  optional: boolean;
  pickerId?: string;
}

export class PickCardEvent extends GameEvent {
  constructor(data: PickCardData) {
    super(EventName.PICK_CARD, data);
  }
}

export interface PlayerUpdateData {
  playerId: string,
  field: keyof Player,
  newValue: any,
}

export class PlayerUpdateEvent extends GameEvent {
  constructor(data: PlayerUpdateData) {
    super(EventName.PLAYER_UPDATE, data);
  }
}

export interface PlayerJoinedData {
  player: Player,
}

export class PlayerJoinedEvent extends GameEvent {
  constructor(data: PlayerJoinedData) {
    super(EventName.PLAYER_JOINED, data);
  }
}

export interface AddPlayerData {
  player: Player,
  gameId: string,
}

export class AddPlayerEvent extends GameEvent {
  constructor(data: AddPlayerData) {
    super(EventName.ADD_PLAYER, data);
  }
}

export interface RevealCardData {
  source: {
    kind: SourceKind,
    playerId?: string,
  }
  revealCount: number,
  selectCount?: number,
}

export class RevealCardEvent extends GameEvent {
  constructor(data: RevealCardData) {
    super(EventName.REVEAL_CARD, data);
  }
}

export interface PlayerElimData {
  deadDlayerId: string,
  killingPlayerId?: string,
}

export class PlayerElimEvent extends GameEvent {
  constructor(data: PlayerElimData) {
    super(EventName.PLAYER_ELIM, data);
  }
}

export interface CardPickedData {
  source: {
    kind: SourceKind,
    playerId?: string,
  }
  card: GameCard,
}

export class CardPickedEvent extends GameEvent {
  constructor(data: CardPickedData) {
    super(EventName.CARD_PICKED, data);
  }
}

export interface MoveCardData {
  source: {
    kind: SourceKind,
    playerId?: string,
  },
  target: {
    kind: SourceKind,
    playerId?: string,
  }
  card: GameCard,
}

export class MoveCardEvent extends GameEvent {
  constructor(data: MoveCardData) {
    super(EventName.MOVE_CARD, data);
  }
}
