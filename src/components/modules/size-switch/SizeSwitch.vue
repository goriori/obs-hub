<script setup>

import Dropdown from "../../ui/dropdown/Dropdown.vue";
import {useResolutionStore} from "@/store/resolutionStore.js";
import {useSourceStore} from "@/store/sourceStore.js";
import wsService from "@/API/wsService/wsService.js";

const resolutionStore = useResolutionStore()
const sourceStore = useSourceStore()
const onChange = (resolution) => {
  const ASPECT = 'virtual_camera'
  const [w, h] = resolution.split('x')
  const width = Number(w.trim())
  const height = Number(h.trim())
  sourceStore.addAspect(ASPECT)
  sourceStore.updateResolutionVirtualCamera({width, height})
  sourceStore.updateType('full')
  wsService.sendMessage(sourceStore.getConfig())
  sourceStore.deleteAspect(ASPECT)
}
</script>

<template>
  <Dropdown v-model="resolutionStore.targetResolution" :titles="resolutionStore.resolutions" @on-change="onChange"/>
</template>

<style scoped lang="scss">

</style>