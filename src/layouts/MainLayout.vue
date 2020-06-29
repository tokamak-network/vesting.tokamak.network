<template>
  <div class="main-layout">
    <div class="button-container">
      <button
        v-for="token in tokens"
        :key="token"
        :class="{ 'tab-clicked': activeTab === token }"
        @click="changeTab(token)"
      >
        {{ token }}
      </button>
    </div>
    <div class="vesting-address-container">
      <div class="vesting-address">
        <img src="@/assets/Images/TokamakNetworkLogo.png" height="43px" width="180px">
      </div>
      <div class="vesting-address-intro">Vesting address:</div>
      <div class="vesting-address-details">{{ address }}</div>
    </div>
    <div class="vesting-table-container">
      <div class="table-info">
        <div>
          <user-info-container
            :tab="tab"
            :address="address"
            :start="start"
            :end="end"
            :cliff="cliff"
            :total="total"
            :released="released"
            :releasable="releasable"
            :vested="vested"
            :beneficiary="beneficiary"
            :owner="owner"
            :revocable="revocable"
            :revoked="revoked"
          />
        </div>
      </div>
      <div class="table-graph">
        <graph-container
          :tab="tab"
          :start="graphStart"
          :end="graphEnd"
          :cliff="graphCliff"
          :total="graphTotal"
          :decimals="graphDecimals"
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
const _MTON = createCurrency('MTON');
const _SeedTON = createCurrency('SeedTON');
const _PTON = createCurrency('PTON');
const _StrategicTON = createCurrency('StrategicTON');

