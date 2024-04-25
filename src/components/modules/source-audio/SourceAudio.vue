<script setup>

import PlusButton from "../../ui/buttons/plus/PlusButton.vue";
import DeleteButton from "../../ui/buttons/delete/DeleteButton.vue";
import SourceAudioSpace from "../../ui/block-space/source-audio/SourceAudioSpace.vue";
import SourceAudioList from "../source-audio-list/SourceAudioList.vue";
</script>

<template>
  <SourceAudioSpace :audio-list="SourceAudioList" :actions="[PlusButton, DeleteButton]"/>
</template>

<style scoped lang="scss">

</style>