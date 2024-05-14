<script setup>

import Camera from "../../icons/Camera.vue";
import Screen from "../../icons/Screen.vue";
import Sound from "../../icons/Sound.vue";

defineProps({
  iconType: {
    type: String,
    default: 'camera'
  }
})

const iconsCard = {
  camera: Camera,
  screen: Screen,
  sound: Sound
}
</script>

<template>
  <section class="icon-card">
    <component :is="iconsCard[iconType]"/>
  </section>
</template>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.icon-card {
  width: 100%;
  max-width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 20px;
  background-color: #202020;
  @media (max-width: $md1 + px) {
    max-width: 55px;
    height: 55px;
  }
}
</style>