<template>
  <div>
    <p>用户管理</p>
    <ul>
      <li v-for="(item,index) in sex"
          :key="index">{{item.codeValue}}</li>
    </ul>
  </div>
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'
export default {
  name: 'userManage',
  setup () {
    const store = useStore();
    return {
      sex: computed(() => {
        return store.state.dictiontry.sex
      })
    }
  }
}
</script>
<style scoped>
</style>