export default {
  components: {
    'graph-container': GraphContainer,
    'user-info-container': UserInfo,
  },
  Computed: {
    ...mapState([
      'web3',
      'user',
      'marketingTON',
      'strategicTON',
      'seedTON',
      'privateTON',
      'marketingBalance',
      'seedBalance',
      'strategicBalance',
      'privateBalance',
    ]),
  },
  // beforeDestroy () {
  //   clearInterval(this.polling);
  // },
  data () {
    return {
      totalBalance: '',
      tokens: [],
      tab: '',
      address: '',
      activeTab: '',
      SeedTON: true,
      PrivateTON: true,
      MarketingTON: true,
      StrategicTON: true,

      private: {},
      strategic: {},
      seed: {},
      start: '',
      end: '',
      cliff: '',
      total: '',
      released: '',
      vested: '',
      beneficiary: '',
      owner: '',
      revocable: '',
      revoked: '',
      releasable: '',
      graphStart:'',
      graphEnd:'',
      graphCliff:'',
      graphTotal:'',
      graphDecimals: '',

    };
  },
  async created () {
    this.tokenList();
    // this.getMarketing();
  },
  methods: {
    async tokenList () {
      if (store.state.seedBalance !== String(0)) {
        this.tokens.push('SeedTON');
      }
      if (store.state.privateBalance !== String(0)) {
        this.tokens.push('PrivateTON');
      }
      if (store.state.marketingBalance !== String(0)) {
        this.tokens.push('MarketingTON');
      }
      if (store.state.strategicBalance !== String(0)) {
        this.tokens.push('StrategicTON');
      }
      this.tab = await this.changeTab(this.tokens[0]);
    },
    async changeTab (tab) {
      this.activeTab = tab;
      this.tab = tab;
      const network = getConfig().rinkeby.contractAddress[tab];

      this.address = network.vesting;

      const tokenVesting = createWeb3Contract(VestingTokenABI, network.vesting);
      // const tokenVesting = store.state.marketingTON;
      // console.log(store.state.marketingTON);
      const startDate = await tokenVesting.methods.start().call();
      this.graphStart = startDate;
      const duration = await tokenVesting.methods.duration().call();
      const endDate = Number(startDate) + Number(duration);
      this.graphEnd = endDate;
      const cliffDate = await tokenVesting.methods.cliff().call();
      this.graphCliff = cliffDate;
      const released = await tokenVesting.methods.released(store.state.user).call();
      const releasableAmount = await tokenVesting.methods.releasableAmount(store.state.user).call();
      const vestedAmount = Number(released) + Number(releasableAmount);

      const balance = await tokenVesting.methods.balanceOf(store.state.user).call();
      const totalAmount = Number(balance) + Number(released);
      this.graphDecimals = await tokenVesting.methods.decimals().call();
      this.start = new Date(Number(startDate) * 1000);
      this.end = new Date(endDate * 1000);
      this.cliff = new Date(Number(cliffDate) * 1000);

      if (tab === 'SeedTON') {
        this.released = _SeedTON(released, 'wei');
        this.total = _SeedTON(totalAmount, 'wei');
        this.graphTotal = _SeedTON(totalAmount);
        this.releasable = _SeedTON(releasableAmount, 'wei');
        this.vested = _SeedTON(vestedAmount, 'wei');
      } else if (tab === 'PrivateTON') {
        this.released = _PTON(released, 'wei');
        this.total = _PTON(totalAmount, 'wei');
        this.graphTotal = _PTON(totalAmount);
        this.releasable = _PTON(releasableAmount, 'wei');
        this.vested = _PTON(vestedAmount, 'wei');
      } else if (tab === 'MarketingTON') {
        this.released = _MTON(released, 'wei');
        this.total = _MTON(totalAmount, 'wei');
        this.graphTotal = _MTON(totalAmount);
        this.releasable = _MTON(releasableAmount, 'wei');
        this.vested = _MTON(vestedAmount, 'wei');
      } else if (tab === 'StrategicTON') {
        this.released = _StrategicTON(released, 'wei');
        this.total = _StrategicTON(totalAmount, 'wei');
        this.graphTotal = _StrategicTON(totalAmount);
        this.releasable = _StrategicTON(releasableAmount, 'wei');
        this.vested = _StrategicTON(vestedAmount, 'wei');
      }
      this.beneficiary = store.state.user;
      // this.revocable = await tokenVesting.methods.revocable().call()
      // this.revoked = await tokenVesting.methods.revoked(store.state.user).call()
    },
    // async getMarketing () {
    //   const network = getConfig().rinkeby.contractAddress.MarketingTON.vesting;

    //   const tokenVesting = createWeb3Contract(VestingTokenABI, network);
    //   const Vesting = store.state.marketingTON;
    //   // console.log(Vesting);
    //   const startDate = await tokenVesting.methods.start().call();
    //   const duration = await tokenVesting.methods.duration().call();
    //   const endDate = Number(startDate) + Number(duration);
    //   const cliffDate = await tokenVesting.methods.cliff().call();

    //   const released = await tokenVesting.methods.released(store.state.user).call();

    //   const releasableAmount = await tokenVesting.methods.releasableAmount(store.state.user).call();

    //   const balance = await tokenVesting.methods.balanceOf(store.state.user).call();
    //   const totalAmount = Number(balance) + Number(released);

    //   this.marketing.start = new Date(Number(startDate) * 1000);
    //   this.marketing.end = new Date(endDate * 1000);
    //   this.marketing.cliff = new Date(Number(cliffDate) * 1000);
    //   this.marketing.released = _TON(released, 'wei');
    //   this.marketing.total = _TON(totalAmount, 'wei');
    //   this.marketing.releasable = _TON(releasableAmount, 'wei');
    //   // this.vested = await tokenVesting.methods.vestedAmount(store.state.user).call()
    //   this.marketing.beneficiary = store.state.user;
    //   // console.log(this.marketig);
    // },
    // poll () {
    //   this.polling = setInterval(() => {
    //     if (this.$store.state.signIn) {
    //       this.$store.dispatch('set', this.web3);
    //     }
    //   }, 13000); // 13s
    // },
  },
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
  width: max-content;
  background: #fff;
  border-radius: 7px;
  border: 1px solid #ced6d9;
}

.vesting-table-container {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  height: 100%;
  min-width: 720px;
  max-width: 960px;
  min-height: 350px;
  max-height: 350px;
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
  margin-right: 20px;
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
}
button {
  width: 120px;
  height: 30px;
  padding-top: 2px;
  font-family: Roboto;
  font-weight: bold;
  font-size: 11px;
  background: #fff;
  color: #c4c4c4;
  border-radius: 7px;
  border: 1px solid transparent; 
  font: 13px/1.5 "Helvetica Neue", Arial, "Liberation Sans", FreeSans, sans-serif;
}
button:hover {
  cursor: pointer;
  background-color: #f7f8f9;
}
button:focus {
  outline: none;
}
.disable:hover {
  cursor: not-allowed;
}
.tab-clicked {
  background: #f7f8f9;
  color: #000;
}
</style>
