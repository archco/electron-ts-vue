import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from './views/home.vue';
import Features from './views/features.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: '/', component: Home },
  { path: '/features', component: Features },
];

export default new VueRouter({
  routes,
});
