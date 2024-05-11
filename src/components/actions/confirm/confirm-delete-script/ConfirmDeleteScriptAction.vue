<script setup>

import {useScriptStore} from "@/store/scriptStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";
import {useSourceStore} from "@/store/sourceStore.js";
import wsService from "@/API/wsService/wsService.js";

const emits = defineEmits(['onConfirmDelete'])
const scriptStore = useScriptStore()
const sourceStore = useSourceStore()
const deleteTargetScripts = () => {
  const focusesScript = scriptStore.scripts.filter((script) => {
    if (script.isFocus) return script
  })
  focusesScript.forEach(async script => {
    const formData = buildFormData(script)
    scriptStore.deleteScript(script.name)
    sourceStore.deleteScript(script.name)
    const {config} = await sourceStore.deleteScriptServer(formData)
    sourceStore.sources = config
  })
  emits('onConfirmDelete')
}
const buildFormData = (script) => {
  const formData = new FormData()
  formData.set('script_archive', {})
  formData.set('source', script.capture.type)
  formData.set('action', 'delete')
  formData.set('script_name', script.name)
  return formData
}
</script>

<template>
  <ConfirmButton @click="deleteTargetScripts"/>
</template>

<style scoped lang="scss">

</style>