<script setup>

import Card from "../Card.vue";
import IconCard from "../../icon-card/IconCard.vue";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  isFocus: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:isFocus'])
const onFocus = () => emits('update:isFocus', !props.isFocus)
</script>

<template>
  <Card :is-focus="isFocus" @on-focus="onFocus">
    <template #icon>
      <IconCard icon-type="sound"/>
    </template>
    <template #title>Захват экрана</template>
  </Card>
</template>

<style scoped>

</style>