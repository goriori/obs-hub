<script setup>

import {computed} from "vue";
import {useStateStore} from "@/store/stateStore.js";
import {useAudioGateway} from "@/store/audioStore.js";
import DeleteButton from "@/components/ui/buttons/delete/DeleteButton.vue";

const stateStore = useStateStore()
const audioGateway = useAudioGateway()

const focusAudio = computed(() => {
  return audioGateway.getAudioSources().filter(audio => audio.focused).length > 0
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