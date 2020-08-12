import { GameCard } from './Cards';
export declare enum Role {
    SHERIFF = "SHERIFF",
    VICE = "VICE",
    RENEGADE = "RENEGADE",
    OUTLAW = "OUTLAW"
}
export declare enum Character {
    BART_CASSIDY = "BART_CASSIDY",
    BLACK_JACK = "BLACK_JACK",
    CALAMITY_JANET = "CALAMITY_JANET",
    EL_GRINGO = "EL_GRINGO",
    JESSE_JONES = "JESSE_JONES",
    JOURDONNAIS = "JOURDONNAIS",
    KIT_CARLSON = "KIT_CARLSON",
    LUCKY_DUKE = "LUCKY_DUKE",
    PAUL_REGRET = "PAUL_REGRET",
    PEDRO_RAMIREZ = "PEDRO_RAMIREZ",
    ROSE_DOOLAN = "ROSE_DOOLAN",
    SID_KETCHUM = "SID_KETCHUM",
    SLAB_THE_KILLER = "SLAB_THE_KILLER",
    SUZY_LAFAYETTE = "SUZY_LAFAYETTE",
    VULTURE_SAM = "VULTURE_SAM",
    WILLY_THE_KID = "WILLY_THE_KID"
}
export declare class Player {
    id: string;
    name: string;
    role?: Role;
    character?: Character;
    maxHealth: number;
    currentHealth: number;
    alive: boolean;
    hasBanged: boolean;
    range: number;
    rangeMod: number;
    distanceMod: number;
    barrel: boolean;
    dynamite: boolean;
    jail: boolean;
    mustang: boolean;
    scope: boolean;
    volcanic: boolean;
    cards: {
        hand: GameCard[];
        board: GameCard[];
    };
    constructor(id: string, name: string);
}
//# sourceMappingURL=Player.d.ts.map