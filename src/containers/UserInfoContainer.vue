<template>
  <div class="user-info-container">
    <div class="title">
      Vesting Details for {{ tab }}
    </div>
    <text-viewer :title="'Beneficiary'"
                 :content="user"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Start date'"
                 :content="start"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Cliff'"
                 :content="cliff"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'End date'"
                 :content="end"
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
    <text-viewer :title="'Releasable'"
                 :content="releasable"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Revocable'"
                 :content="revocable"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
  </div>
</template>

<script>
// import { cloneDeep, isEqual, range, uniq, orderBy } from 'lodash';

// import { setPendingTransactions, getPendingTransactions } from '@/helpers/localStorage';
// import SwapperABI from '@/contracts/abi/Swapper.json';
import { mapState, mapGetters } from 'vuex';

// import { getConfig } from '../../config.js';
import TextViewer from '@/components/TextViewer.vue';


export default {
  components: {
    'text-viewer': TextViewer,
  },
  data () {
    return {
      releasable: '',
    }
  },
  props: ['address', 'tab', 'start', 'end', 'cliff', 'total', 'released', 'vested', 'decimals', 'beneficiary', 'owner', 'revocable', 'revoked'],
  // created () {
  //   this.getVestingInfo()
  // },
  computed : {
    ...mapState([
      'web3',
      'user'
    ]),
    ...mapGetters([
      'vestingInfo'
    ]),
    // calcReleasable () {
    //   this.releasable = vested ? vested - released : null
    //   return releasable
    // },
  },
}
</script>

<style scoped>
.user-info-container {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: solid 1px #ced6d9;
  background-color: #ffffff;
}

.name-container {
  padding-top: 12px;
  padding-bottom: 12px;
  margin-left: 16px;
}
.title {
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

.button {
  color: #ffffff;
  background-color: #35496b;
  border: 1px solid #35496b;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
  height: 22px;
  width: 40px;
  margin-right: 16px;
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
</style>