/*
 * @Author: heinan
 * @Date: 2023-07-19 21:53:29
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-19 21:54:15
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd from '@/utils/antd'

const app = createApp(App)
app.use(antd)
app.use(store)
app.use(router)
app.mount('#app')
