<script setup>

import Camera from "../../icons/Camera.vue";
import Screen from "../../icons/Screen.vue";
import Sound from "../../icons/Sound.vue";

const props = defineProps({
  iconType: {
    type: String,
    default: 'camera'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

const iconsCard = {
  camera: Camera,
  screen: Screen,
  sound: Sound
}

const emits = defineEmits(['update:isActive'])
const onClick = () => emits("update:isActive", !props.isActive)
</script>

<template>
  <div class="source" @click="onClick">
    <section :class="['source-card', {active:props.isActive}]">
      <component :is="iconsCard[iconType]"/>
    </section>
    <p class="source-title">{{ title }}</p>
  </div>

</template>

<style scoped lang="scss">

@import '@/assets/scss/variables';

.source {
  max-width: 141px;
  display: flex;
  align-items: center;

  &-card {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    padding: 20px;
    background-color: #202020;

    &:hover {
      cursor: pointer;
      transition: 0.3s background-color ease-in-out;
      background-color: $primary;
    }
  }

  &-title {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: $primary;
  }
}


.active {
  background-color: $primary;
}

</style>