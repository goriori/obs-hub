<script setup>

import SourceAudio from "../../components/modules/source-audio/SourceAudio.vue";
import SourceVideo from "../../components/modules/source-video/SourceVideo.vue";
import SourceScripts from "../../components/modules/source-scripts/SourceScripts.vue";
import ScreenArea from "../../components/modules/screen-are/ScreenArea.vue";
import {onUpdated} from "vue";
import Button from "@/components/ui/buttons/Button.vue";
import Sound from "@/components/icons/Sound.vue";
import Donwload from "@/components/icons/Donwload.vue";
import DownloadSoundAction from "@/components/actions/donwload/sound/DownloadSoundAction.vue";


</script>

<template>
  <div class="page">
    <div class="page-container">
      <!--      <section class="switcher">-->
      <!--        <SizeSwitch/>-->
      <!--      </section>-->
      <section>
        <DownloadSoundAction/>
      </section>
      <section class="screen block">
        <ScreenArea/>
      </section>
      <section class="spaces block">
        <SourceAudio/>
        <SourceVideo/>
        <SourceScripts/>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.page {
  padding: 40px;
  @media(max-width: $md1 + px) {
    padding: 30px;
  }
}

header {
  width: 100%;
}

.switcher {
  position: absolute;
  right: 30px;
  z-index: 5;
}

.screen {
  margin: 0 auto;
}

.spaces {
  display: flex;
  gap: 40px;
  @media(max-width: 1440px) {
    gap: 30px;
  }
}

.block {
  margin: 0 0 40px 0;
  @media(max-width: $md1 + px) {
    margin: 0 0 20px 0;
  }
}
</style>