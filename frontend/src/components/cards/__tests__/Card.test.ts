import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import { CardSuit, CardType } from 'common/lib/Cards';
import Card from '../Card.vue';

jest.mock('@/utils/imageLoader');

describe('Card.vue', () => {
  it('mounts', () => {
    const card = shallowMount(Card, {
      propsData: {
        suit: CardSuit.DIAMONDS,
        number: 11,
        type: CardType.BANG,
        playable: false,
      },
    });

    expect(card).toBeTruthy();
  });

  it('mounts with no props', () => {
    const card = shallowMount(Card);

    expect(card).toBeTruthy();
  });
});
