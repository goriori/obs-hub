<script setup>

import {useScriptStore} from "@/store/scriptStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";

const emits = defineEmits(['onConfirmDelete'])
const scriptStore = useScriptStore()
const deleteTargetScripts = () => {
  const focusesScript = scriptStore.scripts.filter((script) => {
    if (script.isFocus) return script
  })
  focusesScript.forEach(script => scriptStore.deleteScript(script.id))
  emits('onConfirmDelete')
}
</script>

<template>
  <ConfirmButton @click="deleteTargetScripts"/>
</template>

<style scoped lang="scss">

</style>