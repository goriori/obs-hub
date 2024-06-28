<script setup>

import {useAudioGateway} from "@/store/audioStore.js";
import ConfirmButton from "@/components/ui/buttons/confirm/ConfirmButton.vue";

const emits = defineEmits(['onConfirmDelete'])
const audioGateway = useAudioGateway()
const deleteTargetAudio = () => {
  const focusesAudio = audioGateway.getAudioSources().filter((audio) => {
    if (audio.isFocus) return audio
  })
  focusesAudio.forEach(audio => audioGateway.deleteAudioSource(audio.id))
  emits('onConfirmDelete')
}
</script>

<template>
  <ConfirmButton @click="deleteTargetAudio"/>
</template>

<style scoped lang="scss">

</style>