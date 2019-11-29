<template>
  <div class="ratings" ref="ratings">
    <div class="rating-content">
      <div class="rating-header">
        <div class="rating-left">
          <div class="core-text">{{seller.score}}</div>
          <span class="core-name">综合评分</span>
          <div class="core-des">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="rating-right">
          <div class="star-des">
            <span class="title">服务态度</span>
            <star class="icon" :size='36' :score='seller.score'></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="star-des">
            <span class="title">商品评分</span>
            <star class="icon" :size='36' :score='seller.score'></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-des">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-1px" v-for="(item, index) in ratings" :key="index" v-show="needShow(item.rateType,item.text)">
              <div class="avatar">
                <img :src="item.avatar" width="28" height="28" alt="">
              </div>
              <div class="rating-content">
                <span class="name">{{item.username}}</span>
                <div class="star-wrapper">
                  <star class="icon" :size='36' :score='item.score'></star>
                  <span class="delivery-time">{{item.deliveryTime}}分钟后送达</span>
                </div>
                <div class="text">{{item.text}}</div>
                <div class="recommend-wrapper">
                  <span  :class="{'fa fa-thumbs-up':item.rateType === 0,'fa fa-thumbs-down':item.rateType === 1}"></span>
                  <li v-show="item.recommend && item.recommend.length" v-for="(recommendItem, index) in item.recommend" :key="index">
                    <ul>
                      <div class="recommend">{{recommendItem}}</div>
                    </ul>
                  </li>
                </div>
              </div>
              <div class="time">{{item.rateTime | formatDate}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import split from '../split/split'
import star from '../star/star'
import ratingselect from '../ratingselect/ratingselect'
import { formatDate } from '../../commom/js/date'
import BScroll from 'better-scroll'
const ERR_OK = 0;
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  name: 'ratings',
	data() { 
		return {
			showFlag: false,
			selectType: 2,
      onlyContent: false,
      ratings: [],
			desc: {
				all: '全部',
				positive: '推荐',
				negative: '吐槽'
			}
		}
	},
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    split,
    star,
    ratingselect
  },
  created() {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  methods: {
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    incrementTotal(type, typeValue) {
      console.log('type', type)
      // this[type] 当前vue对象里，声明的变量（data中的变量），只要type相同，就赋值typeValue给该变量
      this[type] = typeValue
       this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  }, 
  filters: {
    formatDate(time) {
      return formatDate(new Date(time), 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../commom/stylus/mixin'
.ratings
  position absolute
  left 0px
  bottom 47px
  top 174px
  width 100%
  overflow hidden
  .rating-content
    width 100%
    .rating-header
      display flex
      padding 18px 14px 18px 24px
      @media only screen and (max-width 360px) // 设备宽度低于360 
        padding 18px 8px 18px 8px
      .rating-left
        flex  0 0 130px
        width 130px
        text-align center
        border-right 1px solid rgba(7,17,27,0.1)
        @media only screen and (max-width 360px)
          flex 0 0 110px
          width 110px
        .core-text
          font-size 24px
          color rgb(255,153,0)
          line-height 28px
        .core-name
          font-size 12px
          color rgb(7,17,27)
          line-height 12px
          margin-top 6px
        .core-des
          font-size 10px
          color rgba(7,17,27,0.2)
          line-height 10px
          margin-top 8px
      .rating-right
        flex 1
        padding 0px 0 6px 24px
        @media only screen and (max-width 360px)
          padding-left 6px
        .star-des
          line-height 18px
          .title
            font-size 12px
            color  rgb(7,17,27)
            line-height 18px
            display: inline-block
          .icon
            display inline-block
            margin-left 8px
            margin-top 8px
            line-height 18px
          .score
            display inline-block
            font-size 12px
            margin-left 8px
            color rgb(255,163,0)
            line-height 18px
        .delivery-des
          margin-top 8px
          .title
            font-size 12px
            color  rgb(7,17,27)
            line-height 18px
            display: inline-block
          .delivery-time
            font-size 12px
            color rgb(147,153,159)
            line-height 18px
            margin-left 12px
    .rating-wrapper
      .rating-item
        position relative
        margin 0 18px
        padding 18px 0
        display flex
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex 0 0 28px
          vertical-align top
          img
            border-radius 50%
        .rating-content
          flex 1
          margin-left 12px
          .name
            font-size 10px
            color rgb(7,17,27)
            line-height 12px
          .star-wrapper
            margin-top 4px
            .icon
              display inline-block
            .delivery-time
              display inline-block
              font-size 10px
              font-weight 200
              color rgb(147,153,159)
              line-height 12px
              text-align center
              margin-left 6px
          .text
            font-size 12px
            color rgb(7,17,27)
            line-height 18px
            margin-top 6px
          .recommend-wrapper
            display flex
            flex-wrap wrap
            .fa-thumbs-up, .fa-thumbs-down
             display 0,0,10px
             font-size 12px
             line-height 24px
             margin-right 4px
            .fa-thumbs-up
              color rgb(0,160,220)
            .fa-thumbs-down
              color rgb(147,153,159)
            .recommend
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 2px
              background-color rgb(255,255,255)
              font-size 9px
              color rgb(147,153,159)
              line-height 16px
              padding 2px 6px
              margin-left 8px
              margin-top 4px
              display inline-block
        .time
          position absolute
          right 18px
          top 18px
          font-size 10px
          font-weight 200
          color rgb(147,153,159)
          line-height 12px

</style>
