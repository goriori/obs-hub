<script setup>

import {useAudioGateway} from "@/store/audioStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";
import ServerConfig from "@/enitites/config/index.js";
import {VirtualCamera} from "@/enitites/video-device/virtual-camera/index.js";
import {VirtualAudio} from "@/enitites/audio-device/virtual-audio/index.js";
import wsService from "@/API/wsService/wsService.js";
import {useSourceGateway} from "@/store/sourceStore.js";

const emits = defineEmits(['onConfirmDelete'])
const audioGateway = useAudioGateway()
const sourceGateway = useSourceGateway()

const deleteTargetAudio = () => {
  const focusesAudio = audioGateway.getFocusedAudio()
  focusesAudio.forEach(audio => audioGateway.deleteAudioSource(audio.id))
  updateServerConfig()
  emits('onConfirmDelete')
}
const updateServerConfig = () => {
  ServerConfig.changeUpdateAspects(sourceGateway.getNameAudioSources())
  ServerConfig.changeUpdateType('full')
  ServerConfig.addVideSources(sourceGateway.getVideoSourcesObject())
  ServerConfig.addAudioSources(sourceGateway.getAudioSourcesObject())
  ServerConfig.addVirtualCamera(new VirtualCamera())
  ServerConfig.addVirtualAudio(new VirtualAudio())
  wsService.sendMessage(ServerConfig)
}
</script>

<template>
  <ConfirmButton @click="deleteTargetAudio"/>
</template>

<style scoped lang="scss">

</style>