<script setup>

import DownloadButton from "@/components/ui/buttons/download/DownloadButton.vue";
import {loadFile} from "@/utils/helpers/loadFile.js";
import {PlayerService} from "@/API/playerService/playerService.js";
import {usePlayerGateway} from "@/store/playerStore.js";

const playerGateway = usePlayerGateway()

const onLoadSound = async () => {
  const file = await loadFile('.mp3')
  const formData = new FormData()
  formData.append('file', file)
  const {path} = await PlayerService.loadMp3FileForPlayer(formData)
  playerGateway.getPlayer('sound_player').changeSourcePath(path)
}


</script>

<template>
  <DownloadButton @click="onLoadSound"/>
</template>

<style scoped lang="scss">

</style>