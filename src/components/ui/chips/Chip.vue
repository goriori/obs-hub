<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['onChange'])
const onClickChip = () => emits('onChange', props.title)
</script>

<template>
  <article :class="['chip', {active}]" @click="onClickChip">
    {{ title }}
  </article>
</template>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.chip {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  font-weight: 700;

  &.active {
    border-radius: 50px;
    background-color: $primary;
  }
}
</style>