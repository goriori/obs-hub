<script setup>

import {useScreenStore} from "@/store/screenStore.js";
import {useSourceStore} from "@/store/sourceStore.js";
import {SourceDto} from "@/dto/source-dto/index.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";
import wsService from "@/API/wsService/wsService.js";

const emits = defineEmits(['onConfirmDelete'])
const screenStore = useScreenStore()
const sourceStore = useSourceStore()
const deleteTargetScreens = () => {
  const focusesScreen = screenStore.screens.filter(screen => screen.isFocus ? screen : false)
  const sources = focusesScreen.map(screen => new SourceDto(screen))
  const sourcesDelete = sources.map(source => Object.keys(source)[0])
  sourceStore.updateType('full')
  sourcesDelete.forEach(source => {
    sourceStore.addAspect(source)
    sourceStore.updateShow(source, false)
  })
  const config = sourceStore.getConfig()
  wsService.sendMessage(config)
  focusesScreen.forEach(screen => screenStore.deleteScreen(screen.id))
  sourceStore.updateAspects([])
  emits('onConfirmDelete')
}

</script>

<template>
  <ConfirmButton @click="deleteTargetScreens"/>
</template>

<style scoped lang="scss">

</style>