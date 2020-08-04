<template>
  <div class="user-info-container">
    <div class="title">
      Vesting Details for {{ tab }}
    </div>
    <text-viewer-link :title="'Beneficiary'"
                      :content="user"
                      :type="'address'"
                      :with-divider="false"
                      :tooltip="'Introduction to the operator'"
                      :tooltipWidth="'180px'"
                      :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Start date'"
                 :content="formatDate(start)"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'End date'"
                 :content="formatDate(end)"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer-Number :title="'Releasable Tokens'"
                        :content="releasable"
                        :with-divider="false"
                        :tooltip="'Introduction to the operator'"
                        :tooltipWidth="'180px'"
                        :tooltipMarginTop="'-9px'"
    />
    <text-viewer-rate :title="'Releasable TON'"
                      :content="releasable"
                      :rate="rate"
                      :with-divider="false"
                      :tooltip="'Introduction to the operator'"
                      :tooltipWidth="'180px'"
                      :tooltipMarginTop="'-9px'"
    />
    <text-viewer-ratio :title="'Conversion Ratio'"
                       :tab="tab"
                       :rate="rate"
                       :with-divider="false"
                       :tooltip="'Introduction to the operator'"
                       :tooltipWidth="'180px'"
                       :tooltipMarginTop="'-9px'"
    />
    <text-viewer-Number :title="'Deposited'"
                        :content="deposited"
                        :with-divider="false"
                        :tooltip="'Introduction to the operator'"
                        :tooltipWidth="'180px'"
                        :tooltipMarginTop="'-9px'"
    />
    <notifications group="confirmed"
                   position="bottom right"
                   :speed="500"
    />
    <notifications group="reverted"
                   position="bottom right"
                   :speed="500"
    />
    <div v-show="tab === 'SeedTON' || tab === 'PrivateTON' || tab === 'StrategicTON'" class="release-button-container">
      <button :disabled="!showButtonForMainTon" class="button-release" :class="{ 'not-allowed': !showButtonForMainTon }" :style="{background: color}" @click="parseFloat(tokenBalance) !== 0?deposit(address):swapFirstTokens(address)">{{ parseFloat(tokenBalance) !== 0? 'Deposit':'Swap' }}</button>
    </div>
    <div v-show="tab === 'TeamTON' || tab === 'AdvisorTON' || tab === 'BusinessTON' || tab === 'ReserveTON' || tab === 'DaoTON'" class="release-button-container">
      <button :disabled="!showButtonForOtherTon" class="button-release" :class="{ 'not-allowed': !showButtonForOtherTon }" :style="{background: color}" @click="swapperAddressecondTokens(address)">Swap</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SimpleSwapperABI from '@/contracts/abi/Swapper.json';
import VestingSwapperABI from '@/contracts/abi/VestingSwapper.json';
import VestingTokenABI from '@/contracts/abi/VestingToken.json';
import { getConfig } from '../../config.js';
import { createWeb3Contract } from '@/helpers/Contract';
import TextViewer from '@/components/TextViewer.vue';
import TextViewerLink from '@/components/TextViewerLink.vue';
import TextViewerRate from '@/components/TextViewerRate.vue';
import TextViewerNumber from '@/components/TextViewerNumber.vue';
import TextViewerRatio from '@/components/TextViewerRatio.vue';
import store from '@/store/index.js';
import moment from 'moment';

