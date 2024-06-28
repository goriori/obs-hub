<script setup>

import {computed, ref} from "vue";
import {useAudioGateway} from "@/store/audioStore.js";
import ListSource from "../../ui/list-source/ListSource.vue";

const audioGateway = useAudioGateway()
const audioSources = computed(() => audioGateway.getAudioSources().filter(source=> source.show))

const TYPES_UPDATE = ['focus-audio', 'un-focus-audio']

const updates = {
  [TYPES_UPDATE[0]]: (data) => focusScript(data, true),
  [TYPES_UPDATE[1]]: (data) => focusScript(data, false),
}


const focusScript = (data, active = false) => {
  const {id} = data
  if (active) audioGateway.focusAudio(id)
  else audioGateway.unFocusAudio(id)
}

const onUpdateList = (updated) => {
  const {type, data} = updated
  return updates[type].call(this, data)
}
</script>

<template>
  <ListSource :sources="audioSources" @on-update="onUpdateList"/>
</template>

<style scoped lang="scss">

</style>