<template>
  <div class="appHome">
    <v-header :seller = "seller"></v-header>
    <div class="tab border-1px">
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <div class="tab-item" ><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <keep-alive>
  <router-view :seller="seller"></router-view>
  </keep-alive>
  </div>
</template>

<script>
import header from 'components/header/header'
import { getUrlParams } from '../commom/js/urlParamsUtils'
const ERR_OK = 0;
export default {
 data() {
    return {
      seller: {
          id: (() => {
          let queryParam = getUrlParams('id')
          console.log('queryParam', queryParam)
          return queryParam
        })()
      }
    };
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
     response = response.body;
      if (response.errno === ERR_OK) {
      this.seller = response.data;
      // console.log('请求结果this.seller.id1=' + this.seller.id)
      // this.seller属性 加上response.data
      // Object.assign方法的第一个参数是目标对象，后面的参数都是源对象
      // 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
      this.seller = Object.assign({}, this.seller, response.data)
      console.log('请求结果this.seller.id2=' + this.seller.id)
      }
    }, reponse => {

    })
  },
  name: 'appHome',
    components: {
    'v-header': header
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
// 引入我们写好的mixin.styl文件
  @import '~stylus/mixin.styl'
.appHome
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    // border-bottom : 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
         display :block
         text-decoration :none
         font-size :14px
         color :rgb(77,85,93)
         &.active
           color :rgb(240,20,20)
</style>
