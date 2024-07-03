<script setup>

import {useSourceGateway} from "@/store/sourceStore.js";
import {useVirtualObjectsGateway} from "@/store/virtualObjectStore.js";
import {usePlayerGateway} from "@/store/playerStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";
import ServerConfig from '@/enitites/config'
import wsService from "@/API/wsService/wsService.js";

const emits = defineEmits(['onConfirmDelete'])
const sourceGateway = useSourceGateway()
const virtualObjectsGateway = useVirtualObjectsGateway()
const playerGateway = usePlayerGateway()
const deleteTargetScreens = () => {
  const focusesSource = sourceGateway.getVideoSources().filter(source => source.focused)
  focusesSource.map(source => sourceGateway.hiddenVideoSource(source.name))
  ServerConfig.updateConfig(
      sourceGateway.getNameVideoSources(),
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
  <ConfirmButton @click="deleteTargetScreens"/>
</template>

<style scoped lang="scss">

</style>