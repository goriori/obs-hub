<script setup>

import {computed, onUpdated, ref, watch} from "vue";
import {useScriptStore} from "../../../store/scriptStore.js";
import {useSourceStore} from "@/store/sourceStore.js";
import ListSource from "../../ui/list-source/ListSource.vue";
import DragonDrop from "@/components/ui/dragondrop/DragonDrop.vue";
import wsService from "@/API/wsService/wsService.js";
import {ScriptDto, ScriptSourceDto} from "@/dto/script-dto/index.js";
import {useStateStore} from "@/store/stateStore.js";

const stateSource = useStateStore()
const scriptStore = useScriptStore()
const sourceStore = useSourceStore()
const TYPES_UPDATE = ['active-script', 'disable-script']
const ASPECT = 'scripts'
const updates = {
  [TYPES_UPDATE[0]]: (data) => activeScript(data, true),
  [TYPES_UPDATE[1]]: (data) => activeScript(data, false)
}

const scripts = computed(() => scriptStore.scripts)
const activeScript = (data, active = false) => {
  console.log('active script', data)
  sourceStore.updateActiveScript(data?.name, active)
  sourceStore.updateType('full')
  sourceStore.addAspect(ASPECT)
  wsService.sendMessage(sourceStore.getConfig())
  sourceStore.deleteAspect(ASPECT)
}

const loadScript = (script) => {
  stateSource.modals.selectSource.targetFile = script
  stateSource.modals.selectSource.show = true
}
const onUpdateList = (updated) => {
  console.log(updated)
  const {type, data} = updated
  return updates[type].call(this, data)
}

</script>

<template>
  <div class="source">
    <DragonDrop class="drop-list" v-if="scripts.length === 0" @load-file="loadScript" accept=".zip"/>
    <ListSource :sources="scripts" @on-update="onUpdateList" v-if="scripts.length > 0" />
  </div>

</template>

<style scoped lang="scss">


.source {
  height: 240px;
}
</style>