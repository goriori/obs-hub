<script setup>
import {onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";

const isScrollBlocked = ref(false);

const blockScroll = () => {
  document.body.style.overflow = 'hidden'; // Блокируем скролл
  isScrollBlocked.value = true; // Показываем элемент
};

const unblockScroll = () => {
  document.body.style.overflow = ''; // Разблокируем скролл
  isScrollBlocked.value = false; // Скрываем элемент
};

onBeforeMount(() => {
  blockScroll();
});

onBeforeUnmount(() => {
  unblockScroll();
});

</script>

<template>
  <div class="popup"  id="popup" >
    <div class="popup-content">
      <slot name="window"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup {
  position: fixed;
  inset: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>