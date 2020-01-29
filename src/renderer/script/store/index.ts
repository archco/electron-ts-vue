import Vue from 'vue';
import Vuex from 'vuex';
import clickCount from './modules/clickCount';

Vue.use(Vuex);

export default new Vuex.Store({
 modules: {
  clickCount, // test module.
 },
});
