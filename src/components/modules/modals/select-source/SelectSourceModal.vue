<script setup>
import {onUpdated, ref, shallowRef} from "vue";

import Popup from "../../../ui/popup/Popup.vue";
import SelectSource from "../../../ui/select-source/SelectSource.vue";
import ConfirmButton from "../../../ui/buttons/confirm/ConfirmButton.vue";
import Source from "../../../ui/source/Source.vue";
import {useStateStore} from "../../../../store/stateStore.js";


const stateStore = useStateStore()
const ACTION_TYPES = ['script', 'source']
const sourcesForUse = ref([
  {
    id: 1,
    'icon-type': 'sound',
    isActive: false,
    component: shallowRef(Source),
    title: 'Аудио'
  },
  {
    id: 2,
    'icon-type': 'camera',
    isActive: false,
    component: shallowRef(Source),
    title: 'Видео'
  },
])
const sourcesForCapture = ref([
  {
    id: 1,
    'icon-type': 'screen',
    isActive: false,
    component: shallowRef(Source),
    title: 'Захват веб-камеры'
  },
  {
    id: 2,
    'icon-type': 'camera',
    isActive: false,
    component: shallowRef(Source),
    title: 'Захват камеры'
  },
  {
    id: 3,
    'icon-type': 'screen',
    isActive: false,
    component: shallowRef(Source),
    title: 'Захват веб-камеры и экрана'
  }
])

const actions = [
  {
    title: 'Confirm Script',
    type: ACTION_TYPES[0],
    action: ConfirmButton,
    onClick: function () {
      console.log('click action')
      steps.value = ACTION_TYPES[1]
    }
  },
  {
    title: 'Confirm Source',
    type: ACTION_TYPES[1],
    action: ConfirmButton,
    onClick: function () {
      console.log('click action')
      stateStore.modals.selectSource.show = false
    }
  }
]

const buildActions = (type) => {
  return actions.map(action => {
    if (action.type === type) return action
  }).filter(action => action)
}
const actionsScripts = buildActions(ACTION_TYPES[0])
const actionsSource = buildActions(ACTION_TYPES[1])
const steps = ref(ACTION_TYPES[0])


</script>

<template>
  <Popup>
    <template #window>
      <section class="select-source">
        <SelectSource v-if="steps === ACTION_TYPES[0]" title="Выберите источник" :sources="sourcesForUse"
                      :actions="actionsScripts"/>
        <SelectSource v-if="steps === ACTION_TYPES[1]" title="Выберите источник" :sources="sourcesForCapture"
                      :actions="actionsSource"/>
      </section>

    </template>
  </Popup>
</template>

<style scoped lang="scss">
.select-source {
  width: 100%;
}
</style>
