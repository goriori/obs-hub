<script setup>

import DownloadButton from "@/components/ui/buttons/download/DownloadButton.vue";
import {loadFile} from "@/utils/helpers/loadFile.js";

const onLoadSound = async () => {
  const file = await loadFile('.mp3')
}


</script>

<template>
  <DownloadButton @click="onLoadSound"/>
</template>

<style scoped lang="scss">

</style>