export default {
  components: {
    'text-viewer': TextViewer,
    'text-viewer-link': TextViewerLink,
    'text-viewer-rate':TextViewerRate,
    'text-viewer-ratio':TextViewerRatio,
    'text-viewer-Number':TextViewerNumber,
  },
  props: ['tab', 'start', 'end', 'cliff', 'total', 'released', 'vested', 'deposited', 'releasable', 'address', 'rate', 'graphTotal' ],
  data () {
    return {
      confirmed:false,
    };
  },
  computed : {
    ...mapState([
      'web3',
      'user',
    ]),
    ...mapGetters([
      'balanceByToken',
      'releasableByToken',
    ]),
    tokenBalance () {
      return this.balanceByToken(this.tab, this.confirmed);
    },
    tokenReleasable () {
      return this.releasableByToken(this.tab, this.confirmed);
    },
    showButtonForMainTon () {
      const releasable = parseFloat(this.tokenReleasable);
      const balance = parseFloat(this.tokenBalance);
      if (releasable === 0 && balance === 0){
        return false;
      }
      else if (releasable !==0 || balance !==0){
        return true;
      }
      else{
        return true;
      }
    },
    showButtonForOtherTon (){
      const releasable = parseFloat(this.tokenReleasable);
      if (releasable !== 0 ) {
        return true;
      }
      else {
        return false;
      }
    },
    color (){
      const color = parseFloat(this.tokenBalance) !== 0?'#f7f8f9':'#B2B5B7';
      return color;
    },
  },
  methods: {
    formatDate (date) {
      const moments = require('moment-timezone');
      const zoneName =  moments.tz.guess();
      const timezone = moments.tz(zoneName).zoneAbbr();
      const dateFormatted = moment(date * 1000).format('MM/DD/YYYY HH:mm:ss ') + (timezone);
      return dateFormatted;
    },
    async swapFirstTokens (vestingAddress) {
      const swapperAddress = getConfig().rinkeby.contractAddress.VestingSwapper;
      const swapper = createWeb3Contract(VestingSwapperABI, swapperAddress);
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
        if(confirmationNumber === 0){
          this.confirmed = !this.confirmed;
          this.$store.dispatch('setBalance');
          this.$store.dispatch('setTokenInfo');
          this.$notify({
            group: 'confirmed',
            title: 'Transaction is confirmed',
            type: 'success',
            duration: 5000,
          });
          this.$emit('releaseClicked', this.confirmed);
          this.$emit('changeActiveTab', this.confirmed);
        }
      });
    },
    async deposit ( vestingAddress ){
      const swapperAddress = getConfig().rinkeby.contractAddress.VestingSwapper;
      const swapper = createWeb3Contract(VestingSwapperABI, swapperAddress);
      const tokenVesting = createWeb3Contract(VestingTokenABI, vestingAddress);
      await tokenVesting.methods.approveAndCall(swapperAddress, this.graphTotal, []).send({
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
            this.confirmed = !this.confirmed;
            this.$store.dispatch('setBalance');
            this.$emit('releaseClicked', this.confirmed);
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
    async swapperAddressecondTokens (vestingAddress){
      const swapperAddress = getConfig().rinkeby.contractAddress.StepSwapper;
      const swapper = createWeb3Contract(SimpleSwapperABI, swapperAddress);
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
            this.confirmed = !this.confirmed;
            this.$store.dispatch('setBalance');
            this.$emit('releaseClicked', this.confirmed);
            this.$emit('changeActiveTab', this.confirmed);
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

<style scoped>
.user-info-container {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: solid 1px #ced6d9;
  background-color: #ffffff;
  height: 350px;
}

.release-button-container {
 display: flex;
 justify-content: center;
 display: flex;
 justify-self: center;
}

.name-container {
  padding-top: 12px;
  padding-bottom: 12px;
  margin-left: 16px;
}
.title {
  margin-top: 10px;
  text-align: center;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name {
  width: 200px;
  padding-left: 16px;
  padding-right: 8px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #161819;
  word-break: break-all;
}

.button-release {
  color: #000000;
  text-align: center;
  font-size: 14px;
  height: 25px;
  margin-left: 16px;
  border-radius: 7px;
  border: 1px solid #ced6d9;
}

.button {
  width: 100%;
  height: 100%;
}

.button:hover {
  cursor: pointer;
}

.disable:hover {
  cursor: not-allowed;
}
.not-allowed{
  color: #ced6d9;
  background: #f7f8f9;
}
.not-allowed:hover {
  cursor: not-allowed;
}

</style>
