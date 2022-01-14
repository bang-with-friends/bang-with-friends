export enum CardSuit {
  HEARTS = 'HEARTS',
  SPADES = 'SPADES',
  CLUBS = 'CLUBS',
  DIAMONDS = 'DIAMONDS',
}

export enum CardKind {
  STATUS = 'STATUS',
  ACTION = 'ACTION',
  OTHER = 'OTHER',
}

export enum CardType {
  BANG = 'BANG',
  MISSED = 'MISSED',
  BEER = 'BEER',
  CAT_BALOU = 'CAT_BALOU',
  PANIC = 'PANIC',
  DUEL = 'DUEL',
  INDIANS = 'INDIANS',
  GENERAL_STORE = 'GENERAL_STORE',
  STAGECOACH = 'STAGECOACH',
  WELLS_FARGO = 'WELLS_FARGO',
  GATLING = 'GATLING',
  SALOON = 'SALOON',
  JAIL = 'JAIL',
  SCHOFIELD = 'SCHOFIELD',
  MUSTANG = 'MUSTANG',
  BARREL = 'BARREL',
  VOLCANIC = 'VOLCANIC',
  SCOPE = 'SCOPE',
  DYNAMITE = 'DYNAMITE',
  REMINGTON = 'REMINGTON',
  REV_CARABINE = 'REV_CARABINE',
  WINCHESTER = 'WINCHESTER',
}

export class GameCard {
  suit: CardSuit;
  number: number;
  type: CardType;
  kind: CardKind;
  playable: boolean;

  constructor(suit: CardSuit, number: number, type: CardType, kind: CardKind,
    playable: boolean = false) {
    this.suit = suit;
    this.number = number;
    this.type = type;
    this.playable = playable;
    this.kind = kind;
  }

  copy() {
    return new GameCard(this.suit, this.number, this.type, this.kind, this.playable);
  }
}

