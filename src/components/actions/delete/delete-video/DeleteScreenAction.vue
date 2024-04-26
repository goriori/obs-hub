<script setup>

import DeleteButton from "@/components/ui/buttons/delete/DeleteButton.vue";
import {useStateStore} from "@/store/stateStore.js";

const stateStore = useStateStore()

const onClick = () => {
  stateStore.modals.delete.deleteSourceVideo.show = true
}
</script>

<template>
  <DeleteButton @click="onClick"/>
</template>

<style scoped lang="scss">

</style>