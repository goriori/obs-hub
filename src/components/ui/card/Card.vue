<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  isScript: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <article class="card" v-ripple>
    <div :class="['card-container', {'is-script':isScript, active:isActive}]">
      <section class="card-icon">
        <slot name="icon"/>
      </section>
      <section class="card-title">
        <slot name="title"/>
      </section>
    </div>
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
  align-content: center;
  justify-content: flex-start;
  width: 100%;
  border: 1px solid #898989;
  border-radius: 55px;
  font-size: 16px;
  color: #000;
  background-color: #000;

  &-container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background-color: #898989;
    border-radius: 55px;

    &:hover {
      @include changeColor()
    }

    &.is-script {
      width: 60%;
    }
  }

  &-script {
    position: absolute;
    z-index: 1;
    right: 0;
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

}

.active {
  @include changeColor()
}

</style>