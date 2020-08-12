import { Game, GameState } from '../Game';

describe('Game', () => {
  it('initializes', () => {
    const id = 'abcd';
    const game = new Game(id);

    expect(game.id).toBe(id);
    expect(game.discard.length).toBe(0);
    expect(game.state).toBe(GameState.WAITING);
    expect(game.players.size).toBe(0);
    expect(game.playerOrder.length).toBe(0);
    expect(game.activePlayers.length).toBe(0);
  });

  it('starts the game', () => {
    const id = 'abcd';
    const game = new Game(id);

    expect(game.state).toBe(GameState.WAITING);

    game.startGame();

    expect(game.state).toBe(GameState.PLAYING);
  });
});
