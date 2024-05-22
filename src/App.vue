<script setup>
import {useRoute} from 'vue-router'
import {onMounted, onUpdated, shallowRef} from "vue";
import {useStateStore} from '@/store/stateStore'
import {useSourceStore} from "@/store/sourceStore.js";
import {useResolutionStore} from "@/store/resolutionStore.js";
import {useScreenStore} from "@/store/screenStore.js";
import {ScreenFactory} from "@/factory/screen-factory/index.js";
import VLoader from '@/components/VLoader.vue'
import Modals from "@/components/modules/modals/Modals.vue";
import wsService from "@/API/wsService/wsService.js";
import {ScriptDto, ScriptSourceDto} from "@/dto/script-dto/index.js";
import {useScriptStore} from "@/store/scriptStore.js";
import Source from "@/components/ui/source/Source.vue";
import {CardCaptureFactory} from "@/factory/icon-card-capture-factory/index.js";
import IconCard from "@/components/ui/icon-card/IconCard.vue";

const route = useRoute()
const stateStore = useStateStore()
const sourceStore = useSourceStore()
const screenStore = useScreenStore()
const scriptStore = useScriptStore()
const resolutionStore = useResolutionStore()

const cardCaptureFactory = new CardCaptureFactory()
const checkActiveSources = async (config) => {
  const sourceVirtualCameraScripts = config?.virtual_camera?.external_scripts
  createScripts(sourceVirtualCameraScripts, 'virtual_camera')
  const sources = Object.keys(config?.video_sources)
  sources.forEach(source => {
    const sourceObject = config?.video_sources[source]
    const sourceObjectShow = sourceObject?.show
    const sourceObjectScripts = sourceObject.external_scripts
    const optionSource = {
      position: config?.video_sources[source]?.position,
      positionApplication: screenStore.mainScreen.position,
      resolution: config?.video_sources[source]?.resolution,
      region: config?.video_sources[source]?.region,
      resolutionApplication: resolutionStore.resolution,
      zIndex: config?.video_sources[source]['z-index']
    }
    if (sourceObjectShow) createScreen(source, optionSource)
    createScripts(sourceObjectScripts, source)
  })
  console.log(screenStore.screens)
}

const createScreen = (source, option) => {
  const screen = ScreenFactory.getSource(source, option)
  screenStore.addScreen(screen, source)
  screenStore.updateScreenListIndex()
}

const createScripts = (scripts, sourceName) => {
  const typeCapture = sourceName === 'virtual_camera' ? 'all' : sourceName
  const typeUse = sourceName === 'audio' ? 'sound' : 'camera'
  scripts.forEach(script => {
    const scriptDto = buildScriptDto(script, typeCapture, typeUse)
    const scriptSourceObject = buildSourceDto(script)
    const scriptObject = scriptDto.getScript()
    sourceStore.scripts.push({...scriptSourceObject, source: sourceName})
    scriptStore.addScript(scriptObject)
  })
}

const buildScriptDto = (script, typeCapture, typeUse) => {
  return new ScriptDto({
    id: script?.id,
    name: script.name,
    path: script.path,
    isActive: script.enabled,
    targetForCapture: {
      type: typeCapture,
      component: cardCaptureFactory.getCard(typeCapture)
    },
    targetForUse: {
      type: typeUse,
      component: shallowRef(IconCard)
    }
  })
}
const buildSourceDto = (script) => {
  return new ScriptSourceDto({
    id: script.id,
    path: script.path,
    name: script.name,
    args: script.args,
    enabled: script.enabled
  })
}
onMounted(async () => {
  await wsService.initConnect()
  const config = await wsService.getConfig()
  await checkActiveSources(config)
  sourceStore.sources = config
  if (config.virtual_camera) {
    const {width, height} = config.virtual_camera
    resolutionStore.setTargetResolution({width, height})
  }
})

onUpdated(async()=> console.log('update app'))

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
