<template>
  <div v-if="isVisible" class="spinner">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.spinner-border {
  width: 50px;
  height: 50px;
  border: 3px solid aliceblue;
  border-top: 3px solid rgb(85,65,65);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
