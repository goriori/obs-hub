<script setup>

import BlockSpace from "../BlockSpace.vue";

const props = defineProps({
  scriptList: {
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
    <template #title>Python scripts</template>
    <template #list>
      <component :is="scriptList"/>
    </template>
    <template #actions>
      <component v-for="action in actions" :is="action" :key="action"/>
    </template>
  </BlockSpace>
</template>

<style scoped>

</style>