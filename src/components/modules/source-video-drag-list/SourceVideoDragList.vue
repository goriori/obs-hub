<script setup>

import {computed} from "vue";
import {useScreenStore} from "@/store/screenStore.js";
import {useSourceGateway} from "@/store/sourceStore.js";
import ListDragable from "@/components/ui/list-dragable/ListDragable.vue";
import ServerConfig from '@/enitites/config/index.js'
import wsService from "@/API/wsService/wsService.js";
import {VirtualCamera} from "@/enitites/video-device/virtual-camera/index.js";
import {VirtualAudio} from "@/enitites/audio-device/virtual-audio/index.js";

const screenStore = useScreenStore()
const sourceGateway = useSourceGateway()
const sources = computed(() => sourceGateway.getVideoSources())

const changeList = (list) => {
  const copyList = [...list]
  const reverseList = copyList.reverse()
  reverseList.forEach((source, index) => source['z-index'] = index)
  const convertList = reverseList.reverse()
  sourceGateway.changeList(convertList, 'video')
  updateConfig()
}

const updateConfig = () => {
  ServerConfig.changeUpdateAspects(['webcam', 'screen'])
  ServerConfig.changeUpdateType('full')
  ServerConfig.addVirtualCamera(new VirtualCamera())
  ServerConfig.addVirtualAudio(new VirtualAudio())
  ServerConfig.addVideSources(sourceGateway.getVideoSourcesObject())
  ServerConfig.addAudioSources(sourceGateway.getAudioSourcesObject())
  console.log(ServerConfig)
  wsService.sendMessage(ServerConfig)
}
</script>

<template>
  <ListDragable :sources="sources" @on-change-list="changeList"/>
</template>

<style scoped lang="scss">

</style>