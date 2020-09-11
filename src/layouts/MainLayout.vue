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
        <div class="vesting-address-intro">Vested Amount:</div>
        <div class="vesting-address-details">{{ parseFloat(updateVestedBalance).toLocaleString('en-US', {minimumFractionDigits: 2}) }} {{ activeTab }} </div>
        <div class="vesting-address-details-brackets">( = {{ (parseFloat(updateVestedBalance)*tokenInformation['rate']).toLocaleString('en-US', {minimumFractionDigits: 2}) }} TON )</div>
      </div>
      <div class="vesting-address-intro">| Your Current Balance :</div>
      <div class="vesting-address-details">{{ parseFloat(updateTonBalance).toLocaleString('en-US', {minimumFractionDigits: 2}) }} TON </div>
    </div>
    <div v-if="activeTab === 'MarketingTON'" class="mton">
      <div>Swappable TON: {{ ((parseFloat(tokenInformation['totalBalance']) * 10) / 10).toLocaleString('en-US', {minimumFractionDigits: 2}) }}</div>
      <button :disabled="parseFloat(tokenInformation['totalBalance'])===0"
              class="release-button"
              :class="{ 'not-allowed': parseFloat(tokenInformation['totalBalance'])===0 }"
              :style="{background: color}" @click="parseFloat(tokenInformation['approvedAmount'])===0?mtonApprove():mtonSwap()"
      >
        {{ parseFloat(tokenInformation['approvedAmount'])===0?'Approve':'Swap' }}
      </button>
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
            :released="tokenInformation['released']"
            :vested="tokenInformation['vested']"
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
    ]),
    ...mapGetters([
      'tokenInfoByTab',
      'updateBalances',
      'updateTonBalances',
    ]),
    tokenInformation () {
      return this.tokenInfoByTab(this.activeTab);
    },
    updateVestedBalance (){
      return this.updateBalances(this.activeTab, this.confirmed);
    },
    updateTonBalance (){
      return this.updateTonBalances(this.confirmed);
    },
    color (){
      const color = parseFloat(this.tokenInformation.approvedAmount)===0?'#fff':'#B2B5B7';
      return color;
    },
    swappedAllTokens () {
      return this.tokenList.length === 0;
    },
  },
  watch: {
    swappedAllTokens () {
      alert('You have swapped all your tokens');
      this.$store.dispatch('logout');
      this.$router.replace({
        path: '/',
        query: { network: this.$route.query.network },
      }).catch(err => {});
    },
    activeTab (){
      this.changeTab(this.activeTab);
    },
  },
  beforeCreate (){
    if (this.$store.state.tokenList.length ===0){
      alert('You do not have tokens');
      this.$store.dispatch('logout');
      this.$router.replace({
        path: '/',
        query: { network: this.$route.query.network },
      }).catch(err => {});
    }
  },
  methods: {
    async changeTab (tab) {
      this.activeTab = tab;
      this.tab = tab;
    },
    clickRelease (confirmed){
      this.confirmed=confirmed;
    },
    changeActiveTab (){
      this.activeTab = this.$store.state.tokenList[0];
      this.changeTab(this.$store.state.tokenList[0]);
    },
    async mtonApprove (){
      const address = this.tokenInformation.address;
      const totalBalance = this.tokenInformation.totalBalance;
      const mton = createWeb3Contract(MtonABI, address);
      const swapperAddress = getConfig().mainnet.contractAddress.StepSwapper;
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
      const swapperAddress = getConfig().mainnet.contractAddress.StepSwapper;
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
  padding-top: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.vesting-address-intro {
  padding-left: 20px;
  font-size: 15px;
}
.vesting-address-details-brackets {
  padding-left: 5px;
  font-size: 10px;
  display: flex;
  align-items: flex-end;

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
.not-allowed:hover {
  cursor: not-allowed;
}
.not-allowed{
  color: #c4c4c4;
  background: #f7f8f9;
}
</style>
