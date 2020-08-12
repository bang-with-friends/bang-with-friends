import { CardType, GameCard } from './Cards';
import { Player } from './Player';
export declare enum EventName {
    GAME_START = "GAME_START",
    SHUFFLE_CARDS = "SHUFFLE_CARDS",
    START_TURN = "START_TURN",
    END_TURN = "END_TURN",
    PLAY_CARD = "PLAY_CARD",
    DISCARD_CARD = "DISCARD_CARD",
    PICK_CARD = "PICK_CARD",
    PLAYER_UPDATE = "PLAYER_UPDATE"
}
export declare enum SourceKind {
    DECK = "DECK",
    DISCARD = "DISCARD",
    PLAYER_HAND = "PLAYER_HAND",
    PLAYER_BOARD = "PLAYER_BOARD",
    GENERAL_STORE = "GENERAL_STORE"
}
export declare abstract class GameEvent {
    name: EventName;
    data: any;
    canceled: boolean;
    constructor(name: EventName, data: any);
    stopPropagation(): void;
}
export declare class GameStartEvent extends GameEvent {
    constructor();
}
export declare class ShuffleCardsEvent extends GameEvent {
    constructor();
}
export interface StartTurnData {
    prevPlayer: string;
    nextPlayer: string;
}
export declare class StartTurnEvent extends GameEvent {
    constructor(data: StartTurnData);
}
export interface EndTurnData {
    player: string;
}
export declare class EndTurnEvent extends GameEvent {
    constructor(data: EndTurnData);
}
export interface PlayCardData {
    sourcePlayer: string;
    targetPlayer?: string;
    card: GameCard;
}
export declare class PlayCardEvent extends GameEvent {
    constructor(data: PlayCardData);
}
export interface DiscardCardData {
    sourcePlayer: string;
    card: GameCard;
}
export declare class DiscardCardEvent extends GameEvent {
    constructor(data: DiscardCardData);
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
export declare class PickCardEvent extends GameEvent {
    constructor(data: PickCardData);
}
export interface PlayerUpdateData {
    player: string;
    field: keyof Player;
    newValue: any;
}
export declare class PlayerUpdateEvent extends GameEvent {
    constructor(data: PlayerUpdateData);
}
//# sourceMappingURL=Events.d.ts.map