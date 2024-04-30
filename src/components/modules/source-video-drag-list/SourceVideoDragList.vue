<script setup>

import {computed, onUpdated, ref, watch} from "vue";
import {useScreenStore} from "@/store/screenStore.js";
import {useSourceStore} from "@/store/sourceStore.js";
import ListDragable from "@/components/ui/list-dragable/ListDragable.vue";
import wsService from "@/API/wsService/wsService.js";

const screenStore = useScreenStore()
const sourceStore = useSourceStore()
const sources = computed(() => screenStore.screens)
const configData = ref({
  "update_aspects": [],
  "update_type": "fast",
  "config": sourceStore.sources
})

const changeList = (list) => {
  console.log('updated list: ', list)
  screenStore.updateScreenList(list)
  screenStore.screens.reduce((acc, value) => {
    if (acc.type === 'webcam' && value.type === 'screen') {
      sourceStore.changeZIndex(acc.type, 1)
      sourceStore.changeZIndex(value.type, 0)
    }
    if (acc.type === 'screen' && value.type === 'webcam') {
      sourceStore.changeZIndex(acc.type, 1)
      sourceStore.changeZIndex(value.type, 0)
    }
    return value
  })
}
onUpdated(() => {
  wsService.sendMessage(configData.value)
  console.log('update list')
  console.log('updated list after hook update:', sources.value)
})
</script>

<template>
  <ListDragable :sources="sources" @on-change-list="changeList"/>
</template>

<style scoped lang="scss">

</style>