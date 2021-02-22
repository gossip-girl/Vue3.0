<template>
  <div class="main">
    <sideMenu class="side-menu" />
    <div class="right-main-box">
      <router-view />
    </div>

  </div>
</template>
<script>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import sideMenu from '@/component/sideMenu.vue'
export default {
  name: 'mainIndex',
  components: { sideMenu },
  setup () {
    const route = useRoute()
    const userData = ref()
    watch(
      () => route.params,
      newParams => {
        console.log(newParams)
      }
    )
    return { route, userData }
  }
}
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
}
.main .side-menu {
  width: 200px;
  flex: 0 0 200px;
}
.main .right-main-box {
  flex: 1;
  height: 100%;
}
</style>