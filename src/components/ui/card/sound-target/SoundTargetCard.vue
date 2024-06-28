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
  }, 'focus-audio')
  else emits('update:isFocus', false, {
    id: props.source.id,
    name: props.source.name
  }, 'un-focus-audio')
}
</script>

<template>
  <Card :is-focus="isFocus" @on-focus="onFocus">
    <template #icon>
      <IconCard icon-type="sound"/>
    </template>
    <template #title>{{ source.name }}</template>
  </Card>
</template>

<style scoped>

</style>