import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);
import API from './https/api'
app.config = {
  warnHandler: (msg, vm, trace) => {
    console.log('warn', msg, vm, trace)
  },
  globalProperties: {
    $http: API
  }
}