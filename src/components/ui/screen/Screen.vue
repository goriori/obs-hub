<script setup>
import interact from 'interactjs'
import {computed, nextTick, onMounted, onUpdated, ref} from "vue";
import {useResolutionStore} from "@/store/resolutionStore.js";


const resolutionStore = useResolutionStore()
const props = defineProps({
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
const [widthResolution, heightResolution] = resolutionStore.resolution
const parentWidth = ref(props.mainScreen.position.width + 'px')
const parentHeight = ref(props.mainScreen.position.height + 'px')
const screensRef = ref([])
const videoElement = ref(null)
const videoWidth = ref(0)
const videoHeight = ref(0)

const initVideoElement = () => {
  videoElement.value = document.getElementById('main-screen')
  videoWidth.value = videoElement.value.width
  videoHeight.value = videoElement.value.height
}

const setZIndexElements = () => {
  const screens = document.querySelectorAll('.screen-add')
  screens.forEach(screen => {
    const {index} = screen.dataset
    screen.style.zIndex = index
  })
}
const renderScreens = () => {
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
          console.log('start dragable event')
          console.log(event.type, event.target)
        },
        move(event) {
          emits('changePositionScreen', screen.id, {
            x: screen.positionApplication.x += event.dx,
            y: screen.positionApplication.y += event.dy
          })
          event.target.style.transform = `translate(${screen.positionApplication.x}px, ${screen.positionApplication.y}px)`
          event.target.setAttribute('data-x', screen.positionApplication.x)
          event.target.setAttribute('data-y', screen.positionApplication.y)
        },
        end(event) {

        }

      },
    }).resizable({
      modifiers: [
        interact.modifiers.aspectRatio({
          ratio: 1.7777,
          modifiers: [
            interact.modifiers.restrictEdges({outer: 'parent'}),
          ],
        }),
        interact.modifiers.restrictEdges({
          outer: 'parent',
        }),
        interact.modifiers.restrictSize({
          min: {width: 100, height: 56}
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
          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'

          x += event.deltaRect.left
          y += event.deltaRect.top
          const newSize = {
            x,
            y,
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`
          }
          console.log(newSize)
          target.style.transform = `translate(${newSize.x}px, ${newSize.y}px)`
          target.setAttribute('data-x', newSize.x)
          target.setAttribute('data-y', newSize.y)
          emits('resizeScreen', screen.id, {width: newSize.width, height: newSize.height})
          emits('changePositionScreen', screen.id, {x: newSize.x, y: newSize.y})
        },
      },
    })
  })
}
onMounted(async () => {
  if (screensRef.value) {
    console.log('screens ref: ', screensRef.value)
  }
  initVideoElement()
  renderScreens()
  setZIndexElements()
})

onUpdated(async () => {
  renderScreens()
  setZIndexElements()
})


</script>

<template>
  <section class="screen">
    <video :data-title="mainScreen?.title" :class="mainScreen?.selector" :width="mainScreen.position.width"
           :height="mainScreen.position.height" class="screen-main"
           id="main-screen"></video>
    <div v-for="(screen, index) in screens"
         ref="screensRef"
         :key="screen.id"
         :class="['screen-add', screen.selector]"
         :style="{
          width: screen.positionApplication.width + 'px',
          height: screen.positionApplication.height + 'px',
          transform:`translate(${screen.positionApplication.x}px, ${screen.positionApplication.y}px)`
         }"
         :data-x="screen.positionApplication.x"
         :data-y="screen.positionApplication.y"
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
  max-width: v-bind(parentWidth);
  height: v-bind(parentHeight);

  &-main {
    position: absolute;
    width: 100%;
    background-color: #000;
    object-fit: cover;
  }

  &-add {
    position: absolute;

    //background-color: $primary;
    //border: 2px solid $primary;
    touch-action: none;
    user-select: none;
  }
}
</style>