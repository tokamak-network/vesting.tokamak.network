<template>
  <div class="text-viewer-link">
    <hr class="divider" :style="[withDivider ? {} : {'visibility': 'hidden'}]">
    <div class="row">
      <div class="title">{{ title }}</div>
      <div v-if="tooltip !== ''" class="tooltip">
        <span class="tooltiptext" :style="`margin-left: 10px; margin-top: ${tooltipMarginTop}; width: ${tooltipWidth};`">{{ tooltip }}</span>
      </div>
      <div class="content">
        <a
          class="link"
          target="_blank"
          rel="noopener noreferrer"
          :href="href"
        >{{ content }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getConfig } from '../../config.js';

export default {
  props: {
    title: {
      type: String,
    },
    content: {
    },
    type: {
      // transactionHash or address
    },
    withDivider: {
      type: Boolean,
      default: false,
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
  },
  computed: {
    href () {
      return getConfig().rinkeby.prefixAddress + this.content;
    },
  },
};
</script>

<style scoped>
.text-viewer-link {
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
  text-align: right;
  padding-right: 36px;
  font-family: Roboto;
  font-size: 10px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #161819;
  word-break: break-word;
}

.link {
  display: inline;
  text-align: right;
  align-items: center;
  text-decoration: underline;
  color: black;
  min-width: 300px;
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
