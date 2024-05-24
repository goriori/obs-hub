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
  updateData.value.type = type
  updateData.value.data = data
  emits('onUpdate', updateData.value)
}

</script>

<template>
  <section class="list-sources" >
    <div class="item" v-for="source in sources" :key="source" >
      <component
          v-model:isFocus="source.isFocus"
          v-model:isActive="source.isActive"
          @update:isActive="onActive"
          :scriptId="source.id"
          :is="source.component"
          :name="source.name"
          :targetType="source.capture?.type"
          :source="source.use"
          :action="source?.action"
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
  max-height: 200px;
  @include no-scroll();
}
</style>