<script setup>

import {ref} from "vue";

const props = defineProps({
  accept: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['loadFile'])
const file = ref(null)
const onLoadFile = (event) => {
  const filesEvent = event.target.files
  file.value = filesEvent[0]
  emits('loadFile', file.value)
}
</script>

<template>
  <section class="dragon-drop">
    <div class="dragon-zone">
      <form method="post" class="form">
        <input type="file" name="script-file" id="script-load" @change="onLoadFile" :accept="accept">
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dragon {
  &-drop {
    position: relative;
    width: 100%;
    max-width: 507px;
    transition: 0.3s all ease-in-out;

    &:hover {
      opacity: 0.7;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  &-zone {
    cursor: pointer;
    width: 100%;
    height: 233px;
    background-image: url("/images/dropzone.png");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    color: #fff;

    &::backdrop {
      opacity: 0.3;
    }
  }

  &-title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
}

.form {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;

  input {
    width: 100%;
    height: 100%;
  }
}

</style>