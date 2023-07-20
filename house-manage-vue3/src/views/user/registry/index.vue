<template>
  <div>
    <div>{{ state.num }}</div>
    <div>{{ state.str }}</div>
    <div>{{ state.arr }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'UserRegistry',
  setup() {
    const state = {
      num: ref<number>(123),
      str: ref<string>('123'),
      arr: ref<number[]>([1, 2, 3, 4])
    }
    return {
      ...state
    }
  }
})
</script>

<style></style>
