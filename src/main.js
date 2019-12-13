import Vue from 'vue'
import App from './App.vue'
import router from './router/index'// 引入路由
import './commom/stylus/index.styl'
import './commom/css/reset.css'
import axios from './commom/network/http'
import api from './commom/network/api'

/* 第三方插件用块的方式去引用的时候要去注册 */
import VueResource from 'vue-resource'
import LocalForage from 'localforage'
import qs from 'qs'
Vue.use(VueResource)
/**
 * 强制设置特定的驱动
 * 默认情况localForage 按照以下顺序选择数据仓库的后端驱动：
 * IndexedDB ，WebSQL ，localStorage
 */
LocalForage.setDriver(LocalForage.LOCALSTORAGE)
Object.assign(window, { // axios挂载到window，来全局使用
  axios,
  api,
  LocalForage,
  qs
})
// console.log('process', process.env)
new Vue({
  router, // 注入到根实例中
  render: h => h(App)
}).$mount('#app') // 给vue挂载到app的Dom中
