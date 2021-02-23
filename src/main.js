import Vue from 'vue';
import VueGtag from 'vue-gtag';
import Notifications from 'vue-notification';
Vue.use(Notifications);

import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/css/960.css';
// import '@/assets/css/reset.css';
import '@/assets/css/text.css';
import * as filters from '@/filters';

// https://vuedose.tips/tips/measure-runtime-performance-in-vue-js-apps
const isDev = process.env.NODE_ENV !== 'production';
Vue.config.performance = isDev;

Vue.use(VueGtag, {
  config: {
    id: 'UA-141664476-1',
  },
});

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
