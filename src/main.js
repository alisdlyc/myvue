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

import VueCookies from 'vue-cookies'


import VueCodeMirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';

import * as echarts from 'echarts'
import ECharts from 'vue-echarts'

Vue.config.productionTip = false;

Vue.use(router);
Vue.use(Element);
Vue.use(VueAxios, axios);
Vue.use(VueCookies)
Vue.use(VueCodeMirror);
Vue.use(ECharts)
/* eslint-disable no-new */
new Vue({

  el: '#app',
  router,
  render: h => h(App)
});
