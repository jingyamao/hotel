import Vue from 'vue'
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//引入axios
import axios from 'axios'
//引入外部element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
//应用插件
Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  el:'#app',
  render: h => h(App),
  beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
  router:router
})
