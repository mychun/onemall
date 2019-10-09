import Vue from 'vue';
import App from './App.vue';
import router from '@/router';

Vue.config.productionTip = false;

import './libs/hotcss/hotcss.js';


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
