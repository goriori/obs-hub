<script setup>

import {computed, ref} from "vue";
import {useAudioStore} from "@/store/audioStore.js";
import ListSource from "../../ui/list-source/ListSource.vue";
import SoundTargetCard from "../../ui/card/sound-target/SoundTargetCard.vue";

const audioStore = useAudioStore()
const audioSources = computed(() => audioStore.audioSource)
const clearFocus = ()=> audioStore.audioSource.forEach(audio=> audio.isFocus = false)
const clickOutside = () => clearFocus()
</script>

<template>
  <ListSource :sources="audioSources" v-outside="clickOutside"/>
</template>

<style scoped lang="scss">

</style>