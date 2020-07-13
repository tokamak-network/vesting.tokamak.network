<template>
  <div v-if="(this.tokenInformation !== undefined)" class="main-layout">
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
        <img src="@/assets/Images/TokamakNetworkLogo.png" height="43px" width="180px">
      </div>
      <div class="vesting-address-intro">Vesting address:</div>
      <div class="vesting-address-details">{{ tokenInformation['address'] }}</div>
    </div>
    <div class="vesting-table-container">
      <div class="table-info">
        <div>
          <user-info-container
            :tab="activeTab"
            :start="tokenInformation['startDate']"
            :end="tokenInformation['endDate']"
            :cliff="tokenInformation['cliffDate']"
            :total="tokenInformation['total']"
            :released="tokenInformation['released']"
            :vested="tokenInformation['vested']"
            :revocable="''"
            :revoked="''"
            :releasable="tokenInformation['releasable']"
            :address="tokenInformation['address']"
            :rate="tokenInformation['rate']"
          />
        </div>
      </div>
      <div class="table-graph">
        <graph-container
          :tab="activeTab"
          :start="tokenInformation['startDate']"
          :end="tokenInformation['endDate']"
          :cliff="tokenInformation['cliffDate']"
          :total="tokenInformation['graphTotal']"
          :decimals="tokenInformation['graphDecimals']"
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
    };
  },
  computed:{
    ...mapState([
      'web3',
      'user',
      'tokenList',
    ]),
    ...mapGetters([
      'tokenInfoByTab',
    ]),
    tokenInformation () {
      return this.tokenInfoByTab(this.activeTab);
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
  methods: {
    async changeTab (tab) {
      this.activeTab = tab;
      this.tab = tab;
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
</style>
