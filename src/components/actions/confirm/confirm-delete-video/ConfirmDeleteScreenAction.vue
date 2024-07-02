<script setup>

import {useSourceGateway} from "@/store/sourceStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";
import ServerConfig from '@/enitites/config'
import {VirtualCamera} from "@/enitites/video-device/virtual-camera/index.js";
import {VirtualAudio} from "@/enitites/audio-device/virtual-audio/index.js";
import wsService from "@/API/wsService/wsService.js";
import {useVirtualObjectsGateway} from "@/store/virtualObjectStore.js";
import {usePlayerGateway} from "@/store/playerStore.js";

const emits = defineEmits(['onConfirmDelete'])
const sourceGateway = useSourceGateway()
const virtualObjectsGateway = useVirtualObjectsGateway()
const playerGateway = usePlayerGateway()
const deleteTargetScreens = () => {
  const focusesSource = sourceGateway.getVideoSources().filter(source => source.focused)
  focusesSource.map(source => sourceGateway.hiddenVideoSource(source.name))
  updateServerConfig()
  emits('onConfirmDelete')
}

const updateServerConfig = () => {
  ServerConfig.changeUpdateAspects(sourceGateway.getNameVideoSources())
  ServerConfig.changeUpdateType('full')
  ServerConfig.addVideSources(sourceGateway.getVideoSourcesConfigFormat())
  ServerConfig.addAudioSources(sourceGateway.getAudioSourcesConfigFormat())
  ServerConfig.addVirtualObjects(virtualObjectsGateway.getVirtualObjectsConfigFormat())
  ServerConfig.addPlayer(playerGateway.getPlayersForConfigFormat())
  wsService.sendMessage(ServerConfig)
}
</script>

<template>
  <ConfirmButton @click="deleteTargetScreens"/>
</template>

<style scoped lang="scss">

</style>