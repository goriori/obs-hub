<script setup>

import ConfirmButton from "../../ui/buttons/confirm/ConfirmButton.vue";
import Source from "../../ui/source/Source.vue";
import SelectSource from "../../ui/select-source/SelectSource.vue";

const sourceForScript = [
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
]
</script>

<template>
  <SelectSource title="Для чего будет использоваться скрипт?" :sources="sourceForScript" :actions="[ConfirmButton]"/>
</template>

<style scoped lang="scss">

</style>