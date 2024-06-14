<script setup>

import {useScriptGateway} from "@/store/scriptStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";
import wsService from "@/API/wsService/wsService.js";

const emits = defineEmits(['onConfirmDelete'])
const scriptStore = useScriptGateway()
const deleteTargetScripts = () => {

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