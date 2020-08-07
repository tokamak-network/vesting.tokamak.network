<template>
  <div class="select-wallet-container">
    <div class="wallet-header-title">
      Login
    </div>
    <div class="wallet-container">
      <wallet
        :title="'MetaMask'"
        :image="'Metamask.jpg'"
        :connect="useMetamask"
      />
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';
import { getConfig } from '../../config.js';
import { setProvider } from '@/helpers/Contract';
import { mapState } from 'vuex';
import Wallet from '@/components/Wallet.vue';

export default {
  components: {
    wallet: Wallet,
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async useMetamask () {
      try {
        const web3 = await this.metamask();
        await this.$store.dispatch('signIn', web3);

        window.ethereum.on('chainChanged', (chainId) => {
          this.$store.dispatch('logout');
          this.$router
            .replace({
              path: '/',
              query: { network: this.$route.query.network },
            }).catch(err => {});
        });
        window.ethereum.on('accountsChanged', (account) => {
          if (this.user.toLowerCase() !== account[0].toLowerCase()) {
            this.$store.dispatch('logout');
            this.$router.replace({
              path: '/',
              query: { network: this.$route.query.network },
            }).catch(err => {
            });
          }
        });
      } catch (e) {
        alert(e.message);
      }
    },
    async metamask () {
      let provider;
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.enable();
          provider = window.ethereum;
        } catch (e) {
          if (e.stack.includes('Error: User denied account authorization')) {
            throw new Error('User denied account authorization');
          } else {
            throw new Error(e.message);
          }
        }
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else {
        throw new Error('No web3 provider detected');
      }

      // if (provider.networkVersion !== getConfig().network) {
      //   throw new Error(
      //     `Please connect to the '${this.$options.filters.nameOfNetwork(
      //       getConfig().network
      //     )}' network`
      //   );
      // }

      return new Web3(provider);
    },
  },
};
</script>

<style scoped>
.select-wallet-container {
  display: flex;
  flex-direction: column;
  padding-left: 32px;
}

.wallet-header-title {
  font-family: OpenSeas;
  font-size: 20px;
  padding-left: 8px;
  padding-bottom: 2px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  text-align: left;
  color: #b2b7b9;
}
</style>
