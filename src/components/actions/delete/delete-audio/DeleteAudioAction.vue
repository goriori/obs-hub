<script setup>

import DeleteButton from "@/components/ui/buttons/delete/DeleteButton.vue";
import {useStateStore} from "@/store/stateStore.js";
import {useAudioStore} from "@/store/audioStore.js";
import {computed} from "vue";

const stateStore = useStateStore()
const audioStore = useAudioStore()

const focusAudio = computed(() => {
  return audioStore.audioSource.filter(audio => audio.isFocus).length > 0
})
const onClick = () => {
  if (focusAudio.value) stateStore.modals.delete.deleteAudio.show = true
}
</script>

<template>
  <DeleteButton @click="onClick" :disabled="!focusAudio"/>
</template>

<style scoped lang="scss">

</style>