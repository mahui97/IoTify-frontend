// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as echarts from 'echarts'
import router from './router'
import Api from './common/js/api.js'
import {formatDate} from './common/js/date.js'
import global_ from './include/Global'
Vue.prototype.$api = Api;
Vue.prototype.$echarts = echarts;
Vue.prototype.GLOBAL = global_;

Vue.config.productionTip = false
Vue.filter('formatDate', function (time) {
  var date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
