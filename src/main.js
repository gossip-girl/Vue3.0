//es6兼容
import 'es6-promise/auto'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/main.css'

//状态管理
import store from './store'

import './config.js'
const app = createApp(App)

app.use(router).use(store)

app.mount('#app');
