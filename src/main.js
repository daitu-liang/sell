import Vue from 'vue'
import App from './App.vue'
import router from './router/index'// 引入路由
import './commom/stylus/index.styl'

/* 第三方插件用块的方式去引用的时候要去注册 */
import VueResource from 'vue-resource'
Vue.use(VueResource)
new Vue({
  router, // 注入到根实例中
  render: h => h(App)
}).$mount('#app')
