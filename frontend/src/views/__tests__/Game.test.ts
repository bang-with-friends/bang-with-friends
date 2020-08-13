import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import Game from '@/views/Game.vue';

jest.mock('@/utils/imageLoader');

describe('Game.vue', () => {
  it('mounts', () => {
    const game = shallowMount(Game, {});
    expect(game).toBeTruthy();
  });
});
