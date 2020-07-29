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
    <text-viewer :title="'Cliff'"
                 :content="formatDate(cliff)"
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
    <text-viewer :title="'Total vesting'"
                 :content="total"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Already vested'"
                 :content="vested"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Already relased'"
                 :content="released"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer-rate :title="'Releasable'"
                      :content="releasable"
                      :rate="rate"
                      :with-divider="false"
                      :tooltip="'Introduction to the operator'"
                      :tooltipWidth="'180px'"
                      :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Deposited'"
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
    <div v-show="parseFloat(tokenBalance) !== 0" class="release-button-container">
      <button class="button-release" @click="parseFloat(deposited) !== 0?swap(address):deposit(address)">{{ parseFloat(deposited) !== 0? 'Swap':'Deposit' }}</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SwapperABI from '@/contracts/abi/Swapper.json';
import { getConfig } from '../../config.js';
import { createWeb3Contract } from '@/helpers/Contract';
import TextViewer from '@/components/TextViewer.vue';
import TextViewerLink from '@/components/TextViewerLink.vue';
import TextViewerRate from '@/components/TextViewerRate.vue';
import store from '@/store/index.js';
import moment from 'moment';

export default {
  components: {
    'text-viewer': TextViewer,
    'text-viewer-link': TextViewerLink,
    'text-viewer-rate':TextViewerRate,
  },
  props: ['tab', 'start', 'end', 'cliff', 'total', 'released', 'vested', 'deposited', 'releasable', 'address', 'rate' ],
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
    ]),
    tokenBalance () {
      return this.balanceByToken(this.tab, this.confirmed);
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
    async swap (vestingAddress) {
      const contractAddress = getConfig().rinkeby.contractAddress.StepSwapper;
      const swapper = createWeb3Contract(SwapperABI, contractAddress);
      await swapper.methods.swap(vestingAddress).send({
        from: this.user,
      }).on('receipt', (receipt) => {
        if (!receipt.status) {
          this.$notify({
            group: 'reverted',
            title: 'Transaction is reverted',
            type: 'error',
            duration: 5000,
          });
        }
        this.$router.replace({
          path: this.from.path,
          query: { network: this.$route.query.network },
        }).catch(err => {});
      }).on('confirmation', (confirmationNumber, receipt) =>{
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
      });
    },
    deposit ( vestingAddress ){
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
  /* margin-bottom: 10px;
 margin-left: 16px; */
 display: flex;
 justify-content: center;
 /* width: 100%; */
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

.button-commit {
  color: #ffffff;
  background-color: #f38776;
  border: 1px solid #f38776;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
  height: 24px;
  margin-right: 16px;
}

.button-commit:hover {
  cursor: pointer;
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

</style>
