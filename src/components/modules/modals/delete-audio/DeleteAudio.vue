<script setup>

import Popup from "@/components/ui/popup/Popup.vue";
import {useStateStore} from "@/store/stateStore.js";
import ConfirmDeleteAudioAction from "@/components/actions/confirm/confirm-delete-audio/ConfirmDeleteAudioAction.vue";

const stateStore = useStateStore()
const onDeleted = () => stateStore.modals.delete.deleteAudio.show = false
</script>

<template>
  <Popup>
    <template #window>
      <section class="delete-source">
        <h3>Вы уверены что хотите удалить аудио?</h3>
        <ConfirmDeleteAudioAction @on-confirm-delete="onDeleted"/>
      </section>
    </template>
  </Popup>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.delete-source {
  width: 100%;
  max-width: 586px;
  border-radius: 50px;
  background: #2B2B2B;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  gap: 52px;
  color: $primary;
}
</style>