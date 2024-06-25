<script setup>
import {onMounted, ref, shallowRef,} from "vue";
import {useStateStore} from "../../../../store/stateStore.js";
import CardFactory from "@/factory/card-script-factory/index.js";
import Popup from "../../../ui/popup/Popup.vue";
import SelectSource from "../../../ui/select-source/SelectSource.vue";
import ConfirmButton from "../../../ui/buttons/confirm/ConfirmButton.vue";
import Source from "../../../ui/source/Source.vue";
import {useScriptGateway} from "@/store/scriptStore.js";
import Camera from "@/components/icons/Camera.vue";
import wsService from "@/API/wsService/wsService.js";
import {ERRORS} from "@/configs/errors.config.js";
import {WARNINGS} from "@/configs/warnings.config.js";
import {AudioScript} from "@/enitites/script/audio-script/index.js";
import {VideoScript} from "@/enitites/script/video-script/index.js";
import ScriptService from "@/API/scriptService/scriptService.js";


const ACTION_TYPES = ['script', 'source']
const ASPECT_TYPE = 'scripts'

const stateStore = useStateStore()
const scriptStore = useScriptGateway()


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
    title: 'Захват экран'
  },
  {
    id: 2,
    'icon-type': 'camera',
    type: 'webcam',
    isActive: false,
    component: shallowRef(Source),
    title: 'Захват веб-камеры'
  },
  // {
  //   id: 3,
  //   'icon-type': 'screen',
  //   type: 'all',
  //   isActive: false,
  //   component: shallowRef(Source),
  //   title: 'Захват веб-камеры и экрана'
  // }
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

const activeSourceCapture = (id) => {
  if (!id) return
  sourcesForCapture.value.forEach(source => source.isActive = false)
  sourcesForCapture.value.find(source => source.id === id).isActive = true
}
const activeSourceUse = (id) => {
  if (!id) return
  sourcesForUse.value.forEach(source => source.isActive = false)
  sourcesForUse.value.find(source => source.id === id).isActive = true
}
const onUpdateSelect = (updateObject) => {
  const {type, data} = updateObject
  const updateHandlers = {
    video: (data) => activeSourceCapture(data?.id),
    sound: (data) => activeSourceUse(data?.id)
  }
  return updateHandlers[type].call(this, data)
}

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
    const {targetSourceForUse, targetSourceForCapture} = getSources()
    if (!targetSourceForUse || !targetSourceForCapture) return
    await ScriptService.loadScript(buildFormData(file, targetSourceForCapture.type, 'load'))
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
  stateStore.modals.selectSource.targetFile = null
  stateStore.modals.selectSource.show = false
}
const clearModalOption = () => {
  stateStore.modals.selectSource.use = null
}
const onKeypress = (event) => {
  const keys = {
    'Escape': () => closeModal()
  }
  if (keys[event.key]) return keys[event.key].call()
}
onMounted(() => {
  if (stateStore.modals.selectSource.use) {
    sourcesForUse.value.find(source => source.type === stateStore.modals.selectSource.use).isActive = true
  }
  window.addEventListener('keydown', onKeypress);
})


</script>

<template>
  <Popup>
    <template #window>
      <section class="select-source">
        <SelectSource v-if="steps === ACTION_TYPES[0]" type="sound" title="Выберите источник" :sources="sourcesForUse"
                      :actions="actionsScripts" @update="onUpdateSelect"/>
        <SelectSource v-if="steps === ACTION_TYPES[1]" type="video" title="Выберите источник"
                      :sources="sourcesForCapture"
                      :actions="actionsSource" @update="onUpdateSelect"/>
      </section>

    </template>
  </Popup>
</template>

<style scoped lang="scss">
.select-source {
  width: 100%;
}
</style>
