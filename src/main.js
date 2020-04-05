// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入ElementUI 和 Css
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// 导入live2d
import live2d4vue from 'live2d4vue';


Vue.config.productionTip = false;

Vue.use(router);
Vue.use(Element);
Vue.use(VueAxios, axios);
Vue.use(live2d4vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
