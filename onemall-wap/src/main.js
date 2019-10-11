import Vue from 'vue';
import App from './App.vue';
import router from '@/router';

Vue.config.productionTip = false;

import './utils/hotcss/hotcss.js';

//图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('@/assets/img/default.png')
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
