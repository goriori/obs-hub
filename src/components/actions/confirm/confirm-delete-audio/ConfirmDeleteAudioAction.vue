<script setup>

import {useAudioGateway} from "@/store/audioStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";
import ServerConfig from "@/enitites/config/index.js";
import {VirtualCamera} from "@/enitites/video-device/virtual-camera/index.js";
import {VirtualAudio} from "@/enitites/audio-device/virtual-audio/index.js";
import wsService from "@/API/wsService/wsService.js";
import {useSourceGateway} from "@/store/sourceStore.js";
import {useVirtualObjectsGateway} from "@/store/virtualObjectStore.js";
import {usePlayerGateway} from "@/store/playerStore.js";

const emits = defineEmits(['onConfirmDelete'])
const audioGateway = useAudioGateway()
const sourceGateway = useSourceGateway()
const virtualObjectsGateway = useVirtualObjectsGateway()
const playerGateway = usePlayerGateway()
const deleteTargetAudio = () => {
  const focusesAudio = audioGateway.getFocusedAudio()
  focusesAudio.forEach(audio => audioGateway.deleteAudioSource(audio.id))
  ServerConfig.updateConfig(
      sourceGateway.getNameAudioSources(),
      'full',
      sourceGateway.getVideoSourcesConfigFormat(),
      sourceGateway.getAudioSourcesConfigFormat(),
      virtualObjectsGateway.getVirtualObjectsConfigFormat(),
      playerGateway.getPlayersForConfigFormat()
  )
  wsService.sendMessage(ServerConfig)
  emits('onConfirmDelete')
}

</script>

<template>
  <ConfirmButton @click="deleteTargetAudio"/>
</template>

<style scoped lang="scss">

</style>