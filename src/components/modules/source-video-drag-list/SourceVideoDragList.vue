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
const sources = computed(() => sourceGateway.getVideoSources().filter(source => source.show))

const TYPES_UPDATE = ['focus-source', 'un-focus-source']

const updates = {
  [TYPES_UPDATE[0]]: (data) => focusSource(data, true),
  [TYPES_UPDATE[1]]: (data) => focusSource(data, false),
}


const focusSource = (data, active = false) => {
  const {name} = data
  if (active) sourceGateway.focusSource(name)
  else sourceGateway.unFocusSource(name)
}

const onUpdateList = (updated) => {
  const {type, data} = updated
  return updates[type].call(this, data)
}

const changeList = (list) => {
  const copyList = [...list]
  const reverseList = copyList.reverse()
  reverseList.forEach((source, index) => source['z-index'] = index)
  sourceGateway.changeList(reverseList.reverse(), 'video')
  updateConfig()
}

const updateConfig = () => {
  ServerConfig.changeUpdateAspects(sourceGateway.getNameVideoSources())
  ServerConfig.changeUpdateType('full')
  ServerConfig.addVirtualCamera(new VirtualCamera())
  ServerConfig.addVirtualAudio(new VirtualAudio())
  ServerConfig.addVideSources(sourceGateway.getVideoSourcesObject())
  ServerConfig.addAudioSources(sourceGateway.getAudioSourcesObject())
  wsService.sendMessage(ServerConfig)
}
</script>

<template>
  <ListDragable :sources="sources" @on-change-list="changeList" @on-update="onUpdateList"/>
</template>

<style scoped lang="scss">

</style>