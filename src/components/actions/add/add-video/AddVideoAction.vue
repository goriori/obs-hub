<script setup>

import {computed, ref} from "vue";
import {useScreenStore} from "@/store/screenStore.js";
import {useSourceStore} from "@/store/sourceStore.js";
import {useResolutionStore} from "@/store/resolutionStore.js";
import {ScreenFactory} from "@/factory/screen-factory/index.js";
import PlusButton from "../../../ui/buttons/plus/PlusButton.vue";
import Screen from "../../../icons/Screen.vue";
import Camera from "../../../icons/Camera.vue";
import wsService from "@/API/wsService/wsService.js";

const screenStore = useScreenStore()
const sourceStore = useSourceStore()
const resolutionApplication = useResolutionStore()
const isActive = ref(false)
const haveScreens = computed(() => screenStore.getTypeScreens())

const onActive = () => {
  isActive.value = !isActive.value
}

const onClose = () => isActive.value = false
const addCapture = (event) => {
  const targetElement = event.target.closest('article')
  if (targetElement) {
    const {capture} = targetElement.dataset
    if (!capture) return
    if (capture === 'empty') return onClose()
    const screenOption = buildScreenOption(capture)
    const screen = ScreenFactory.getSource(capture, screenOption)
    const source = sourceStore.getSource(capture)
    Object.assign(screen.position, source.position)
    const config = setOptionSourceConfig(screen, screenOption.zIndex, capture).getConfig()
    wsService.sendMessage(config)
    sourceStore.deleteAspect(capture)
  }
  onClose()
}

const computedZIndex = () => {
  return haveScreens.value.length
}
const setOptionSourceConfig = (screen, zIndex, capture) => {
  screenStore.addScreen(screen, capture)
  screenStore.updateScreenListIndex()
  sourceStore.addAspect(capture)
  sourceStore.changeZIndex(capture, zIndex)
  sourceStore.updateShow(capture, true)
  sourceStore.updateType('full')
  return {
    getConfig: () => sourceStore.getConfig()
  }
}


const buildScreenOption = (capture) => {
  const configSources = sourceStore.sources
  return {
    position: configSources?.video_sources[capture]?.position,
    positionApplication: screenStore.mainScreen.position,
    resolution: configSources?.video_sources[capture]?.resolution,
    region: configSources?.video_sources[capture]?.region,
    resolutionApplication: resolutionApplication.resolution,
    zIndex: computedZIndex()
  }
}
</script>

<template>
  <div class="action">
    <Transition name="fade">
      <section class="action-list" v-if="isActive" @click="addCapture">
        <article class="list-item" data-capture="screen" v-if="!haveScreens.includes('screen')">
          <Screen color="#000"/>
          <p>Захват экрана</p>
        </article>
        <article class="list-item" data-capture="webcam" v-if="!haveScreens.includes('webcam')">
          <Camera color="#000"/>
          <p>Захват веб-камеры</p>
        </article>
        <article class="list-item" data-capture='empty' v-if="haveScreens.length === 3">
          <p>Пусто</p>
        </article>
      </section>
    </Transition>
    <PlusButton @click="onActive"/>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.action {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;

  &-list {
    position: absolute;
    top: -100px;
    display: flex;
    width: 220px;
    min-height: 90px;
    flex-direction: column;
    justify-content: center;
    background-color: $primary;
    padding: 10px 20px;
    border-radius: 10px;
    gap: 20px;
  }
}

.list {
  &-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    font-size: 14px;
    border-radius: 10px;
    transition: 0.3s opacity ease-in-out;

    &:active {
      opacity: 0.7;
    }

    svg {
      width: 100%;
      max-width: 15px;
    }
  }
}
</style>