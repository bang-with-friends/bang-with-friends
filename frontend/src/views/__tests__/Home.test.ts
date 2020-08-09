import { shallowMount } from '@vue/test-utils';
import { render } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('sets show when create button clicked', () => {
    const home = shallowMount(Home, {});
    expect(home).toBeTruthy();
    expect(home.vm.$data.show).toBe('SELECT');

    const button = home.find('#create');
    button.trigger('click');
    expect(home.vm.$data.show).toBe('CREATE');
  });

  it('sets show when join button clicked', () => {
    const home = shallowMount(Home, {});
    expect(home).toBeTruthy();
    expect(home.vm.$data.show).toBe('SELECT');

    const button = home.find('#join');
    button.trigger('click');
    expect(home.vm.$data.show).toBe('JOIN');
  });

  it('does not show room code when in select mode', async () => {
    const { getByText } = render(Home, {
      data() {
        return { show: 'SELECT' };
      },
    }) as any;

    expect(getByText('Room code')).not.toBeVisible();
  });

  it('shows room code when in create mode', async () => {
    const code = 'TESTabcd';
    const { getByText } = render(Home, {
      data() {
        return {
          show: 'CREATE',
          code,
        };
      },
    }) as any;

    expect(getByText('Room code')).toBeVisible();
    expect(() => getByText(code)).not.toThrow();
    expect(getByText(code)).toBeTruthy();
  });

  it('shows room code when in join mode', async () => {
    const code = 'TESTabcd';
    const { getByText } = render(Home, {
      data() {
        return {
          show: 'JOIN',
          code,
        };
      },
    }) as any;

    expect(getByText('Room code')).toBeVisible();
    expect(() => getByText(code)).toThrow();
  });

  it('completes', async () => {
    const code = 'TESTabcd';
    const home = shallowMount(Home, {
      data() {
        return {
          show: 'JOIN',
          code,
        };
      },
    });

    expect(home).toBeTruthy();
    expect(home.vm.$data.show).toBe('JOIN');

    const button = home.find('#complete');
    button.trigger('click');
  });
});
