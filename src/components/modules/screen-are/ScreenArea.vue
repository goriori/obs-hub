<script setup>

import {useScreenStore} from "@/store/screenStore.js";
import {computed, onMounted, onUpdated, ref} from "vue";
import {useSourceStore} from "@/store/sourceStore.js";
import {useResolutionStore} from "@/store/resolutionStore.js";
import Screen from "../../ui/screen/Screen.vue";
import wsService from "@/API/wsService/wsService.js";

const sourceStore = useSourceStore()
const screenStore = useScreenStore()
const resolutionStore = useResolutionStore()

const mainScreen = screenStore.mainScreen
const otherScreens = computed(() => screenStore.screens)
const videElement = ref(null)
const stream = ref(null)

const onChangePositionScreen = (screenId, coordinates,) => {
  screenStore.changePositionScreen(screenId, coordinates)
  const screen = screenStore.getScreen(screenId)
  const computedCoordinates = rebuildPosition(screen, videElement.value)
  const source = sourceStore.getSource(screen.type)
  Object.assign(source.position, computedCoordinates)
  sourceStore.updateSource(screen.type, source)
  sourceStore.updateType('fast')
  const config = sourceStore.getConfig()
  wsService.sendMessage(config)
}

const rebuildPosition = (screen, videoSize) => {
  const {x, y} = screen.position
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


const onResizeScreen = (screenId, size) => {
  const {width, height} = size
  const sizeWidth = +width.toString().replace('px', '')
  const sizeHeight = +height.toString().replace('px', '')

  const screen = screenStore.getScreen(screenId)
  const source = sourceStore.getSource(screen.type)

  const [widthResolution, heightResolution] = resolutionStore.resolution
  const videoWidth = videElement.value.width
  const videoHeight = videElement.value.height

  const numberWidth = Math.floor(sizeWidth / videoWidth * widthResolution)

  // ========== Логи оригинальных и вычисляемых значений ===================
  console.log('Resize Number Width:', numberWidth, sizeWidth)
  console.log('ReComputed Resize Number Width:', (numberWidth * videoWidth) / widthResolution)
  // ========== Логи оригинальных и вычисляемых значений ===================

  const numberHeight = Math.floor(sizeHeight / videoHeight * heightResolution)
  screenStore.resizeScreen(screenId, size)

  Object.assign(source.position, {width: numberWidth, height: numberHeight})
  sourceStore.updateType('fast')

  const config = sourceStore.getConfig()
  wsService.sendMessage(config)
}
const initVideoStream = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const streamerDevice = devices.find(device => device.label === 'Streamer')
  if (!streamerDevice) await getPermissionVideoCapture(devices)
  else await loadVideoStream(streamerDevice)
}

const loadVideoStream = async (device) => {
  const videoElement = document.getElementsByTagName('video')[0]
  stream.value = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: device.deviceId,
    }
  })
  videoElement.srcObject = stream.value
  videoElement.play();
}

const getPermissionVideoCapture = async (devices) => {
  const videoInput = devices.find(device => device.kind === 'videoinput')
  await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: videoInput.deviceId,
    }
  }).finally(() => window.location.reload())
}

const stopVideoStream = () => {
  return stream.value.getTracks().forEach(track => track.stop())
}
const initVideoElement = () => videElement.value = document.getElementById('main-screen')

onMounted(async () => {
  initVideoElement()
  if (screenStore.screens.length > 0) await initVideoStream()
})

onUpdated(async () => {
  if (screenStore.screens.length === 0) stopVideoStream()
  else await initVideoStream()
})

</script>

<template>
  <Screen
      :main-screen="mainScreen"
      :screens="otherScreens"
      @change-position-screen="onChangePositionScreen"
      @resize-screen="onResizeScreen"/>
</template>

<style scoped lang="scss">

</style>