"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.Character = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SHERIFF"] = "SHERIFF";
    Role["VICE"] = "VICE";
    Role["RENEGADE"] = "RENEGADE";
    Role["OUTLAW"] = "OUTLAW";
})(Role = exports.Role || (exports.Role = {}));
var Character;
(function (Character) {
    Character["BART_CASSIDY"] = "BART_CASSIDY";
    Character["BLACK_JACK"] = "BLACK_JACK";
    Character["CALAMITY_JANET"] = "CALAMITY_JANET";
    Character["EL_GRINGO"] = "EL_GRINGO";
    Character["JESSE_JONES"] = "JESSE_JONES";
    Character["JOURDONNAIS"] = "JOURDONNAIS";
    Character["KIT_CARLSON"] = "KIT_CARLSON";
    Character["LUCKY_DUKE"] = "LUCKY_DUKE";
    Character["PAUL_REGRET"] = "PAUL_REGRET";
    Character["PEDRO_RAMIREZ"] = "PEDRO_RAMIREZ";
    Character["ROSE_DOOLAN"] = "ROSE_DOOLAN";
    Character["SID_KETCHUM"] = "SID_KETCHUM";
    Character["SLAB_THE_KILLER"] = "SLAB_THE_KILLER";
    Character["SUZY_LAFAYETTE"] = "SUZY_LAFAYETTE";
    Character["VULTURE_SAM"] = "VULTURE_SAM";
    Character["WILLY_THE_KID"] = "WILLY_THE_KID";
})(Character = exports.Character || (exports.Character = {}));
class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.maxHealth = -1;
        this.currentHealth = -1;
        this.cards = { hand: [], board: [] };
        this.alive = true;
        this.range = 1;
        this.rangeMod = 0;
        this.distanceMod = 0;
        this.hasBanged = false;
        this.barrel = false;
        this.mustang = false;
        this.scope = false;
        this.volcanic = false;
        this.jail = false;
        this.dynamite = false;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map