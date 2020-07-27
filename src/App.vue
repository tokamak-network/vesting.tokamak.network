<template>
  <div id="app">
<<<<<<< HEAD
    <img src="./assets/logo.png">
    <router-view/>
=======
    <header-container />
    <div class="body-container">
      <div v-if="!signIn">
        <loading-spinner v-if="loading" />
        <access-wallet-layout v-else />
      </div>
      <div v-else>
        <tx-processor />
        <main-layout />
      </div>
    </div>
    <footer-container />
>>>>>>> migrate
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
=======
import { mapState, mapGetters } from 'vuex';

import LoadingSpinner from '@/components/LoadingSpinner.vue';
import TxProcessor from '@/components/TxProcessor.vue';
import HeaderContainer from '@/containers/HeaderContainer.vue';
import FooterContainer from '@/containers/FooterContainer.vue';
import AccessWalletLayout from '@/layouts/AccessWalletLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  components: {
    'loading-spinner': LoadingSpinner,
    'header-container': HeaderContainer,
    'footer-container': FooterContainer,
    'access-wallet-layout': AccessWalletLayout,
    'main-layout': MainLayout,
    'tx-processor': TxProcessor,
  },
  data () {
    return {
      message: '',
    };
  },
  computed: {
    ...mapState([
      'loading',
      'signIn',
    ]),
    ...mapGetters([
      'initialState',
    ]),
  },
  created () {
    if (this.initialState && this.$route.path !== '/') {
      this.$router.replace({
        path: '/',
        query: { network: this.$route.query.network },
      });
    }
    this.$store.watch(
      (_, getters) => getters.initialState,
      (logout) => {
        if (logout && this.$route.path !== '/') {
          this.$router.replace({
            path: '/',
            query: { network: this.$route.query.network },
          });
        }
      },
    );
  },
};
</script>

<style>
* {
  margin: 0;
}

html, body {
  background: #f6f8f9;
  position: relative;
  margin: 0;
  min-height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.body-container {
  min-width: 960px;
  max-width: 960px;
  display: flex;
  flex: 1;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

/* GLOBAL CSS */
.delegate-button-container {
  display: flex;
}

.delegate-button {
  width: 102px;
  height: 30px;
  line-height: 30px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  text-align: center;
  box-shadow: 0 3px 14px 0 rgba(0, 0, 0, 0.03);
  border: solid 1px #dce2e5;
  background-color: #73a9c1;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #ffffff;
}

.undelegate-button {
  width: 102px;
  height: 30px;
  line-height: 30px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0 3px 14px 0 rgba(0, 0, 0, 0.03);
  border: solid 1px #dce2e5;
  background-color: #ef8f78;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #ffffff;
  text-align: center;
  margin-right: 20px;
}

.delegate-button:hover {
  -webkit-filter: opacity(.8);
  filter: opacity(.8);
}

.undelegate-button:hover {
  -webkit-filter: opacity(.8);
  filter: opacity(.8);
}

/* GLOBAL CONTAINER */
.table-container {
  min-height: 264px;
  max-height: 264px;
}

.loading-container-in-dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 284px;
>>>>>>> migrate
}
</style>
