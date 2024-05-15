<script setup>

import AddScriptAction from "../../actions/add/add-scripts/AddScriptAction.vue";
import SourceScriptsSpace from "../../ui/block-space/source-scripts/SourceScriptsSpace.vue";
import SourceScriptsList from "@/components/modules/source-scripts-list/SourceScriptsList.vue";
import DeleteScriptAction from "@/components/actions/delete/delete-script/DeleteScriptAction.vue";
import {useScriptStore} from "@/store/scriptStore.js";

const scriptStore = useScriptStore()
const clearFocus = () => {
  scriptStore.scripts.forEach(script => script.isFocus = false)

}
const clickOutside = () => clearFocus()
</script>

<template>
  <SourceScriptsSpace :script-list="SourceScriptsList" :actions="[AddScriptAction, DeleteScriptAction]" v-outside="clickOutside"/>
</template>

<style scoped lang="scss">

</style>