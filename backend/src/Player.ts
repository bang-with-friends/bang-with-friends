import { GameCard } from 'common/lib/Cards';
import { CharName } from './Characters';
import { Role } from 'common/lib/Roles';


export class Player {
  [index: string]: any;
  id: string;
  name: string;
  role?: Role;
  character?: CharName;
  maxHealth: number;
  currentHealth: number;
  alive: boolean;
  gun?: GameCard;
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
