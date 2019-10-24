/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-24 09:53:30
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // 一个现代的替代CSS重置

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // 设置el 为中文

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import './plugins/element.js'
// import '@/permission' // permission control

/**
*  如果您不想使用模拟服务器
*  你想使用MockJs的模拟api
*  您可以执行:mockXHR()
*  目前MockJs将在生产环境中使用，
*  请在上线前删除!!!
*/
// import { mockXHR } from '../mock'

// // 开发环境使用mock_server ,生产环境使用mock
// if (process.env.NODE_ENV === 'production') {
//   mockXHR() // mockXHR用户切换
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
