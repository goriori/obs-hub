<script setup>

import Card from "../Card.vue";
import IconCard from "../../icon-card/IconCard.vue";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:isActive'])
const onClick = () => emits('update:isActive', !props.isActive)
</script>

<template>
  <Card class="card" :is-active="isActive" @click="onClick">
    <template #icon>
      <IconCard icon-type="camera"/>
    </template>
    <template #title>Захват веб-камеры</template>
  </Card>
</template>

<style scoped>

</style>