<template>
  <div class="main-layout">
    <div class="button-container">
      <button
        v-for="token in tokens"
        :class="{ 'tab-clicked': activeTab === token }"
        :key="token"
        @click="changeTab(token)"
      >
        {{ token }}
      </button>
    </div>
    <div class="vesting-address-container">
      <div class="vesting-address">
        <img
          src="@/assets/Images/TokamakNetworkLogo.png"
          height="43px"
          width="180px"
        />
      </div>
      <div class="vesting-address-intro">Vesting address:</div>
      <div class="vesting-address-details">{{ address }}</div>
    </div>
    <div class="table-container">
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
        <graph />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import store from '@/store/index.js';

import Graph from '@/components/Graph.vue';
import UserInfo from '@/containers/UserInfoContainer.vue';

import { createWeb3Contract } from '@/helpers/Contract';
import { getConfig } from '../../config.js';
import TokenABI from '@/contracts/abi/TON.json';
import VestingTokenABI from '@/contracts/abi/VestingToken.json';
import Swapper from '@/contracts/abi/Swapper.json';

import { createCurrency } from '@makerdao/currency';
const _TON = createCurrency('TON');

export default {
  components: {
    graph: Graph,
    'user-info-container': UserInfo,
  },
  Computed: {
    ...mapState([
      'web3',
      'user',
      'marketingTon',
      'strategicTon',
      'seedTon',
      'privateTon',
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
    },
  },
  // async created () {
  //   this.tokenList();
  // },
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
    };
  },
  methods: {
    async changeTab (tab) {
      this.activeTab = tab;
      this.tab = tab;
      const network = getConfig().rinkeby.contractAddress[tab];

      this.address = network.vesting;

      const tokenVesting = createWeb3Contract(VestingTokenABI, network.vesting);
      // const tokenVesting = this.marketingTon;
      const startDate = await tokenVesting.methods.start().call();
      const duration = await tokenVesting.methods.duration().call();
      const endDate = Number(startDate) + Number(duration);
      const cliffDate = await tokenVesting.methods.cliff().call();

      const released = await tokenVesting.methods.released(store.state.user).call();

      const releasableAmount = await tokenVesting.methods.releasableAmount(store.state.user).call();
      const totalAmount = Number(releasableAmount) + Number(released);
      // const balance = await tokenVesting.methods.balanceOf(this.user).call();
      // console.log(balance);

      this.start = new Date(Number(startDate)*1000);
      this.end = new Date(endDate*1000);
      this.cliff = new Date(Number(cliffDate)*1000);
      this.released = _TON(released, 'wei');
      this.total = _TON(totalAmount, 'wei');
      this.releasable = _TON(releasableAmount, 'wei');
      // this.vested = await tokenVesting.methods.vestedAmount(store.state.user).call()
      this.beneficiary = store.state.user;
      // this.owner = await tokenVesting.methods.owner().call()
      // this.revocable = await tokenVesting.methods.revocable().call()
      // this.revoked = await tokenVesting.methods.revoked(store.state.user).call()

      // console.log(this.start)
      // console.log(this.end)
      // console.log(this.cliff)
      // console.log(this.released)
      // console.log(this.total)
      // console.log(this.releasable)
    },
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
