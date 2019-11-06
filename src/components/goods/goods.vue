<template>
  <div class="goods">
    <div class="goods-menu-wapper"
         ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods"
            class="menu-item"
            :key="index">
          <span class="text border-1px">
            <span v-show="item.type>0"
                  class="icon"
                  :class="classMap[item.type]">
            </span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-list-wapper"
         ref="goodsWrapper">
      <ul>
        <li v-for="item in goods"
            class="food-list"
            :key="item.id">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods"
                class="food-item"
                :key="food.id">
              <div class="icon">
                <img width="57"
                     height="57"
                     :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}</span>
                  <span class="good-appraise">好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now-price">￥{{food.price}}</span>
                  <span class="old-price"
                        v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { prototype } from 'events';
const ERR_OK = 0;
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
    goods: []
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then(response => {
      response = response.body;
      console.log('请求结果response=' + response)
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        console.log('请求结果=' + this.seller)
        // 初始化betterScroll的时候，DOM的更新是异步的,所以我们在这虽然改变了数据，
        // 但是DOM并没有变化，计算不到正确的高度
        this.$nextTick(() => {
          // 调用scroll函数，实现滚动
          this._instBScroll()
          // 拿到数据以后计算高度
          // this._calculateHeight();
        })
      }
    }, reponse => {

    })
  },
  methods: {
    _instBScroll() {
    this.menuScroll = new BScroll(this.$refs.menuWrapper, {
      clik: true
    })
    this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
      clik: true,
      prototype: 3
    })
    this.goodsScroll.on('scroll', (pos) => {
    this.scrollY = Math.abs(Math.round(pos.y))
    })
  }
 }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../commom/stylus/mixin'
.goods
  display: flex
  position: absolute
  width: 100%
  top: 174px
  bottom: 47px
  display: flex
  overflow: hidden
  .goods-menu-wapper
    flex: 0 0 80px
    width: 80px
    background-color: rgba(7, 17, 27, 0.1)
    .menu-item
      height: 54px
      width: 56px
      line-height: 14px
      display: table
      padding: 0 12px 0 12px
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        background-size: 12px 12px
        background-repeat: no-repeat
        margin-right: 4px
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        font-size: 12px
        font-weight: 200
        border-1px: rgba(7, 17, 27, 0.1)
  .goods-list-wapper
    flex: 1
    background: #ffffff
  .title
    padding-left: 14px
    height: 26px
    line-height: 26px
    border: left 2px solide #f3f5f7
    font-size: 12px
    color: rgb(147, 153, 159)
    background-color: #d9dde1
  .food-item
    display: flex
    padding: 18px
    border-1px(rgba(7, 17, 27, 0.1))
  &:last-child
    border-none()
    margin-bottom: 0px
    .icon
      flex: 0 0 57px
      margin-right: 10px
      vertical-align: top
    .content
      flex: 1
      .name
        font-size: 17px
        color: rgb(7, 17, 27)
        line-height: 28px
        margin: 0px
      .desc, .extra
        font-size: 10px
        line-height: 12px
        color: rgb(147, 153, 159)
      .desc
        margin: 8px 0 8px 0
      .extra
        line-height: 10px
        .good-appraise
          margin-left: 10px
      .price
        line-height: 24px
        font-weight: 700
        .now-price
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old-price
          text-decoration: line-through // 划屌的横线
          color: rgb(147, 153, 159)
          font-size: 10px
</style>
