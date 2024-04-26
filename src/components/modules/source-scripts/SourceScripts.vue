<script setup>

import AddScriptAction from "../../actions/add/add-scripts/AddScriptAction.vue";
import SourceScriptsSpace from "../../ui/block-space/source-scripts/SourceScriptsSpace.vue";
import SourceScriptsList from "@/components/modules/source-scripts-list/SourceScriptsList.vue";
import DeleteScriptAction from "@/components/actions/delete/delete-script/DeleteScriptAction.vue";

</script>

<template>
  <SourceScriptsSpace :script-list="SourceScriptsList" :actions="[AddScriptAction, DeleteScriptAction]"/>
</template>

<style scoped lang="scss">

</style>