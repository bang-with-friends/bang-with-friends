"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("../Player");
describe('Player', () => {
    it('initializes', () => {
        const id = 'abcd';
        const name = 'jeff';
        const player = new Player_1.Player(id, name);
        expect(player.id).toBe(id);
        expect(player.name).toBe(name);
        expect(player.maxHealth).toBe(-1);
        expect(player.currentHealth).toBe(-1);
        expect(player.cards.hand.length).toBe(0);
        expect(player.cards.board.length).toBe(0);
        expect(player.alive).toBeTruthy();
        expect(player.range).toBe(1);
        expect(player.rangeMod).toBe(0);
        expect(player.distanceMod).toBe(0);
        expect(player.hasBanged).toBeFalsy();
        expect(player.barrel).toBeFalsy();
        expect(player.mustang).toBeFalsy();
        expect(player.scope).toBeFalsy();
        expect(player.volcanic).toBeFalsy();
        expect(player.jail).toBeFalsy();
        expect(player.dynamite).toBeFalsy();
        expect(player.role).toBeUndefined();
        expect(player.character).toBeUndefined();
    });
});
//# sourceMappingURL=Player.test.js.map