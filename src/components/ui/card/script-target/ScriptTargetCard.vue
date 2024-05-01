<script setup>

import Card from "../Card.vue";
import IconCard from "../../icon-card/IconCard.vue";
import Camera from "../../../icons/Camera.vue";
import Screen from "../../../icons/Screen.vue";
import Sound from "../../../icons/Sound.vue";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  isFocus: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: 'Firstscript.py'
  },
  source: {
    type: Object,
    default: () => {
    }
  },
  targetType: {
    type: String,
    default: 'webcam'
  }
})

const typeScript = {
  webcam: {
    title: 'захват веб-камер',
    color: '#000',
    component: Camera
  },
  screen: {
    title: 'закват экрана',
    color: '#000',
    component: Screen
  },
  sound: {
    title: 'захват звука',
    color: '#000',
    component: Sound
  }
}


const emits = defineEmits(['update:isFocus', 'update:isActive'])
const onFocus = () => emits('update:isFocus', !props.isFocus)
const onActiveScript = () => {
  emits('update:isActive', true)
}
const onDisableScript = () => {
  emits('update:isActive', false)
}
</script>

<template>
  <Card class="script"
        is-script
        :is-active="isActive"
        :is-focus="isFocus"
        @on-focus="onFocus"
        @on-active-script="onActiveScript"
        @on-disable-script="onDisableScript"
  >
    <template #icon>
      <component :icon-type="source?.type" :is="source?.component"/>
    </template>
    <template #title>
      <div class="script-content">
        <h3>{{ name }}</h3>
        <div class="script-type">
          <component :is="typeScript[targetType].component" :color="typeScript[targetType].color"/>
          <p> {{ typeScript[targetType].title }}</p>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.script {
  &-content {
    font-weight: 500;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &-type {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    font-size: 11px;
  }
}

svg {
  max-width: 15px;
}
</style>