import { Game, GameState } from 'common/lib/Game';
import {
  fyShuffle, CardSuit, CardType,
} from 'common/lib/Cards';
import { rolesMaker, Role, Player } from 'common/lib/Player';
import { charMap, Character } from 'common/lib/Characters';
import {
  StartTurnData, PickCardEvent, SourceKind, RevealCardEvent,
  PlayerUpdateEvent, DiscardCardEvent, EndTurnEvent, StartTurnEvent,
} from 'common/lib/Events';
import EventManager from './EventManager';

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
      const char: Character = charMap.get(player.character)!;
      player.character = chars[i];
      player.maxHealth = char.maxHealth!;
      if ('passive' in char) {
        player[char.passive.field]
      }
      if (roles[i] === Role.SHERIFF) {
        this.game.turn = i;
      }
    }
  };

  shuffleCardsCallback = () => {
    this.game.deck = fyShuffle(this.game.deck);
  };

  startTurnCallback = (data: StartTurnData) => {
    const currentPlayer = this.game.players.get(data.currentPlayer);
    if (currentPlayer?.dynamite) {
      const [dynamite] = currentPlayer.cards.hand.filter((card) => card.type === CardType.DYNAMITE);
      const topCard = this.game.deck[0];
      this.eventManager.onEvent(new RevealCardEvent({ source: SourceKind.DECK, revealCount: 1 }));
      if (topCard.suit === CardSuit.SPADES && topCard.number >= 2 && topCard.number <= 9) {
        this.eventManager.onEvent(new PlayerUpdateEvent({
          player: data.currentPlayer,
          field: 'currentHealth',
          newValue: currentPlayer?.currentHealth - 3,
        }));
        this.eventManager.onEvent(new DiscardCardEvent({
          sourcePlayer: data.currentPlayer,
          card: dynamite,
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
      const [jail] = currentPlayer.cards.hand.filter((card) => card.type === CardType.JAIL);
      const topCard = this.game.deck[0];
      this.eventManager.onEvent(new RevealCardEvent({ source: SourceKind.DECK, revealCount: 1 }));
      this.eventManager.onEvent(new DiscardCardEvent({
        sourcePlayer: data.currentPlayer,
        card: jail,
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
