<script setup>

import Dropdown from "../../ui/dropdown/Dropdown.vue";
import {useResolutionStore} from "@/store/resolutionStore.js";

const resolutionStore = useResolutionStore()
</script>

<template>
  <Dropdown v-model="resolutionStore.targetResolution" :titles="resolutionStore.resolutions"/>
</template>

<style scoped lang="scss">

</style>