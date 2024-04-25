<script setup>
defineProps({
  color: {
    type: String,
    default: '#202020'
  }
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="41" viewBox="0 0 32 41" fill="none">
    <path
        d="M13.9333 1.59998V14.2H1.3333M30.1333 1.59998V39.4H1.3333V13.3L1.84162 13.0741C6.72826 10.9022 10.6355 6.99494 12.8074 2.10831L13.0333 1.59998H30.1333Z"
        :stroke="color" stroke-width="2"/>
  </svg>
</template>

<style scoped>

</style>