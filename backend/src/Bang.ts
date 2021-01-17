import { Game, GameState } from 'common/lib/Game';
import {
  fyShuffle, CardSuit, CardType, CardKind,
} from 'common/lib/Cards';
import { rolesMaker, Role, Player } from 'common/lib/Player';
import { charMap, Character } from 'common/lib/Characters';
import {
  StartTurnData, PickCardEvent, SourceKind, RevealCardEvent,
  PlayerUpdateEvent, EndTurnEvent, StartTurnEvent, PickCardData, PlayCardData, EventName,
  CardPickedData, MoveCardEvent,
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
          playerId: playerid,
          kind: SourceKind.PLAYER_HAND,
          canView: true,
        }],
        receiver: {
          kind: SourceKind.DISCARD,
        },
        selectCount: player.cards.hand.length - player.maxHealth,
        optional: false,
        pickerId: playerid,
        filter: [],
      }));
    }
    this.eventManager.onEvent(new StartTurnEvent({
      currentId: this.game.activePlayers[(this.game.turn + 1) % this.game.numPlayers],
      nextId: this.game.activePlayers[(this.game.turn + 2) % this.game.numPlayers],
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

    this.eventManager.onEvent(new StartTurnEvent({
      currentId: this.game.activePlayers[this.game.turn],
      nextId: this.game.activePlayers[this.game.turn % this.game.numPlayers],
    }));
  };

  // Needs work
  pickCardCallback = (data: PickCardData) => {
    switch (data.sources[0].kind) {
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
        ((_checkExhaustive: never) => {})(data.sources[0].kind);
        throw new Error('Invalid Source');
    }
  };

  duelSetup = (data: any) => {
    this.eventManager.onEvent(new PickCardEvent({
      sources: [{
        playerId: data.targetId,
        kind: SourceKind.PLAYER_HAND,
        canView: true,
      }],
      receiver: {
        kind: SourceKind.DISCARD,
      },
      optional: true,
      selectCount: 1,
      filter: [CardType.BANG],
      pickerId: data.targetId,
    }));
  };

  playCardCallback = (data: PlayCardData) => {
    const source = this.game.players.get(data.sourceId)!;
    const target = this.game.players.get(data.targetId || '');
    if (data.card.kind === CardKind.ACTION) {
      this.eventManager.onEvent(new MoveCardEvent({
        source: {
          kind: SourceKind.PLAYER_HAND,
          playerId: data.sourceId,
        },
        target: {
          kind: SourceKind.DISCARD,
        },
        card: data.card,
      }));
      this.game.discard.push(data.card);
    } else if (data.card.kind === CardKind.STATUS) {
      this.eventManager.onEvent(new MoveCardEvent({
        source: {
          kind: SourceKind.PLAYER_HAND,
          playerId: data.sourceId,
        },
        target: {
          kind: SourceKind.PLAYER_BOARD,
          playerId: data.sourceId,
        },
        card: data.card,
      }));
    }
    switch (data.card.type) {
      case CardType.BANG: {
        if (data.targetId) {
          source.hasBanged = true;
          if (target!.barrel) {
            const topCard = this.game.deck[0];
            this.eventManager.onEvent(new RevealCardEvent({
              source: {
                kind: SourceKind.DECK,
              },
              revealCount: 1,
            }));
            if (topCard.suit === CardSuit.HEARTS) {
              break;
            }
          }
          this.eventManager.onEvent(new PickCardEvent({
            sources: [{
              playerId: data.targetId,
              kind: SourceKind.PLAYER_HAND,
              canView: true,
            }],
            receiver: {
              kind: SourceKind.DISCARD,
            },
            selectCount: 1,
            filter: [CardType.MISSED],
            optional: true,
            pickerId: data.targetId,
          }));
          const missResponseId = this.eventManager.addEventListener(
            EventName.CARD_PICKED,
            MAX_PRIORITY,
            (pickedData: CardPickedData) => {
              if (pickedData.card.type !== CardType.MISSED) {
                this.eventManager.onEvent(new PlayerUpdateEvent({
                  playerId: data.targetId!,
                  field: 'currentHealth',
                  newValue: target!.currentHealth - 1,
                }));
              }
              this.eventManager.removeEventListener(EventName.CARD_PICKED, missResponseId);
            },
          );
        } else {
          throw new Error('Targetless Bang played (likely due to Duel event not catching)');
        }
        break;
      }
      case CardType.BARREL:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.sourceId,
          field: 'barrel',
          newValue: true,
        }));
        break;
      case CardType.BEER:
        if (this.game.activePlayers.length > 2) {
          this.eventManager.onEvent(new PlayerUpdateEvent({
            playerId: data.sourceId,
            field: 'currentHealth',
            newValue: source.currentHealth + 1,
          }));
        }
        break;
      case CardType.CAT_BALOU: {
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            playerId: data.targetId,
            kind: SourceKind.PLAYER_BOARD,
            canView: true,
          }, {
            playerId: data.targetId,
            kind: SourceKind.PLAYER_HAND,
            canView: false,
          }, {
            playerId: data.sourceId,
            kind: SourceKind.PLAYER_BOARD,
            canView: true,
          }],
          receiver: {
            kind: SourceKind.DISCARD,
          },
          optional: false,
          selectCount: 1,
          filter: [],
          pickerId: data.sourceId,
        }));
        const catBalouResponseId = this.eventManager.addEventListener(
          EventName.CARD_PICKED,
          MAX_PRIORITY,
          (pickedData: CardPickedData) => {
            this.eventManager.onEvent(new MoveCardEvent({
              source: {
                kind: pickedData.source.kind,
                playerId: pickedData.source.playerId,
              },
              target: {
                kind: SourceKind.DISCARD,
              },
              card: pickedData.card,
            }));
            this.eventManager.removeEventListener(EventName.CARD_PICKED, catBalouResponseId);
          },
        );
        break;
      }
      case CardType.DUEL:
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            playerId: data.targetId,
            kind: SourceKind.PLAYER_HAND,
            canView: true,
          }],
          receiver: {
            kind: SourceKind.DISCARD,
          },
          optional: true,
          selectCount: 1,
          filter: [CardType.BANG],
          pickerId: data.targetId,
        }));
        break;
      case CardType.DYNAMITE:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.sourceId,
          field: 'dynamite',
          newValue: true,
        }));
        break;
      case CardType.GATLING:
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            playerId: data.targetId,
            kind: SourceKind.PLAYER_HAND,
            canView: true,
          }],
          receiver: {
            kind: SourceKind.DISCARD,
          },
          optional: true,
          filter: [CardType.MISSED],
          selectCount: 1,
          pickerId: data.targetId,
        }));
        break;
      case CardType.GENERAL_STORE:
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            kind: SourceKind.GENERAL_STORE,
            canView: true,
          }],
          receiver: {
            playerId: data.sourceId,
            kind: SourceKind.PLAYER_HAND,
          },
          selectCount: 1,
          filter: [],
          optional: false,
          pickerId: data.sourceId,
        }));
        break;
      case CardType.INDIANS:
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            playerId: data.targetId,
            kind: SourceKind.PLAYER_HAND,
            canView: true,
          }],
          receiver: {
            kind: SourceKind.DISCARD,
          },
          optional: true,
          selectCount: 1,
          filter: [CardType.BANG],
          pickerId: data.targetId,
        }));
        break;
      case CardType.JAIL:
        this.eventManager.onEvent(new MoveCardEvent({
          source: {
            kind: SourceKind.PLAYER_HAND,
            playerId: data.sourceId,
          },
          target: {
            kind: SourceKind.PLAYER_BOARD,
            playerId: data.targetId!,
          },
          card: data.card,
        }));
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.targetId!,
          field: 'jail',
          newValue: true,
        }));
        break;
      case CardType.MISSED:
        throw new Error('Cannot play a Missed!');

      case CardType.MUSTANG:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.sourceId,
          field: 'distanceMod',
          newValue: source.distanceMod + 1,
        }));
        break;
      case CardType.PANIC: {
        this.eventManager.onEvent(new PickCardEvent({
          sources: [{
            playerId: data.targetId,
            kind: SourceKind.PLAYER_BOARD,
            canView: true,
          }, {
            playerId: data.targetId,
            kind: SourceKind.PLAYER_HAND,
            canView: false,
          }],
          receiver: {
            playerId: data.sourceId,
            kind: SourceKind.PLAYER_HAND,
          },
          optional: false,
          filter: [],
          selectCount: 1,
          pickerId: data.sourceId,
        }));
        const panicResponseId = this.eventManager.addEventListener(
          EventName.CARD_PICKED,
          DEFAULT_PRIORITY,
          (pickedData: CardPickedData) => {
            this.eventManager.onEvent(new MoveCardEvent({
              source: {
                kind: pickedData.source.kind,
                playerId: pickedData.source.playerId,
              },
              target: {
                kind: SourceKind.PLAYER_HAND,
                playerId: data.sourceId,
              },
              card: pickedData.card,
            }));
            this.eventManager.removeEventListener(EventName.CARD_PICKED, panicResponseId);
          },
        );
        break;
      }
      case CardType.REMINGTON:
        if (source.gun) {
          this.eventManager.onEvent(new MoveCardEvent({
            source: {
              kind: SourceKind.PLAYER_BOARD,
              playerId: data.sourceId,
            },
            target: {
              kind: SourceKind.DISCARD,
            },
            card: source.gun,
          }));
        }
        source.gun = data.card;
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.sourceId,
          field: 'range',
          newValue: 3,
        }));
        break;
      case CardType.REV_CARABINE:
        if (source.gun) {
          this.eventManager.onEvent(new MoveCardEvent({
            source: {
              kind: SourceKind.PLAYER_BOARD,
              playerId: data.sourceId,
            },
            target: {
              kind: SourceKind.DISCARD,
            },
            card: source.gun,
          }));
        }
        source.gun = data.card;
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.sourceId,
          field: 'range',
          newValue: 4,
        }));
        break;
      case CardType.SALOON:
        this.game.activePlayers.forEach((playerId: string) => {
          const player = this.game.players.get(playerId)!;
          this.eventManager.onEvent(new PlayerUpdateEvent({
            playerId,
            field: 'currentHealth',
            newValue: player.currentHealth + 1,
          }));
        });
        break;
      case CardType.SCHOFIELD:
        if (source.gun) {
          this.eventManager.onEvent(new MoveCardEvent({
            source: {
              kind: SourceKind.PLAYER_BOARD,
              playerId: data.sourceId,
            },
            target: {
              kind: SourceKind.DISCARD,
            },
            card: source.gun,
          }));
        }
        source.gun = data.card;
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.sourceId,
          field: 'range',
          newValue: 2,
        }));
        break;
      case CardType.SCOPE:
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.sourceId,
          field: 'rangeMod',
          newValue: source.rangeMod + 1,
        }));
        break;
      case CardType.STAGECOACH: {
        let card = this.game.deck[0];
        this.eventManager.onEvent(new MoveCardEvent({
          source: {
            kind: SourceKind.DECK,
          },
          target: {
            playerId: data.sourceId,
            kind: SourceKind.PLAYER_HAND,
          },
          card,
        }));
        [card] = this.game.deck;
        this.eventManager.onEvent(new MoveCardEvent({
          source: {
            kind: SourceKind.DECK,
          },
          target: {
            playerId: data.sourceId,
            kind: SourceKind.PLAYER_HAND,
          },
          card,
        }));
        break;
      }
      case CardType.VOLCANIC:
        if (source.gun) {
          this.eventManager.onEvent(new MoveCardEvent({
            source: {
              kind: SourceKind.PLAYER_BOARD,
              playerId: data.sourceId,
            },
            target: {
              kind: SourceKind.DISCARD,
            },
            card: source.gun,
          }));
        }
        source.gun = data.card;
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.sourceId,
          field: 'range',
          newValue: 1,
        }));
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.sourceId,
          field: 'volcanic',
          newValue: true,
        }));
        break;
      case CardType.WELLS_FARGO: {
        let card = this.game.deck[0];
        this.eventManager.onEvent(new MoveCardEvent({
          source: {
            kind: SourceKind.DECK,
          },
          target: {
            playerId: data.sourceId,
            kind: SourceKind.PLAYER_HAND,
          },
          card,
        }));
        [card] = this.game.deck;
        this.eventManager.onEvent(new MoveCardEvent({
          source: {
            kind: SourceKind.DECK,
          },
          target: {
            playerId: data.sourceId,
            kind: SourceKind.PLAYER_HAND,
          },
          card,
        }));
        [card] = this.game.deck;
        this.eventManager.onEvent(new MoveCardEvent({
          source: {
            kind: SourceKind.DECK,
          },
          target: {
            playerId: data.sourceId,
            kind: SourceKind.PLAYER_HAND,
          },
          card,
        }));
        break;
      }
      case CardType.WINCHESTER:
        if (source.gun) {
          this.eventManager.onEvent(new MoveCardEvent({
            source: {
              kind: SourceKind.PLAYER_BOARD,
              playerId: data.sourceId,
            },
            target: {
              kind: SourceKind.DISCARD,
            },
            card: source.gun,
          }));
        }
        source.gun = data.card;
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.sourceId,
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
    const currentPlayer = this.game.players.get(data.currentId);
    if (currentPlayer?.dynamite) {
      const topCard = this.game.deck[0];
      this.eventManager.onEvent(new RevealCardEvent({
        source: {
          kind: SourceKind.DECK,
        },
        revealCount: 1,
      }));
      if (topCard.suit === CardSuit.SPADES && topCard.number >= 2 && topCard.number <= 9) {
        this.eventManager.onEvent(new PlayerUpdateEvent({
          playerId: data.currentId,
          field: 'currentHealth',
          newValue: currentPlayer?.currentHealth - 3,
        }));
        // this.eventManager.onEvent(new PickCardEvent({
        //   sources: [{
        //     player: data.currentPlayer,
        //     sourceKind: SourceKind.PLAYER_BOARD,
        //     canView: true,
        //   }],
        //   receiver: {
        //     kind: SourceKind.DISCARD,
        //   },
        //   selectCount: 1,
        //   filter: [CardType.DYNAMITE],
        //   optional: false,
        // }));
      } else {
        // this.eventManager.onEvent(new PickCardEvent({
        //   sources: [{
        //     player: data.currentPlayer,
        //     canView: true,
        //     sourceKind: SourceKind.PLAYER_BOARD,
        //   }],
        //   receiver: {
        //     player: data.nextPlayer,
        //     kind: SourceKind.PLAYER_BOARD,
        //   },
        //   filter: [CardType.DYNAMITE],
        //   selectCount: 1,
        //   optional: false,
        // }));
      }
    }
    if (currentPlayer?.jail) {
      const topCard = this.game.deck[0];
      this.eventManager.onEvent(new RevealCardEvent({
        source: {
          kind: SourceKind.DECK,
        },
        revealCount: 1,
      }));
      // this.eventManager.onEvent(new PickCardEvent({
      //   sources: [{
      //     player: data.currentPlayer,
      //     sourceKind: SourceKind.PLAYER_BOARD,
      //     canView: true,
      //   }],
      //   receiver: {
      //     kind: SourceKind.DISCARD,
      //   },
      //   selectCount: 1,
      //   filter: [CardType.JAIL],
      //   optional: false,
      // }));
      if (topCard.suit !== CardSuit.HEARTS) {
        this.eventManager.onEvent(new EndTurnEvent());
      }
    }
    this.eventManager.onEvent(new PickCardEvent(
      {
        sources: [{
          kind: SourceKind.DECK,
          canView: false,
        }],
        receiver: {
          playerId: data.currentId,
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
