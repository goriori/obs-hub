<script setup>

import DeleteButton from "@/components/ui/buttons/delete/DeleteButton.vue";
import {useStateStore} from "@/store/stateStore.js";
import {useScreenStore} from "@/store/screenStore.js";
import {computed} from "vue";
import {useSourceGateway} from "@/store/sourceStore.js";

const stateStore = useStateStore()
const sourceGateway = useSourceGateway()

const focusSource = computed(() => {
    return sourceGateway.getVideoSources().filter(source=> source.focused).length > 0
})
const onClick = () => {
  if (focusSource.value) stateStore.modals.delete.deleteSourceVideo.show = true
}
</script>

<template>
  <DeleteButton @click="onClick" :disabled="!focusSource"/>
</template>

<style scoped lang="scss">

</style>