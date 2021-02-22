<template>
  <div class="main-box">
    <!-- <img src="./logo.png">
    <h1>Hello Vue 3!</h1>
    <button @click="inc">Clicked {{ count }} times.</button> -->
    <router-view />
  </div>

</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const count = ref(0)
    const inc = () => {
      count.value++
    }

    return {
      count,
      inc
    }
  }
}
</script>

<style scoped>
.main-box {
  width: 100%;
  height: 100%;
}
</style>
