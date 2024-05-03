<script setup>

import {computed, onUpdated, ref, watch} from "vue";
import {useScreenStore} from "@/store/screenStore.js";
import {useSourceStore} from "@/store/sourceStore.js";
import ListDragable from "@/components/ui/list-dragable/ListDragable.vue";
import wsService from "@/API/wsService/wsService.js";

const screenStore = useScreenStore()
const sourceStore = useSourceStore()
const sources = computed(() => screenStore.screens)

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
  sourceStore.addAspect('webcam')
  sourceStore.addAspect('screen')
  sourceStore.updateType('full')
  wsService.sendMessage(sourceStore.getConfig())
  sourceStore.deleteAspect('webcam')
  sourceStore.deleteAspect('screen')
}

</script>

<template>
  <ListDragable :sources="sources" @on-change-list="changeList"/>
</template>

<style scoped lang="scss">

</style>