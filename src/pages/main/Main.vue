<script setup>

import SourceAudio from "../../components/modules/source-audio/SourceAudio.vue";
import SourceVideo from "../../components/modules/source-video/SourceVideo.vue";
import SourceScripts from "../../components/modules/source-scripts/SourceScripts.vue";
import SizeSwitch from "../../components/modules/size-switch/SizeSwitch.vue";
import ScreenArea from "../../components/modules/screen-are/ScreenArea.vue";
</script>

<template>
  <div class="page">
    <div class="page-container">
      <section>
        <SizeSwitch/>
      </section>
      <section class="screen">
        <ScreenArea/>
      </section>
      <section class="spaces">
        <SourceAudio/>
        <SourceVideo/>
        <SourceScripts/>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  &-container {
    padding: 40px;

  }
}

header {
  width: 100%;
}

section {
  margin: 40px 0;
}

.screen {
  margin: 0 auto;
}

.spaces {
  display: flex;
  gap: 40px;
}
</style>