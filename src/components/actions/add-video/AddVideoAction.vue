<script setup>

import {ref} from "vue";
import {useScreenStore} from "../../../store/screenStore.js";
import {CardFactory} from "@/factory/card-factory/index.js";
import Screen from "../../icons/Screen.vue";
import Camera from "../../icons/Camera.vue";
import PlusButton from "../../ui/buttons/plus/PlusButton.vue";


const screenStore = useScreenStore()
const isActive = ref(false)
const cardFactory = new CardFactory()
const onActive = () => {
  isActive.value = true
}
const onClose = () => isActive.value = false
const addCapture = (event) => {
  const targetElement = event.target.closest('article')
  if (targetElement) {
    const {capture} = targetElement.dataset
    const randomId = Math.floor(Math.random() * 1000)
    const screen = {
      title: `${capture}-${randomId}`,
      selector: `screen-add-${randomId}`,
      size: {
        width: 300,
        height: 150
      },
      position: {
        x: 0, y: 0
      },
      component: cardFactory.getCard(capture)
    }
    screenStore.addScreen(screen, capture)
    onClose()
  }
}
</script>

<template>
  <div class="action">
    <Transition name="fade">
      <section class="action-list" v-if="isActive" @click="addCapture">
        <article class="list-item" data-capture="screen">
          <Screen color="#000"/>
          <p>Захват экрана</p>
        </article>
        <article class="list-item" data-capture="webcam">
          <Camera color="#000"/>
          <p>Захват веб-камеры</p>
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