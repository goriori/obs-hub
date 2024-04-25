<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Выберите источник'
  },
  sources: {
    type: Array,
    default: () => []
  },
  actions: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <article class="select">
    <h3 class="select-title">{{ title }}</h3>
    <section class="select-list">
      <div class="list-item" v-for="source in sources" :key="source.id">
        <component :is="source.component" :title="source.title" :icon-type="source['icon-type']"
                   v-model:isActive="source.isActive" @click="source.onClick"/>
      </div>
    </section>
    <section class="select-actions">
      <component :is="action.action" v-for="action in actions" :key="action.id" @click="action.onClick"
      />
    </section>
  </article>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.select {
  width: 100%;
  max-width: 586px;
  border-radius: 50px;
  background: #2B2B2B;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  gap: 52px;

  &-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: center;
    color: $primary;
  }

  &-list {
    width: 100%;
    max-width: 506px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }

  &-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
}

.list {
  &-item {
  }
}
</style>