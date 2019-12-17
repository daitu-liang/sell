<template>
  <div class="mainHome">
    <div class="mainHome-content">
      <h1 class="mainHome-title">{{userName}}</h1>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in bannerList" :key="index" class="banner_wraaper">
          <img v-lazy:background-image="image.coverUrl" width="100%" class="banner_img"/>
        </van-swipe-item>
      </van-swipe>
      <div>
        <van-grid :column-num="4" :border="false" :clickable="true" icon-size="36px">
          <van-grid-item
            v-for="(menu,index) in menuList" :key="index"
            :icon="menu.iconUrl"
            :text="menu.menuName"
            @click="clickMenuItem(menu)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Lazyload, Grid, GridItem, Image } from 'vant';
import apiMixins from '../../commom/network/api/mainHome'
import Vue from 'vue'
// options 为可选参数，无则不传
Vue.use(Lazyload);
export default {
  name: 'mainHome',
  mixins: [apiMixins],
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image
    // [Lazyload.name]: Lazyload
  },
  data() { 
    return {
      bannerList: [],
      menuList: [],
      userName: window.localStorage.getItem('fullName'),
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  activated() {
    this.getMainHomeBanner()
    this.getHomeMenu()
  },
  methods: {
    getMainHomeBanner() {
      this.getBanner().then(res => {
        this.bannerList = res
      })
    },
    getHomeMenu() {
      this.getMenu().then(res => {
        this.menuList = res
      })
    },
    clickMenuItem(menu) {
      console.log('clickMenuItem', menu.menuName)
    }
  }
 }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mainHome
    position absolute
    width 100%
    height 100%
    background-color #ffffff
    .mainHome-content
      position relative
      padding 20px
      text-align center
      .mainHome-title
        margin-bottom 10px
      .banner_wraaper
        width 100%
        .banner_img
          width 100%
          height 180px

</style>
