<script setup>
import {ref} from "vue";

const props = defineProps({
  sources: {
    type: Array,
    default: () => []
  }
})
const updateData = ref({
  type: 'active-script',
  data: {}
})
const emits = defineEmits(['onUpdate'])
const onActive = (value, data, type) => {
  console.log(value,data,type)
  updateData.value.type = type
  updateData.value.data = data
  emits('onUpdate', updateData.value)
}

</script>

<template>
  <section class="list-sources">
    <div class="item" v-for="source in sources" :key="source">
      <component
          :script="source"
          :isActive="source.enabled"
          :isFocus="source.focused"
          :is="source.card"
          @update:isActive="onActive"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';


.list-sources {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 20px;
  max-height: 220px;
  @include no-scroll();
}
</style>