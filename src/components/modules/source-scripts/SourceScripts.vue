<script setup>

import AddScriptAction from "../../actions/add-scripts/AddScriptAction.vue";
import DeleteButton from "../../ui/buttons/delete/DeleteButton.vue";
import SourceScriptsSpace from "../../ui/block-space/source-scripts/SourceScriptsSpace.vue";
import SourceScriptsList from "../source-scripts-list/SourceScriptsList.vue";

</script>

<template>
  <SourceScriptsSpace :script-list="SourceScriptsList" :actions="[AddScriptAction, DeleteButton]"/>
</template>

<style scoped lang="scss">

</style>