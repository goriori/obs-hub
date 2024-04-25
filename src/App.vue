<script setup>
import {useRoute} from 'vue-router'
import VLoader from '@/components/VLoader.vue'
import {useStateStore} from '@/store/stateStore'
import SelectSourceModal from "./components/modules/modals/select-source/SelectSourceModal.vue";

const route = useRoute()
const stateStore = useStateStore()
</script>

<template>
  <main class="main">
    <Teleport to="body">
      <Transition name="fade">
        <SelectSourceModal v-if="stateStore.modals.selectSource.show"/>
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
