<script setup>

import Button from "../Button.vue";
import Plus from "../../../icons/Plus.vue";
</script>

<template>
  <Button class="plus">
    <template #icon>
      <Plus/>
    </template>
  </Button>
</template>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.plus {
  @media (max-width: $md1 + px) {
    max-width: 33px;
    max-height: 33px;
  }
}
</style>