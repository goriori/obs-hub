<script setup>

import Card from "../Card.vue";
import IconCard from "../../icon-card/IconCard.vue";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
})
const emits = defineEmits(['update:isActive'])
const onClick = () => emits('update:isActive', !props.isActive)
</script>

<template>
  <Card :is-active="isActive" @click="onClick">
    <template #icon>
      <IconCard icon-type="sound"/>
    </template>
    <template #title>Захват экрана</template>
  </Card>
</template>

<style scoped>

</style>