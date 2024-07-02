<script setup>
import {useRoute} from 'vue-router'
import {onMounted} from "vue";
import {useStateStore} from '@/store/stateStore'
import {useResolutionStore} from "@/store/resolutionStore.js";
import {useScreenStore} from "@/store/screenStore.js";
import {useStreamStore} from "@/store/streamStore.js";
import {useAudioGateway} from "@/store/audioStore.js";
import {useScriptGateway} from "@/store/scriptStore.js";
import {useSourceGateway} from "@/store/sourceStore.js";
import {buildPositionApplication} from "@/utils/helpers/buildPositionApplication.js";
import {AudioStream} from "@/enitites/stream/audio-stream/index.js";
import VLoader from '@/components/VLoader.vue'
import Modals from "@/components/modules/modals/Modals.vue";
import wsService from "@/API/wsService/wsService.js";
import SourceFactory from "@/factory/source-factory/index.js";

const route = useRoute()
const stateStore = useStateStore()
const streamStore = useStreamStore()
const scriptGateway = useScriptGateway()
const resolutionStore = useResolutionStore()
const screenStore = useScreenStore()
const sourceGateway = useSourceGateway()
const audioGateway = useAudioGateway()

const initVideoSources = async () => {
  await wsService.initConnect()
  const serverConfig = await wsService.getConfig()
  const videoSources = serverConfig.video_sources
  const sources = Object.keys(videoSources).map(sourceName => SourceFactory.getSource(sourceName))
  sources.forEach(source => {
    const position = videoSources[source.name].position
    const positionResolution = resolutionStore.resolution
    const mainScreenPosition = screenStore.mainScreen.position
    const computedPositionApplication = buildPositionApplication(position, positionResolution,mainScreenPosition)
    if (videoSources[source.name].show) source.onShow()
    source.changePosition(position)
    source.changeZIndex(videoSources[source.name]['z-index'])
    source.changePositionApplication(computedPositionApplication)
    sourceGateway.addSource(source)
  })
}

const initAudioSources = async () => {
  const serverConfig = await wsService.getConfig()
  const audioSources = serverConfig.audio_sources
  const sources = Object.keys(audioSources).map(sourceName => SourceFactory.getSource(sourceName))
  sources.forEach(source => {
    if(audioSources[source.name].show) source.onShow()
    audioGateway.addAudioSource(source)
    sourceGateway.addSource(source)
  })
}

const initAudioStream = async () => {
  const audioStream = new AudioStream()
  await audioStream.init()
  console.log(audioStream.getAudioDevices())
  streamStore.addStream(audioStream)
}

const initScripts = async () => {
  const serverConfig = await wsService.getConfig()
  const virtualCamera = serverConfig.virtual_camera
  const videoSources = serverConfig.video_sources
  const nameSources = Object.keys(videoSources)
  const scriptsSources = nameSources.map(sourceName => {
    if (videoSources[sourceName].external_scripts.length > 0) {
      const scripts = videoSources[sourceName].external_scripts
      const source = sourceGateway.getSource(sourceName)
      scripts.forEach(script => script.sourceName = sourceName)
      scripts.forEach(script => source.addScript(script))
      return scripts
    }
    return []
  })
  const scriptsVirtualCamera = virtualCamera.external_scripts
  const scripts = [...scriptsSources, scriptsVirtualCamera].flat(Infinity)
  scripts.forEach(script => scriptGateway.addScript(script))
}

onMounted(async () => {
  await initVideoSources()
  await initAudioSources()
  await initScripts()
  await initAudioStream()

})

</script>

<template>
  <main class="main">
    <Modals/>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <transition name="fade-page" mode="out-in">
          <suspense>
            <component :is="Component" :key="route.fullPath"></component>
          </suspense>
        </transition>
      </template>
    </RouterView>
    <VLoader v-if="stateStore.isLoading"/>
  </main>
</template>

<style scoped>
.main {
  transition: 0.3s all ea;
}
</style>
