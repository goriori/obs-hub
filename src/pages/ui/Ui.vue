<script setup>


import Chip from "../../components/ui/chips/Chip.vue";
import Dropdown from "../../components/ui/dropdown/Dropdown.vue";
import ScreenTargetCard from "../../components/ui/card/screen-target/ScreenTargetCard.vue";
import CameraTargetCard from "../../components/ui/card/camera-target/CameraTargetCard.vue";
import PlusButton from "../../components/ui/buttons/plus/PlusButton.vue";
import DeleteButton from "../../components/ui/buttons/delete/DeleteButton.vue";
import SourceAudioSpace from "../../components/ui/block-space/source-audio/SourceAudioSpace.vue";
import SourceVideoSpace from "../../components/ui/block-space/source-video/SourceVideoSpace.vue";
import SourceScriptsSpace from "../../components/ui/block-space/source-scripts/SourceScriptsSpace.vue";
import Screen from "../../components/ui/screen/Screen.vue";
import SelectSource from "../../components/ui/select-source/SelectSource.vue";
import ConfirmButton from "../../components/ui/buttons/confirm/ConfirmButton.vue";
import IconCard from "../../components/ui/icon-card/IconCard.vue";
import Source from "../../components/ui/source/Source.vue";
import ListSource from "../../components/ui/list-source/ListSource.vue";
import ScriptTargetCard from "../../components/ui/card/script-target/ScriptTargetCard.vue";
import ListDragable from "../../components/ui/list-dragable/ListDragable.vue";
import {ref, shallowRef} from "vue";
import DragonDrop from "@/components/ui/dragondrop/DragonDrop.vue";


const sources = [
  {
    id: 1,
    'icon-type': 'camera',
    isActive: false,
    isFocus: false,
    component: Source,
    title: 'Захват веб-камеры'
  },
  {
    id: 2,
    'icon-type': 'screen',
    isActive: false,
    isFocus: false,
    component: Source,
    title: 'Захват веб-камеры'
  },
  {
    id: 3,
    'icon-type': 'sound',
    isActive: false,
    isFocus: false,
    component: Source,
    title: 'Захват веб-камеры и экрана'
  }
]
const sourceForScript = [
  {
    id: 1,
    'icon-type': 'camera',
    isActive: false,
    isFocus: false,
    component: Source,
    title: 'Захват веб-камеры'
  },
  {
    id: 2,
    'icon-type': 'screen',
    isActive: false,
    isFocus: false,
    component: Source,
    title: 'Захват веб-камеры'
  },
]
const sourceList = ref([
  {
    id: 1,
    isFocus: false,
    component: shallowRef(ScreenTargetCard)
  },
  {
    id: 3,
    isFocus: false,
    component: shallowRef(ScreenTargetCard)
  },
  {
    id: 2,
    isFocus: false,
    component: shallowRef(ScreenTargetCard)
  }
])
const dragList = ref([ScreenTargetCard, CameraTargetCard, ScreenTargetCard, CameraTargetCard])
const onChangeSize = (size) => {
  console.log(size)
}
</script>
<template>
  <div class="page">
    <div class="page-list">
      <h3>Chips:</h3>
      <Chip title="1920 x 1080" active/>
      <Chip title="1080 x 1920" active/>
      <Chip title="720 x 1080"/>
    </div>
    <div class="page-list">
      <h3>Dropdown lists:</h3>
      <Dropdown :titles="['1920 x 1080', '1080 x 1920', '720 x 1080']" @on-change="onChangeSize"/>
    </div>
    <div class="page-list">
      <h3>Icons :</h3>
      <IconCard icon-type="camera"/>
      <IconCard icon-type="screen"/>
      <IconCard icon-type="sound"/>
    </div>
    <div class="page-list">
      <h3>Sources :</h3>
      <Source icon-type="camera" is-active title="Захват веб-камеры"/>
      <Source icon-type="screen" title="Захват экрана"/>
      <Source icon-type="sound" is-active title="Захват веб-камеры и экрана"/>
    </div>
    <div class="page-list">
      <h3>Cards :</h3>
      <ScreenTargetCard/>
      <CameraTargetCard/>
      <ScreenTargetCard/>
      <CameraTargetCard/>
    </div>
    <div class="page-list">
      <h3>Script Cards :</h3>
      <ScriptTargetCard :source="{type:'camera', component:IconCard}"/>
      <ScriptTargetCard :source="{type:'screen', component:IconCard}"/>
      <ScriptTargetCard :source="{type:'sound', component:IconCard}"/>

    </div>
    <div class="page-list">
      <h3>Buttons :</h3>
      <PlusButton/>
      <DeleteButton/>
      <ConfirmButton/>
    </div>
    <div class="page-list">
      <h3>Block Spaces :</h3>
      <SourceAudioSpace :actions="[PlusButton, DeleteButton]"/>
      <SourceVideoSpace :actions="[PlusButton, DeleteButton]"/>
      <SourceScriptsSpace :actions="[PlusButton, DeleteButton]"/>
    </div>
    <div class="page-list">
      <h3>Screen Spaces :</h3>
      <Screen/>
    </div>
    <div class="page-list">
      <h3>Select Source Spaces :</h3>
      <SelectSource title="Выбрать источник" :sources="sources"
                    :actions="[{id:1, action:ConfirmButton, onClick:()=> {}}]"/>
      <SelectSource title="Для чего будет использоваться скрипт?" :sources="sourceForScript"
                    :actions="[{id:1, action:ConfirmButton, onClick:()=> {}}]"/>
    </div>
    <div class="page-list">
      <h3>List Sources :</h3>
      <ListSource :sources="sourceList"/>
      <ListSource :sources="sourceList"/>
      <ListSource :sources="sourceList"/>
    </div>
    <div class="page-list">
      <h3>List Dragable :</h3>
      <ListDragable v-model:sources="dragList"/>
      <ListDragable v-model:sources="dragList"/>
      <ListDragable v-model:sources="dragList"/>
    </div>
    <div class="page-list">
      <h3>Dragon drop :</h3>
        <DragonDrop/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: 3000px;
  &-list {
    display: flex;
    align-items: start;
    gap: 20px;
  }
}
</style>
