"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Game");
describe('Game', () => {
    it('initializes', () => {
        const id = 'abcd';
        const game = new Game_1.Game(id);
        expect(game.id).toBe(id);
        expect(game.discard.length).toBe(0);
        expect(game.state).toBe(Game_1.GameState.WAITING);
        expect(game.players.size).toBe(0);
        expect(game.playerOrder.length).toBe(0);
        expect(game.activePlayers.length).toBe(0);
    });
    it('starts the game', () => {
        const id = 'abcd';
        const game = new Game_1.Game(id);
        expect(game.state).toBe(Game_1.GameState.WAITING);
        game.startGame();
        expect(game.state).toBe(Game_1.GameState.PLAYING);
    });
});
//# sourceMappingURL=Game.test.js.map