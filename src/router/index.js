import Vue from "vue";
import VueRouter from "vue-router";

import Main from "../views/Main";

import Search from "../views/Search";

// 导入404页面
import NotFound from '../views/NotFind';
Vue.use(VueRouter);

export default new VueRouter({
  publicPath:"/",
  routes:[
    {
      path: '/main/:msg',
      name: '/main',
      component: Main,
      props: true
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '*',
      component: Search
    }
  ]
});

