<script setup>

import {useScreenStore} from "../../../store/screenStore.js";
import {computed, onMounted, ref} from "vue";
import {useSourceStore} from "@/store/sourceStore.js";
import Screen from "../../ui/screen/Screen.vue";
import wsService from "@/API/wsService/wsService.js";

const sourceStore = useSourceStore()
const screenStore = useScreenStore()
const configData = ref({
  "update_aspects": [],
  "update_type": "fast",
  "config": sourceStore.sources
})
const mainScreen = screenStore.screens[0]
const otherScreens = computed(() => screenStore.screens.slice(1))
const videElement = ref(null)
const screensSettings = ref({
  webcam: {
    width: configData.value.config.video_sources?.webcam?.position?.width,
    height: configData.value.config.video_sources?.webcam?.position?.height
  },
  screen: {}
})
const onChangePositionScreen = (screenId, coordinates,) => {
  screenStore.changePositionScreen(screenId, coordinates)
  const screen = screenStore.getScreen(screenId)
  if (screen.type === 'webcam') {
    const computedCoordinates = rebuildPosition(screen.position, videElement.value)
    const source = sourceStore.getSource('webcam')
    console.log('source:', source)
    Object.assign(source.position, computedCoordinates)
    sourceStore.updateSource('webcam', source)
    wsService.sendMessage(configData.value)
  }

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
  if (screen.type === 'webcam') {
    const source = sourceStore.getSource('webcam')
    Object.assign(source.position, {width: numberWidth, height: numberHeight})
    wsService.sendMessage(configData.value)
  }
}
const initVideoElement = () => videElement.value = document.getElementById('main-screen')

onMounted(async () => {
  initVideoElement()
  wsService.initConnect().then(() => {
    wsService.sendMessage(configData.value)
  })

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