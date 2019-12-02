import Vue from 'vue'
import App from './App.vue'
import router from './router/index'// 引入路由
import './commom/stylus/index.styl'
import './commom/css/reset.css'
import axios from 'axios'

/* 第三方插件用块的方式去引用的时候要去注册 */
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 不建议 axios挂载到VUE，"会污染vue"框架，让Vue干自己任务，当然挂载到vue功能也可以实现
// Vue.prototype.$axios = axios

Object.assign(window, { // axios挂载到window，来全局使用
  axios
})
console.log('process', process.env)
new Vue({
  router, // 注入到根实例中
  render: h => h(App)
}).$mount('#app') // 给vue挂载到app的Dom中
