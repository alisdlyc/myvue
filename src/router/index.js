import Vue from "vue";
import VueRouter from "vue-router";

import Main from "../views/Main";
import Search from "../views/Search";

// 导入404页面
Vue.use(VueRouter);

export default new VueRouter({
  publicPath:"/#/",
  routes:[
    {
      path: '/main',
      component: Main
    },
    {
      path: '/search',
      component: Search
    },
  ]
});

