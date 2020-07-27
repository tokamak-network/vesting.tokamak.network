<<<<<<< HEAD
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
=======
import Vue from 'vue';
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

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
>>>>>>> migrate
