import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from '@/layouts/MainLayout';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: MainLayout,
    },
  ],
});
