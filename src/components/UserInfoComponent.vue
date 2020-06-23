<template>
  <div class="user-info-container">
    <text-viewer :title="'Beneficiary'"
                 :content="beneficiary"
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
import { createWeb3Contract } from '@/helpers/Contract';
// import { setPendingTransactions, getPendingTransactions } from '@/helpers/localStorage';
// import SwapperABI from '@/contracts/abi/Swapper.json';
import VestingTokenABI from '@/contracts/abi/VestingToken.json';
import TokenABI from '@/contracts/abi/TON.json';

import { mapState, mapGetters } from 'vuex';

// import { getConfig } from '../../config.js';
import TextViewer from '@/components/TextViewer.vue';
import store from '@/store/index.js';


export default {
  components: {
    'text-viewer': TextViewer,
  },
  data () {
    return {
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
      name: '',
      symbol: '',
      releasable: '',
    }
  },
  props: ['tokenName', 'tokenAddress', 'vestingAddress'],
  computed : {
    ...mapState([
      'web3'
    ]),
    ...mapGetters([
      'vestingInfo'
    ]),
    // calcReleasable () {
    //   this.releasable = vested ? vested - released : null
    //   return releasable
    // },
  },
  mehods: {
    async getVestingInfo () {
      const tokenVestingAddress = this.vestingAddress;
          // const tokenName = this.name;
          const tokenAddress = this.tokenAddress
          const tokenContract = createWeb3Contract(TokenABI, tokenAddress)
          const tokenVesting = createWeb3Contract(VestingTokenABI, tokenVestingAddress);
          // const Swapper = createWeb3Contract(SwapperABI, address);

          const startDate = await tokenVesting.methods.start();
          const duration = await tokenVesting.emthods.duration();
          const endDate = start.plus(duration)
          
          const balance = await tokenContract.balanceOf(store.state.user)
          const releasedAmount = await tokenVesting.released(tokenContract) // check token
          const totalBalance = balance.plus(releasedAmount)

          const [
            start,
            end,
            cliff,
            total,
            released,
            vested,
            decimals,
            beneficiary,
            owner,
            revocable,
            revoked,
            name,
            symbol
          ] = await Promise.all([
            startDate,
            endDate,
            await tokenVesting.methods.cliff(),
            totalBalance,
            releasedAmount,
            await tokenVesting.methods.vestedAmount(tokenContract).call(),
            await tokenContract.methods.decimals().call(),
            await tokenVesting.beneficiary().call(),
            await tokenVesting.owner().call(),
            await tokenVesting.revocable().call(),
            await tokenVesting.revoked(tokenContract).call(),
            await tokenContract.name().call(),
            await tokenContract.symbol().call(),
          ]);

          this.start = start
          this.end = end
          this.cliff = cliff
          this.total = total
          this.released = released
          this.vested = vested
          this.decimals = decimals
          this.beneficiary = beneficiary
          this.owner = owner
          this.revocable = revocable
          this.revoked = revoked
          this.name = name
          this.symbol = symbol
    }
  }
}
</script>