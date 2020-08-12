import { GameCard } from './Cards';
import { Player } from './Player';
export declare enum GameState {
    WAITING = "WAITING",
    PLAYING = "PLAYING",
    COMPLETED = "COMPLETED"
}
export declare class Game {
    id: string;
    deck: GameCard[];
    discard: GameCard[];
    turn: string;
    state: GameState;
    players: Map<string, Player>;
    playerOrder: string[];
    activePlayers: string[];
    startGame: () => void;
    constructor(id: string);
}
//# sourceMappingURL=Game.d.ts.map