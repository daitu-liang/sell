<template>
  <div class="mainHome">
    <div class="mainHome-content">
      <h1>{{userName}}</h1>
      <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in bannerList" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import apiMixins from '../../commom/network/api/mainHome'
export default {
  name: 'mainHome',
  mixins: [apiMixins],
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() { 
    return {
      bannerList: [],
      userName: LocalForage.getItem('fullName')
    }
  },
  activated() {
    this.getMainHomeBanner()
  },
  methods: {
    getMainHomeBanner() {
      this.getBanner().then(res => {
        this.bannerList = res
      })
    }
  }
 }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mainHome
    position absolute
    width 100%
    height 100%
    background-color #f3f3f3
    .mainHome-content
      position relative
      padding 20px
      text-align center
      .mainHome-title
        margin-bottom 80px
      .mainHome-btn
        width 80%
        margin-top 50px
</style>
