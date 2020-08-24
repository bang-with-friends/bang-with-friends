import { Game, GameState } from 'common/lib/Game';
import {
  fyShuffle, CardSuit, CardType, CardKind,
} from 'common/lib/Cards';
import { rolesMaker, Role, Player } from 'common/lib/Player';
import { charMap, Character } from 'common/lib/Characters';
import {
  StartTurnData, PickCardEvent, SourceKind, RevealCardEvent,
  PlayerUpdateEvent, EndTurnEvent, StartTurnEvent, PickCardData, PlayCardData, EventName,
} from 'common/lib/Events';
import EventManager, { MAX_PRIORITY, DEFAULT_PRIORITY } from 'common/lib/EventManager';

const makeGameId = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 4; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * 26));
  }
  return result;
};

class BangGame {
  game = new Game(makeGameId());
  eventManager = new EventManager();

  endTurnCallback = () => {
    const playerid: string = this.game.activePlayers[this.game.turn];
    const player: Player = this.game.players.get(playerid)!;
    if (player.maxHealth < player.cards.hand.length) {
      this.eventManager.onEvent(new PickCardEvent({
        sources: [{
          player: playerid,
          sourceKind: SourceKind.PLAYER_HAND,
          canView: true,
        }],
        receiver: {
          kind: SourceKind.DISCARD,
        },
        selectCount: player.cards.hand.length - player.maxHealth,
        optional: false,
        picker: playerid,
        filter: [],
      }));
    }
    this.eventManager.onEvent(new StartTurnEvent({
      currentPlayer: this.game.activePlayers[(this.game.turn + 1) % this.game.numPlayers],
      nextPlayer: this.game.activePlayers[(this.game.turn + 2) % this.game.numPlayers],
    }));
  };

  gameStartCallback = () => {
    this.game.state = GameState.PLAYING;

    const roles = fyShuffle(rolesMaker(this.game.numPlayers));
    const chars = fyShuffle(Array.from(charMap.keys()));

    for (let i = 0; i < this.game.numPlayers; i += 1) {
      const player: Player = this.game.players.get(this.game.activePlayers[i])!;
      player.role = roles[i];
      player.character = chars[i];
      const char: Character = charMap.get(player.character!)!;
      player.maxHealth = char.maxHealth!;
      if ('passive' in char) {
        player[char.passive!.field] = char.passive!.newValue;
      }
      if (roles[i] === Role.SHERIFF) {
        this.game.turn = i;
      }
    }
  };

  // Needs work
  pickCardCallback = (data: PickCardData) => {
    switch (data.sources[0].sourceKind) {
      case SourceKind.DECK:
        break;
      case SourceKind.DISCARD:
        break;
      case SourceKind.GENERAL_STORE:
        break;
      case SourceKind.PLAYER_BOARD:
        break;
      case SourceKind.PLAYER_HAND:
        break;
      default:
        ((_checkExhaustive: never) => {})(data.sources[0].sourceKind);
        throw new Error('Invalid Source');
    }
  };

