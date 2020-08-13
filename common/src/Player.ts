import { GameCard } from './Cards';

export enum Role {
  SHERIFF = 'SHERIFF',
  VICE = 'VICE',
  RENEGADE = 'RENEGADE',
  OUTLAW = 'OUTLAW',
}

export const rolesMaker = (playerCt: number) => {
  switch (playerCt) {
    case 4:
      return [Role.SHERIFF, Role.RENEGADE, Role.OUTLAW, Role.OUTLAW];
    case 5:
      return [Role.SHERIFF, Role.VICE, Role.RENEGADE, Role.OUTLAW, Role.OUTLAW];
    case 6:
      return [Role.SHERIFF, Role.VICE, Role.RENEGADE, Role.OUTLAW, Role.OUTLAW, Role.OUTLAW];
    case 7:
      return [Role.SHERIFF, Role.VICE, Role.VICE, Role.RENEGADE, Role.OUTLAW,
        Role.OUTLAW, Role.OUTLAW];
    default:
      throw new Error('Invalid Number of Players');
  }
};

export enum CharName {
  BART_CASSIDY = 'BART_CASSIDY',
  BLACK_JACK = 'BLACK_JACK',
  CALAMITY_JANET = 'CALAMITY_JANET',
  EL_GRINGO = 'EL_GRINGO',
  JESSE_JONES = 'JESSE_JONES',
  JOURDONNAIS = 'JOURDONNAIS',
  KIT_CARLSON = 'KIT_CARLSON',
  LUCKY_DUKE = 'LUCKY_DUKE',
  PAUL_REGRET = 'PAUL_REGRET',
  PEDRO_RAMIREZ = 'PEDRO_RAMIREZ',
  ROSE_DOOLAN = 'ROSE_DOOLAN',
  SID_KETCHUM = 'SID_KETCHUM',
  SLAB_THE_KILLER = 'SLAB_THE_KILLER',
  SUZY_LAFAYETTE = 'SUZY_LAFAYETTE',
  VULTURE_SAM = 'VULTURE_SAM',
  WILLY_THE_KID = 'WILLY_THE_KID',
}

export class Player {
  [index: string]: any;
  id: string;
  name: string;
  role?: Role;
  character?: CharName;
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
    hand: GameCard[],
    board: GameCard[],
  };

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.maxHealth = -1;
    this.currentHealth = this.maxHealth;
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
