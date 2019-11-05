<template>
  <div class="goods">
    <div class="goods-menu-wapper">
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
    <div class="goods-list-wapper">
    </div>
  </div>
</template>

<script>
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
      }
    }, reponse => {

    })
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../commom/stylus/mixin'
.goods
  display: flex
  position: absolute
  width: 100%
  // margin-top: 174px
  margin-bottom: 47px
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
      padding 0 12px 0 12px
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
        font-weight 200
        border-1px: rgba(7, 17, 27, 0.1)
  .goods-list-wapper
    flex 1
    display: inline-block
    background-color: rgb(255, 255, 255)
</style>
