<script setup>
import {onMounted, onUpdated, ref, shallowRef} from "vue";
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
import {ERRORS} from "@/configs/errors.config.js";
import {WARNINGS} from "@/configs/warnings.config.js";


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
    type: 'all',
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
      else stateStore.modals.message.warning.onShow(WARNINGS.NOTE_TARGET_CAPTURE)

    }
  },
  {
    title: 'Confirm Source',
    type: ACTION_TYPES[1],
    action: ConfirmButton,
    onClick: function () {
      const targetCapture = sourcesForCapture.value.filter(source => source.isActive)
      if (targetCapture.length > 0) {
        if (!stateStore.modals.selectSource.targetFile) generateLoadFileInput().then(loadScript)
        else loadScript(stateStore.modals.selectSource.targetFile)
      } else stateStore.modals.message.warning.onShow(WARNINGS.NOTE_TARGET_CAPTURE)
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

const getSources = () => {
  const targetSourceForUse = sourcesForUse.value.find(source => source.isActive)
  const targetSourceForCapture = sourcesForCapture.value.find((source => source.isActive))
  return {targetSourceForUse, targetSourceForCapture}
}

const loadScript = async (file) => {
  try {
    const fileName = file.name.split('.zip')[0]
    const {targetSourceForUse, targetSourceForCapture} = getSources()
    if (!targetSourceForUse || !targetSourceForCapture) return
    const script = buildScriptDto(fileName, targetSourceForUse, targetSourceForCapture)
    const scriptSource = buildSourceDto(fileName)
    const formData = buildFormData(file, targetSourceForCapture.type, 'load')
    const {config} = await sourceStore.loadScript(formData)
    sourceStore.sources = config
    sourceStore.addScript(scriptSource, targetSourceForCapture.type)
    scriptStore.addScript(script)
    clearModalOption()
    closeModal()
  } catch (e) {
    const response = e.response?.data
    const detail = response?.detail
    const error = ERRORS.find(error => error.detail === detail)
    if (!error) stateStore.modals.message.error.onShow('Произошла неизвестная ошибка')
    stateStore.modals.message.error.onShow(error.message)
  }

}

const buildScriptDto = (fileName, targetSourceForUse, targetSourceForCapture) => {
  return new ScriptDto({
    name: fileName,
    targetForUse: targetSourceForUse,
    targetForCapture: targetSourceForCapture,
    card: cardScriptFactory.getScriptCard(targetSourceForCapture.type)
  }).getScript()
}

const buildSourceDto = (fileName) => {
  return new ScriptSourceDto({
    args: {},
    name: fileName,
    enabled: false,
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

const buildActions = (type) => {
  return actions.map(action => {
    if (action.type === type) return action
  }).filter(action => action)
}

const actionsScripts = buildActions(ACTION_TYPES[0])
const actionsSource = buildActions(ACTION_TYPES[1])
const steps = ref(stateStore.modals.selectSource.use ? ACTION_TYPES[1] : ACTION_TYPES[0])

const closeModal = () => {
  stateStore.modals.selectSource.show = false
}
const clearModalOption = () => {
  stateStore.modals.selectSource.use = null
}
onMounted(() => {
  if (stateStore.modals.selectSource.use) {
    sourcesForUse.value.find(source => source.type === stateStore.modals.selectSource.use).isActive = true
  }
})
</script>

<template>
  <Popup >
    <template #window>
      <section class="select-source"  >
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
