<script setup>

import {computed} from "vue";
import {useStateStore} from "@/store/stateStore.js";
import {useScriptGateway} from "../../../store/scriptStore.js";
import {useSourceGateway} from "@/store/sourceStore.js";
import ListSource from "../../ui/list-source/ListSource.vue";
import DragonDrop from "@/components/ui/dragondrop/DragonDrop.vue";
import wsService from "@/API/wsService/wsService.js";
import ServerConfig from '@/enitites/config'
import {VirtualCamera} from "@/enitites/video-device/virtual-camera/index.js";
import {VirtualAudio} from "@/enitites/audio-device/virtual-audio/index.js";

const stateSource = useStateStore()
const scriptGateway = useScriptGateway()
const sourceGateway = useSourceGateway()
const TYPES_UPDATE = ['active-script', 'disable-script', 'focus-script', 'un-focus-script']
const ASPECT = 'scripts'

const updates = {
  [TYPES_UPDATE[0]]: (data) => activeOrDisableScript(data, true),
  [TYPES_UPDATE[1]]: (data) => activeOrDisableScript(data, false),
  [TYPES_UPDATE[2]]: (data) => focusScript(data, true),
  [TYPES_UPDATE[3]]: (data) => focusScript(data, false)
}

const scripts = computed(() => scriptGateway.getScripts())
const activeOrDisableScript = (data, active = false) => {
  const {id, name} = data
  if (active) {
    const {sourceName, scriptName} = scriptGateway.activeScript(id)
    sourceGateway.activeSourceScript(sourceName, scriptName)
  } else {
    const {sourceName, scriptName} = scriptGateway.disableScript(id)
    sourceGateway.disabledSourceScript(sourceName, scriptName)
  }
  updateServerConfig()
}

const focusScript = (data, active = false) => {
  const {id, name} = data
  if (active) {
    scriptGateway.focusScript(id)
  } else {
    scriptGateway.unFocusScript(id)
  }
}

const loadScript = (script) => {
  stateSource.modals.selectSource.targetFile = script
  stateSource.modals.selectSource.show = true
}

const onUpdateList = (updated) => {
  const {type, data} = updated
  return updates[type].call(this, data)
}

const updateServerConfig = () => {
  ServerConfig.changeUpdateAspects([])
  ServerConfig.changeUpdateType('fast')
  ServerConfig.addVideSources(sourceGateway.getVideoSourcesObject())
  ServerConfig.addAudioSources(sourceGateway.getAudioSourcesObject())
  ServerConfig.addVirtualCamera(new VirtualCamera())
  ServerConfig.addVirtualAudio(new VirtualAudio())
  wsService.sendMessage(ServerConfig)
}
</script>

<template>
  <div class="source">
    <DragonDrop class="drop-list" v-if="scripts.length === 0" @load-file="loadScript" accept=".zip"/>
    <ListSource :sources="scripts" @on-update="onUpdateList" v-if="scripts.length > 0"/>
  </div>

</template>

<style scoped lang="scss">


.source {
  height: 240px;
}
</style>