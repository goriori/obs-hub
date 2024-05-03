<script setup>
import interact from 'interactjs'
import {nextTick, onMounted, onUpdated, ref} from "vue";
import {tr} from "date-fns/locale";

const props = defineProps({
  settings: {
    type: Object,
    default: {
      webcam: {
        width: 960,
        height: 540
      },
      screen: {}
    }
  },
  mainScreen: {
    type: Object,
    default: () => {
    }
  },
  screens: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['changePositionScreen', 'resizeScreen'])


const setZIndexElements = () => {
  const screens = document.querySelectorAll('.screen-add')
  screens.forEach(screen => {
    const {index} = screen.dataset
    screen.style.zIndex = index
  })
}

onMounted(async () => {
})

onUpdated(async () => {

  props.screens.forEach((screen, index) => {
    const modifiers = [
      interact.modifiers.restrictRect({
        restriction: 'parent',
      }),
      interact.modifiers.restrictEdges({
        outer: 'parent',
      }),
    ]
    interact(`.${screen.selector}`).draggable({
      modifiers,
      listeners: {
        start(event) {
          console.log(event.type, event.target)
        },
        move(event) {
          emits('changePositionScreen', screen.id, {
            x: screen.position.x += event.dx,
            y: screen.position.y += event.dy
          })
          event.target.style.transform = `translate(${screen.position.x}px, ${screen.position.y}px)`
          event.target.setAttribute('data-x', screen.position.x)
          event.target.setAttribute('data-y', screen.position.y)
        },
      },
    }).resizable({
      modifiers: [
        interact.modifiers.aspectRatio({
          ratio: 2,
          modifiers: [
            interact.modifiers.restrictEdges({outer: 'parent'}),
          ],
        }),
        interact.modifiers.restrictEdges({
          outer: 'parent',
        }),
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 }
        })
      ],
      edges: {
        top: true,
        left: true,
        bottom: true,// Resize if pointer target matches selector
        right: true    // Resize if pointer target is the given Element
      },
      listeners: {
        move(event) {
          const target = event.target
          let x = parseFloat(target.getAttribute('data-x')) || 0
          let y = parseFloat(target.getAttribute('data-y')) || 0
          const newSize = {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`,
          }
          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'
          x += event.deltaRect.left
          y += event.deltaRect.top
          target.style.transform = `translate(${x}px, ${y}px)`
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
          emits('resizeScreen', screen.id, {width: newSize.width, height: newSize.height})
          emits('changePositionScreen', screen.id, {
            x,
            y
          })
        },
      },
    })
  })
  setZIndexElements()

})


</script>

<template>
  <section class="screen">
    <video :data-title="mainScreen?.title" :class="mainScreen?.selector" :width="960"
           :height="540" class="screen-main"
           id="main-screen"></video>
    <div v-for="(screen, index) in screens"
         :key="screen.id"
         :class="['screen-add', screen.selector]"
         :style="{
           width:Math.abs(screen.position.width - 960) + 'px' ,
           height:Math.abs(screen.position.height - 540) + 'px'
         }"
         :data-type="screen.type"
         :data-index="screen['z-index']"
    >
      <!--      {{screen.title}}-->
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.screen {
  position: relative;
  width: 100%;
  max-width: 960px;
  height: 540px;

  &-main {
    position: absolute;
    width: 100%;
    background-color: #000;
    z-index: 1;
    object-fit: cover;
  }

  &-add {
    position: absolute;

    //background-color: $primary;
    border: 2px solid $primary;
    touch-action: none;
    user-select: none;
  }
}
</style>