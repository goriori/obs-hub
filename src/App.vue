<script setup>
import { useRoute } from 'vue-router'
import VLoader from '@/components/VLoader.vue'
import { useStateStore } from '@/store/stateStore'

const route = useRoute()
const stateStore = useStateStore()
</script>

<template>
  <main class="main">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <transition name="fade-page" mode="out-in">
          <suspense>
            <component :is="Component" :key="route.fullPath"></component>
          </suspense>
        </transition>
      </template>
    </RouterView>
    <VLoader v-if="stateStore.isLoading" />
  </main>
</template>

<style scoped></style>
