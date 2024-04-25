<script setup>

import {computed} from "vue";
import {useScriptStore} from "../../../store/scriptStore.js";
import ListSource from "../../ui/list-source/ListSource.vue";
import CameraTargetCard from "../../ui/card/camera-target/CameraTargetCard.vue";
import ScreenTargetCard from "../../ui/card/screen-target/ScreenTargetCard.vue";

const scriptStore = useScriptStore()
const scriptTypes = {
  screen: ScreenTargetCard,
  camera: CameraTargetCard
}

const scripts = computed(() => {
  return scriptStore.script.map(script => {
    return scriptTypes[script.type]
  })
})

</script>

<template>
  <ListSource :sources="scripts"/>
</template>

<style scoped lang="scss">

</style>