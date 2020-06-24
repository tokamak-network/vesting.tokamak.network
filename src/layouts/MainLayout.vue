<template>
  <div class="main-layout">
    <div class="button-container">
      <button
        v-for="token in tokens"
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
        <info :tab="tab === '' ? tokens[0] : tab" />
      </div>
      <div class="table-graph">
        <graph />
      </div>
    </div>
  </div>
</template>
<script>
import Info from "@/components/Info.vue";
import Graph from "@/components/Graph.vue";
export default {
  components: {
    info: Info,
    graph: Graph
  },
  data() {
    return {
      tokens: ["seed", "privates", "marketing", "strategic", "blah"],
      tab: "",
      address: "0x8Ae43F11DDd3fac5bbD84ab0BA795E1e51b78df7",
      activeTab: ""
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
      this.tab = tab;
    }
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
  display: flex;
  flex-direction: row;
  height: 100%;
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
  width: 72px;
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
