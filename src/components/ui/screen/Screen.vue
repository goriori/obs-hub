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
            interact.modifiers.restrictSize({max: 'parent'}),
          ],
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
          const MAX_SIZE = 10
          let {x, y} = event.target.dataset
          x = (parseFloat(x) || 0) + event.deltaRect.left
          y = (parseFloat(y) || 0) + event.deltaRect.top
          if (event.rect.width <= MAX_SIZE || event.rect.height <= MAX_SIZE) return
          const newSize = {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`,
          }
          Object.assign(event.target.style, newSize)
          Object.assign(event.target.dataset, {x, y})
          emits('resizeScreen', screen.id, {width: newSize.width, height: newSize.height})
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
    //border: 1px solid black;
    touch-action: none;
    user-select: none;
  }
}
</style>