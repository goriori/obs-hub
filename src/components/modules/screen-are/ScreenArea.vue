<script setup>

import {useScreenStore} from "../../../store/screenStore.js";
import {computed, onMounted, onUpdated, ref} from "vue";
import {useSourceStore} from "@/store/sourceStore.js";
import Screen from "../../ui/screen/Screen.vue";
import wsService from "@/API/wsService/wsService.js";

const sourceStore = useSourceStore()
const screenStore = useScreenStore()

const stream = ref(null)

const mainScreen = screenStore.screens[0]
const otherScreens = computed(() => screenStore.screens.slice(1))
const videElement = ref(null)
const screensSettings = ref({
  webcam: {
    width: sourceStore.getConfig().config.video_sources?.webcam?.position?.width,
    height: sourceStore.getConfig().config.video_sources?.webcam?.position?.height
  },
  screen: {}
})
const onChangePositionScreen = (screenId, coordinates,) => {
  screenStore.changePositionScreen(screenId, coordinates)
  const screen = screenStore.getScreen(screenId)
  const computedCoordinates = rebuildPosition(screen.position, videElement.value)
  const source = sourceStore.getSource(screen.type)
  Object.assign(source.position, computedCoordinates)
  console.log('source', source)
  sourceStore.updateSource(screen.type, source)
  sourceStore.updateType('fast')
  const config = sourceStore.getConfig()
  wsService.sendMessage(config)

}

const rebuildPosition = (position, videoSize) => {
  const {x, y} = position
  const {width: videoWidth, height: videoHeight} = videoSize
  return computedCoordinates(x, y, videoWidth, videoHeight)
}

const computedCoordinates = (x, y, videoWidth, videoHeight) => {
  const computedX = Math.floor(x / videoWidth * 1920)
  const computedY = Math.floor(y / videoHeight * 1080)
  return {x: computedX, y: computedY}
}


const onResizeScreen = (screenId, size) => {
  const {width, height} = size
  const videoWidth = videElement.value.width
  const videoHeight = videElement.value.height
  const numberWidth = Math.floor(+width.replace('px', '') / videoWidth * 1920)
  const numberHeight = Math.floor(+height.replace('px', '') / videoHeight * 1080)
  screenStore.resizeScreen(screenId, size)
  console.log('resize:', size, numberWidth, numberHeight)
  const screen = screenStore.getScreen(screenId)
  const source = sourceStore.getSource(screen.type)
  Object.assign(source.position, {width: numberWidth, height: numberHeight})
  sourceStore.updateType('fast')
  const config = sourceStore.getConfig()
  wsService.sendMessage(config)
}
const initScreen = async () => {
  if (screenStore.screens.length === 1) return stream.value.getTracks().forEach(track => track.stop())
  const videoElement = document.getElementsByTagName('video')[0]
  const devices = await navigator.mediaDevices.enumerateDevices()
  console.log(devices)
  stream.value = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: devices[2].deviceId,
    }
  })
  videoElement.srcObject = stream.value
  videoElement.play();

}

const initVideoElement = () => videElement.value = document.getElementById('main-screen')

onMounted(async () => {
  initVideoElement()
  setTimeout(() => {
    wsService.sendMessage(sourceStore.getConfig())
  }, 3000)
})

onUpdated(async () => {
  console.log('update')
  await initScreen()
})
</script>

<template>
  <Screen :settings="screensSettings"
          :main-screen="mainScreen"
          :screens="otherScreens"
          @change-position-screen="onChangePositionScreen"
          @resize-screen="onResizeScreen"/>
</template>

<style scoped lang="scss">

</style>