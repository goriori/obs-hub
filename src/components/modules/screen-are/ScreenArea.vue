<script setup>

import {useScreenStore} from "../../../store/screenStore.js";
import {computed, onMounted, ref} from "vue";
import Screen from "../../ui/screen/Screen.vue";

const screenStore = useScreenStore()
const sendObject = {
  "update_aspects": [],
  "update_type": "fast",
  "config": {
    "virtual_camera": {
      "external_scripts": [],
      "width": 1920,
      "height": 1080,
      "fps": 30,
      "backend": "unitycapture",
      "device": "Unity Video Capture"
    },
    "video_sources": {
      "webcam": {
        "show": true,
        "external_scripts": [
          {
            "name": "\u0420\u045a\u0420\u00b0\u0421\u0403\u0420\u0454\u0420\u00b0",
            "path": "external_scripts/mask.py",
            "enabled": false,
            "args": {}
          }
        ],
        "device_index": 0,
        "resolution": {
          "width": 1280,
          "height": 720
        },
        "position": {
          "x": 0,
          "y": 0,
          "width": 640,
          "height": 360
        },
        "z-index": 1,
        "dshow_settings": true
      },
      "screen": {
        "show": true,
        "external_scripts": {},
        "monitor_index": 1,
        "region": {
          "x": 0,
          "y": 0,
          "width": 1920,
          "height": 1080
        },
        "position": {
          "x": 0,
          "y": 0,
          "width": 1920,
          "height": 1080
        },
        "z-index": 0
      }
    }
  }
}
const wsServer = 'ws://127.0.0.1/config'
const videoStream = new WebSocket(wsServer)
const mainScreen = screenStore.screens[0]
const otherScreens = computed(() => screenStore.screens.slice(1))
const videElement = ref(null)
const screensSettings = {
  webcam: {
    width: sendObject.config.video_sources.webcam.position.width,
    height: sendObject.config.video_sources.webcam.position.height
  },
  screen: {}

}
const onChangePositionScree = (screenId, coordinates,) => {
  const {x, y} = coordinates
  const {width: videoWidth, height: videoHeight} = videElement.value
  const computedX = Math.floor(x / videoWidth * 1920)
  const computedY = Math.floor(y / videoHeight * 1080)
  const computedCoordinated = {x: computedX, y: computedY}
  Object.assign(sendObject['config']['video_sources']['webcam']['position'], computedCoordinated)
  screenStore.changePositionScreen(screenId, coordinates)
  videoStream.send(JSON.stringify(sendObject))
}
const onResizeScreen = (screenId, size) => {
  const {width, height} = size
  Object.assign(sendObject['config']['video_sources']['webcam']['position'], {width, height})
  screenStore.resizeScreen(screenId, size)
  videoStream.send(JSON.stringify(sendObject))
}
onMounted(() => {
  videElement.value = document.getElementById('screen-main')
  videoStream.onopen = async (event) => {
    console.log(event)
  }
  videoStream.onmessage = (event, message) => {
    console.log(event, message)
  }
})
</script>

<template>
  <Screen :settings="screensSettings"
          :main-screen="mainScreen"
          :screens="otherScreens"
          @change-position-screen="onChangePositionScree"
          @resize-screen="onResizeScreen"/>
</template>

<style scoped lang="scss">

</style>