  playCardCallback = (data: PlayCardData) => {
    const source = this.game.players.get(data.sourcePlayer)!;
    const target = this.game.players.get(data.targetPlayer || '');
    source.cards.hand.splice(source.cards.hand.indexOf(data.card), 1);
    if (data.card.kind === CardKind.ACTION) {
      this.game.discard.push(data.card);
    } else if (data.card.kind === CardKind.STATUS) {
      source.cards.board.push(data.card);
    }
    switch (data.card.type) {
      case CardType.BANG: {
        if (data.targetPlayer) {
          source.hasBanged = true;
          if (target!.barrel) {
            const topCard = this.game.deck[0];
            this.eventManager.onEvent(new RevealCardEvent({
              source: SourceKind.DECK,
              revealCount: 1,
            }));
            if (topCard.suit === CardSuit.HEARTS) {
              break;
            }
          }
          this.eventManager.onEvent(new PickCardEvent({
            sources: [{
              player: data.targetPlayer,
              sourceKind: SourceKind.PLAYER_HAND,
              canView: true,
            }],
            receiver: {
              kind: SourceKind.DISCARD,
            },
            selectCount: 1,
            filter: [CardType.MISSED],
            optional: true,
            picker: data.targetPlayer,
          }));
          const missResponseId = this.eventManager.addEventListener(
            EventName.PLAY_CARD,
            MAX_PRIORITY,
            (playData: any) => {
              if (playData.card.type !== CardType.MISSED) {
                this.eventManager.onEvent(new PlayerUpdateEvent({
                  player: data.targetPlayer!,
                  field: 'currentHealth',
                  newValue: target!.currentHealth - 1,
                }));
              }
              this.eventManager.removeEventListener(EventName.PLAY_CARD, missResponseId);
            },
          );
        } else {
          throw new Error('Targetless Bang played (likely due to Duel event not catching)');
        }
        break;
      }
      case CardType.BARREL:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.sourcePlayer,
          field: 'barrel',
          newValue: true,
        }));
        break;
      case CardType.BEER:
        if (this.game.activePlayers.length > 2) {
          this.eventManager.onEvent(new PlayerUpdateEvent({
            player: data.sourcePlayer,
            field: 'currentHealth',
            newValue: source.currentHealth + 1,
          }));
        }
        break;
      case CardType.CAT_BALOU: {
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            player: data.targetPlayer,
            sourceKind: SourceKind.PLAYER_BOARD,
            canView: true,
          }, {
            player: data.targetPlayer,
            sourceKind: SourceKind.PLAYER_HAND,
            canView: false,
          }, {
            player: data.sourcePlayer,
            sourceKind: SourceKind.PLAYER_BOARD,
            canView: true,
          }],
          receiver: {
            kind: SourceKind.DISCARD,
          },
          optional: false,
          selectCount: 1,
          filter: [],
          picker: data.sourcePlayer,
        }));
        const catBalouResponseId = this.eventManager.addEventListener(
          EventName.PLAY_CARD,
          MAX_PRIORITY,
          (playData: any) => {
            const cbSource = this.game.players.get(playData.sourcePlayer)!;
            cbSource.cards.hand.splice(cbSource.cards.hand.indexOf(playData.card), 1);
            this.game.discard.push(data.card);
            this.eventManager.removeEventListener(EventName.PLAY_CARD, catBalouResponseId);
          },
        );
        break;
      }
      case CardType.DUEL:
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            player: data.targetPlayer,
            sourceKind: SourceKind.PLAYER_HAND,
            canView: true,
          }],
          receiver: {
            kind: SourceKind.DISCARD,
          },
          optional: true,
          selectCount: 1,
          filter: [CardType.BANG],
          picker: data.targetPlayer,
        }));
        break;
      case CardType.DYNAMITE:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.sourcePlayer,
          field: 'dynamite',
          newValue: true,
        }));
        break;
      case CardType.GATLING:
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            player: data.targetPlayer,
            sourceKind: SourceKind.PLAYER_HAND,
            canView: true,
          }],
          receiver: {
            kind: SourceKind.DISCARD,
          },
          optional: true,
          filter: [CardType.MISSED],
          selectCount: 1,
          picker: data.targetPlayer,
        }));
        break;
      case CardType.GENERAL_STORE:
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            sourceKind: SourceKind.GENERAL_STORE,
            canView: true,
          }],
          receiver: {
            player: data.sourcePlayer,
            kind: SourceKind.PLAYER_HAND,
          },
          selectCount: 1,
          filter: [],
          optional: false,
          picker: data.sourcePlayer,
        }));
        break;
      case CardType.INDIANS:
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            player: data.targetPlayer,
            sourceKind: SourceKind.PLAYER_HAND,
            canView: true,
          }],
          receiver: {
            kind: SourceKind.DISCARD,
          },
          optional: true,
          selectCount: 1,
          filter: [CardType.BANG],
          picker: data.targetPlayer,
        }));
        break;
      case CardType.JAIL:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.targetPlayer!,
          field: 'jail',
          newValue: true,
        }));
        break;
      case CardType.MISSED:
        throw new Error('Cannot play a Missed!');

      case CardType.MUSTANG:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.sourcePlayer,
          field: 'distanceMod',
          newValue: source.distanceMod + 1,
        }));
        break;
      case CardType.PANIC:
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            player: data.targetPlayer,
            sourceKind: SourceKind.PLAYER_BOARD,
            canView: true,
          }, {
            player: data.targetPlayer,
            sourceKind: SourceKind.PLAYER_HAND,
            canView: false,
          }],
          receiver: {
            player: data.sourcePlayer,
            kind: SourceKind.PLAYER_HAND,
          },
          optional: false,
          filter: [],
          selectCount: 1,
          picker: data.sourcePlayer,
        }));
        this.eventManager.addEventListener(
          EventName.PLAY_CARD,
          DEFAULT_PRIORITY,
          (_playData: any) => {

          },
        );
        break;
      case CardType.REMINGTON:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.sourcePlayer,
          field: 'range',
          newValue: 3,
        }));
        break;
      case CardType.REV_CARABINE:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.sourcePlayer,
          field: 'range',
          newValue: 4,
        }));
        break;
      case CardType.SALOON:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.sourcePlayer,
          field: 'currentHealth',
          newValue: source.currentHealth + 1,
        }));
        break;
      case CardType.SCHOFIELD:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.sourcePlayer,
          field: 'range',
          newValue: 2,
        }));
        break;
      case CardType.SCOPE:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.sourcePlayer,
          field: 'rangeMod',
          newValue: source.rangeMod + 1,
        }));
        break;
      case CardType.STAGECOACH:
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            sourceKind: SourceKind.DECK,
            canView: false,
          }],
          receiver: {
            player: data.sourcePlayer,
            kind: SourceKind.PLAYER_HAND,
          },
          selectCount: 2,
          filter: [],
          optional: false,
        }));
        break;
      case CardType.VOLCANIC:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.sourcePlayer,
          field: 'range',
          newValue: 1,
        }));
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.sourcePlayer,
          field: 'volcanic',
          newValue: true,
        }));
        break;
      case CardType.WELLS_FARGO:
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            sourceKind: SourceKind.DECK,
            canView: false,
          }],
          receiver: {
            player: data.sourcePlayer,
            kind: SourceKind.PLAYER_HAND,
          },
          selectCount: 3,
          filter: [],
          optional: false,
        }));
        break;
      case CardType.WINCHESTER:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.sourcePlayer,
          field: 'range',
          newValue: 5,
        }));
        break;
      default:
        // compiler check to make sure all cases are covered
        ((_checkExhaustive: never) => {})(data.card.type);
        throw new Error('Invalid Card');
    }
  };

  shuffleCardsCallback = () => {
    this.game.deck = fyShuffle(this.game.deck);
  };

  startTurnCallback = (data: StartTurnData) => {
    const currentPlayer = this.game.players.get(data.currentPlayer);
    if (currentPlayer?.dynamite) {
      const topCard = this.game.deck[0];
      this.eventManager.onEvent(new RevealCardEvent({ source: SourceKind.DECK, revealCount: 1 }));
      if (topCard.suit === CardSuit.SPADES && topCard.number >= 2 && topCard.number <= 9) {
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.currentPlayer,
          field: 'currentHealth',
          newValue: currentPlayer?.currentHealth - 3,
        }));
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            player: data.currentPlayer,
            sourceKind: SourceKind.PLAYER_BOARD,
            canView: true,
          }],
          receiver: {
            kind: SourceKind.DISCARD,
          },
          selectCount: 1,
          filter: [CardType.DYNAMITE],
          optional: false,
        }));
      } else {
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            player: data.currentPlayer,
            canView: true,
            sourceKind: SourceKind.PLAYER_BOARD,
          }],
          receiver: {
            player: data.nextPlayer,
            kind: SourceKind.PLAYER_BOARD,
          },
          filter: [CardType.DYNAMITE],
          selectCount: 1,
          optional: false,
        }));
      }
    }
    if (currentPlayer?.jail) {
      const topCard = this.game.deck[0];
      this.eventManager.onEvent(new RevealCardEvent({ source: SourceKind.DECK, revealCount: 1 }));
      this.eventManager.onEvent(new PickCardEvent({
        sources: [{
          player: data.currentPlayer,
          sourceKind: SourceKind.PLAYER_BOARD,
          canView: true,
        }],
        receiver: {
          kind: SourceKind.DISCARD,
        },
        selectCount: 1,
        filter: [CardType.JAIL],
        optional: false,
      }));
      if (topCard.suit !== CardSuit.HEARTS) {
        this.eventManager.onEvent(new EndTurnEvent());
      }
    }
    this.eventManager.onEvent(new PickCardEvent(
      {
        sources: [{
          sourceKind: SourceKind.DECK,
          canView: false,
        }],
        receiver: {
          player: data.nextPlayer,
          kind: SourceKind.PLAYER_HAND,
        },
        optional: false,
        selectCount: 2,
        filter: [],
      },
    ));
  };
}

export default (BangGame);
