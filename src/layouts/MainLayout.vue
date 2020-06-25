<template>
  <div class='main-layout'>
    <div class='button-container'>
      <button
        v-for="token in tokens"
        :class="{ 'tab-clicked': activeTab === token }"
        :key="token"
        @click="changeTab(token)"
      >
        {{ token }}
      </button>
    </div>
    <div class='vesting-address-container'>
      <div class='vesting-address'>
        <img
          src='@/assets/Images/TokamakNetworkLogo.png'
          height='43px'
          width='180px'
        />
      </div>
      <div class='vesting-address-intro'>Vesting address:</div>
      <div class='vesting-address-details'>{{ address }}</div>
    </div>
    <div class='table-container'>
      <div class='table-info'>
        <div>
          <user-info-container
            :tab='tab'
            :address='address'
            :start='start'
            :end='end'
            :cliff='cliff'
            :total='total'
            :released='released'
            :releasable='releasable'
            :vested='vested'
            :beneficiary='beneficiary'
            :owner='owner'
            :revocable='revocable'
            :revoked='revoked'
          />
        </div>
      </div>
      <div class='table-graph'>
        Vesting Schedule
        <graph-container
          :tab='tab'
          :address='address'
          :start='start'
          :end='end'
          :cliff='cliff'
          :total='total'
          :released='released'
          :vested='vested'
          :decimals='decimals'
          :beneficiary='beneficiary'
          :owner='owner'
          :revocable='revocable'
          :revoked='revoked'
          :releasable='releasable'
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import store from '@/store/index.js';

import UserInfo from '@/containers/UserInfoContainer.vue';
import GraphContainer from '@/containers/GraphContainer.vue';
import { createWeb3Contract } from '@/helpers/Contract';
import { getConfig } from '../../config.js';
import TokenABI from '@/contracts/abi/TON.json';
import VestingTokenABI from '@/contracts/abi/VestingToken.json';

import { createCurrency } from '@makerdao/currency';
const _TON = createCurrency('TON');

