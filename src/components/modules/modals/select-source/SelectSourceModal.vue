<script setup>
import {onUpdated, ref, shallowRef} from "vue";
import {useStateStore} from "../../../../store/stateStore.js";
import {CardScriptFactory} from "@/factory/card-script-factory/index.js";
import Popup from "../../../ui/popup/Popup.vue";
import SelectSource from "../../../ui/select-source/SelectSource.vue";
import ConfirmButton from "../../../ui/buttons/confirm/ConfirmButton.vue";
import Source from "../../../ui/source/Source.vue";
import {useScriptStore} from "@/store/scriptStore.js";
import {ScriptDto, ScriptSourceDto} from "@/dto/script-dto/index.js";
import Camera from "@/components/icons/Camera.vue";
import {useSourceStore} from "@/store/sourceStore.js";
import wsService from "@/API/wsService/wsService.js";


const stateStore = useStateStore()
const scriptStore = useScriptStore()
const sourceStore = useSourceStore()
const cardScriptFactory = new CardScriptFactory()
const ACTION_TYPES = ['script', 'source']
const ASPECT_TYPE = 'scripts'
const sourcesForUse = ref([
  {
    id: 1,
    'icon-type': 'sound',
    type: 'sound',
    isActive: false,
    component: shallowRef(Source),
    title: 'Аудио'
  },
  {
    id: 2,
    'icon-type': 'camera',
    type: 'camera',
    isActive: false,
    component: shallowRef(Source),
    title: 'Видео'
  },
])
const sourcesForCapture = ref([
  {
    id: 1,
    'icon-type': 'screen',
    type: 'screen',
    isActive: false,
    component: shallowRef(Source),
    title: 'Захват веб-камеры'
  },
  {
    id: 2,
    'icon-type': 'camera',
    type: 'webcam',
    isActive: false,
    component: shallowRef(Source),
    title: 'Захват камеры'
  },
  {
    id: 3,
    'icon-type': 'screen',
    type: 'screen',
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
      const targetUse = sourcesForUse.value.filter(source => source.isActive)
      if (targetUse.length > 0) steps.value = ACTION_TYPES[1]
    }
  },
  {
    title: 'Confirm Source',
    type: ACTION_TYPES[1],
    action: ConfirmButton,
    onClick: function () {
      generateLoadFileInput()
          .then(async file => {
            console.log(file)
            const {targetSourceForUse, targetSourceForCapture} = getSources()
            if (!targetSourceForUse || !targetSourceForCapture) return
            const formData = buildFormData(file, targetSourceForCapture.type, 'load')
            formData.forEach((value, key) => console.log(key, value))
            const {config} = await sourceStore.loadScript(formData)
            sourceStore.sources = config
            stateStore.modals.selectSource.show = false
          })

    }
  }
]

const generateLoadFileInput = () => {
  return new Promise((resolve, reject) => {
    let file
    const formLoadElement = document.createElement('input')
    formLoadElement.setAttribute('type', 'file')
    formLoadElement.setAttribute('accept', '.zip')
    formLoadElement.click()
    const listenerId = formLoadElement.onchange = e => {
      file = e.target.files[0]
      if (!file) reject({error: 'file is undefined'})
      resolve(file)
      formLoadElement.removeEventListener('change', listenerId)
    }

  })
}
const buildFormData = (file, source, action) => {
  const formData = new FormData()
  const fileName = file.name.split('.zip')[0]
  formData.set('script_archive', file)
  formData.set('source', source)
  formData.set('action', action)
  formData.set('script_name', fileName)
  return formData
}
const getSources = () => {
  const targetSourceForUse = sourcesForUse.value.find(source => source.isActive)
  const targetSourceForCapture = sourcesForCapture.value.find((source => source.isActive))
  return {targetSourceForUse, targetSourceForCapture}
}
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
