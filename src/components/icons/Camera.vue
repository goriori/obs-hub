<script setup>
defineProps({
  color:{
    type:String,
    default:'#898989'
  }
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="24" viewBox="0 0 35 24" fill="none">
    <path
        d="M1 1.5H24.8V8.5H24.875C26.1919 8.5 27.5031 8.11639 28.4646 7.21677C29.6041 6.1508 30.5789 4.91533 31.351 3.54252L32.5 1.5H33.2V22.5H32.5L31.351 20.4575C30.5789 19.0847 29.6041 17.8492 28.4646 16.7832C27.5031 15.8836 26.1919 15.5 24.875 15.5H24.8V22.5H1V1.5Z"
        :stroke="color" stroke-width="2"/>
  </svg>
</template>

<style scoped>
</style>