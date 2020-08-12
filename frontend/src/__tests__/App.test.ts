import { mount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import Game from '@/views/Game.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import { routes, scrollBehavior } from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

const fallbackTests = [
  ['/game'],
  ['/test'],
  ['/some-path-that-doesnt-exist'],
];

describe('App', () => {
  it('renders the home view on the root path', async () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(App, { localVue, router });

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(Home).exists()).toBe(true);
  });

  it('renders the game view on /game/:id', async () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(App, { localVue, router });

    router.push('/game/asdf');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(Game).exists()).toBe(true);
  });

  it('renders hello world on /helloworld', async () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(App, { localVue, router });

    router.push('/helloworld');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(HelloWorld).exists()).toBe(true);
  });

  it.each(fallbackTests)('falls back to home', async (path: string) => {
    const router = new VueRouter({ routes });
    const wrapper = mount(App, { localVue, router });

    router.push(path);
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(Home).exists()).toBe(true);
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */

  it('scrolls to top if no saved position', () => {
    const to = {} as any;
    const from = {} as any;

    const pos = scrollBehavior(to, from);

    expect(pos.x).toBe(0);
    expect(pos.y).toBe(0);
  });

  it('scrolls to saved position if exists', () => {
    const to = {} as any;
    const from = {} as any;
    const saved = { x: 3, y: 7 };

    const pos = scrollBehavior(to, from, saved);

    expect(pos.x).toBe(saved.x);
    expect(pos.y).toBe(saved.y);
  });
});
