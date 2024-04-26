<script setup>
import {useRoute} from 'vue-router'
import {computed,  ref,} from "vue";
import VLoader from '@/components/VLoader.vue'
import {useStateStore} from '@/store/stateStore'
import SelectSourceModal from "./components/modules/modals/select-source/SelectSourceModal.vue";
import DeleteSourceVideo from "@/components/modules/modals/delete-source-video/DeleteSourceVideo.vue";
import DeleteScript from "@/components/modules/modals/delete-script/DeleteScript.vue";

const route = useRoute()
const stateStore = useStateStore()
const modals = ref([
  {
    id: 1,
    component: SelectSourceModal,
    conditionVisibility: computed(() => stateStore.modals.selectSource.show)
  },
  {
    id: 2,
    component: DeleteSourceVideo,
    conditionVisibility: computed(() => stateStore.modals.delete.deleteSourceVideo.show)
  },
  {
    id: 3,
    component: DeleteScript,
    conditionVisibility: computed(() => stateStore.modals.delete.deleteScript.show)
  }
])
</script>

<template>
  <main class="main">
    <Teleport to="body">
      <Transition name="fade" v-for="modal in modals" :key="modal.id">
        <component :is="modal.component" v-if="modal.conditionVisibility"/>
      </Transition>
    </Teleport>
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

<style scoped></style>
