import { GameCard, CardType } from 'common/lib/Cards';
import { SourceKind, PickCardEvent, PlayerUpdateEvent } from 'common/lib/Events';
import { Player } from 'common/lib/Player';
import { Game } from 'common/lib/Game';

export const handlePlayCard = (card: GameCard, source: Player, target: Player, game: Game) => {
  switch (card.type) {
    case CardType.BANG:
      return [new PickCardEvent({
        sources: [{
          player: target.id,
          sourceKind: SourceKind.PLAYER_HAND,
          canView: true,
        }],
        receiver: {
          kind: SourceKind.DISCARD,
        },
        selectCount: 1,
        filter: [CardType.MISSED],
        optional: true,
        picker: target.id,
      })];

    case CardType.BARREL:
      return [new PlayerUpdateEvent({
        player: source.id,
        field: 'barrel',
        newValue: true,
      })];

    case CardType.BEER:
      if (game.activePlayers.length === 2) {
        return [];
      }
      return [new PlayerUpdateEvent({
        player: source.id,
        field: 'currentHealth',
        newValue: source.currentHealth + 1,
      })];

    case CardType.CAT_BALOU:
      return [new PickCardEvent({
        sources: [{
          player: target.id,
          sourceKind: SourceKind.PLAYER_BOARD,
          canView: true,
        }, {
          player: target.id,
          sourceKind: SourceKind.PLAYER_HAND,
          canView: false,
        }, {
          player: source.id,
          sourceKind: SourceKind.PLAYER_BOARD,
          canView: true,
        }],
        receiver: {
          kind: SourceKind.DISCARD,
        },
        optional: false,
        selectCount: 1,
        filter: [],
        picker: source.id,
      })];

    case CardType.DUEL:
      return [new PickCardEvent({
        sources: [{
          player: target.id,
          sourceKind: SourceKind.PLAYER_HAND,
          canView: true,
        }],
        receiver: {
          kind: SourceKind.DISCARD,
        },
        optional: true,
        selectCount: 1,
        filter: [CardType.BANG],
        picker: target.id,
      })];

    case CardType.DYNAMITE:
      return [new PlayerUpdateEvent({
        player: source.id,
        field: 'dynamite',
        newValue: true,
      })];

    case CardType.GATLING:
      return [new PickCardEvent({
        sources: [{
          player: target.id,
          sourceKind: SourceKind.PLAYER_HAND,
          canView: true,
        }],
        receiver: {
          kind: SourceKind.DISCARD,
        },
        optional: true,
        filter: [CardType.MISSED],
        selectCount: 1,
        picker: target.id,
      })];

    case CardType.GENERAL_STORE:
      return [new PickCardEvent({
        sources: [{
          sourceKind: SourceKind.GENERAL_STORE,
          canView: true,
        }],
        receiver: {
          player: source.id,
          kind: SourceKind.PLAYER_HAND,
        },
        selectCount: 1,
        filter: [],
        optional: false,
        picker: source.id,
      })];

    case CardType.INDIANS:
      return [new PickCardEvent({
        sources: [{
          player: target.id,
          sourceKind: SourceKind.PLAYER_HAND,
          canView: true,
        }],
        receiver: {
          kind: SourceKind.DISCARD,
        },
        optional: true,
        selectCount: 1,
        filter: [CardType.BANG],
        picker: target.id,
      })];

    case CardType.JAIL:
      return [new PlayerUpdateEvent({
        player: target.id,
        field: 'jail',
        newValue: true,
      })];

    case CardType.MISSED:
      throw new Error('Cannot play a Missed!');

    case CardType.MUSTANG:
      return [new PlayerUpdateEvent({
        player: source.id,
        field: 'distanceMod',
        newValue: source.distanceMod + 1,
      })];

    case CardType.PANIC:
      return [new PickCardEvent({
        sources: [{
          player: target.id,
          sourceKind: SourceKind.PLAYER_BOARD,
          canView: true,
        }, {
          player: target.id,
          sourceKind: SourceKind.PLAYER_HAND,
          canView: false,
        }],
        receiver: {
          player: source.id,
          kind: SourceKind.PLAYER_HAND,
        },
        optional: false,
        filter: [],
        selectCount: 1,
        picker: source.id,
      })];

    case CardType.REMINGTON:
      return [new PlayerUpdateEvent({
        player: source.id,
        field: 'range',
        newValue: 3,
      })];

    case CardType.REV_CARABINE:
      return [new PlayerUpdateEvent({
        player: source.id,
        field: 'range',
        newValue: 4,
      })];

    case CardType.SALOON:
      return [new PlayerUpdateEvent({
        player: source.id,
        field: 'currentHealth',
        newValue: source.currentHealth + 1,
      })];

    case CardType.SCHOFIELD:
      return [new PlayerUpdateEvent({
        player: source.id,
        field: 'range',
        newValue: 2,
      })];

    case CardType.SCOPE:
      return [new PlayerUpdateEvent({
        player: source.id,
        field: 'rangeMod',
        newValue: source.rangeMod + 1,
      })];

    case CardType.STAGECOACH:
      return [new PickCardEvent({
        sources: [{
          sourceKind: SourceKind.DECK,
          canView: false,
        }],
        receiver: {
          player: source.id,
          kind: SourceKind.PLAYER_HAND,
        },
        selectCount: 1,
        filter: [],
        optional: false,
      }), new PickCardEvent({
        sources: [{
          sourceKind: SourceKind.DECK,
          canView: false,
        }],
        receiver: {
          player: source.id,
          kind: SourceKind.PLAYER_HAND,
        },
        selectCount: 1,
        filter: [],
        optional: false,
      })];

    case CardType.VOLCANIC:
      return [new PlayerUpdateEvent({
        player: source.id,
        field: 'range',
        newValue: 1,
      }), new PlayerUpdateEvent({
        player: source.id,
        field: 'volcanic',
        newValue: true,
      })];

    case CardType.WELLS_FARGO:
      return [new PickCardEvent({
        sources: [{
          sourceKind: SourceKind.DECK,
          canView: false,
        }],
        receiver: {
          player: source.id,
          kind: SourceKind.PLAYER_HAND,
        },
        selectCount: 1,
        filter: [],
        optional: false,
      }), new PickCardEvent({
        sources: [{
          sourceKind: SourceKind.DECK,
          canView: false,
        }],
        receiver: {
          player: source.id,
          kind: SourceKind.PLAYER_HAND,
        },
        selectCount: 1,
        filter: [],
        optional: false,
      }), new PickCardEvent({
        sources: [{
          sourceKind: SourceKind.DECK,
          canView: false,
        }],
        receiver: {
          player: source.id,
          kind: SourceKind.PLAYER_HAND,
        },
        selectCount: 1,
        filter: [],
        optional: false,
      })];

    case CardType.WINCHESTER:
      return [new PlayerUpdateEvent({
        player: source.id,
        field: 'range',
        newValue: 5,
      })];

    default:
      // compiler check to make sure all cases are covered
      ((_checkExhaustive: never) => {})(card.type);
      throw new Error('Invalid Card');
  }
};

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
