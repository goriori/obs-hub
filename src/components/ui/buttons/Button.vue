<script setup>
const props = defineProps({
  rounded: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button :class="['button',
  {
    'button-rounded':rounded
  }
  ]" v-ripple>
    <slot name="icon"/>
    <slot name="title"/>
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.button {
  position: relative;
  overflow: hidden;
  padding: 10px;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: $primary;

  &-rounded {
    border-radius: 50px;
  }
}

</style>