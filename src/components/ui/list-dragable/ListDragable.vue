<script setup>
import draggable from 'vuedraggable'
import {computed, ref, watch} from "vue";

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

const updateList = (e) => {
  dragging.value = false
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
      @start="dragging = true"
      @end="updateList"
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
  max-height: 215px;
  overflow: auto;
  @include no-scroll();
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: 0.3s opacity ease-in-out;
}

.ghost {
  transition: 0.3s opacity ease-in-out;
  opacity: 0.5;
}


</style>