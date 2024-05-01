<script setup>
const props = defineProps({
  sources: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <section class="list-sources">
    <div class="item" v-for="source in sources" :key="source">
      <component
          v-model:isFocus="source.isFocus"
          v-model:isActive="source.isActive"
          :is="source.component"
          :targetType="source.capture?.type"
          :source="source.use"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';


.list-sources {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 20px;
  max-height: 200px;
  @include no-scroll();
}
</style>