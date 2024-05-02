<script setup>

import {useAudioStore} from "@/store/audioStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";

const emits = defineEmits(['onConfirmDelete'])
const audioStore = useAudioStore()
const deleteTargetAudio = () => {
  const focusesAudio = audioStore.audioSource.filter((audio) => {
    if (audio.isFocus) return audio
  })
  focusesAudio.forEach(audio => audioStore.deleteAudioSource(audio.id))
  emits('onConfirmDelete')
}
</script>

<template>
  <ConfirmButton @click="deleteTargetAudio"/>
</template>

<style scoped lang="scss">

</style>