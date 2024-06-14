<script setup>

import {useScreenStore} from "@/store/screenStore.js";
import {computed, onMounted, onUpdated, ref} from "vue";
import {useResolutionStore} from "@/store/resolutionStore.js";
import {useSourceGateway} from "@/store/sourceStore.js";
import {VideoStream} from "@/enitites/stream/video-stream/index.js";
import Screen from "../../ui/screen/Screen.vue";
import wsService from "@/API/wsService/wsService.js";
import {VirtualCamera} from "@/enitites/video-device/virtual-camera/index.js";
import ServerConfig from "@/enitites/config/index.js";
import {VirtualAudio} from "@/enitites/audio-device/virtual-audio/index.js";


const screenStore = useScreenStore()
const resolutionStore = useResolutionStore()
const gatewaySources = useSourceGateway()
const mainScreen = screenStore.mainScreen
const otherScreens = computed(() => gatewaySources.getVideoSources())
const videoElement = ref(null)
const videoStream = new VideoStream()

const onChangePositionScreen = (sourceName, coordinates) => {
  const source = gatewaySources.getSource(sourceName)
  const computedCoordinates = rebuildPosition(source, videoElement.value)
  source.changePositionApplication(coordinates)
  source.changePosition(computedCoordinates)
  updateConfigServer()
}

const rebuildPosition = (screen, videoSize) => {
  const {x, y} = screen.positionApplication
  const [widthResolution, heightResolution] = resolutionStore.resolution
  const {width: videoWidth, height: videoHeight} = videoSize
  return computedCoordinates(x, y, widthResolution, heightResolution, videoWidth, videoHeight)
}

const computedCoordinates = (x, y, widthResolution, heightResolution, videoWidth, videoHeight) => {
  const computedX = Math.floor(x / videoWidth * widthResolution)
  // ========== Логи оригинальных и вычисляемых значений ===================
  // console.log('computedX:', computedX, x)
  // console.log('reComputedX: ', (computedX * videoWidth) / widthResolution)
  // ========== Логи оригинальных и вычисляемых значений ===================
  const computedY = Math.floor(y / videoHeight * heightResolution)
  return {x: computedX, y: computedY}
}


const onResizeScreen = (sourceName, size) => {
  const {width, height} = size
  const sizeWidth = +width.toString().replace('px', '')
  const sizeHeight = +height.toString().replace('px', '')
  const source = gatewaySources.getSource(sourceName)
  source.changePositionApplication({width: sizeWidth, height: sizeHeight})
  const [widthResolution, heightResolution] = resolutionStore.resolution
  const videoWidth = videoElement.value.width
  const videoHeight = videoElement.value.height
  const numberWidth = Math.floor(sizeWidth / videoWidth * widthResolution)
  // ========== Логи оригинальных и вычисляемых значений ===================
  // console.log('Resize Number Width:', numberWidth, sizeWidth)
  // console.log('ReComputed Resize Number Width:', (numberWidth * videoWidth) / widthResolution)
  // ========== Логи оригинальных и вычисляемых значений ===================
  const numberHeight = Math.floor(sizeHeight / videoHeight * heightResolution)
  source.changePosition({width: numberWidth, height: numberHeight})
  updateConfigServer()
}


const updateConfigServer = () => {
  ServerConfig.changeUpdateType('fast')
  ServerConfig.addVideSources(gatewaySources.getVideoSourcesObject())
  ServerConfig.addAudioSources(gatewaySources.getAudioSourcesObject())
  ServerConfig.addVirtualCamera(new VirtualCamera())
  ServerConfig.addVirtualAudio(new VirtualAudio())
  wsService.sendMessage(ServerConfig)
  console.log(ServerConfig)
}
const loadVideoStream = async () => {
  const videoElement = document.getElementsByTagName('video')[0]
  videoElement.srcObject = await videoStream.init()
  videoElement.play();
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