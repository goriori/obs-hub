<script setup>
defineProps({
  color:{
    type:String,
    default:'#F7971D'
  }
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
    <path
        d="M8 9.5V18.5V9.5ZM13 9.5V18.5V9.5ZM7 5H1V5.24997L1.24011 6.30044C2.40966 11.4173 3 16.6494 3 21.8981V23H18V21.8981C18 16.6494 18.5903 11.4173 19.7599 6.30044L20 5.24997V5H14M7 5V4.5C7 2.567 8.567 1 10.5 1C12.433 1 14 2.567 14 4.5V5M7 5H14H7Z"
        fill="#202020"/>
    <path
        d="M8 9.5V18.5M13 9.5V18.5M7 5H1V5.24997L1.24011 6.30044C2.40966 11.4173 3 16.6494 3 21.8981V23H18V21.8981C18 16.6494 18.5903 11.4173 19.7599 6.30044L20 5.24997V5H14M7 5V4.5C7 2.567 8.567 1 10.5 1C12.433 1 14 2.567 14 4.5V5M7 5H14"
        :stroke="color" stroke-width="2"/>
  </svg>
</template>

<style scoped>

</style>