<template>
  <div class="main-layout">
    <div class="button-container">
      <token-button
        v-if="seed"
        :label="'Seed'"
        @op-clicked="changeTab('seed')"
      />
      <token-button
        v-if="privates"
        :label="'Private'"
        @op-clicked="changeTab('privates')"
      />
      <token-button
        v-if="marketing"
        :label="'Marketing'"
        @op-clicked="changeTab('marketing')"
      />
      <token-button
        v-if="strategic"
        :label="'Strategic'"
        @op-clicked="changeTab('strategic')"
      />
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
        <info :tab="tab" />
      </div>
      <div class="table-graph">
        <graph />
      </div>
    </div>
  </div>
</template>
<script>
import TokenButton from "@/components/TokenButton.vue";
import Info from "@/components/Info.vue";
import Graph from "@/components/Graph.vue";
export default {
  components: {
    "token-button": TokenButton,
    info: Info,
    graph: Graph
  },
  data() {
    return {
      tab: "seed",
      seed: true,
      privates: true,
      marketing: false,
      strategic: true,
      address: "0x8Ae43F11DDd3fac5bbD84ab0BA795E1e51b78df7"
    };
  },
  methods: {
    changeTab(tab) {
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
</style>
