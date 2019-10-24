import Vue from 'vue';
import App from './App.vue';
import router from './router/index';// 引入路由

// let app =Vue.extend(App);
new Vue({
  router, // 注入到根实例中
  render: h => h(App)
}).$mount('#app');
