<script setup>

import Chip from "../chips/Chip.vue";
import {computed, onMounted, ref} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  titles: {
    type: Array,
    default: ['']
  }
})
const emits = defineEmits(['update:modelValue', 'onChange'])
const list = ref([])
const active = ref(false)
const targetSize = computed(() => {
  return list.value.find(listItem => listItem.active)
})
const onSelect = () => active.value = !active.value
const onChange = (title) => {
  list.value.forEach(listItem => listItem.title === title ? listItem.onActive() : listItem.onDisabled())
  emits('update:modelValue', title)
  return emits('onChange', title)
}

const buildListData = () => {
  list.value = [...props.titles.map((title, index) => {
    return {
      id: index,
      title,
      active: index === 0,
      onActive: function () {
        this.active = true
      },
      onDisabled: function () {
        this.active = false
      }
    }
  })]
}
onMounted(() => {
  buildListData()
})
</script>
`
<template>
  <section class="'list'" @click="onSelect">
    <div :class="['list-container', {active}]">
      <div class="list-target">
        <Chip :title="targetSize?.title" active/>
      </div>
      <Transition name="fade">
        <div v-if="active" class="list-items">
          <div class="list-item" v-for="title in list" :key="title.id">
            <div v-if="!title.active">
              <Chip :title="title.title" :active="title.active" @on-change="onChange"/>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.list {
  width: 100%;
  max-width: 154px;
  padding: 10px;
  transition: 0.3s all ease-in-out;

  &-container {
    cursor: pointer;
    &.active {
      background-color: $secondary;
      border-radius: 25px;
    }
  }


}
</style>