<script setup>
defineProps({
  color: {
    type: String,
    default: '#898989'
  }
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="31" viewBox="0 0 34 31" fill="none">
    <path
        d="M24.583 7.5C29.1394 7.5 32.833 11.1936 32.833 15.75C32.833 20.3062 29.1394 24 24.583 24M24.583 12C26.6541 12 28.333 13.679 28.333 15.75C28.333 17.821 26.6541 19.5 24.583 19.5M20.833 30H20.458L19.674 29.1786C15.1452 24.4343 8.87219 21.75 2.31341 21.75H1.33301V9.75001L2.31341 9.75C8.87219 9.75 15.1452 7.06577 19.674 2.32143L20.458 1.5H20.833V30Z"
        :stroke="color" stroke-width="2"/>
  </svg>
</template>

<style scoped>

</style>