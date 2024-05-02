<script setup>
import {useRoute} from 'vue-router'
import {onMounted} from "vue";
import {useStateStore} from '@/store/stateStore'
import VLoader from '@/components/VLoader.vue'
import Modals from "@/components/modules/modals/Modals.vue";
import wsService from "@/API/wsService/wsService.js";

const route = useRoute()
const stateStore = useStateStore()
onMounted(async () => {
  await wsService.initConnect()
  console.log(await wsService.getConfig())
})
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

<style scoped></style>
