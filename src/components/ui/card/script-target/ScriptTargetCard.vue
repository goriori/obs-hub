<script setup>

import Card from "../Card.vue";
import IconCard from "../../icon-card/IconCard.vue";
import Camera from "../../../icons/Camera.vue";
import Screen from "../../../icons/Screen.vue";
import Sound from "../../../icons/Sound.vue";

const props = defineProps({

  script: {
    type: Object,
    default: () => {
    }
  }
})

console.log(props.script)
const emits = defineEmits(['update:isFocus', 'update:isActive'])
const onFocus = () => {
  emits('update:isFocus', !props.script?.focused, props.script)
}
const onActiveScript = () => {
  emits('update:isActive', true, {
    id: props.script.id,
    name: props.script.name
  }, 'active-script')
}
const onDisableScript = () => {
  emits('update:isActive', false, {
    id: props.script.id,
    name: props.script.name
  }, 'disable-script')
}
</script>

<template>
  <Card class="script"
        is-script
        :is-active="script.enabled"
        :is-focus="script.focused"
        @on-focus="onFocus"
        @on-active-script="onActiveScript"
        @on-disable-script="onDisableScript"
  >
    <template #icon>
      <component :icon-type="script.use?.type" :is="script.use?.component"/>
    </template>
    <template #title>
      <div class="script-content">
        <h3>{{ script.name }}</h3>
        <div class="script-type">
          <component :is="script.capture.component" :color="script.capture.color"/>
          <p> {{ script.capture.title }}</p>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.script {
  &-content {
    font-weight: 500;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    @media (max-width: $md1 + px) {
      font-size: 12px;
    }
  }

  &-type {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    @media (max-width: $md1 + px) {
      font-size: 8px;
    }
  }
}

svg {
  max-width: 15px;
}
</style>