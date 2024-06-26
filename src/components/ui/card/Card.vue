<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  isFocus: {
    type: Boolean,
    default: false
  },
  isScript: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['onActiveScript', 'onDisableScript', 'onFocus'])
const onActiveScript = () => {
  if (props.isScript) {
    return props.isActive ? emits('onDisableScript') : emits('onActiveScript')
  }
}
const onFocus = () => emits('onFocus')


</script>

<template>
  <article class="card" v-ripple>
    <div :class="['card-container', {'is-script':isScript, 'is-active':isActive, focus:isFocus}]" @click="onFocus">
      <section class="card-icon">
        <slot name="icon"/>
      </section>
      <section class="card-title">
        <slot name="title"/>
      </section>
    </div>
    <section class="card-script" v-if="isScript" @click="onActiveScript">
      {{ isActive ? 'Деактивировать' : 'Активировать' }}
    </section>
  </article>
</template>

<style scoped lang="scss">
@import "@/assets/scss/variables";

$transition-animation: 0.2s all ease-in-out;
@mixin changeColor() {
  transition: $transition-animation;
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
  @media (max-width: $md1 + px) {
    font-size: 12px;
  }

  &-container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background-color: #898989;
    border-radius: 55px;
    transition: $transition-animation;

    &.is-script {
      width: 60%;
      transition: $transition-animation;
    }

    &.is-active {
      width: 100%;
      @include changeColor();
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

.focus {
  @include changeColor()
}

</style>