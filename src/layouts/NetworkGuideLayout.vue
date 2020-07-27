<template>
  <div class="guide-container">
    <div class="message-container">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.guide-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f6f8f9;
}

.message-container {
  width: 400px;
  height: 400px;
  border: solid 1px #555561;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

p {
  font-size: 20px;
  padding: 16px;
}
</style>
