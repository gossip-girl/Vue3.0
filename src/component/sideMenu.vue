<template>
  <div class="left-menu">
    <ul>
      <li v-for="(item,index) in meuList"
          :key="index"
          @click="changePage(item)"
          :class="{'active':$route.path==item.href}">{{item.name}}</li>
    </ul>
    <p>{{count}}</p>
    <button @click="addCount">点我加1</button>
  </div>
</template>
<script>
import { reactive, watch, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'sideMenu',
  setup () {
    const meuList = reactive([
      {
        name: '用户管理',
        href: '/userManage'
      },
      {
        name: '角色管理',
        href: '/roleManage'
      },
      {
        name: '菜单管理',
        href: '/menuManage'
      }
    ]);
    const count = ref(0);
    const route = useRoute()
    watch([() => route.path, count],
      ([path, count], [prevPath, prevCount]) => {
        console.log(count, prevCount)
        console.log(path, prevPath)
      }
    )
    watchEffect(() => {//立即执行 且不需要标明 监听的对象
      console.log(count.value)
    })
    const router = useRouter();
    function changePage (item) {
      router.push({
        path: item.href
      })
    }
    function addCount () {
      console.log(count);
      count.value++
    }
    return {
      meuList,
      changePage,
      count,
      addCount
    }
  }
}
</script>
<style scoped>
.left-menu {
  width: 100%;
  height: 100%;
  background: #000;
  padding-top: 40px;
}
.left-menu ul li {
  list-style: none;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
.left-menu ul li.active {
  color: skyblue;
}
p {
  color: #fff;
}
</style>