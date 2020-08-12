"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Events = __importStar(require("../Events"));
/* eslint-disable no-multi-spaces */
const eventsToTest = [
    [Events.EventName.GAME_START, new Events.GameStartEvent()],
    [Events.EventName.SHUFFLE_CARDS, new Events.ShuffleCardsEvent()],
    [Events.EventName.START_TURN, new Events.StartTurnEvent({})],
    [Events.EventName.END_TURN, new Events.EndTurnEvent({})],
    [Events.EventName.PLAY_CARD, new Events.PlayCardEvent({})],
    [Events.EventName.DISCARD_CARD, new Events.DiscardCardEvent({})],
    [Events.EventName.PICK_CARD, new Events.PickCardEvent({})],
    [Events.EventName.PLAYER_UPDATE, new Events.PlayerUpdateEvent({})],
];
/* eslint-enable no-multi-spaces */
// Make sure we're testing all the events.
expect(eventsToTest.length).toBe(Object.keys(Events.EventName).length);
describe('GameEvent', () => {
    it('updates canceled when stopPropagation is called', () => {
        const event = new Events.GameStartEvent();
        expect(event.canceled).toBeFalsy();
        event.stopPropagation();
        expect(event.canceled).toBeTruthy();
        event.stopPropagation();
        expect(event.canceled).toBeTruthy();
    });
    it.each(eventsToTest)('initializes all events', (name, event) => {
        expect(event.name).toBe(name);
    });
});
//# sourceMappingURL=Events.test.js.map