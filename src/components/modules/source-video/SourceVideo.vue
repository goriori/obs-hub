<script setup>

import AddVideoAction from "../../actions/add/add-video/AddVideoAction.vue";
import SourceVideoSpace from "../../ui/block-space/source-video/SourceVideoSpace.vue";
import SourceVideoDragList from "@/components/modules/source-video-drag-list/SourceVideoDragList.vue";
import DeleteVideoAction from "@/components/actions/delete/delete-video/DeleteScreenAction.vue";
import {useScreenStore} from "@/store/screenStore.js";

const screenStore = useScreenStore()
const clearFocus = () => screenStore.screens.forEach(source => source.isFocus = false)
const clickOutside = () => clearFocus()
</script>

<template>
  <SourceVideoSpace :video-list="SourceVideoDragList" :actions="[AddVideoAction, DeleteVideoAction]" v-outside="clickOutside"/>
</template>

<style scoped lang="scss">

</style>