<script setup>

import Pencil from "@/components/icons/Pencil.vue";
import {useStateStore} from "@/store/stateStore.js";

const stateStore = useStateStore()
const onClick = () => {
  console.log('edit')
  stateStore.modals.edit.editScript.show = true
}
</script>

<template>
  <div class="script-edit" @click="onClick">
    <Pencil/>
    <p> изменить параметры</p>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.script-edit {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  border-radius: 25px;
  background: $primary;
  padding: 5px 10px;
  @media (max-width: $md1 + px) {
    font-size: 8px;
  }
}
</style>