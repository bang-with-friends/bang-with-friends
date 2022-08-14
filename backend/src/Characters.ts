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

export interface Character {
  charName: CharName;
  maxHealth: number;
  updatePlayer: () => void;
}

export const BartCassidy: Character = {
  charName: CharName.BART_CASSIDY,
  maxHealth: 4,
  updatePlayer: () => {},
};

export const BlackJack: Character = {
  charName: CharName.BLACK_JACK,
  maxHealth: 4,
  updatePlayer: () => {},
};

export const CalamityJanet: Character = {
  charName: CharName.CALAMITY_JANET,
  maxHealth: 4,
  updatePlayer: () => {},
};
export const ElGringo: Character = {
  charName: CharName.EL_GRINGO,
  maxHealth: 3,
  updatePlayer: () => {},
};

export const JesseJones: Character = {
  charName: CharName.JESSE_JONES,
  maxHealth: 4,
  updatePlayer: () => {},
};

export const Jourdonnais: Character = {
  charName: CharName.JOURDONNAIS,
  maxHealth: 4,
  updatePlayer: () => {},
};
export const KitCarlson: Character = {
  charName: CharName.KIT_CARLSON,
  maxHealth: 4,
  updatePlayer: () => {},
};
export const LuckyDuke: Character = {
  charName: CharName.LUCKY_DUKE,
  maxHealth: 4,
  updatePlayer: () => {},
};

export const PaulRegret: Character = {
  charName: CharName.PAUL_REGRET,
  maxHealth: 3,
  updatePlayer: () => {},
};

export const PedroRamirez: Character = {
  charName: CharName.PEDRO_RAMIREZ,
  maxHealth: 4,
  updatePlayer: () => {},
};

export const RoseDoolan: Character = {
  charName: CharName.ROSE_DOOLAN,
  maxHealth: 4,
  updatePlayer: () => {},
};

export const SidKetchum: Character = {
  charName: CharName.SID_KETCHUM,
  maxHealth: 4,
  updatePlayer: () => {},
};

export const SlabTheKiller: Character = {
  charName: CharName.SLAB_THE_KILLER,
  maxHealth: 4,
  updatePlayer: () => {},
};

export const SuzyLafayette: Character = {
  charName: CharName.SUZY_LAFAYETTE,
  maxHealth: 4,
  updatePlayer: () => {},
};

export const VultureSam: Character = {
  charName: CharName.VULTURE_SAM,
  maxHealth: 4,
  updatePlayer: () => {},
};

export const WillyTheKid: Character = {
  charName: CharName.WILLY_THE_KID,
  maxHealth: 4,
  updatePlayer: () => {},
};

/* eslint-disable no-multi-spaces */
export const charMap = new Map<CharName, Character>([
  [CharName.BART_CASSIDY,    BartCassidy],
  [CharName.BLACK_JACK,      BlackJack],
  [CharName.CALAMITY_JANET,  CalamityJanet],
  [CharName.EL_GRINGO,       ElGringo],
  [CharName.JESSE_JONES,     JesseJones],
  [CharName.JOURDONNAIS,     Jourdonnais],
  [CharName.KIT_CARLSON,     KitCarlson],
  [CharName.LUCKY_DUKE,      LuckyDuke],
  [CharName.PAUL_REGRET,     PaulRegret],
  [CharName.PEDRO_RAMIREZ,   PedroRamirez],
  [CharName.ROSE_DOOLAN,     RoseDoolan],
  [CharName.SID_KETCHUM,     SidKetchum],
  [CharName.SLAB_THE_KILLER, SlabTheKiller],
  [CharName.SUZY_LAFAYETTE,  SuzyLafayette],
  [CharName.VULTURE_SAM,     VultureSam],
  [CharName.WILLY_THE_KID,   WillyTheKid],
]);
/* eslint-enable no-multi-spaces */
