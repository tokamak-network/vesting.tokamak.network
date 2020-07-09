<template>
  <div class="user-info-container">
    <div class="title">
      Vesting Details for {{ tab }}
    </div>
    <text-viewr-link :title="'Beneficiary'"
                 :content="user"
                 :type="'address'"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Start date'"
                 :content="new Date(Number(tokenInfo.startDate) * 1000)"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Cliff'"
                 :content="new Date(Number(tokenInfo.cliffDate) * 1000)"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'End date'"
                 :content="new Date(Number(tokenInfo.endDate) * 1000)"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Total vesting'"
                 :content="tokenInfo.total"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Already vested'"
                 :content="tokenInfo.vested"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Already relased'"
                 :content="tokenInfo.released"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Releasable'"
                 :content="tokenInfo.releasable"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <text-viewer :title="'Revocable'"
                 :content="tokenInfo.revocable"
                 :with-divider="false"
                 :tooltip="'Introduction to the operator'"
                 :tooltipWidth="'180px'"
                 :tooltipMarginTop="'-9px'"
    />
    <div v-show="parseFloat(tokenInfo.releasable) !== 0" class="release-button-container">
      <button class="button-release" @click="swap(tokenInfo.address)">release</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import store from '@/store/index.js';
import SwapperABI from '@/contracts/abi/Swapper.json';
import { getConfig } from '../../config.js';
import { createWeb3Contract } from '@/helpers/Contract';
import TextViewer from '@/components/TextViewer.vue';
import TextViewerLink from '@/components/TextViewerLink.vue';

export default {
  components: {
    'text-viewer': TextViewer,
    'text-viewr-link': TextViewerLink,
    // 'text-viewer-swapper': TextViewerSwapper,
  },
  props: ['tab'],
  computed : {
    ...mapState([
      'web3',
      'user',
      'tokenInfo',
    ]),
    ...mapGetters([
      'vestingInfo',
    ]),
  },
   data (){
    return {
      revocable:'',
    }
  },
  
  methods: {
    // async click (vestingAddress) {
    //   if (!this.disable) {
    //     await this.swap(vestingAddress);
    //   }
    // },
    async swap (vestingAddress) {
      const contractAddress = getConfig().rinkeby.contractAddress.Swapper;
      const swapper = createWeb3Contract(SwapperABI, contractAddress);
      if (parseFloat(this.$store.state.tokenInfo.releasable) === 0) {
        return alert('Releasable amount is 0.');
      }

      await swapper.methods.swap(vestingAddress).send({
        from: this.user,
      }).on('receipt', (receipt) => {
        if (receipt.status) {
          this.$notify({
            group: 'confirmed',
            title: 'Transaction is confirmed',
            type: 'success',
            duration: 10000,
          });
        } else {
          this.$notify({
            group: 'reverted',
            title: 'Transaction is reverted',
            type: 'error',
            duration: 10000,
          });
        }
        this.$router.replace({
          path: this.from.path,
          query: { network: this.$route.query.network },
        }).catch(err => {});
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
