import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'
Vue.use(VueRouter)

// 2. 定义路由
// 每个路由应该映射一个组件。
const routes = [
  {
    path: '/goods',
    name: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: ratings
  },
  {
    path: '/seller',
    name: 'seller',
    component: seller
  },
  // 重定向，因为首次进入页面时，它的路径是 ‘/’。
  {
    path: '/',
    redirect: '../views/userInfo/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import('../views/userInfo/login')
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
  linkActiveClass: 'active' // 默认值: "router-link-active",全局配置 <router-link> 的默认“激活 class 类名”
})

export default router
