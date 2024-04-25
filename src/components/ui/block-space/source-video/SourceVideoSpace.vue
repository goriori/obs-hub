<script setup>

import BlockSpace from "../BlockSpace.vue";

const props = defineProps({
  videoList: {
    type: Object,
    default: () => {
    }
  },
  actions: {
    type: Array,
    default: []
  }
})
</script>

<template>
  <BlockSpace>
    <template #title>Источник видео</template>
    <template #list>
      <component :is="videoList"/>
    </template>
    <template #actions>
      <component v-for="action in actions" :is="action" :key="action"/>
    </template>
  </BlockSpace>
</template>

<style scoped>

</style>