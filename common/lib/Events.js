"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerUpdateEvent = exports.PickCardEvent = exports.DiscardCardEvent = exports.PlayCardEvent = exports.EndTurnEvent = exports.StartTurnEvent = exports.ShuffleCardsEvent = exports.GameStartEvent = exports.GameEvent = exports.SourceKind = exports.EventName = void 0;
var EventName;
(function (EventName) {
    EventName["GAME_START"] = "GAME_START";
    EventName["SHUFFLE_CARDS"] = "SHUFFLE_CARDS";
    EventName["START_TURN"] = "START_TURN";
    EventName["END_TURN"] = "END_TURN";
    EventName["PLAY_CARD"] = "PLAY_CARD";
    EventName["DISCARD_CARD"] = "DISCARD_CARD";
    EventName["PICK_CARD"] = "PICK_CARD";
    EventName["PLAYER_UPDATE"] = "PLAYER_UPDATE";
})(EventName = exports.EventName || (exports.EventName = {}));
var SourceKind;
(function (SourceKind) {
    SourceKind["DECK"] = "DECK";
    SourceKind["DISCARD"] = "DISCARD";
    SourceKind["PLAYER_HAND"] = "PLAYER_HAND";
    SourceKind["PLAYER_BOARD"] = "PLAYER_BOARD";
    SourceKind["GENERAL_STORE"] = "GENERAL_STORE";
})(SourceKind = exports.SourceKind || (exports.SourceKind = {}));
class GameEvent {
    constructor(name, data) {
        this.name = name;
        this.data = data;
        this.canceled = false;
    }
    stopPropagation() {
        this.canceled = true;
    }
}
exports.GameEvent = GameEvent;
class GameStartEvent extends GameEvent {
    constructor() {
        super(EventName.GAME_START, null);
    }
}
exports.GameStartEvent = GameStartEvent;
class ShuffleCardsEvent extends GameEvent {
    constructor() {
        super(EventName.SHUFFLE_CARDS, null);
    }
}
exports.ShuffleCardsEvent = ShuffleCardsEvent;
class StartTurnEvent extends GameEvent {
    constructor(data) {
        super(EventName.START_TURN, data);
    }
}
exports.StartTurnEvent = StartTurnEvent;
class EndTurnEvent extends GameEvent {
    constructor(data) {
        super(EventName.END_TURN, data);
    }
}
exports.EndTurnEvent = EndTurnEvent;
class PlayCardEvent extends GameEvent {
    constructor(data) {
        super(EventName.PLAY_CARD, data);
    }
}
exports.PlayCardEvent = PlayCardEvent;
class DiscardCardEvent extends GameEvent {
    constructor(data) {
        super(EventName.DISCARD_CARD, data);
    }
}
exports.DiscardCardEvent = DiscardCardEvent;
class PickCardEvent extends GameEvent {
    constructor(data) {
        super(EventName.PICK_CARD, data);
    }
}
exports.PickCardEvent = PickCardEvent;
class PlayerUpdateEvent extends GameEvent {
    constructor(data) {
        super(EventName.PLAYER_UPDATE, data);
    }
}
exports.PlayerUpdateEvent = PlayerUpdateEvent;
//# sourceMappingURL=Events.js.map