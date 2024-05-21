<script setup>

import ConfirmButton from "../../ui/buttons/confirm/ConfirmButton.vue";
import Source from "../../ui/source/Source.vue";
import SelectSource from "../../ui/select-source/SelectSource.vue";

const sources = [
  {
    id: 1,
    'icon-type': 'camera',
    component: Source,
    title: 'Захват веб-камеры'
  },
  {
    id: 2,
    'icon-type': 'screen',
    component: Source,
    title: 'Захват веб-камеры'
  },
  {
    id: 3,
    'icon-type': 'sound',
    component: Source,
    title: 'Захват веб-камеры и экрана'
  }
]
</script>

<template>
  <SelectSource title="Выбрать источник" :sources="sources" :actions="[ConfirmButton]"/>
</template>

<style scoped lang="scss">

</style>