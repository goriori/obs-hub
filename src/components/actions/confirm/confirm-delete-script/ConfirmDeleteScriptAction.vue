<script setup>

import {useScriptStore} from "@/store/scriptStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";
import {useSourceStore} from "@/store/sourceStore.js";
import wsService from "@/API/wsService/wsService.js";

const emits = defineEmits(['onConfirmDelete'])
const scriptStore = useScriptStore()
const sourceStore = useSourceStore()
const deleteTargetScripts = () => {
  const ASPECT = 'scripts'
  const focusesScript = scriptStore.scripts.filter((script) => {
    if (script.isFocus) return script
  })
  focusesScript.forEach(script => {
    scriptStore.deleteScript(script.id)
    sourceStore.deleteScript(script.id)
  })
  sourceStore.addAspect(ASPECT)
  sourceStore.updateType('full')
  wsService.sendMessage(sourceStore.getConfig())
  emits('onConfirmDelete')
  sourceStore.deleteAspect(ASPECT)
}
</script>

<template>
  <ConfirmButton @click="deleteTargetScripts"/>
</template>

<style scoped lang="scss">

</style>