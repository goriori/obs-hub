<script setup>

import {useStateStore} from "@/store/stateStore.js";

const stateStore = useStateStore()
</script>

<template>
  <article class="modal error">
    {{stateStore.modals.message.error.message}}
  </article>
</template>

<style scoped lang="scss">

.error {
  text-align: center;
  border-radius: 16px;
  background: #ee816e;
}
</style>