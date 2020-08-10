export declare enum CardSuit {
    HEARTS = "HEARTS",
    SPADES = "SPADES",
    CLUBS = "CLUBS",
    DIAMONDS = "DIAMONDS"
}
export declare enum CardKind {
    STATUS = "STATUS",
    ACTION = "ACTION"
}
export declare enum CardType {
    BANG = "BANG",
    MISSED = "MISSED",
    BEER = "BEER",
    CAT_BALOU = "CAT_BALOU",
    PANIC = "PANIC",
    DUEL = "DUEL",
    INDIANS = "INDIANS",
    GENERAL_STORE = "GENERAL_STORE",
    STAGECOACH = "STAGECOACH",
    WELLS_FARGO = "WELLS_FARGO",
    GATLING = "GATLING",
    SALOON = "SALOON",
    JAIL = "JAIL",
    SCHOFIELD = "SCHOFIELD",
    MUSTANG = "MUSTANG",
    BARREL = "BARREL",
    VOLCANIC = "VOLCANIC",
    SCOPE = "SCOPE",
    DYNAMITE = "DYNAMITE",
    REMINGTON = "REMINGTON",
    REV_CARABINE = "REV_CARABINE",
    WINCHESTER = "WINCHESTER"
}
export declare class GameCard {
    suit: CardSuit;
    number: number;
    type: CardType;
    playable: boolean;
    constructor(suit: CardSuit, number: number, type: CardType, playable?: boolean);
    copy(): GameCard;
}
export declare const makeDeck: () => GameCard[];
export declare const shuffleDeck: (deck: GameCard[]) => GameCard[];
//# sourceMappingURL=Cards.d.ts.map