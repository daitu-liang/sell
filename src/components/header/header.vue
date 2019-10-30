<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img
                    width="64"
                    height="64"
                    :src="seller.avatar"
                >
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送到
                </div>
                <div
                    v-if="seller.supports"
                    class="support"
                >
                    <span
                        class="icon"
                        :class="classMap[seller.supports[0].type]"
                    ></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div
                v-if="seller.supports"
                class="support-count"
                @click="showDetail"
            >
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div
            class="bulletin-wrapper"
            @click="showDetail"
        >
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img
                :src="seller.avatar"
                width="100%"
                height="100%"
            >
        </div>
        <div
            v-show="detailShow"
            class="detail"
        >
            <div
                class="detail-wrappper"
                clearfix
            >
                <div class="detail-main">
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>

                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>

                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>

                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                    <p> dfdfd快乐放假了快速度发来 了；接口；连接；了解了；讲两句；连接fdfsdfd</p>
                </div>
                <div
                    class="detail-close"
                    @click="hideDetail"
                >
                    <i class="icon-close"></i>
                </div>

            </div>
        </div>
    </div>
</template>
<script>export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detailShow: false
        }
    },
    methods: {
        showDetail: function () {
            this.detailShow = true
        },
        hideDetail: function () {
            this.detailShow = false
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../commom/stylus/mixin'
@import '../../commom/stylus/icon'
@import '../../commom/stylus/base'
.header
    position: relative
    color: rgb(255, 255, 255)
    overflow: hidden
    background-color: rgba(7, 17, 27, 0.5)
    .content-wrapper
        position: relative
        padding: 24px 12px 18px 24px
        display: flex
        .avatar
            display: inline-block
            img
                border-radius: 2px
        .content
            display: inline-block
            margin-left: 16px
            .title
                margin: 2px 0 8px 0
                .brand
                    display: inline-block
                    width: 30px
                    height: 18px
                    bg-image('brand')
                    background-size: 30px 18px
                    background-repeat: no-repeat
                    vertical-align: top
                .name
                    display: inline-block
                    margin-left: 6px
                    font-size: 16px
                    line-height: 18px
                    font-weight: bold
            .description
                font-size: 12px
                line-height: 12px
                margin-bottom: 10px
            .support
                display: flex
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 4px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_1')
                    &.discount
                        bg-image('discount_1')
                    &.guarantee
                        bg-image('guarantee_1')
                    &.invoice
                        bg-image('invoice_1')
                    &.special
                        bg-image('special_1')
                .text
                    display: inline-block
                    line-height: 12px
                    font-size: 10px
        .support-count
            position: absolute
            right: 12px
            bottom: 14px
            padding: 0 8px
            height: 24px
            line-height: 24px
            border-radius: 14px
            background-color: rgba(0, 0, 0, 0.2)
            text-align: center
            .count
                font-size: 10px
                vertical-align: top
            .icon-keyboard_arrow_right
                font-size: 10px
                margin-left: 2px
                line-height: 24px
    .bulletin-wrapper
        position: relative
        height: 28px
        background-color: rgba(7, 17, 27, 0.2)
        line-height: 28px
        padding: 0 22px 0 12px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        .bulletin-title
            display: inline-block
            width: 22px
            height: 12px
            vertical-align: top
            margin-top: 8px
            bg-image('bulletin')
            background-size: 22px 12px
        .bulletin-text
            font-size: 10px
            vertical-align: top
            margin-left: 4px
        .icon-keyboard_arrow_right
            position: absolute
            top: 0
            right: 12px
            font-size: 10px
            line-height: 28px
    .background
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: -1
        filter: blur(10px)
    .detail
        position: fixed
        overflow: auto
        top: 0
        left: 0
        z-index: 100
        width: 100%
        height: 100%
        background-color: rgba(7, 17, 27, 0.8)
        filter: blur(10px)
        .detail-wrappper
            width: 100%
            min-height: 100%
            .detail-main
                margin-top: 64px
                padding-bottom: 64px
        .detail-close
            position: relative
            width: 32px
            height: 32px
            margin: -64px auto 0 auto
            clear: both
            font-size: 32px
</style>
