import Vue from 'vue'

import App from './App.vue'

import router from './router'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.scss'

import './icons'

import permission from '@/directive/permission/index.js' // 权限判断指令

import './permission' // permission control

import store from './store'

Vue.config.productionTip = false

Vue.directive('permission', permission)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
