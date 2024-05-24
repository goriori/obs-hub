<script setup>

import Popup from "@/components/ui/popup/Popup.vue";
import Button from "@/components/ui/buttons/Button.vue";
import {onMounted, ref} from "vue";
import {useStateStore} from "@/store/stateStore.js";

const stateStore = useStateStore()
const form = ref({
  text: "",
  minutes: '1',
  position: 'left'
})
const onKeypress = (event) => {
  const keys = {
    'Escape': () => closeModal()
  }
  if (keys[event.key]) return keys[event.key].call()
}
const closeModal = () =>  stateStore.modals.edit.editScript.show = false
const onSendForm = () => {
 closeModal()
}
onMounted(()=> {
  window.addEventListener('keydown', onKeypress);
})
</script>

<template>
  <Popup>
    <template #window>
      <section class="edit-script" >
        <h3 class="edit-title">Редактирование скрипта</h3>
        <form class="form" action="" @submit.prevent="onSendForm" >
          <fieldset>
            <div class="form-item">
              <label for="text">Текст на вотермарке</label>
              <input type="text" placeholder="Зесь могла быть ваша реклама" id="text" v-model="form.text">
            </div>
            <div class="form-item">
              <label for="minutes">Частота изображения вотермарка в минутах</label>
              <select class="minutes" id="minutes" v-model.number="form.minutes">
                <option value="1">1</option>
              </select>
            </div>
            <div class="form-item">
              <label for="position">Положение вотермарка</label>
              <select class="position" id="position" v-model="form.position">
                <option value="left">Слева</option>
                <option value="right">Справа</option>
              </select>
            </div>
          </fieldset>
          <Button rounded class="form-button">
            <template #title>Подтвердить</template>
          </Button>
        </form>
      </section>
    </template>
  </Popup>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

fieldset {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.edit {
  &-script {
    width: 100%;
    max-width: 586px;
    border-radius: 50px;
    background: #2B2B2B;
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
    gap: 52px;
  }

  &-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: center;
    color: $primary;
  }
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  &-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &-button {
    font-weight: 700;
  }
}

label {
  font-weight: 600;
  font-size: 18px;
  color: #9D9D9D;
}

input, select {
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  padding: 18px 34px;

}

input {
  border-radius: 50px;
  border: 2px solid $primary;
  background: none;
  color: $primary;
}

select {
  border-radius: 50px;
}

.minutes {
  max-width: 95px;
  background: none;
  border: 2px solid $primary;
  color: #9c9c9c;
  padding: 18px 30px;
}

.position {
  background: $primary;
  color: #000;
  padding: 10px 20px;
  max-width: 135px;
  font-size: 16px;
}
</style>