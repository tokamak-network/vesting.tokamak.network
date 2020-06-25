<template>
  <div class="loading-spinner-container">
    <div class="loading-spinner" />
  </div>
</template>

<script>
export default {};
</script>

<style scpoed>
.loading-spinner-container {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
