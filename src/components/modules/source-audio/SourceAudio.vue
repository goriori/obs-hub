<script setup>

import SourceAudioSpace from "../../ui/block-space/source-audio/SourceAudioSpace.vue";
import SourceAudioList from "../source-audio-list/SourceAudioList.vue";
import AddAudioAction from "@/components/actions/add/add-audio/AddAudioAction.vue";
import DeleteAudioAction from "@/components/actions/delete/delete-audio/DeleteAudioAction.vue";
</script>

<template>
  <SourceAudioSpace :audio-list="SourceAudioList" :actions="[AddAudioAction, DeleteAudioAction]"/>
</template>

<style scoped lang="scss">

</style>