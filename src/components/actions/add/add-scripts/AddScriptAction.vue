<script setup>

import {ref} from "vue";
import {useStateStore} from "../../../../store/stateStore.js";
import PlusButton from "../../../ui/buttons/plus/PlusButton.vue";
import Screen from "../../../icons/Screen.vue";
import Camera from "../../../icons/Camera.vue";

const stateStore = useStateStore()
const isActive = ref(false)
const onActive = () => {
  isActive.value = !isActive.value
}
const onClose = () => isActive.value = false
const addScript = () => {
  const targetElement = event.target.closest('article')
  if (targetElement) {
    const {type} = targetElement.dataset
    const randomId = Math.floor(Math.random() * 1000)
    stateStore.modals.selectSource.show = true
  }
  onClose()
}
</script>

<template>
  <div class="action">
    <Transition name="fade">
      <section class="action-list" v-if="isActive" @click="addScript">
        <article class="list-item" data-type="script-audio">
          <Screen color="#000"/>
          <p>Скрипт для аудио</p>
        </article>
        <article class="list-item" data-type="script-video">
          <Camera color="#000"/>
          <p>Скрипт для видео</p>
        </article>
      </section>
    </Transition>
    <PlusButton @click="onActive"/>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.action {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;

  &-list {
    position: absolute;
    top: -100px;
    display: flex;
    width: 220px;
    flex-direction: column;
    background-color: $primary;
    padding: 10px 20px;
    border-radius: 10px;
    gap: 20px;
  }
}

.list {
  &-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    font-size: 14px;
    border-radius: 10px;
    transition: 0.3s opacity ease-in-out;

    &:active {
      opacity: 0.7;
    }

    svg {
      width: 100%;
      max-width: 15px;
    }
  }
}
</style>