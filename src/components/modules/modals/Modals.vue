<script setup>
import {computed, ref, shallowRef} from "vue";
import {useStateStore} from "@/store/stateStore.js";
import SelectSourceModal from "@/components/modules/modals/select-source/SelectSourceModal.vue";
import DeleteSourceVideo from "@/components/modules/modals/delete-source-video/DeleteSourceVideo.vue";
import DeleteScript from "@/components/modules/modals/delete-script/DeleteScript.vue";
import DeleteAudio from "@/components/modules/modals/delete-audio/DeleteAudio.vue";
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