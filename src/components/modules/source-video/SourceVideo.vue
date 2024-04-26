<script setup>

import AddVideoAction from "../../actions/add/add-video/AddVideoAction.vue";
import SourceVideoSpace from "../../ui/block-space/source-video/SourceVideoSpace.vue";
import SourceVideoDragList from "@/components/modules/source-video-drag-list/SourceVideoDragList.vue";
import DeleteVideoAction from "@/components/actions/delete/delete-video/DeleteScreenAction.vue";
</script>

<template>
  <SourceVideoSpace :video-list="SourceVideoDragList" :actions="[AddVideoAction, DeleteVideoAction]"/>
</template>

<style scoped lang="scss">

</style>