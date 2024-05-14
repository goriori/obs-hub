<script setup>

import {useStateStore} from "@/store/stateStore.js";

const stateStore = useStateStore()
</script>

<template>
  <article class="modal warning">
   {{stateStore.modals.message.warning.message}}
  </article>
</template>

<style scoped lang="scss">

.warning {
  text-align: center;
  border-radius: 16px;
  background: #F7971D;
}
</style>