<script setup>
import { ref } from 'vue'
import { useFetching } from '@/utils/useFetching.js'
import { useRegular } from '@/utils/useRegular.js'
import PostService from '@/API/postService.js'

const { fetching } = useFetching(async () => await PostService.getData())
const res = ref(null)
const getSome = async () => {
  res.value = await fetching()
}
const { emailTest, dateTest } = useRegular()
const emailRight = 'asd@eee.ru'
const emailFalse = 'asdeee.ru'
const dateRight = '11.12.2020'
const dateFalse = '41.22.2020'
</script>
<template>
  <div class="page">
    <button @click="getSome">click data</button>
    <pre>{{ res }}</pre>
    <div class="test">
      <div class="row">
        <div class="value">{{ emailRight }}</div>
        <div class="check">CHECK</div>
        <div class="result">{{ emailTest(emailRight) }}</div>
      </div>
      <div class="row">
        <div class="value">{{ emailFalse }}</div>
        <div class="check">CHECK</div>
        <div class="result">{{ emailTest(emailFalse) }}</div>
      </div>
      <div class="row">
        <div class="value">{{ dateRight }}</div>
        <div class="check">CHECK</div>
        <div class="result">{{ dateTest(dateRight) }}</div>
      </div>
      <div class="row">
        <div class="value">{{ dateFalse }}</div>
        <div class="check">CHECK</div>
        <div class="result">{{ dateTest(dateFalse) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 100px;
}
</style>