export default {
  components: {
    'graph-container': GraphContainer,
    'user-info-container': UserInfo
  },
  Computed: {
    ...mapState([
      'web3',
      'user',
      'marketingTon',
      'strategicTon',
      'seedTon',
      'privateTon'
    ]),
    async tokenList () {
      return await this.tokens.map(token => {
        const network = getConfig().rinkeby.contractAddress[token];
        this.address = network.vesting;
        const tokenAddress = this.address;
        const tokenContract = createWeb3Contract(VestingTokenABI, tokenAddress);
        const balance = tokenContract.methods
          .releasableAmount(store.state.user)
          .call();
        if (balance !== 0) {
          return token;
        }
      });
    }
  },
  async created () {
    // this.tokenList();
    this.getMarketing();
  },
  // beforeDestroy () {
  //   clearInterval(this.polling);
  // },
  data () {
    return {
      totalBalance: '',
      tokens: ['SeedTON', 'PrivateTON', 'MarketingTON', 'StrategicTON'],
      tab: '',
      address: '0x8Ae43F11DDd3fac5bbD84ab0BA795E1e51b78df7',
      activeTab: '',
      SeedTON: true,
      PrivateTON: true,
      MarketingTON: true,
      StrategicTON: true,
      marketing: {
        start: '',
        end: '',
        cliff: '',
        total: '',
        released: '',
        vested: '',
        decimals: '',
        beneficiary: '',
        owner: '',
        revocable: '',
        revoked: '',
        releasable: ''
      },
      private: {},
      strategic: {},
      seed: {},
      start: '',
      end: '',
      cliff: '',
      total: '',
      released: '',
      vested: '',
      decimals: '',
      beneficiary: '',
      owner: '',
      revocable: '',
      revoked: '',
      releasable: ''
    };
  },
  methods: {
    async changeTab (tab) {
      this.activeTab = tab;
      this.tab = tab;
      const network = getConfig().rinkeby.contractAddress[tab];

      this.address = network.vesting;

      const tokenVesting = createWeb3Contract(VestingTokenABI, network.vesting);
      const Vesting = store.state.marketingTon;
      console.log(Vesting);
      const startDate = await tokenVesting.methods.start().call();
      const duration = await tokenVesting.methods.duration().call();
      const endDate = Number(startDate) + Number(duration);
      const cliffDate = await tokenVesting.methods.cliff().call();

      const released = await tokenVesting.methods.released(store.state.user).call();

      const releasableAmount = await tokenVesting.methods.releasableAmount(store.state.user).call();

      const balance = await tokenVesting.methods.balanceOf(store.state.user).call();
      const totalAmount = Number(balance) + Number(released);

      this.start = new Date(Number(startDate) * 1000);
      this.end = new Date(endDate * 1000);
      this.cliff = new Date(Number(cliffDate) * 1000);
      this.released = _TON(released, 'wei');
      this.total = _TON(totalAmount, 'wei');
      this.releasable = _TON(releasableAmount, 'wei');
      // this.vested = await tokenVesting.methods.vestedAmount(store.state.user).call()
      this.beneficiary = store.state.user;

      // this.revocable = await tokenVesting.methods.revocable().call()
      // this.revoked = await tokenVesting.methods.revoked(store.state.user).call()
    },
    async getMarketing () {
      const network = getConfig().rinkeby.contractAddress.MarketingTON.vesting;

      const tokenVesting = createWeb3Contract(VestingTokenABI, network);
      const Vesting = store.state.marketingTon;
      console.log(Vesting);
      const startDate = await tokenVesting.methods.start().call();
      const duration = await tokenVesting.methods.duration().call();
      const endDate = Number(startDate) + Number(duration);
      const cliffDate = await tokenVesting.methods.cliff().call();

      const released = await tokenVesting.methods.released(store.state.user).call();

      const releasableAmount = await tokenVesting.methods.releasableAmount(store.state.user).call();

      const balance = await tokenVesting.methods.balanceOf(store.state.user).call();
      const totalAmount = Number(balance) + Number(released);
      console.log(balance);
      this.marketing.start = new Date(Number(startDate) * 1000);
      this.marketing.end = new Date(endDate * 1000);
      this.marketing.cliff = new Date(Number(cliffDate) * 1000);
      this.marketing.released = _TON(released, 'wei');
      this.marketing.total = _TON(totalAmount, 'wei');
      this.marketing.releasable = _TON(releasableAmount, 'wei');
      // this.vested = await tokenVesting.methods.vestedAmount(store.state.user).call()
      this.marketing.beneficiary = store.state.user;
      console.log(this.marketig);
    },
    // poll () {
    //   this.polling = setInterval(() => {
    //     if (this.$store.state.signIn) {
    //       this.$store.dispatch('set', this.web3);
    //     }
    //   }, 13000); // 13s
    // },
  }
};
</script>

<style>
.main-layout {
  display: flex;
  min-width: 960px;
  max-width: 960px;
  padding-top: 16px;
  padding-bottom: 2rem;
  flex-direction: column;
}

.button-container {
  margin-bottom: 10px;
}

.table-container {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  height: 100%;
  min-width: 720px;
  max-width: 960px;
}
.vesting-address-container {
  margin-bottom: 10px;
  padding-right: 20px;
  width: max-content;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.vesting-address {
  border-right: solid 1px #99ddff;
  padding-top: 5px;
  padding-right: 20px;
}
.vesting-address-intro {
  padding-left: 20px;
  font-size: 15px;
}
.vesting-address-details {
  padding-left: 20px;
  font-size: 15px;
  color: #003366;
}

.table-info {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-graph {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
}
button {
  width: 100px;
  height: 30px;
  padding-top: 2px;
  font-family: Roboto;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  font-size: 11px;
  color: #161819;
}
.button:hover {
  cursor: pointer;
  background-color: #ecf1f3;
}
.disable:hover {
  cursor: not-allowed;
}
.tab-clicked {
  background-color: #1e4e85;
  color: #ffffff;
}
</style>