/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
const scope1        = () => new GameCard(CardSuit.SPADES,    1, CardType.SCOPE, CardKind.STATUS);
const barrel1       = () => new GameCard(CardSuit.SPADES,   13, CardType.BARREL, CardKind.STATUS);
const barrel2       = () => new GameCard(CardSuit.SPADES,   12, CardType.BARREL, CardKind.STATUS);
const dynamite1     = () => new GameCard(CardSuit.HEARTS,    2, CardType.DYNAMITE, CardKind.STATUS);
const jail1         = () => new GameCard(CardSuit.HEARTS,    4, CardType.JAIL, CardKind.OTHER);
const jail2         = () => new GameCard(CardSuit.SPADES,   11, CardType.JAIL, CardKind.OTHER);
const jail3         = () => new GameCard(CardSuit.SPADES,   12, CardType.JAIL, CardKind.OTHER);
const mustang1      = () => new GameCard(CardSuit.HEARTS,    8, CardType.MUSTANG, CardKind.STATUS);
const mustang2      = () => new GameCard(CardSuit.HEARTS,    9, CardType.MUSTANG, CardKind.STATUS);
const schofield1    = () => new GameCard(CardSuit.CLUBS,    11, CardType.SCHOFIELD, CardKind.STATUS);
const schofield2    = () => new GameCard(CardSuit.CLUBS,    12, CardType.SCHOFIELD, CardKind.STATUS);
const schofield3    = () => new GameCard(CardSuit.SPADES,   13, CardType.SCHOFIELD, CardKind.STATUS);
const remington1    = () => new GameCard(CardSuit.CLUBS,    13, CardType.REMINGTON, CardKind.STATUS);
const revCarabine1  = () => new GameCard(CardSuit.CLUBS,     1, CardType.REV_CARABINE, CardKind.STATUS);
const winchester1   = () => new GameCard(CardSuit.SPADES,    8, CardType.WINCHESTER, CardKind.STATUS);
const volcanic1     = () => new GameCard(CardSuit.SPADES,   10, CardType.VOLCANIC, CardKind.STATUS);
const volcanic2     = () => new GameCard(CardSuit.CLUBS,    10, CardType.VOLCANIC, CardKind.STATUS);
const catBalou1     = () => new GameCard(CardSuit.HEARTS,   13, CardType.CAT_BALOU, CardKind.ACTION);
const catBalou2     = () => new GameCard(CardSuit.DIAMONDS,  9, CardType.CAT_BALOU, CardKind.ACTION);
const catBalou3     = () => new GameCard(CardSuit.DIAMONDS, 10, CardType.CAT_BALOU, CardKind.ACTION);
const catBalou4     = () => new GameCard(CardSuit.DIAMONDS, 11, CardType.CAT_BALOU, CardKind.ACTION);
const panic1        = () => new GameCard(CardSuit.DIAMONDS,  8, CardType.PANIC, CardKind.ACTION);
const panic2        = () => new GameCard(CardSuit.HEARTS,   11, CardType.PANIC, CardKind.ACTION);
const panic3        = () => new GameCard(CardSuit.HEARTS,   12, CardType.PANIC, CardKind.ACTION);
const panic4        = () => new GameCard(CardSuit.HEARTS,    1, CardType.PANIC, CardKind.ACTION);
const indians1      = () => new GameCard(CardSuit.DIAMONDS,  1, CardType.INDIANS, CardKind.ACTION);
const indians2      = () => new GameCard(CardSuit.DIAMONDS, 13, CardType.INDIANS, CardKind.ACTION);
const duel1         = () => new GameCard(CardSuit.DIAMONDS, 12, CardType.DUEL, CardKind.ACTION);
const duel2         = () => new GameCard(CardSuit.DIAMONDS, 11, CardType.DUEL, CardKind.ACTION);
const duel3         = () => new GameCard(CardSuit.CLUBS,     8, CardType.DUEL, CardKind.ACTION);
const generalStore1 = () => new GameCard(CardSuit.CLUBS,     9, CardType.GENERAL_STORE, CardKind.ACTION);
const generalStore2 = () => new GameCard(CardSuit.SPADES,   12, CardType.GENERAL_STORE, CardKind.ACTION);
const beer1         = () => new GameCard(CardSuit.HEARTS,    6, CardType.BEER, CardKind.ACTION);
const beer2         = () => new GameCard(CardSuit.HEARTS,    7, CardType.BEER, CardKind.ACTION);
const beer3         = () => new GameCard(CardSuit.HEARTS,    8, CardType.BEER, CardKind.ACTION);
const beer4         = () => new GameCard(CardSuit.HEARTS,    9, CardType.BEER, CardKind.ACTION);
const beer5         = () => new GameCard(CardSuit.HEARTS,   10, CardType.BEER, CardKind.ACTION);
const beer6         = () => new GameCard(CardSuit.HEARTS,   11, CardType.BEER, CardKind.ACTION);
const saloon1       = () => new GameCard(CardSuit.HEARTS,    5, CardType.SALOON, CardKind.ACTION);
const stagecoach1   = () => new GameCard(CardSuit.SPADES,    9, CardType.STAGECOACH, CardKind.ACTION);
const stagecoach2   = () => new GameCard(CardSuit.SPADES,    9, CardType.STAGECOACH, CardKind.ACTION);
const wellsFargo1   = () => new GameCard(CardSuit.HEARTS,    3, CardType.WELLS_FARGO, CardKind.ACTION);
const gatling       = () => new GameCard(CardSuit.HEARTS,   10, CardType.GATLING, CardKind.ACTION);
const bang1         = () => new GameCard(CardSuit.HEARTS,    1, CardType.BANG, CardKind.ACTION);
const bang2         = () => new GameCard(CardSuit.HEARTS,   13, CardType.BANG, CardKind.ACTION);
const bang3         = () => new GameCard(CardSuit.HEARTS,   12, CardType.BANG, CardKind.ACTION);
const bang4         = () => new GameCard(CardSuit.DIAMONDS,  2, CardType.BANG, CardKind.ACTION);
const bang5         = () => new GameCard(CardSuit.DIAMONDS,  3, CardType.BANG, CardKind.ACTION);
const bang6         = () => new GameCard(CardSuit.DIAMONDS,  4, CardType.BANG, CardKind.ACTION);
const bang7         = () => new GameCard(CardSuit.DIAMONDS,  5, CardType.BANG, CardKind.ACTION);
const bang8         = () => new GameCard(CardSuit.DIAMONDS,  6, CardType.BANG, CardKind.ACTION);
const bang9         = () => new GameCard(CardSuit.DIAMONDS,  7, CardType.BANG, CardKind.ACTION);
const bang10        = () => new GameCard(CardSuit.DIAMONDS,  8, CardType.BANG, CardKind.ACTION);
const bang11        = () => new GameCard(CardSuit.DIAMONDS,  9, CardType.BANG, CardKind.ACTION);
const bang12        = () => new GameCard(CardSuit.DIAMONDS, 10, CardType.BANG, CardKind.ACTION);
const bang13        = () => new GameCard(CardSuit.DIAMONDS, 11, CardType.BANG, CardKind.ACTION);
const bang14        = () => new GameCard(CardSuit.DIAMONDS, 12, CardType.BANG, CardKind.ACTION);
const bang15        = () => new GameCard(CardSuit.DIAMONDS, 13, CardType.BANG, CardKind.ACTION);
const bang16        = () => new GameCard(CardSuit.DIAMONDS,  1, CardType.BANG, CardKind.ACTION);
const bang17        = () => new GameCard(CardSuit.CLUBS,     2, CardType.BANG, CardKind.ACTION);
const bang18        = () => new GameCard(CardSuit.CLUBS,     3, CardType.BANG, CardKind.ACTION);
const bang19        = () => new GameCard(CardSuit.CLUBS,     4, CardType.BANG, CardKind.ACTION);
const bang20        = () => new GameCard(CardSuit.CLUBS,     5, CardType.BANG, CardKind.ACTION);
const bang21        = () => new GameCard(CardSuit.CLUBS,     6, CardType.BANG, CardKind.ACTION);
const bang22        = () => new GameCard(CardSuit.CLUBS,     7, CardType.BANG, CardKind.ACTION);
const bang23        = () => new GameCard(CardSuit.CLUBS,     8, CardType.BANG, CardKind.ACTION);
const bang24        = () => new GameCard(CardSuit.CLUBS,     9, CardType.BANG, CardKind.ACTION);
const bang25        = () => new GameCard(CardSuit.SPADES,    1, CardType.BANG, CardKind.ACTION);
const missed1       = () => new GameCard(CardSuit.SPADES,    2, CardType.MISSED, CardKind.ACTION);
const missed2       = () => new GameCard(CardSuit.SPADES,    4, CardType.MISSED, CardKind.ACTION);
const missed3       = () => new GameCard(CardSuit.SPADES,    5, CardType.MISSED, CardKind.ACTION);
const missed4       = () => new GameCard(CardSuit.SPADES,    6, CardType.MISSED, CardKind.ACTION);
const missed5       = () => new GameCard(CardSuit.SPADES,    7, CardType.MISSED, CardKind.ACTION);
const missed6       = () => new GameCard(CardSuit.SPADES,    8, CardType.MISSED, CardKind.ACTION);
const missed7       = () => new GameCard(CardSuit.CLUBS,     3, CardType.MISSED, CardKind.ACTION);
const missed8       = () => new GameCard(CardSuit.CLUBS,    10, CardType.MISSED, CardKind.ACTION);
const missed9       = () => new GameCard(CardSuit.CLUBS,    11, CardType.MISSED, CardKind.ACTION);
const missed10      = () => new GameCard(CardSuit.CLUBS,    12, CardType.MISSED, CardKind.ACTION);
const missed11      = () => new GameCard(CardSuit.CLUBS,    13, CardType.MISSED, CardKind.ACTION);
const missed12      = () => new GameCard(CardSuit.CLUBS,     1, CardType.MISSED, CardKind.ACTION);
/* eslint-enable no-multi-spaces */
/* eslint-enable max-len */

