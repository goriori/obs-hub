<script setup>
const props = defineProps({
  rounded: {
    type: Boolean,
    default: false
  },
  disabled: {
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
  ]" :disabled="disabled" v-ripple>
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

  &:disabled {
    opacity: 0.7;
  }


  &-rounded {
    border-radius: 50px;
  }
}

</style>