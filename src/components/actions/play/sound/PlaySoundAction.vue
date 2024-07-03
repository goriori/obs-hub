<script setup>

import PlayButton from "@/components/ui/buttons/play/PlayButton.vue";
import {usePlayerGateway} from "@/store/playerStore.js";
import ServerConfig from '@/enitites/config/index.js'
import {useSourceGateway} from "@/store/sourceStore.js";
import {useVirtualObjectsGateway} from "@/store/virtualObjectStore.js";
import wsService from "@/API/wsService/wsService.js";

const playerGateway = usePlayerGateway()
const sourceGateway = useSourceGateway()
const virtualObjectsGateway = useVirtualObjectsGateway()
const playSound = () => {
  playerGateway.getPlayer('sound_player').changeState('play_once')
  ServerConfig.updateConfig(
      ['sound_player'],
      'full',
      sourceGateway.getVideoSourcesConfigFormat(),
      sourceGateway.getAudioSourcesConfigFormat(),
      virtualObjectsGateway.getVirtualObjectsConfigFormat(),
      playerGateway.getPlayersForConfigFormat()
  )
  wsService.sendMessage(ServerConfig)
}

</script>

<template>
  <PlayButton @click="playSound"/>
</template>

<style scoped lang="scss">

</style>