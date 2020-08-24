import { EventName } from './Events';
import { CharName, Player } from './Player';
import { Priority, DEFAULT_PRIORITY } from './EventManager';

export interface Character {
  charName: CharName;
  maxHealth: number;
  effect?: {
    event: EventName,
    priority: Priority,
  };
  passive?: {
    field: keyof Player,
    newValue: any,
  }
}

export const BartCassidy: Character = {
  charName: CharName.BART_CASSIDY,
  maxHealth: 4,
  effect: {
    event: EventName.PLAYER_UPDATE,
    priority: DEFAULT_PRIORITY,
  },
};

export const BlackJack: Character = {
  charName: CharName.BLACK_JACK,
  maxHealth: 4,
  effect: {
    event: EventName.START_TURN,
    priority: DEFAULT_PRIORITY,
  },
};

export const CalamityJanet: Character = {
  charName: CharName.CALAMITY_JANET,
  maxHealth: 4,
  effect: {
    event: EventName.PLAY_CARD,
    priority: DEFAULT_PRIORITY,
  },
};
export const ElGringo: Character = {
  charName: CharName.EL_GRINGO,
  maxHealth: 3,
  effect: {
    event: EventName.PLAYER_UPDATE,
    priority: DEFAULT_PRIORITY,
  },
};
export const JesseJones: Character = {
  charName: CharName.JESSE_JONES,
  maxHealth: 4,
  effect: {
    event: EventName.START_TURN,
    priority: DEFAULT_PRIORITY,
  },
};
export const Jourdonnais: Character = {
  charName: CharName.JOURDONNAIS,
  maxHealth: 4,
  effect: {
    event: EventName.PLAY_CARD,
    priority: DEFAULT_PRIORITY,
  },
};
export const KitCarlson: Character = {
  charName: CharName.KIT_CARLSON,
  maxHealth: 4,
  effect: {
    event: EventName.START_TURN,
    priority: DEFAULT_PRIORITY,
  },
};
export const LuckyDuke: Character = {
  charName: CharName.LUCKY_DUKE,
  maxHealth: 4,
  effect: {
    event: EventName.REVEAL_CARD,
    priority: DEFAULT_PRIORITY,
  },
};
export const PaulRegret: Character = {
  charName: CharName.PAUL_REGRET,
  maxHealth: 3,
  passive: {
    field: 'distanceMod',
    newValue: 1,
  },
};
export const PedroRamirez: Character = {
  charName: CharName.PEDRO_RAMIREZ,
  maxHealth: 4,
  effect: {
    event: EventName.START_TURN,
    priority: DEFAULT_PRIORITY,
  },
};
export const RoseDoolan: Character = {
  charName: CharName.ROSE_DOOLAN,
  maxHealth: 4,
  passive: {
    field: 'rangeMod',
    newValue: 1,
  },
};
export const SidKetchum: Character = {
  charName: CharName.SID_KETCHUM,
  maxHealth: 4,
  effect: {
    event: EventName.PLAY_CARD,
    priority: DEFAULT_PRIORITY,
  },
};
export const SlabTheKiller: Character = {
  charName: CharName.SLAB_THE_KILLER,
  maxHealth: 4,
  effect: {
    event: EventName.PLAY_CARD,
    priority: DEFAULT_PRIORITY,
  },
};
export const SuzyLafayette: Character = {
  charName: CharName.SUZY_LAFAYETTE,
  maxHealth: 4,
  effect: {
    event: EventName.PLAY_CARD,
    priority: DEFAULT_PRIORITY,
  },
};
export const VultureSam: Character = {
  charName: CharName.VULTURE_SAM,
  maxHealth: 4,
  effect: {
    event: EventName.PLAYER_ELIM,
    priority: DEFAULT_PRIORITY,
  },
};
export const WillyTheKid: Character = {
  charName: CharName.WILLY_THE_KID,
  maxHealth: 4,
  passive: {
    field: 'volcanic',
    newValue: true,
  },
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
