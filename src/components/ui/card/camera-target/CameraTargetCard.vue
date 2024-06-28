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
  },
  source: {
    type: Object,
    default: () => {
    }
  }
})
const emits = defineEmits(['update:isFocus'])

const onFocus = () => {
  if (!props.isFocus) emits('update:isFocus', true, {
    id: props.source.id,
    name: props.source.name
  }, 'focus-source')
  else emits('update:isFocus', false, {
    id: props.source.id,
    name: props.source.name
  }, 'un-focus-source')

}
</script>

<template>
  <Card class="card" :is-focus="isFocus" @on-focus="onFocus">
    <template #icon>
      <IconCard icon-type="camera"/>
    </template>
    <template #title>Захват веб-камеры</template>
  </Card>
</template>

<style scoped>

</style>