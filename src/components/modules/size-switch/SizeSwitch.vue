<script setup>

import Dropdown from "../../ui/dropdown/Dropdown.vue";

const titles = ['1920 x 1080', '1080 x 1920', '720 x 1080']
</script>

<template>
  <Dropdown :titles="titles"/>
</template>

<style scoped lang="scss">

</style>