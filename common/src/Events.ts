import { GameCard } from "./Cards";

export enum EventName {
  GAME_START_EVENT = 'GameStartEvent',
  PLAYER_JOINED_EVENT = 'PlayerJoinedEvent',
  PLAYER_DRAW_PHASE_BEGIN_EVENT = 'PlayerDrawPhaseBeginEvent',
  PLAYER_TURN_BEGIN_EVENT = 'PlayerTurnBeginEvent',
  PLAYER_DRAWS_CARD_EVENT = 'PlayerDrawsCardEvent',
  PLAYER_STEALS_CARD_EVENT = 'PlayerStealsCardEvent',
  PLAYER_PLAY_PHASE_BEGIN_EVENT = 'PlayerPlayPhaseBeginEvent',
  PLAYER_PLAYS_CARD_EVENT = 'PlayerPlaysCardEvent',
  PLAYER_SHOT_AT_EVENT = 'PlayerShotAtEvent',
  PLAYER_NEGATES_SHOT_EVENT = 'PlayerNegatesShotEvent',
}

export enum SourceType {
  DECK = 'Deck',
  DISCARD = 'Discard',
}

type PlayerId = string;

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
    super(EventName.GAME_START_EVENT, null);
  }
}

export class PlayerJoinedEvent extends GameEvent {
  constructor() {
    super(EventName.PLAYER_JOINED_EVENT, null);
  }
}

export interface PlayerTurnBeginData {
  player: PlayerId,
}

export class PlayerTurnBeginEvent extends GameEvent {
  constructor(data: PlayerDrawPhaseBeginData) {
    super(EventName.PLAYER_TURN_BEGIN_EVENT, data);
  }
}

export interface PlayerDrawPhaseBeginData {
  player: PlayerId,
}

export class PlayerDrawPhaseBeginEvent extends GameEvent {
  constructor(data: PlayerDrawPhaseBeginData) {
    super(EventName.PLAYER_DRAW_PHASE_BEGIN_EVENT, data);
  }
}

export interface PlayerDrawsCardData {
  player: PlayerId,
  source: SourceType,
  quantity: number,
}

export class PlayerDrawsCardEvent extends GameEvent {
  constructor(data: PlayerDrawsCardData) {
    super(EventName.PLAYER_DRAWS_CARD_EVENT, data);
  }
}

export interface PlayerStealsCardData {
  sourcePlayer: PlayerId,
  targetPlayer: PlayerId,
  quantity: number,
}

export class PlayerStealsCardEvent extends GameEvent {
  constructor(data: PlayerDrawsCardData) {
    super(EventName.PLAYER_STEALS_CARD_EVENT, data);
  }
}

export interface PlayerPlayPhaseBeginData {
  player: PlayerId,
}

export class PlayerPlayPhaseBeginEvent extends GameEvent {
  constructor(data: PlayerPlayPhaseBeginData) {
    super(EventName.PLAYER_PLAY_PHASE_BEGIN_EVENT, data);
  }
}

export interface PlayerPlaysCardData {
  player: PlayerId,
  card: GameCard,
}

export class PlayerPlaysCardEvent extends GameEvent {
  constructor(data: PlayerPlaysCardData) {
    super(EventName.PLAYER_PLAYS_CARD_EVENT, data);
  }
}

export interface PlayerShotAtData {
  sourcePlayer: PlayerId,
  targetPlayer: PlayerId,
}

export class PlayerShotAtEvent extends GameEvent {
  constructor(data: PlayerShotAtData) {
    super(EventName.PLAYER_SHOT_AT_EVENT, data);
  }
}

export interface PlayerNegatesShotData {
  shotEvent: PlayerShotAtEvent,
}

export class PlayerNegatesShotEvent extends GameEvent {
  constructor(data: PlayerNegatesShotData) {
    super(EventName.PLAYER_NEGATES_SHOT_EVENT, data);
  }
}