import Vue from 'vue';
import App from './app.vue';

declare global {
  interface Window {
    vm: any;
  }
}

window.vm = new Vue({
  el: '#app',
  render: h => h(App),
});
