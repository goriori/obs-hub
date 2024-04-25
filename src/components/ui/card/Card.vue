<script setup>
defineProps({
  isScript: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <article class="card" v-ripple>
    <section class="card-icon">
      <slot name="icon"/>
    </section>
    <section class="card-title">
      <slot name="title"/>
    </section>
    <section class="card-script" v-if="isScript">
      Активировать
    </section>
  </article>
</template>

<style scoped lang="scss">
@import "@/assets/scss/variables";

@mixin changeColor() {
  transition: 0.2s background-color ease-in-out;
  background-color: $primary;
}

.card {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 20px;
  background-color: #898989;
  border: 1px solid transparent;
  border-radius: 55px;
  font-size: 16px;
  color: #000;

  &:hover {
    @include changeColor()
  }

  &-script {
    position: absolute;
    right: 0;
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 55px;
    background-color: #000;
  }
}
</style>