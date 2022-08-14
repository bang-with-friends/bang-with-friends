import { GameCard, CardType } from 'common/lib/Cards';
import { Player } from './Player';


export const checkPlayableCard = (card: GameCard, source: Player) => {
  switch (card.type) {
    case CardType.BANG:
      return !source.hasBanged || source.volcanic;

    case CardType.BARREL:
      return !source.barrel;

    case CardType.BEER:
      return true;

    case CardType.CAT_BALOU:
      return true;

    case CardType.DUEL:
      return true;

    case CardType.DYNAMITE:
      return !source.dynamite;

    case CardType.GATLING:
      return true;

    case CardType.GENERAL_STORE:
      return true;

    case CardType.INDIANS:
      return true;

    case CardType.JAIL:
      return true;

    case CardType.MISSED:
      return false;

    case CardType.MUSTANG:
      return !source.mustang;

    case CardType.PANIC:
      return true;

    case CardType.REMINGTON:
      return true;

    case CardType.REV_CARABINE:
      return true;

    case CardType.SALOON:
      return true;

    case CardType.SCHOFIELD:
      return true;

    case CardType.SCOPE:
      return !source.scope;

    case CardType.STAGECOACH:
      return true;

    case CardType.VOLCANIC:
      return true;

    case CardType.WELLS_FARGO:
      return true;

    case CardType.WINCHESTER:
      return true;

    default:
      // compiler check to make sure all cases are covered
      ((_checkExhaustive: never) => {})(card.type);
      throw new Error('Invalid Card');
  }
};
