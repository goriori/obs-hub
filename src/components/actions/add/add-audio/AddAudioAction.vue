<script setup>

import {useAudioStore} from "@/store/audioStore.js";
import PlusButton from "@/components/ui/buttons/plus/PlusButton.vue";
import SoundTargetCard from "@/components/ui/card/sound-target/SoundTargetCard.vue";
import {shallowRef} from "vue";

const audioStore = useAudioStore()
const addAudio = () => {
  audioStore.addAudioSource({
    id: Math.floor(Math.random() * 1000),
    title: 'audio source',
    isFocus: false,
    component: shallowRef(SoundTargetCard)
  })
}
</script>

<template>
  <PlusButton @click="addAudio"/>
</template>

<style scoped lang="scss">

</style>