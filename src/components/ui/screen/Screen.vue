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
  sources: {
    type: Array,
    default: () => []
  }
})
const modifiersDraggable = [
  interact.modifiers.restrictRect({
    restriction: 'parent',
  }),
  interact.modifiers.restrictEdges({
    outer: 'parent',
  }),
]
const modifiersResizable = [
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
]
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
  props.sources.forEach((source) => {
    interact(`.screen-add`).draggable({
      modifiers: modifiersDraggable,
      listeners: {
        move(event) {

          const {type, x, y} = event.target.dataset

          emits('changePositionScreen', type, {
            x: Number(x) + Number(event.dx),
            y: Number(y) + Number(event.dy)
          })

          event.target.style.transform = `translate(${x}px, ${y}px)`
          event.target.setAttribute('data-x', x)
          event.target.setAttribute('data-y', y)
        },
      },
    }).resizable({
      modifiers: modifiersResizable,
      edges: {
        top: true,
        left: true,
        bottom: true,// Resize if pointer target matches selector
        right: true    // Resize if pointer target is the given Element
      },
      listeners: {
        move(event) {

          const target = event.target
          const {type} = event.target.dataset

          let x = parseFloat(target.getAttribute('data-x')) || 0
          let y = parseFloat(target.getAttribute('data-y')) || 0
          // x += event.deltaRect.left
          // y += event.deltaRect.top

          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'

          const newSize = {
            x,
            y,
            width: target.style.width,
            height: target.style.height
          }

          target.setAttribute('data-x', newSize.x)
          target.setAttribute('data-y', newSize.y)
          target.style.transform = `translate(${newSize.x}px, ${newSize.y}px)`
          emits('resizeScreen', type, {width: newSize.width, height: newSize.height})
          emits('changePositionScreen', type, {x: newSize.x, y: newSize.y})
        },
      },
    })
  })
}
onMounted(async () => {
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
    <video
        :data-title="mainScreen?.title"
        :class="mainScreen?.selector"
        :width="mainScreen.position.width"
        :height="mainScreen.position.height" class="screen-main"
        id="main-screen">
    </video>

    <div v-for="(source, index) in sources"
         ref="screensRef"
         :key="source.id"
         :class="['screen-add', source.selector]"
         :style="{
          width: source.positionApplication.width + 'px',
          height: source.positionApplication.height + 'px',
          transform:`translate(${source.positionApplication.x}px, ${source.positionApplication.y}px)`
         }"
         :data-x="source.positionApplication.x"
         :data-y="source.positionApplication.y"
         :data-type="source.name"
         :data-index="source['z-index']"
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