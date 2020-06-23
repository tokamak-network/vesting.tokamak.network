<template>
  <button :class="{ 'tab-clicked': clicked }" @click="onTabChanged()">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: { type: String, default: '' }
  },
  data () {
    return {
      clicked: false
    }
  },
  methods: {
    onTabChanged () {
      this.clicked = !this.clicked
      this.$emit('op-clicked')
    }
  }
}
</script>

<style scoped>
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
