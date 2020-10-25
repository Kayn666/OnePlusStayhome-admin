import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "u-reset.css";
import axios from 'axios';
import * as filters from './filter'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$http=axios;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
