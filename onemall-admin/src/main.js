import Vue from 'vue'

import App from './App.vue'

import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.scss'

import './icons'

import store from './store'

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
