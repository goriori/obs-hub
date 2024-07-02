<script setup>

import {useScreenStore} from "@/store/screenStore.js";
import {computed, onMounted, onUpdated, ref} from "vue";
import {useResolutionStore} from "@/store/resolutionStore.js";
import {useSourceGateway} from "@/store/sourceStore.js";
import {VideoStream} from "@/enitites/stream/video-stream/index.js";
import {VirtualCamera} from "@/enitites/video-device/virtual-camera/index.js";
import {VirtualAudio} from "@/enitites/audio-device/virtual-audio/index.js";
import Screen from "../../ui/screen/Screen.vue";
import wsService from "@/API/wsService/wsService.js";
import ServerConfig from "@/enitites/config/index.js";
import {useStreamStore} from "@/store/streamStore.js";
import {useVirtualObjectsGateway} from "@/store/virtualObjectStore.js";
import {usePlayerGateway} from "@/store/playerStore.js";


const streamStore = useStreamStore()
const screenStore = useScreenStore()
const resolutionStore = useResolutionStore()
const gatewaySources = useSourceGateway()
const virtualObjectGateway = useVirtualObjectsGateway()
const playerGateway = usePlayerGateway()
const mainScreen = screenStore.mainScreen
const otherScreens = computed(() => gatewaySources.getVideoSources())
const videoElement = ref(null)
const videoStream = new VideoStream()

const onChangePositionScreen = (sourceName, coordinates) => {
  const source = gatewaySources.getSource(sourceName)
  source.changePositionApplication(coordinates)
  source.changePosition(rebuildPosition(source, videoElement.value))
  updateFastConfigServer()
}

const rebuildPosition = (source, videoSize) => {
  const {x, y} = source.positionApplication
  const [widthResolution, heightResolution] = resolutionStore.resolution
  const {width: videoWidth, height: videoHeight} = videoSize
  return computedCoordinates(x, y, widthResolution, heightResolution, videoWidth, videoHeight)
}

const computedCoordinates = (x, y, widthResolution, heightResolution, videoWidth, videoHeight) => {
  const computedX = Math.round(x / videoWidth * widthResolution)
  const computedY = Math.round(y / videoHeight * heightResolution)
  return {x: computedX, y: computedY}
}


const onResizeScreen = (sourceName, size) => {
  const {width, height} = size
  const sizeWidth = +width.toString().replace('px', '')
  const sizeHeight = +height.toString().replace('px', '')
  const source = gatewaySources.getSource(sourceName)
  const [widthResolution, heightResolution] = resolutionStore.resolution
  const videoWidth = videoElement.value.width
  const videoHeight = videoElement.value.height
  const numberWidth = Math.floor(sizeWidth / videoWidth * widthResolution)
  const numberHeight = Math.floor(sizeHeight / videoHeight * heightResolution)
  source.changePositionApplication({width: sizeWidth, height: sizeHeight})
  source.changePosition({width: numberWidth, height: numberHeight})
  updateFastConfigServer()
}


const updateFastConfigServer = () => {
  ServerConfig.changeUpdateAspects([])
  ServerConfig.changeUpdateType('fast')
  ServerConfig.addVideSources(gatewaySources.getVideoSourcesConfigFormat())
  ServerConfig.addAudioSources(gatewaySources.getAudioSourcesConfigFormat())
  ServerConfig.addVirtualObjects(virtualObjectGateway.getVirtualObjectsConfigFormat())
  ServerConfig.addPlayer(playerGateway.getPlayersForConfigFormat())
  wsService.sendMessage(ServerConfig)
}
const loadVideoStream = async () => {
  const videoElement = document.getElementsByTagName('video')[0]
  videoElement.srcObject = await videoStream.init()
  videoElement.play();
  streamStore.addStream(videoStream)
}

const initVideoElement = () => videoElement.value = document.getElementById('main-screen')

onMounted(async () => {
  return Promise.resolve().then(initVideoElement).then(loadVideoStream)
})


onUpdated(async () => {
  if (otherScreens.value.length === 0) await videoStream.stopStream()
  else await loadVideoStream()


})

</script>

<template>
  <Screen
      :main-screen="mainScreen"
      :sources="otherScreens"
      @change-position-screen="onChangePositionScreen"
      @resize-screen="onResizeScreen"/>
</template>

<style scoped lang="scss">

</style>