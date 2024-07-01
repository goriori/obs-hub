<script setup>

import Card from "../Card.vue";
import IconCard from "../../icon-card/IconCard.vue";
import Camera from "../../../icons/Camera.vue";
import Screen from "../../../icons/Screen.vue";
import Sound from "../../../icons/Sound.vue";

const props = defineProps({
  isFocus: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  },
  source: {
    type: Object,
    default: () => {
    }
  }
})

const emits = defineEmits(['update:isFocus', 'update:isActive'])

const onFocus = () => {
  if (!props.isFocus) emits('update:isFocus', true, {
    id: props.source.id,
    name: props.source.name
  }, 'focus-script')
  else emits('update:isFocus', false, {
    id: props.source.id,
    name: props.source.name
  }, 'un-focus-script')
}

const onActiveScript = () => {
  emits('update:isActive', true, {
    id: props.source.id,
    name: props.source.name
  }, 'active-script')
}
const onDisableScript = () => {
  emits('update:isActive', false, {
    id: props.source.id,
    name: props.source.name
  }, 'disable-script')
}
</script>

<template>
  <Card class="script"
        is-script
        :is-active="source.enabled"
        :is-focus="source.focused"
        @on-focus="onFocus"
        @on-active-script="onActiveScript"
        @on-disable-script="onDisableScript"
  >
    <template #icon>
      <component :icon-type="source.use?.type" :is="source.use?.component"/>
    </template>
    <template #title>
      <div class="script-content">
        <h3>{{ source.name }}</h3>
        <div class="script-type">
          <component :is="source.capture.component" :color="source.capture.color"/>
          <p> {{ source.capture.title }}</p>
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