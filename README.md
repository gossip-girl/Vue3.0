# vue-next-webpack-preview

> Minimal webpack setup for Vue 3 (RC)

This is for preview purposes. There might be bugs and undocumented behavior differences from v2, which are expected.

If you are using VSCode, Vetur isn't updated to take advantage of Vue 3's typing yet so intellisense in Vue files may not be fully functional (especially in templates).

Also note that this is for configuration reference only. For real-world projects, it's recommended to use [`vite`](https://github.com/vitejs/vite) or [`@vue/cli`](https://github.com/vuejs/vue-cli).

### Prerequisites
- Node & NPM

### Install
```sh
npm install
```
### Usage
##### Develop
```sh
# run dev server at localhost:8080
npm run dev
```
##### Build
```sh
# transpile js for deployment
npm run build
```
### 您也可以自己搭建项目进行 vue3 安装：
  #### 需要升级脚手架工具

```
  npm install -g @vue/cli //升级脚手架工具
  npm install vue@next //安装vue3
```
  #### 创建项目
  ```
  npm init @vitejs/app <project-name>
  cd <project-name>
  npm install
  npm run dev
  ```
  #### 创建项目可以选择自己需要的模板  vite可提供：vue vue-ts react react-native模板等


#### VUE3 VS VUE2 变化
  1. watch computed 使用：
   
   vue2
   ```
    watch:{
      name:(newVal,oldVal)=>{
        console.log(newVal,oldVal)
      }
    },
    computed:{
      userName:()=>{
        return this.$store.state.userName
      }
    }
   ```
  vue3
  ```sh
  import { watch, ref } from 'vue'
  import { useRoute } from 'vue-router'
  mport { useStore } from 'vuex'
  setup(){ # componsition api
    const route = useRoute()
    watch(
      () => route.params,
      newParams => {
        console.log(newParams)
      }
    ),
     # 监听多个对象属性时，监听属性放在同一个list内，（[新值],[旧值]）=>{方法}，如下
    const count = ref(0);
    watch([() => route.path, count],
      ([path, count], [prevPath, prevCount]) => {
        console.log(count, prevCount)
        console.log(path, prevPath)
      }
    ),
    # watchEffect 在反应性地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它
    # 立即执行，且不需要标明监听的对象属性
    watchEffect(() => {//立即执行 且不需要标明 监听的对象
      console.log(count.value)
    }),

    const store = useStore();
    

    return {
      count,
       # computed 计算属性
      sex:computed(()=>{
        return store.state.dictiontry.sex
      })
    }
  } 
 
```
2. vuex router 使用
  vue2:
  ```
  this.$store
  this.$router
  ```
  vue3
  安装方式：
    vuex:
  ```sh
    npm install vuex@next --save
    # 或者
    yarn add vuex@next --save
    # vuex 依赖于es6的promise 故 安装依赖
    npm install es6-promise --save # NPM
    yarn add es6-promise # Yarn

    # 入口文件中引用
    import 'es6-promise/auto'

    # 使用
    import { createApp } from 'vue'
    import { createStore } from 'vuex'
    const app = createApp({ /* your root component */ })
    const store = createStore({
      state () {
        return {
          count: 0
        }
      },
      mutations: {
        increment (state) {
          state.count++
        }
      }
    })
    app.use(store)

  ```
  router 

  ```sh
    # 安装
    npm install vue-router@4

    # 配置
    import { createWebHistory, createRouter } from 'vue-router'
    import { createApp } from 'vue'
    const routerHistory = createWebHistory('base') #history路由更改为 createWebHistory 去除base属性
    # 哈希路由：createWebHashHistory
    # 创建基于内存的历史记录 createMemoryHistory
      const router = createRouter({
      history: routerHistory,
      routes: [],
    })
    
     const app = createApp({ /* your root component */ })
     app.use(router)
  ```
   ```sh
  # 先引用 再使用 context代替this
  # 在模板中仍可以接着使用 router store 而不需要return出去
  <template>
    <div>{{$store.state.useName}}</div>
  </template>
  <script>
    import { useRoute, useRouter} from 'vue-router'
    import { useStore } from 'vuex'
    setup(){
      const store=useStore();
      const route=useRoute();
      const router=useRouter();
      router.push({
        path:'/userManage'
      })
      console.log(route.path);
      return {}
    }
  </script>
  
  ```

