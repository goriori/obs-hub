<script setup>

</script>

<template>
  <article class="block-space">
    <div class="title">
      <slot name="title"/>
    </div>
    <div class="list">
      <slot name="list"/>
    </div>
    <div class="actions">
      <slot name="actions"/>
    </div>
  </article>
</template>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.block-space {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 40px;
  border-radius: 50px;
  min-height: 420px;
  background-color: $secondary;
  @media(max-width: $md1 + px) {
    padding: 15px 30px;
    min-height: 312px;
  }

  .title {
    display: flex;
    justify-content: flex-start;
    color: $primary;
    font-weight: 600;
    font-size: 20px;
    @media(max-width: $md1 + px) {
      font-size: 15px;
    }
  }

  .actions {
    position: absolute;
    bottom: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    @media(max-width: $md1 + px) {
      gap: 15px;
    }
  }
}

</style>