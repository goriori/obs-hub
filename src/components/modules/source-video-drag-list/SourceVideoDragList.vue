<script setup>

import {computed, onUpdated, watch} from "vue";
import {useScreenStore} from "@/store/screenStore.js";
import ListDragable from "@/components/ui/list-dragable/ListDragable.vue";
import ScreenTargetCard from "@/components/ui/card/screen-target/ScreenTargetCard.vue";
import CameraTargetCard from "@/components/ui/card/camera-target/CameraTargetCard.vue";

const screenStore = useScreenStore()

const sources = computed(() => screenStore.screens)
const changeList = (list) => {
  screenStore.updateScreenList(list)
}
onUpdated(() => {
  console.log('update list')
})
</script>

<template>
  <ListDragable :sources="sources" @on-change-list="changeList"/>
</template>

<style scoped lang="scss">

</style>