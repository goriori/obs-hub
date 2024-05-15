<script setup>

import {computed, ref} from "vue";
import {useAudioStore} from "@/store/audioStore.js";
import ListSource from "../../ui/list-source/ListSource.vue";
import SoundTargetCard from "../../ui/card/sound-target/SoundTargetCard.vue";

const audioStore = useAudioStore()
const audioSources = computed(() => audioStore.audioSource)

</script>

<template>
  <ListSource :sources="audioSources" />
</template>

<style scoped lang="scss">

</style>