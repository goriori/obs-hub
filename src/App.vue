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
import {useSourceGateway} from "@/store/sourceStoreNew.js";
import SourceFactory from "@/factory/source-factory/index.js";
import {buildPositionApplication} from "@/utils/helpers/buildPositionApplication.js";

const route = useRoute()
const stateStore = useStateStore()
const sourceStore = useSourceStore()
const scriptStore = useScriptStore()
const resolutionStore = useResolutionStore()
const screenStore = useScreenStore()

const sourceGateway = useSourceGateway()
const initSources = async () => {
  await wsService.initConnect()
  const serverConfig = await wsService.getConfig()
  const videoSources = serverConfig.video_sources
  const sources = Object.keys(videoSources).map(source => SourceFactory.getSource(source))
  sources.forEach(source => {
    const position = videoSources[source.name].position
    const positionApplication = screenStore.mainScreen.position
    const positionResolution = resolutionStore.resolution
    const computedPositionApplication = buildPositionApplication(position, positionApplication, positionResolution)
    source.changePosition(computedPositionApplication)
    source.changeZIndex(videoSources[source.name]['z-index'])
    sourceGateway.addSource(source)
  })
}

onMounted(() => {
  initSources()
})
onUpdated(async () => console.log('update app'))

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
