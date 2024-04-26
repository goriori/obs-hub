<script setup>

import ListSource from "../../ui/list-source/ListSource.vue";
import SoundTargetCard from "../../ui/card/sound-target/SoundTargetCard.vue";
import {ref} from "vue";

const audioSources = ref([
  {
    isFocus: false,
    component: SoundTargetCard
  }
])
</script>

<template>
  <ListSource :sources="audioSources"/>
</template>

<style scoped lang="scss">

</style>