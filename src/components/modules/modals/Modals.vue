<script setup>
import {computed, ref, shallowRef} from "vue";
import {useStateStore} from "@/store/stateStore.js";
import SelectSourceModal from "@/components/modules/modals/select-source/SelectSourceModal.vue";
import DeleteSourceVideo from "@/components/modules/modals/delete-source-video/DeleteSourceVideo.vue";
import DeleteScript from "@/components/modules/modals/delete-script/DeleteScript.vue";
import DeleteAudio from "@/components/modules/modals/delete-audio/DeleteAudio.vue";
import Warning from "@/components/modules/modals/warning/Warning.vue";
import Error from "@/components/modules/modals/error/Error.vue";
import EditScriptModal from "@/components/modules/modals/edit-script/EditScriptModal.vue";
const stateStore = useStateStore()

const modals = ref([
  {
    id: 1,
    component: shallowRef(SelectSourceModal) ,
    conditionVisibility:computed(() => stateStore.modals.selectSource.show)
  },
  {
    id: 2,
    component: shallowRef(DeleteSourceVideo),
    conditionVisibility:computed(() => stateStore.modals.delete.deleteSourceVideo.show)
  },
  {
    id: 3,
    component: shallowRef(DeleteScript),
    conditionVisibility:computed(() => stateStore.modals.delete.deleteScript.show)
  },
  {
    id: 4,
    component: shallowRef(DeleteAudio),
    conditionVisibility:computed(() => stateStore.modals.delete.deleteAudio.show)
  },
  {
    id: 5,
    component: shallowRef(Warning),
    conditionVisibility:computed(() => stateStore.modals.message.warning.show)
  },
  {
    id: 6,
    component: shallowRef(Error),
    conditionVisibility:computed(() => stateStore.modals.message.error.show)
  },
  {
    id: 7,
    component: shallowRef(EditScriptModal),
    conditionVisibility:computed(() => stateStore.modals.edit.editScript.show)
  }
])
</script>

<template>
<Teleport to="body">
  <Transition name="fade" v-for="modal in modals" :key="modal.id">
    <component :is="modal.component" v-if="modal.conditionVisibility"/>
  </Transition>
</Teleport>
</template>

<style scoped lang="scss">

</style>