<template>
  <div class="main-layout">
    <div class="button-container">
      <token-button
        v-if="SeedTON"
        :label="'Seed'"
        @op-clicked="changeTab('SeedTON')"
      />
      <token-button
        v-if="PrivateTON"
        :label="'Private'"
        @op-clicked="changeTab('PrivateTON')"
      />
      <token-button
        v-if="MarketingTON"
        :label="'Marketing'"
        @op-clicked="changeTab('MarketingTON')"
      />
      <token-button
        v-if="StrategicTON"
        :label="'Strategic'"
        @op-clicked="changeTab('StrategicTON')"
      />
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
      <div class="table-graph">
        <graph />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import TokenButton from '@/components/TokenButton.vue'
import Graph from '@/components/Graph.vue'
import UserInfo from '@/containers/UserInfoContainer.vue'

import { createWeb3Contract } from '@/helpers/Contract';
import { getConfig } from '../../config.js'
// import TokenABI from '@/contracts/abi/TON.json';
import VestingTokenABI from '@/contracts/abi/VestingToken.json';

import store from '@/store/index.js';

export default {
  components: {
    'token-button': TokenButton,
    graph: Graph,
    'user-info-container': UserInfo,
  },
  computed: {
    ...mapState([
      'web3',
      'user'
    ]),
  },
  // async created () {
  //   this.poll();
  // },
  // beforeDestroy () {
  //   clearInterval(this.polling);
  // },
  data () {
    return {
      tab: 'SeedTON',
      SeedTON: true,
      PrivateTON: true,
      MarketingTON: false,
      StrategicTON: true,
      address: '0x8Ae43F11DDd3fac5bbD84ab0BA795E1e51b78df7',
      totalBalance: '',

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
    }
  },
  methods: {
    async changeTab (tab) {
      this.tab = tab
      const network = getConfig().rinkeby.contractAddress[tab]
      // console.log(network)
      this.address = network.token
      console.log(network.vesting)
      // const tokenAddress = this.address
      // const tokenContract = createWeb3Contract(TokenABI, tokenAddress)
      const tokenVesting = createWeb3Contract(VestingTokenABI, network.vesting);

      const startDate = await tokenVesting.methods.start().call();
      const duration = await tokenVesting.methods.duration().call();
      const endDate = startDate + duration

      const released = await tokenVesting.methods.released(store.state.user).call();

      const releasableAmount = await tokenVesting.methods.releasableAmount(store.state.user).call();

      this.start = startDate
      this.end = endDate
      this.cliff = await tokenVesting.methods.cliff().call()
      this.released = released
      this.total = releasableAmount + released
      this.releasable = releasableAmount
      // this.vested = await tokenVesting.methods.vestedAmount(store.state.user).call()
      this.beneficiary = store.state.user
      // this.owner = await tokenVesting.methods.owner().call()
      // this.revocable = await tokenVesting.methods.revocable().call()
      // this.revoked = await tokenVesting.methods.revoked(store.state.user).call()
      const init = await tokenVesting.methods.initiated().call();
      console.log(init)

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
  }
}
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
</style>
