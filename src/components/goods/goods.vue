<template>
  <div class="goods">
    <div class="goods-menu-wapper"
         ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods"
            class="menu-item" :class="{'current' : currentIndex===index}" @click="selectMenu(index,$event)"
            :key="index">
          <span class="text border-1px">
            <span v-show="item.type>0"
                  class="icon"
                  :class="classMap[item.type]">
            </span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-list-wapper"
         ref="goodsWrapper">
      <ul>
        <li v-for="item in goods"
            class="food-list food-list-hook"
            :key="item.id" >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods"
                class="food-item"
                :key="food.id" @click="clickSelectedFood(food,$event)">
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
                <div class="cartcontrol-wrapper">
                  <!-- 在父组件监听到子组件触发的cart-add事件 -->
                  <cartcontrol :food="food" @cart-add="cartAdd"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice">
    </shopcart>
    <foodDetail ref="foodDetail" :food="selectedFood" @cart-add="cartAdd"></foodDetail>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { prototype } from 'events';
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import foodDetail from '../food/foodDetail'
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
      goods: [],
      listHeight: [], // 存储区块的高度
      scrollY: 0,
      selectedFood: {}
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then(response => {
      response = response.body;
      // console.log('请求结果response=' + response)
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        // console.log('请求结果goods=' + this.goods)
        // 初始化betterScroll的时候，DOM的更新是异步的,所以我们在这虽然改变了数据，
        // 但是DOM并没有变化，计算不到正确的高度,nextTick在DOM更新后执行
        this.$nextTick(() => {
          // 调用scroll函数，实现滚动
          this._instBScroll()
          // 拿到数据以后计算高度
          this._calculateHeight();
        })
      }
    }, reponse => {

    })
  },
  methods: {
    _instBScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
      click: true
      })
      this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
      click: true,
      // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
      // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
      // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
      probeType: 3
      })
      // scroll 参数：{Object} {x, y} 滚动的实时坐标
      // 触发时机：滚动过程中，具体时机取决于选项中的 probeType
      this.goodsScroll.on('scroll', (pos) => {
      this.scrollY = Math.abs(Math.round(pos.y))
          // console.log('scrollY', this.scrollY)
      })
    },
    _calculateHeight() {
      // food-list-hook类的添加只是为了能拿到food列表,例如，拿到的是多个类似整个粥品的区块
      let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height) // listHeight是一个递增的区间数组，是每个专区高度的累加
      for (let i = 0; i < foodList.length; i++) {
      let item = foodList[i]
      height += item.clientHeight
      this.listHeight.push(height)
      // console.log('heigt', height)
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) { // 浏览器直接返回，去掉自带点击事件，浏览器上会触发两次事件
          return
      }
      let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook')
      let ref = foodList[index] // 取到index对应的DOM
      this.goodsScroll.scrollToElement(ref, 300) // 滚动DOM所在位置
    },
    cartAdd(target) { // 点击+添加按钮 触发事件
    console.log('ppppppp')
      this._drop(target)
    },
    _drop(target) {
      // 优化体验
      this.$nextTick(() => {
        // 通过$ref访问shopcart子组件的drop方法
        this.$refs.shopcart.drop(target)
      })
    },
    clickSelectedFood(food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      // 调用子组件foodDetail中的show方法 进行显示
      this.$refs.foodDetail.show()
    }
  },
  computed: {
    currentIndex() { // currentIndex对应菜单栏的下标
      for (let i = 0; i < this.listHeight.length; i++) { // 不要忘了加this引用
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        // 获得了一个区间的上下范围，判断scrollY落到这个区间，!height2是判断最后一个区间
        // 避免i溢出，>= 向下的是一个闭区间，这样第一个就会高亮了
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // console.log('i', i)
          return i; // 映射到第i行menu的变化
        }
      }
      return 0;
    },
    selectFoods() { // 选中的商品
      let foods = []
      this.goods.forEach((good) => { // 分类
        good.foods.forEach((food) => { // 每个分类的food
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods // 传给shopcart
    }
  },
  components: {
    shopcart,
    cartcontrol,
    foodDetail
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
      &.current
        position relative
        margin-top -1px
        background #fff
        font-weight 700
        z-index 10
       .text
         border-none()
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
         font-size: 14px
         color: rgb(7, 17, 27)
         line-height: 14px
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
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 24px
</style>
