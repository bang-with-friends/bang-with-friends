import  { GameEvent, PlayCardEvent } from './Events';

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

export interface CardStatus {
  view?: Number,
  reach?: Number,
  barrel?: Boolean,
  dynamite?: Boolean,
  jail?: Boolean,
  volcanic?: Boolean,
  gun?: Boolean
}

export abstract class GameCard {

  abstract suit: CardSuit;
  abstract number: Number;
  abstract playable: Boolean;

  static kind: CardKind;
  static title: String;
  static text: String;
  static status: CardStatus

  static action: () => GameEvent[];
  
}

export class Bang implements GameCard {
  
  static kind = CardKind.ACTION;
  static title = 'Bang!';
  static text = 'WIP';
  static status = {

  }  

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }

}

export class Missed implements GameCard {

  static kind = CardKind.ACTION;
  static title = 'Missed!';
  static status = {

  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }

}

export class Gatling implements GameCard {

  static kind = CardKind.ACTION;
  static title = 'Gatling';
  static status = {

  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class WellsFargo implements GameCard {

  static kind = CardKind.ACTION;
  static title = 'Wells Fargo';
  static status = {

  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Stagecoach implements GameCard {

  static kind = CardKind.ACTION;
  static title = 'Stagecoach';
  static status = {

  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Saloon implements GameCard {

  static kind = CardKind.ACTION;
  static title = 'Saloon';
  static status = {

  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Beer implements GameCard {

  static kind = CardKind.ACTION;
  static title = 'Beer';
  static status = {

  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class GeneralStore implements GameCard {

  static kind = CardKind.ACTION;
  static title = 'General Store';
  static status = {

  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Duel implements GameCard {

  static kind = CardKind.ACTION;
  static title = 'Duel';
  static status = {

  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Indians implements GameCard {

  static kind = CardKind.ACTION;
  static title = 'Indians!';
  static status = {

  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Panic implements GameCard {

  static kind = CardKind.ACTION;
  static title = 'Panic!';
  static status = {
    reach: 1
  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class CatBalou implements GameCard {

  static kind = CardKind.ACTION;
  static title = 'Cat Balou';
  static status = {

  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Volcanic implements GameCard {

  static kind = CardKind.STATUS;
  static title = 'Volcanic';
  static status = {
    volcanic: true,
    gun: true,
    reach: 1,
  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Winchester implements GameCard {

  static kind = CardKind.STATUS;
  static title = 'Winchester';
  static status = {
    gun: true,
    reach: 5,
  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class RevCarabine implements GameCard {

  static kind = CardKind.STATUS;
  static title = 'Rev. Carabine';
  static status = {
    gun: true,
    reach: 4,
  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Remington implements GameCard {

  static kind = CardKind.STATUS;
  static title = 'Remington';
  static status = {
    gun: true,
    reach: 3,
  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Schofield implements GameCard {

  static kind = CardKind.STATUS;
  static title = 'Schofield';
  static status = {
    gun: true,
    reach: 2,
  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Mustang implements GameCard {

  static kind = CardKind.STATUS;
  static title = 'Mustang';
  static status = {
    view: 1
  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Jail implements GameCard {

  static kind = CardKind.STATUS;
  static title = 'Jail';
  static status = {
    jail: true
  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Dynamite implements GameCard {

  static kind = CardKind.STATUS;
  static title = 'Dynamite';
  static status = {
    dynamite: true
  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Barrel implements GameCard {

  static kind = CardKind.STATUS;
  static title = 'Barrel';
  static status = {
    barrel: true
  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

export class Scope implements GameCard {

  static kind = CardKind.STATUS;
  static title = 'Scope';
  static status = {
     view: 1
  }

  static action: () => GameEvent[];

  suit: CardSuit;
  number: Number;
  playable: Boolean;

  constructor (suit: CardSuit, number: Number) {
    this.suit = suit;
    this.number = number;
    this.playable = false;
  }
}

const scope1 = () => new Scope (CardSuit.SPADES, 1);
const barrel1 = () => new Barrel (CardSuit.SPADES, 13);
const barrel2 = () => new Barrel (CardSuit.SPADES, 12);
const dynamite1 = () => new Dynamite (CardSuit.HEARTS, 2);
const jail1 = () => new Jail (CardSuit.HEARTS, 4);
const jail2 = () => new Jail (CardSuit.SPADES, 11);
const jail3 = () => new Jail (CardSuit.SPADES, 12);
const mustang1 = () => new Mustang (CardSuit.HEARTS, 8);
const mustang2 = () => new Mustang (CardSuit.HEARTS, 9);
const schofield1 = () => new Schofield (CardSuit.CLUBS, 11);
const schofield2 = () => new Schofield (CardSuit.CLUBS, 12);
const schofield3 = () => new Schofield (CardSuit.SPADES, 13);
const remington1 = () => new Remington (CardSuit.CLUBS, 13);
const revCarabine1 = () => new RevCarabine (CardSuit.CLUBS, 1);
const winchester1 = () => new Winchester (CardSuit.SPADES, 8);
const volcanic1 = () => new Volcanic (CardSuit.SPADES, 10);
const volcanic2 = () => new Volcanic (CardSuit.CLUBS, 10);
const catBalou1 = () => new CatBalou (CardSuit.HEARTS, 13);
const catBalou2 = () => new CatBalou (CardSuit.DIAMONDS, 9);
const catBalou3 = () => new CatBalou (CardSuit.DIAMONDS, 10);
const catBalou4 = () => new CatBalou (CardSuit.DIAMONDS, 11);
const panic1 = () => new Panic (CardSuit.DIAMONDS, 8);
const panic2 = () => new Panic (CardSuit.HEARTS, 11);
const panic3 = () => new Panic (CardSuit.HEARTS, 12);
const panic4 = () => new Panic (CardSuit.HEARTS, 1);
const indians1 = () => new Indians (CardSuit.DIAMONDS, 1);
const indians2 = () => new Indians (CardSuit.DIAMONDS, 13);
const duel1 = () => new Duel (CardSuit.DIAMONDS, 12);
const duel2 = () => new Duel (CardSuit.DIAMONDS, 11);
const duel3 = () => new Duel (CardSuit.CLUBS, 8);
const generalStore1 = () => new GeneralStore (CardSuit.CLUBS, 9);
const generalStore2 = () => new GeneralStore (CardSuit.SPADES, 12);
const beer1 = () => new Beer (CardSuit.HEARTS, 6);
const beer2 = () => new Beer (CardSuit.HEARTS, 7);
const beer3 = () => new Beer (CardSuit.HEARTS, 8);
const beer4 = () => new Beer (CardSuit.HEARTS, 9);
const beer5 = () => new Beer (CardSuit.HEARTS, 10);
const beer6 = () => new Beer (CardSuit.HEARTS, 11);
const saloon1 = () => new Saloon (CardSuit.HEARTS, 5);
const stagecoach1 = () => new Stagecoach (CardSuit.SPADES, 9);
const stagecoach2 = () => new Stagecoach (CardSuit.SPADES, 9);
const wellsFargo1 = () => new WellsFargo (CardSuit.HEARTS, 3);
const gatling = () => new Gatling (CardSuit.HEARTS, 10);
const bang1 = () => new Bang (CardSuit.HEARTS, 1);
const bang2 = () => new Bang (CardSuit.HEARTS, 13);
const bang3 = () => new Bang (CardSuit.HEARTS, 12);
const bang4 = () => new Bang (CardSuit.DIAMONDS, 2);
const bang5 = () => new Bang (CardSuit.DIAMONDS, 3);
const bang6 = () => new Bang (CardSuit.DIAMONDS, 4);
const bang7 = () => new Bang (CardSuit.DIAMONDS, 5);
const bang8 = () => new Bang (CardSuit.DIAMONDS, 6);
const bang9 = () => new Bang (CardSuit.DIAMONDS, 7);
const bang10 = () => new Bang (CardSuit.DIAMONDS, 8);
const bang11 = () => new Bang (CardSuit.DIAMONDS, 9);
const bang12 = () => new Bang (CardSuit.DIAMONDS, 10);
const bang13 = () => new Bang (CardSuit.DIAMONDS, 11);
const bang14 = () => new Bang (CardSuit.DIAMONDS, 12);
const bang15 = () => new Bang (CardSuit.DIAMONDS, 13);
const bang16 = () => new Bang (CardSuit.DIAMONDS, 1);
const bang17 = () => new Bang (CardSuit.CLUBS, 2);
const bang18 = () => new Bang (CardSuit.CLUBS, 3);
const bang19 = () => new Bang (CardSuit.CLUBS, 4);
const bang20 = () => new Bang (CardSuit.CLUBS, 5);
const bang21 = () => new Bang (CardSuit.CLUBS, 6);
const bang22 = () => new Bang (CardSuit.CLUBS, 7);
const bang23 = () => new Bang (CardSuit.CLUBS, 8);
const bang24 = () => new Bang (CardSuit.CLUBS, 9);
const bang25 = () => new Bang (CardSuit.SPADES, 1);
const missed1 = () => new Missed (CardSuit.SPADES, 2);
const missed2 = () => new Missed (CardSuit.SPADES, 4);
const missed3 = () => new Missed (CardSuit.SPADES, 5);
const missed4 = () => new Missed (CardSuit.SPADES, 6);
const missed5 = () => new Missed (CardSuit.SPADES, 7);
const missed6 = () => new Missed (CardSuit.SPADES, 8);
const missed7 = () => new Missed (CardSuit.CLUBS, 3);
const missed8 = () => new Missed (CardSuit.CLUBS, 10);
const missed9 = () => new Missed (CardSuit.CLUBS, 11);
const missed10 = () => new Missed (CardSuit.CLUBS, 12);
const missed11 = () => new Missed (CardSuit.CLUBS, 13);
const missed12 = () => new Missed (CardSuit.CLUBS, 1);


export const makeDeck = () => {
  const allCards: GameCard[] = [];

  allCards.push(
    scope1(), barrel1(), barrel2(), dynamite1(), jail1(), jail2(), jail3(), 
    mustang1(), mustang2(), schofield1(), schofield2(), schofield3(), 
    remington1(), revCarabine1(), winchester1(),  volcanic1(), volcanic2(), 
    catBalou1(), catBalou2(), catBalou3(), catBalou4(), panic1(), panic2(), 
    panic3(), panic4(), indians1(), indians2(), duel1(), duel2(), duel3(), 
    generalStore1(), generalStore2(), beer1(), beer2(), beer3(), beer4(), 
    beer5(),beer6(), saloon1(),stagecoach1(), stagecoach2(), wellsFargo1(), 
    gatling(), bang1(), bang2(), bang3(), bang4(), bang5(), bang6(), bang7(), 
    bang8(), bang9(), bang10(), bang11(), bang12(), bang13(), bang14(), 
    bang15(), bang16(), bang17(), bang18(), bang19(), bang20(), bang21(), 
    bang22(), bang23(), bang24(), bang25(), missed1(), missed2(), missed3(), 
    missed4(), missed5(), missed6(), missed7(), missed8(), missed9(), 
    missed10(), missed11(), missed12()
  );

  for (let i = allCards.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = allCards[i]
    allCards[i] = allCards[j]
    allCards[j] = temp
  }

  return allCards;
}

