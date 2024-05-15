<script setup>
import {useAudioStore} from "@/store/audioStore.js";
import SourceAudioSpace from "../../ui/block-space/source-audio/SourceAudioSpace.vue";
import SourceAudioList from "../source-audio-list/SourceAudioList.vue";
import AddAudioAction from "@/components/actions/add/add-audio/AddAudioAction.vue";
import DeleteAudioAction from "@/components/actions/delete/delete-audio/DeleteAudioAction.vue";

const audioStore = useAudioStore()
const clearFocus = ()=> audioStore.audioSource.forEach(audio=> audio.isFocus = false)
const clickOutside = () => clearFocus()
</script>

<template>
  <SourceAudioSpace :audio-list="SourceAudioList" :actions="[AddAudioAction, DeleteAudioAction]" v-outside="clickOutside"/>
</template>

<style scoped lang="scss">

</style>