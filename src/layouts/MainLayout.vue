<template>
  <div v-if="tokenInformation !== undefined" class="main-layout">
    <div class="button-container">
      <button
        v-for="token in this.$store.state.tokenList"
        :key="token"
        :class="{ 'tab-clicked': activeTab === token }"
        @click="changeTab(token)"
      >
        {{ token }}
      </button>
    </div>
    <div class="vesting-address-container">
      <div class="vesting-address">
        <div class="vesting-address-intro">Ton Balance:</div>
        <div class="vesting-address-details">{{ parseFloat(updateTonBalance).toLocaleString('en-US', {minimumFractionDigits: 2}) }} {{ updateTonBalance.symbol }}</div>
      </div>
      <div class="vesting-address-intro">Vesting address:</div>
      <div class="vesting-address-details">{{ tokenInformation['address'] }}</div>
    </div>
    <div v-if="activeTab === 'MarketingTON' && user !== owner" class="mton">
      <div>Swappable TON: {{ ((parseFloat(tokenInformation['totalBalance']) * 10) / 10).toLocaleString('en-US', {minimumFractionDigits: 2}) }}</div>
      <button :disabled="parseFloat(tokenInformation['totalBalance'])===0" class="release-button" :class="{ 'not-allowed': parseFloat(tokenInformation['totalBalance'])===0 }" :style="{background: color}" @click="parseFloat(tokenInformation['approvedAmount'])===0?mtonApprove():mtonSwap()">{{ parseFloat(tokenInformation['approvedAmount'])===0?'Approve':'Swap' }}</button>
      <notifications group="confirmed"
                     position="bottom right"
                     :speed="500"
      />
      <notifications group="reverted"
                     position="bottom right"
                     :speed="500"
      />
    </div>
    <div v-else class="vesting-table-container">
      <div :class="parseFloat(tokenInformation.totalDeposited) !== 0 ? 'table-info-with-graph':'table-info-without-graph'">
        <div>
          <user-info-container
            :key="activeTab"
            :tab="activeTab"
            :start="tokenInformation['startDate']"
            :end="tokenInformation['endDate']"
            :cliff="tokenInformation['cliffDate']"
            :total="tokenInformation['total']"
            :deposited="tokenInformation['totalDeposited']"
            :releasable="tokenInformation['releasable']"
            :address="tokenInformation['address']"
            :rate="tokenInformation['rate']"
            :graphTotal="tokenInformation['balanceUnformatted']"
            @releaseClicked="clickRelease"
          />
        </div>
      </div>
      <div v-if="parseFloat(tokenInformation.totalDeposited) !== 0" class="table-graph">
        <graph-container :key="activeTab"
                         :tab="activeTab"
                         :start="tokenInformation['startDate']"
                         :end="tokenInformation['endDate']"
                         :cliff="tokenInformation['cliffDate']"
                         :total="tokenInformation['graphTotal']"
                         :decimals="tokenInformation['graphDecimals']"
                         :rate="tokenInformation['rate']"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import store from '@/store/index.js';
import UserInfo from '@/containers/UserInfoContainer.vue';
import GraphContainer from '@/containers/GraphContainer.vue';
import MtonABI from '@/contracts/abi/MTON.json';
import SimpleSwapperABI from '@/contracts/abi/Swapper.json';
import { createWeb3Contract } from '@/helpers/Contract';
import { getConfig } from '../../config.js';

export default {
  components: {
    'graph-container': GraphContainer,
    'user-info-container': UserInfo,
  },
  data () {
    return {
      tab: '',
      operator:{},
      activeTab: this.$store.state.tokenList[0],
      address: '',
      confirmed:{
        type:Boolean,
      },
    };
  },
  computed:{
    ...mapState([
      'web3',
      'user',
      'tokenList',
      'tonBalance',
      'owner',
    ]),
    ...mapGetters([
      'tokenInfoByTab',
      'updateBalances',
    ]),
    tokenInformation () {
      return this.tokenInfoByTab(this.activeTab);
    },
    updateTonBalance (){
      return this.updateBalances(this.confirmed);
    },
  },
  beforeCreate (){
    if (this.$store.state.tokenList.length ===0){
      alert('you do not have tokens');
      this.$store.dispatch('logout');
      this.$router.replace({
        path: '/',
        query: { network: this.$route.query.network },
      }).catch(err => {});
    }
  },
  created () {
    console.log(this.user);
  },
  methods: {
    async changeTab (tab) {
      this.activeTab = tab;
      this.tab = tab;
    },
    clickRelease (confirmed){
      this.confirmed=confirmed;
    },
    changeActiveTab (confirmed){
      this.confirmed=confirmed;
      this.activeTab=this.$store.state.tokenList[0];
    },
    async mtonApprove (){
      const address = this.tokenInformation.address;
      const totalBalance = this.tokenInformation.totalBalance;
      const mton = createWeb3Contract(MtonABI, address);
      const swapperAddress = getConfig().rinkeby.contractAddress.StepSwapper;
      const balance = await mton.methods.balanceOf(this.user).call();
      await mton.methods.approve(swapperAddress, balance).send({
        from: this.user,
      }).on('error', (error) => {
        this.$notify({
          group: 'reverted',
          title: 'Transaction is reverted',
          type: 'error',
          duration: 5000,
        });
        this.$router.replace({
          path: this.from.path,
          query: { network: this.$route.query.network },
        }).catch(err => {});
      }).on('confirmation', (confirmationNumber, receipt) =>{
        if(confirmationNumber === 0){
          this.confirmed = !this.confirmed;
          this.$store.dispatch('setBalance');
          this.clickRelease(!this.confirmed);
          this.$store.dispatch('setTokenInfo');
          this.$notify({
            group: 'confirmed',
            title: 'Transaction is confirmed',
            type: 'success',
            duration: 5000,
          });
        }
      });
    },
    async mtonSwap (){
      const swapperAddress = getConfig().rinkeby.contractAddress.StepSwapper;
      const swapper = createWeb3Contract(SimpleSwapperABI, swapperAddress);
      const vestingAddress = this.tokenInformation.address;
      await swapper.methods.swap(vestingAddress).send({
        from: this.user,
      }).on('error', (error) => {
        this.$notify({
          group: 'reverted',
          title: 'Transaction is reverted',
          type: 'error',
          duration: 5000,
        });
        this.$router.replace({
          path: this.from.path,
          query: { network: this.$route.query.network },
        }).catch(err => {});
      }).on('confirmation', (confirmationNumber, receipt) =>{
        if (receipt.status){
          if(confirmationNumber === 0){
            this.activeTab=this.$store.state.tokenList[0];
            this.confirmed = !this.confirmed;
            this.$store.dispatch('setBalance');
            this.releaseClicked(this.confirmed);
            this.$store.dispatch('setTokenInfo');
            this.$notify({
              group: 'confirmed',
              title: 'Transaction is confirmed',
              type: 'success',
              duration: 5000,
            });
          }
        }
      });
    },
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
  justify-content: center;
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
  display: flex;
  justify-content: flex-start;
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

.table-info-with-graph {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.table-info-without-graph {
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
.mton{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 75px;
}
.release-button{
   color: #000000;
  text-align: center;
  font-size: 14px;
  height: 25px;
  margin: 16px;
  border-radius: 7px;
  border: 1px solid #ced6d9;
}
</style>
