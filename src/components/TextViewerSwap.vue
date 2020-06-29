<template>
  <div class="text-viewer-downloader">
    <hr class="divider" :style="[withDivider ? {} : {'visibility': 'hidden'}]">
    <div class="row">
      <div class="title">{{ title }}</div>
      <div v-if="tooltip !== ''" class="tooltip">
        <!-- <img src="@/assets/Images/instruction.png" alt="" width="10" height="10"> -->
        <span class="tooltiptext" :style="`margin-left: 10px; margin-top: ${tooltipMarginTop}; width: ${tooltipWidth};`">{{ tooltip }}</span>
      </div>
      <div class="content"><a :href="href" :swap="swap">{{ content }}</a></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    content: {
    },
    tooltip: {
      type: String,
      default: '',
    },
    tooltipWidth: {
      type: String,
      default: '200px',
    },
    tooltipMarginTop: {
      type: String,
      default: '-17px',
    },
    href: {},
    swap: {},
    withDivider: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.text-viewer-downloader {
  margin-bottom: 6px;
}

.row {
  display: flex;
  flex-direction: row;
}

.title {
  padding-left: 16px;
  margin-right: 4px;
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #161819;
  display: flex;
  align-items: center;
}

.content {
  display: inline-block;
  flex: 1;
  text-align: center;
  padding-right: 16px;
  font-family: Roboto;
  font-size: 10px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #161819;
  word-break: break-word;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
}
a {
  text-align: center;
}

.divider {
  height: 0;
  border: solid 0.5px #dce2e5;
  margin: 0px;
  padding: 0px;
  margin-bottom: 8px;
}

.hidden {
  visibility: hidden;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  background-color: black;
  color: #fff;
  font-family: Roboto;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  font-size: 11px;
  text-align: center;
  padding: 7px;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 50%;
  right: 100%; /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
