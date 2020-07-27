<<<<<<< HEAD
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
=======
import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from '@/layouts/MainLayout';

Vue.use(Router);
>>>>>>> migrate

export default new Router({
  routes: [
    {
      path: '/',
<<<<<<< HEAD
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
=======
      component: MainLayout,
    },
  ],
});
>>>>>>> migrate
