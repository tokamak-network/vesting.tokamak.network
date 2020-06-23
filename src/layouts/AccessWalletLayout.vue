<template>
  <div class='access-wallet-layout'>
    <introduction />
    <select-wallet-container />
  </div>
</template>

<script>
import SelectWalletContainer from '@/containers/SelectWalletContainer.vue'
import Introduction from '@/components/Introduction.vue'

export default {
  components: {
    introduction: Introduction,
    'select-wallet-container': SelectWalletContainer
  }
}
</script>

<style scoped>
.access-wallet-layout {
  display: flex;
  padding-top: 85px;
}
</style>
