<script setup>
import Button from "../Button.vue";
import Delete from "../../../icons/Delete.vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <Button class="delete" :disabled="disabled">
    <template #icon>
      <Delete/>
    </template>
  </Button>
</template>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.delete {

  @media (max-width: $md1 + px) {
    max-width: 33px;
    max-height: 33px;
  }
}
</style>