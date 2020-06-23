<template>
  <div
    class='wallet'
    :class="{ 'not-allowed': loading }"
    @click='connectWallet'
  >
    <img
      class='wallet-image'
      src='@/assets/images/Metamask.jpg'
      width='25'
      height='23'
    />
    <div class='wallet-title'>
      {{ title }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    connect: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: mapState(['web3']),
  methods: {
    async connectWallet () {
      if (this.loading) return

      this.loading = true
      await this.connect()
      this.loading = false
    }
  }
}
</script>

<style scoped>
.wallet {
  display: flex;
  align-items: center;
  width: 320px;
  height: 54px;
  border-radius: 3px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  margin-top: 9px;
  border: solid 1px #ffffff;
  padding-right: 16px;
}

.wallet:hover {
  cursor: pointer;
  background-color: #f7f8f9;
  border-radius: 3px;
  border: solid 1px #ced6d9;
}

.not-allowed:hover {
  cursor: not-allowed;
}

.wallet-image {
  padding-left: 19px;
  padding-right: 23px;
}

.wallet-title {
  flex: 1;
  padding-top: 4px;
  object-fit: contain;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
  color: #5c5c5c;
}
</style>
