<script setup>

import AddVideoAction from "../../actions/add-video/AddVideoAction.vue";
import DeleteButton from "../../ui/buttons/delete/DeleteButton.vue";
import SourceVideoSpace from "../../ui/block-space/source-video/SourceVideoSpace.vue";
import SourceVideoDragList from "@/components/modules/source-video-drag-list/SourceVideoDragList.vue";
</script>

<template>
  <SourceVideoSpace :video-list="SourceVideoDragList" :actions="[AddVideoAction, DeleteButton]"/>
</template>

<style scoped lang="scss">

</style>