import Vue from 'vue';
import VueRouter, { Route, RouteConfig } from 'vue-router';

import Game from '../views/Game.vue';
import HelloWorld from '../components/HelloWorld.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: Game,
  },
  {
    path: '/helloworld',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '*',
    name: 'Not Found',
    component: Home,
  },
];

type Position = { x: number; y: number };
export const scrollBehavior = (_to: Route, _from: Route, savedPosition: Position | void) => {
  if (savedPosition) {
    return savedPosition;
  }
  return { x: 0, y: 0 };
};

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior,
});

export default router;
