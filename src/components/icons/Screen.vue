<script setup>
defineProps({
  color:{
    type:String,
    default:'#898989'
  }
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 32 30" fill="none">
    <path
        d="M17.1 21.1C18.4762 23.3938 20.426 25.2896 22.7575 26.601L24.8 27.75V28.1H6.6V27.75L8.64252 26.601C10.9739 25.2896 12.9238 23.3938 14.3 21.1M1 16.9H30.4M30.4 1.5H1V21.1H30.4V1.5Z"
        :stroke="color" stroke-width="2"/>
  </svg>
</template>

<style scoped>

</style>