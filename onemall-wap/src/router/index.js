import Vue from 'vue';
import Router from 'vue-router';

import home from './home';
import order from './order';
import item from './items';
import user from './user';

Vue.use(Router)

let RouterModel = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [...home, ...order, ...item, ...user]
});

export default RouterModel;