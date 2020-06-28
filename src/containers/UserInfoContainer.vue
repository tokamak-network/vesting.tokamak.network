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
                 :href="href"
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
import { mapState, mapGetters } from 'vuex';
import SwapperABI from '@/contracts/abi/Swapper.json';
import { getConfig } from '../../config.js';
import { createWeb3Contract } from '@/helpers/Contract';
import TextViewer from '@/components/TextViewer.vue';
// import TextViewerSwapper from '@/components/TextViewerSwap.vue';


export default {
  components: {
    'text-viewer': TextViewer,
    // 'text-viewer-swapper': TextViewerSwapper,
  },
  props: ['address', 'tab', 'start', 'end', 'cliff', 'total', 'released', 'vested', 'beneficiary', 'owner', 'revocable', 'revoked', 'releasable'],
  computed : {
    ...mapState([
      'web3',
      'user',
    ]),
    ...mapGetters([
      'vestingInfo',
    ]),
  },
  methods: {
    async click (vestingAddress) {
      if (!this.disable) {
        await this.swap(vestingAddress);
      }
    },
    async swap (vestingAddress) {
      const address = getConfig().rinkeby.contractAddress.Swapper;
      const swapper = createWeb3Contract(SwapperABI, address);

      if (this.releasable === 0) {
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

.name-container {
  padding-top: 12px;
  padding-bottom: 12px;
  margin-left: 16px;
}
.title {
  text-align: center;
  margin-top: 10px;
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
