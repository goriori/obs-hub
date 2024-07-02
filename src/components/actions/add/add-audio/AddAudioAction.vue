<script setup>

import {useAudioGateway} from "@/store/audioStore.js";
import PlusButton from "@/components/ui/buttons/plus/PlusButton.vue";
import {computed, ref,} from "vue";
import Screen from "@/components/icons/Screen.vue";
import Camera from "@/components/icons/Camera.vue";
import SourceFactory from "@/factory/source-factory/index.js";
import ServerConfig from "@/enitites/config/index.js";
import wsService from "@/API/wsService/wsService.js";
import {useSourceGateway} from "@/store/sourceStore.js";
import {useVirtualObjectsGateway} from "@/store/virtualObjectStore.js";
import {usePlayerGateway} from "@/store/playerStore.js";

const sourceGateway = useSourceGateway()
const playerGateway = usePlayerGateway()
const virtualObjectGateway = useVirtualObjectsGateway()
const isActive = ref(false)
const haveScreens = computed(() =>
    sourceGateway.getAudioSources()
        .map(source => source.show ? source.name : false)
        .filter(source => source)
)
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
    const audioSource = SourceFactory.getSource(capture)
    sourceGateway.showSource(audioSource.name)
    updateFastConfigServer()
  }
  onClose()
}

const updateFastConfigServer = () => {
  ServerConfig.changeUpdateAspects(['microphone', 'system_sound'])
  ServerConfig.changeUpdateType('full')
  ServerConfig.addVideSources(sourceGateway.getVideoSourcesConfigFormat())
  ServerConfig.addAudioSources(sourceGateway.getAudioSourcesConfigFormat())
  ServerConfig.addVirtualObjects(virtualObjectGateway.getVirtualObjectsConfigFormat())
  ServerConfig.addPlayer(playerGateway.getPlayersForConfigFormat())
  wsService.sendMessage(ServerConfig)
}
</script>

<template>
  <Transition name="fade">
    <section class="action-list" v-if="isActive" @click="addCapture">
      <article class="list-item" data-capture="microphone" v-if="!haveScreens.includes('microphone')">
        <Screen color="#000"/>
        <p>Захват микрофона</p>
      </article>
      <article class="list-item" data-capture="system_sound" v-if="!haveScreens.includes('system_sound')">
        <Camera color="#000"/>
        <p>Захват системных звуков</p>
      </article>
      <article class="list-item" data-capture='empty' v-if="haveScreens.length === 2">
        <p>Пусто</p>
      </article>
    </section>
  </Transition>
  <PlusButton @click="onActive"/>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.action {


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