<script setup>

import ListSource from "../../ui/list-source/ListSource.vue";
import ScreenTargetCard from "../../ui/card/screen-target/ScreenTargetCard.vue";
import CameraTargetCard from "../../ui/card/camera-target/CameraTargetCard.vue";
import {useScreenStore} from "../../../store/screenStore.js";
import {computed} from "vue";

const screenStore = useScreenStore()

const sources = computed(() => screenStore.screens.map(screen => screen.component))


</script>

<template>
  <ListSource :sources="sources" />
</template>

<style scoped lang="scss">

</style>