export const makeDeck = () => {
  const allCards: GameCard[] = [
    scope1(), barrel1(), barrel2(), dynamite1(), jail1(), jail2(), jail3(),
    mustang1(), mustang2(), schofield1(), schofield2(), schofield3(),
    remington1(), revCarabine1(), winchester1(), volcanic1(), volcanic2(),
    catBalou1(), catBalou2(), catBalou3(), catBalou4(), panic1(), panic2(),
    panic3(), panic4(), indians1(), indians2(), duel1(), duel2(), duel3(),
    generalStore1(), generalStore2(), beer1(), beer2(), beer3(), beer4(),
    beer5(), beer6(), saloon1(), stagecoach1(), stagecoach2(), wellsFargo1(),
    gatling(), bang1(), bang2(), bang3(), bang4(), bang5(), bang6(), bang7(),
    bang8(), bang9(), bang10(), bang11(), bang12(), bang13(), bang14(),
    bang15(), bang16(), bang17(), bang18(), bang19(), bang20(), bang21(),
    bang22(), bang23(), bang24(), bang25(), missed1(), missed2(), missed3(),
    missed4(), missed5(), missed6(), missed7(), missed8(), missed9(),
    missed10(), missed11(), missed12(),
  ];

  return allCards;
};

export const fyShuffle = (array: any[]) => {
  const cards: any[] = [];

  // Shuffle using the Fisher-Yates algorithm.
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const temp = cards[i] || array[i];
    cards[i] = cards[j] || array[j];
    cards[j] = temp;
  }

  return cards;
};

export const shuffleDeck = (deck: GameCard[]) => fyShuffle(fyShuffle(fyShuffle(deck)));
