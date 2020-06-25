<template>
  <div class="main-layout">
    <div class="button-container">
      <button
        v-for="token in tokenList"
        @click="changeTab(token)"
        :key="token"
        :class="{ 'tab-clicked': activeTab === token }"
      >
        {{ token }}
      </button>
    </div>
    <div class="vesting-address-container">
      <div class="vesting-address">
        <img
          src="@/assets/images/TokamakNetworkLogo.png"
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
            :tab="tab"
            :address="address"
            :start="start"
            :end="end"
            :cliff="cliff"
            :total="total"
            :released="released"
            :vested="vested"
            :decimals="decimals"
            :beneficiary="beneficiary"
            :owner="owner"
            :revocable="revocable"
            :revoked="revoked"
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
import { mapState } from "vuex";

import Graph from "@/components/Graph.vue";
import UserInfo from "@/containers/UserInfoContainer.vue";

import { createWeb3Contract } from "@/helpers/Contract";
import { getConfig } from "../../config.js";
import TokenABI from "@/contracts/abi/TON.json";
import VestingTokenABI from "@/contracts/abi/VestingToken.json";
import store from "@/store/index.js";

export default {
  components: {
    graph: Graph,
    "user-info-container": UserInfo
  },
  asyncComputed: {
    ...mapState(["web3", "user"]),
    // tokenList() {
    //   return this.tokens.filter(token => {
    //     if (token.includes("TON")) {
    //       return token;
    //     }
    //   });
    // }
    async tokenList() {
      return this.tokens.map(token => {
        const network = getConfig().contractAddress[token];
        this.address = network.token;
        const tokenAddress = this.address;
        const tokenContract = createWeb3Contract(TokenABI, tokenAddress);
        const balance = tokenContract.methods
          .balanceOf(store.state.user)
          .call();
        if (balance !== 0) {
          return token;
        }
      });
    }

    // async created () {
    //   this.poll();
    // },
    // beforeDestroy () {
    //   clearInterval(this.polling);
    // },
  },
  data() {
    return {
      SeedTON: true,
      PrivateTON: true,
      MarketingTON: false,
      StrategicTON: true,
      totalBalance: "",
      tokens: ["SeedTON", "PrivateTON", "MarketingTON", "StrategicTON"],
      tab: "",
      address: "0x8Ae43F11DDd3fac5bbD84ab0BA795E1e51b78df7",
      activeTab: "",

      start: "",
      end: "",
      cliff: "",
      total: "",
      released: "",
      vested: "",
      decimals: "",
      beneficiary: "",
      owner: "",
      revocable: "",
      revoked: "",
      name: "",
      symbol: "",
      releasable: ""
    };
  },
  methods: {
    async changeTab(tab) {
      this.activeTab = tab;
      this.tab = tab;
      const network = getConfig().contractAddress[tab];
      this.address = network.token;
      const tokenAddress = this.address;
      const tokenContract = createWeb3Contract(TokenABI, tokenAddress);
      const tokenVesting = createWeb3Contract(VestingTokenABI, network.vesting);

      const startDate = await tokenVesting.methods.start().call();
      const duration = await tokenVesting.methods.duration().call();
      const endDate = startDate.plus(duration);

      const balance = await tokenContract.methods
        .balanceOf(store.state.user)
        .call();
      const releasedAmount = await tokenVesting.released(tokenContract); // check token
      console.log(balance);
      this.totalBalance = balance;

      this.start = startDate;
      this.end = endDate;
      this.cliff = await tokenVesting.methods.cliff().call();
      this.total = balance;
      this.released = releasedAmount;
      this.vested = await tokenVesting.methods
        .vestedAmount(tokenContract)
        .call();
      this.decimals = await tokenContract.methods.decimals().call();
      (this.beneficiary = await tokenVesting.methods.beneficiary().call()),
        (this.owner = await tokenVesting.methods.owner().call());
      this.revocable = await tokenVesting.methods.revocable().call();
      this.revoked = await tokenVesting.methods.revoked(tokenContract).call();
      this.name = await tokenContract.methods.name().call();
      this.symbol = await tokenContract.methods.symbol().call();
    }
    // poll () {
    //   this.polling = setInterval(() => {
    //     if (this.$store.state.signIn) {
    //       this.$store.dispatch('set', this.web3);
    //     }
    //   }, 13000); // 13s
    // },
  }
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
button {
  width: 100px;
  height: 30px;
  padding-top: 2px;
  font-family: Roboto;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  font-size: 11px;
  color: #161819;
}
.button:hover {
  cursor: pointer;
  background-color: #ecf1f3;
}
.disable:hover {
  cursor: not-allowed;
}
.tab-clicked {
  background-color: #1e4e85;
  color: #ffffff;
}
</style>
