<template>
  <div class="seller" ref="sellerWrapper">
    <div class="seller-content">
      <div class="sell-header border-1px">
        <div class="name">{{seller.name}}</div>
        <div class="star-wrapper">
          <star class="icon" :size='36' :score='seller.score'></star>
          <span class="ratingCount">({{seller.ratingCount}})</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
      </div>
      <div class="favorite" @click="toggleFavorite($event)">
        <i class="fa fa-heart" aria-hidden="true" :class="{'active':favorite}"></i>
        <span class="favoriteText">{{favoriteText}}</span>
      </div>
      <div class="delivery-info">
        <div class="block">
          <span class="desc">起送价</span>
          <span class="desc-value">{{seller.minPrice}}</span>元
        </div>
        <div class="block">
          <span class="desc">商家配送</span>
          <span class="desc-value">{{seller.deliveryPrice}}</span>元
        </div>
        <div class="block">
          <span class="desc">平均配送时间</span>
          <span class="desc-value">{{seller.deliveryTime}}</span>分种
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="bullentin-name">公告与活动</h1>
        <div class="bullentin-des">{{seller.bulletin}}</div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports" :key="(item.id,index.id)">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="seller-pics">
        <div class="seller-title">商家实景</div>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pics-list" ref="picList">
            <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index" >
              <img :src="pic" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <div class="title border-1px">商家信息</div>
          <ul>
            <li class="info-item border-1px" v-for="(info, index) in seller.infos" :key="index" >
              <span>{{info}}</span>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import split from '../split/split'
import star from '../star/star'
import BScroll from 'better-scroll'
import { saveToLocal, loadFromlLocal } from '../../commom/js/store'
export default {
  name: 'seller',
  data() {
    return {
      favorite: (() => {
        return loadFromlLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  components: {
    star,
    split
  },
  // 组件实例创建完成，属性已经绑定，但DOM还未生成，$el属性还不存在
  // this.data 已经被初始化 this.$el undefined
  created() {
    // console.log('created', 1)
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
// mounted执行时机 优先于watch中的seller
  watch: {
    'seller'() {
      console.log('watch', 1)
      this._initScroll()
      this._initPicsScroll()
    }
  },
  // 挂载结束状态 this.data  this.$el this.message全部已经被初始化
  // DOM被渲染完之后，mounted自动执行，在mounted中可以安全使用DOM,但是
  // 高度计算有问题，无法滚动，因为seller异步获取，我的滚动需要seller数据把
  // 内容撑开，so一开始内容小于我们定义的wrapper，没有撑开，无法滑动
  // 也就是说mounted执行的时候，由于seller获取是异步，通过props还没传数据过来（传过来的是空），无法撑大内容，
  // 所以通过watch 监听，seller值发生变化就行进行绑定滑动
  mounted() {
    console.log('mounted', 1)
    this._initScroll()
    this._initPicsScroll()
  },
  methods: {
    _initScroll() {
      console.log('----seller=', this.seller)
      this.$nextTick(() => {
        if (!this.scroll) {
          console.log('_initScroll绑定')
          this.scroll = new BScroll(this.$refs.sellerWrapper, {
            click: true
          })
        } else {
          console.log('_initScroll刷新')
          this.scroll.refresh()
        }
      })
    },
    _initPicsScroll() {
      if (this.seller.pics) {
        let picWidth = 120
        let picMarginRight = 6
        let arrayLegthw = this.seller.pics
        let arrayLegth = this.seller.pics.length
        let totalWidth = (picWidth + picMarginRight) * this.seller.pics.length - picMarginRight
         console.log('_initPicsScroll-----this.$refs.picList=' + this.$refs.picList)
        if (this.$refs.picList) {
          this.$refs.picList.style.width = totalWidth + 'px'
          console.log('_initPicsScroll-----totalWidth=' + totalWidth)
          if (!this.picScroll) {
            console.log('-------_initPicsScroll执行绑定', this.seller.pics)
            this.$nextTick(() => {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true, // 横向滚动
                eventPassthrough: 'vertical' // 横向滑动的同时禁止垂直滑动
              })
            })
          } else {
            this.picScroll.refresh()
            console.log('-----_initPicsScroll---刷新--')
          }
        }
      }
    },
    toggleFavorite(event) {
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  },
  deactivated() {
     console.log('deactivated', 1)
  }
 };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../commom/stylus/mixin'
.seller
  width 100%
  position absolute
  top 174px
  left 0
  bottom 47px
  overflow hidden
  .seller-content
    .sell-header
      padding 18px 0 0 18px
      border-1px(rgba(7,17,27,0.1))
      .name
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .star-wrapper
        padding-top 8px
        padding-bottom 8px
        font-size 10px
        .icon
          display inline-block
          line-height 18px
        .ratingCount
          color rgb(77,85,93)
          margin-left 8px
          line-height 18px
          vertical-align top
        .sellCount
          color rgb(77,85,93)
          margin-left 12px
          line-height 18px
          vertical-align top
    .favorite
      position absolute
      right 11px
      top 18px
      width 50px
      text-align center
      .fa-heart
        display block
        font-size 24px
        line-height 24px
        color #d4d6d9
        &.active
          color rgb(240,20,20)
      .favoriteText
        font-size 10px
        color rgb(77,85,93)
        line-height 10px
        margin-top 4px
    .delivery-info
      padding 18px 0
      display flex
      .block
        flex 1
        text-align center
        border-right 1px solid rgba(7,17,27,0.1)
        &:last-child
          border-none()
        .desc
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
          display block
          margin-bottom 4px
        .desc-value
          font-size 24px
          color rgb(7,17,27)
          line-height 24px
    .bulletin
      padding 18px
      .bullentin-name
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .bullentin-des
        font-size 12px
        font-weight 200
        color rgb(240,20,20)
        line-height 24px
        padding 8px 12px
        border-bottom 1px solid rgba(7,17,27,0.1)
      .supports
        .support-item
          padding: 16px 12px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            margin-bottom: 0px
          .icon
            display: inline-block
            vertical-align: top
            width: 16px
            height: 16px
            background-size: 16px 16px
            background-repeat: no-repeat
            margin-right: 6px
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            display: inline-block
            line-height: 16px
            font-size: 12px
            font-weight 200
            color rgb(7,17,27)
    .seller-pics
      padding 18px
      .seller-title
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pics-list
          margin-top 12px
          .pic-item
            margin-right 6px
            display inline-block
            &:last-child
              margin-right 0
    .seller-info
      padding 18px
      .title
        padding-bottom 12px
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
        border-1px(rgba(7,17,27,0.1))
      .info-item
        padding 16px 12px 16px 12px
        border-1px(rgba(7,17,27,0.1))
        font-size 12px
        font-weight 200
        color rgb(7,17,27)
        line-height 16px
</style>
