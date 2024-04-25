<script setup>

import Card from "../Card.vue";
import IconCard from "../../icon-card/IconCard.vue";
</script>

<template>
  <Card class="card">
    <template #icon>
      <IconCard icon-type="camera"/>
    </template>
    <template #title>Захват веб-камеры</template>
  </Card>
</template>

<style scoped>

</style>