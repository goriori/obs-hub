<script setup>
import draggable from 'vuedraggable'
import {computed, ref} from "vue";

const props = defineProps({
  sources: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['onChangeList'])
const enabled = ref(true)
const dragging = ref(false)
const dragOptions = {
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost"
};
const list = computed(() => [...props.sources.filter(source => source.component !== null)])
const checkMove = (e) => {
  // window.console.log("Future index: " + e.draggedContext.futureIndex);
  emits('onChangeList', list.value)
}
</script>

<template>
  <draggable
      :list="list"
      :disabled="!enabled"
      v-bind="dragOptions"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
      item-key="item"
  >
    <template #item="{element}">
      <div class="item">
        <component :is="element.component" v-model:isFocus="element.isFocus"/>
      </div>
    </template>
  </draggable>
</template>

<style scoped lang="scss">
@import '@/assets/scss/mixins';

.list-group {
  width: 100%;
  max-height: 200px;
  overflow: auto;
  @include no-scroll();
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: 0.3s opacity ease-in-out;
}

.ghost {
  transition: 0.3s opacity ease-in-out;
  opacity: 0.5;
}


</style>