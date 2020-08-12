export enum CardSuit {
  HEARTS = 'HEARTS',
  SPADES = 'SPADES',
  CLUBS = 'CLUBS',
  DIAMONDS = 'DIAMONDS'
}

export enum CardKind {
  STATUS = 'STATUS',
  ACTION = 'ACTION',
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
  playable: boolean;

  constructor(suit: CardSuit, number: number, type: CardType, playable: boolean = false) {
    this.suit = suit;
    this.number = number;
    this.type = type;
    this.playable = playable;
  }

  copy() {
    return new GameCard(this.suit, this.number, this.type, this.playable);
  }
}

/* eslint-disable no-multi-spaces */
const scope1        = () => new GameCard(CardSuit.SPADES,    1, CardType.SCOPE);
const barrel1       = () => new GameCard(CardSuit.SPADES,   13, CardType.BARREL);
const barrel2       = () => new GameCard(CardSuit.SPADES,   12, CardType.BARREL);
const dynamite1     = () => new GameCard(CardSuit.HEARTS,    2, CardType.DYNAMITE);
const jail1         = () => new GameCard(CardSuit.HEARTS,    4, CardType.JAIL);
const jail2         = () => new GameCard(CardSuit.SPADES,   11, CardType.JAIL);
const jail3         = () => new GameCard(CardSuit.SPADES,   12, CardType.JAIL);
const mustang1      = () => new GameCard(CardSuit.HEARTS,    8, CardType.MUSTANG);
const mustang2      = () => new GameCard(CardSuit.HEARTS,    9, CardType.MUSTANG);
const schofield1    = () => new GameCard(CardSuit.CLUBS,    11, CardType.SCHOFIELD);
const schofield2    = () => new GameCard(CardSuit.CLUBS,    12, CardType.SCHOFIELD);
const schofield3    = () => new GameCard(CardSuit.SPADES,   13, CardType.SCHOFIELD);
const remington1    = () => new GameCard(CardSuit.CLUBS,    13, CardType.REMINGTON);
const revCarabine1  = () => new GameCard(CardSuit.CLUBS,     1, CardType.REV_CARABINE);
const winchester1   = () => new GameCard(CardSuit.SPADES,    8, CardType.WINCHESTER);
const volcanic1     = () => new GameCard(CardSuit.SPADES,   10, CardType.VOLCANIC);
const volcanic2     = () => new GameCard(CardSuit.CLUBS,    10, CardType.VOLCANIC);
const catBalou1     = () => new GameCard(CardSuit.HEARTS,   13, CardType.CAT_BALOU);
const catBalou2     = () => new GameCard(CardSuit.DIAMONDS,  9, CardType.CAT_BALOU);
const catBalou3     = () => new GameCard(CardSuit.DIAMONDS, 10, CardType.CAT_BALOU);
const catBalou4     = () => new GameCard(CardSuit.DIAMONDS, 11, CardType.CAT_BALOU);
const panic1        = () => new GameCard(CardSuit.DIAMONDS,  8, CardType.PANIC);
const panic2        = () => new GameCard(CardSuit.HEARTS,   11, CardType.PANIC);
const panic3        = () => new GameCard(CardSuit.HEARTS,   12, CardType.PANIC);
const panic4        = () => new GameCard(CardSuit.HEARTS,    1, CardType.PANIC);
const indians1      = () => new GameCard(CardSuit.DIAMONDS,  1, CardType.INDIANS);
const indians2      = () => new GameCard(CardSuit.DIAMONDS, 13, CardType.INDIANS);
const duel1         = () => new GameCard(CardSuit.DIAMONDS, 12, CardType.DUEL);
const duel2         = () => new GameCard(CardSuit.DIAMONDS, 11, CardType.DUEL);
const duel3         = () => new GameCard(CardSuit.CLUBS,     8, CardType.DUEL);
const generalStore1 = () => new GameCard(CardSuit.CLUBS,     9, CardType.GENERAL_STORE);
const generalStore2 = () => new GameCard(CardSuit.SPADES,   12, CardType.GENERAL_STORE);
const beer1         = () => new GameCard(CardSuit.HEARTS,    6, CardType.BEER);
const beer2         = () => new GameCard(CardSuit.HEARTS,    7, CardType.BEER);
const beer3         = () => new GameCard(CardSuit.HEARTS,    8, CardType.BEER);
const beer4         = () => new GameCard(CardSuit.HEARTS,    9, CardType.BEER);
const beer5         = () => new GameCard(CardSuit.HEARTS,   10, CardType.BEER);
const beer6         = () => new GameCard(CardSuit.HEARTS,   11, CardType.BEER);
const saloon1       = () => new GameCard(CardSuit.HEARTS,    5, CardType.SALOON);
const stagecoach1   = () => new GameCard(CardSuit.SPADES,    9, CardType.STAGECOACH);
const stagecoach2   = () => new GameCard(CardSuit.SPADES,    9, CardType.STAGECOACH);
const wellsFargo1   = () => new GameCard(CardSuit.HEARTS,    3, CardType.WELLS_FARGO);
const gatling       = () => new GameCard(CardSuit.HEARTS,   10, CardType.GATLING);
const bang1         = () => new GameCard(CardSuit.HEARTS,    1, CardType.BANG);
const bang2         = () => new GameCard(CardSuit.HEARTS,   13, CardType.BANG);
const bang3         = () => new GameCard(CardSuit.HEARTS,   12, CardType.BANG);
const bang4         = () => new GameCard(CardSuit.DIAMONDS,  2, CardType.BANG);
const bang5         = () => new GameCard(CardSuit.DIAMONDS,  3, CardType.BANG);
const bang6         = () => new GameCard(CardSuit.DIAMONDS,  4, CardType.BANG);
const bang7         = () => new GameCard(CardSuit.DIAMONDS,  5, CardType.BANG);
const bang8         = () => new GameCard(CardSuit.DIAMONDS,  6, CardType.BANG);
const bang9         = () => new GameCard(CardSuit.DIAMONDS,  7, CardType.BANG);
const bang10        = () => new GameCard(CardSuit.DIAMONDS,  8, CardType.BANG);
const bang11        = () => new GameCard(CardSuit.DIAMONDS,  9, CardType.BANG);
const bang12        = () => new GameCard(CardSuit.DIAMONDS, 10, CardType.BANG);
const bang13        = () => new GameCard(CardSuit.DIAMONDS, 11, CardType.BANG);
const bang14        = () => new GameCard(CardSuit.DIAMONDS, 12, CardType.BANG);
const bang15        = () => new GameCard(CardSuit.DIAMONDS, 13, CardType.BANG);
const bang16        = () => new GameCard(CardSuit.DIAMONDS,  1, CardType.BANG);
const bang17        = () => new GameCard(CardSuit.CLUBS,     2, CardType.BANG);
const bang18        = () => new GameCard(CardSuit.CLUBS,     3, CardType.BANG);
const bang19        = () => new GameCard(CardSuit.CLUBS,     4, CardType.BANG);
const bang20        = () => new GameCard(CardSuit.CLUBS,     5, CardType.BANG);
const bang21        = () => new GameCard(CardSuit.CLUBS,     6, CardType.BANG);
const bang22        = () => new GameCard(CardSuit.CLUBS,     7, CardType.BANG);
const bang23        = () => new GameCard(CardSuit.CLUBS,     8, CardType.BANG);
const bang24        = () => new GameCard(CardSuit.CLUBS,     9, CardType.BANG);
const bang25        = () => new GameCard(CardSuit.SPADES,    1, CardType.BANG);
const missed1       = () => new GameCard(CardSuit.SPADES,    2, CardType.MISSED);
const missed2       = () => new GameCard(CardSuit.SPADES,    4, CardType.MISSED);
const missed3       = () => new GameCard(CardSuit.SPADES,    5, CardType.MISSED);
const missed4       = () => new GameCard(CardSuit.SPADES,    6, CardType.MISSED);
const missed5       = () => new GameCard(CardSuit.SPADES,    7, CardType.MISSED);
const missed6       = () => new GameCard(CardSuit.SPADES,    8, CardType.MISSED);
const missed7       = () => new GameCard(CardSuit.CLUBS,     3, CardType.MISSED);
const missed8       = () => new GameCard(CardSuit.CLUBS,    10, CardType.MISSED);
const missed9       = () => new GameCard(CardSuit.CLUBS,    11, CardType.MISSED);
const missed10      = () => new GameCard(CardSuit.CLUBS,    12, CardType.MISSED);
const missed11      = () => new GameCard(CardSuit.CLUBS,    13, CardType.MISSED);
const missed12      = () => new GameCard(CardSuit.CLUBS,     1, CardType.MISSED);
/* eslint-enable no-multi-spaces */

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

const fyShuffle = (deck: GameCard[]) => {
  const cards: GameCard[] = [];

  // Shuffle using the Fisher-Yates algorithm.
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const temp = cards[i] || deck[i].copy();
    cards[i] = cards[j] || deck[j].copy();
    cards[j] = temp;
  }

  return cards;
};

export const shuffleDeck = (deck: GameCard[]) => fyShuffle(fyShuffle(fyShuffle(deck)));
