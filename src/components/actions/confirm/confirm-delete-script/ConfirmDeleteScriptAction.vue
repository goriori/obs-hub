<script setup>

import {useScriptGateway} from "@/store/scriptStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";
import ScriptService from "@/API/scriptService/scriptService.js";
import wsService from "@/API/wsService/wsService.js";


const emits = defineEmits(['onConfirmDelete'])
const scriptGateway = useScriptGateway()
const sourceGateway = useScriptGateway()
const deleteTargetScripts = () => {
  const scripts = scriptGateway.getFocusedScript()
  scripts.forEach(script => {
    const formData = buildFormData(script)
    scriptGateway.deleteScript(script.name)
    ScriptService.deleteScript(formData)
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