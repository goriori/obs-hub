<script setup>

import DeleteButton from "@/components/ui/buttons/delete/DeleteButton.vue";
import {useStateStore} from "@/store/stateStore.js";
import {useScreenStore} from "@/store/screenStore.js";
import {computed} from "vue";

const stateStore = useStateStore()
const screenStore = useScreenStore()
// const focusScreens = computed(() => {
//   return screenStore.screens.filter(screen => screen.isFocus).length > 0
// })
// const onClick = () => {
//   if (focusScreens.value) stateStore.modals.delete.deleteSourceVideo.show = true
// }
</script>

<template>
  <DeleteButton @click="onClick" :disabled="!focusScreens"/>
</template>

<style scoped lang="scss">

</style>