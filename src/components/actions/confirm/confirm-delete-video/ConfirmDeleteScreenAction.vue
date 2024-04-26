<script setup>

import {useScreenStore} from "@/store/screenStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";

const emits = defineEmits(['onConfirmDelete'])
const screenStore = useScreenStore()
const deleteTargetScreens = () => {
  const focusesScreen = screenStore.screens.filter(screen => {
    if (screen.isFocus) return screen
  })
  focusesScreen.forEach(screen => screenStore.deleteScreen(screen.id))
  emits('onConfirmDelete')
}
</script>

<template>
  <ConfirmButton @click="deleteTargetScreens"/>
</template>

<style scoped lang="scss">

</style>