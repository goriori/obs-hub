<script setup>

import DeleteButton from "@/components/ui/buttons/delete/DeleteButton.vue";
import {useStateStore} from "@/store/stateStore.js";
import {useScriptStore} from "@/store/scriptStore.js";
import {computed} from "vue";

const stateStore = useStateStore()
const scriptStore = useScriptStore()
const focusScripts = computed(() => {
  return scriptStore.scripts.filter(script => script.isFocus).length > 0
})

const onClick = () => {
  if (focusScripts.value) stateStore.modals.delete.deleteScript.show = true
}
</script>

<template>
  <DeleteButton @click="onClick" :disabled="!focusScripts"/>
</template>

<style scoped lang="scss">

</style>