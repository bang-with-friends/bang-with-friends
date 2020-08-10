"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.GameState = void 0;
const Cards_1 = require("./Cards");
var GameState;
(function (GameState) {
    GameState["WAITING"] = "WAITING";
    GameState["PLAYING"] = "PLAYING";
    GameState["COMPLETED"] = "COMPLETED";
})(GameState = exports.GameState || (exports.GameState = {}));
class Game {
    constructor(id) {
        this.startGame = () => {
            this.state = GameState.PLAYING;
        };
        this.id = id;
        this.deck = Cards_1.shuffleDeck(Cards_1.makeDeck());
        this.discard = [];
        this.turn = '';
        this.state = GameState.WAITING;
        this.players = new Map();
        this.playerOrder = [];
        this.activePlayers = [];
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map