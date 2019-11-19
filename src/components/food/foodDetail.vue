<template>
	<transition name="fade">
		<div class="foodDetail" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" >
					<div class="back" @click="back()">
						<i class="fa fa-arrow-left" aria-hidden="true"></i>
					</div>
				</div>
				<div class="content">
					<h2 class="name">{{food.name}}</h2>
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
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<transition name="fade">
						<div class="addShopCart" v-show="!food.count||food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
			</div>
		</div>
	</transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import Vue from 'vue'
export default {
	name: 'food',
	data() { 
		return {
			showFlag: false
		}
	},
	props: {
		food: {
			type: Object
		}
	},
	created() {
		console.log('showFlag', this.showFlag)
	},
	components: {
		cartcontrol,
		split
	},
	methods: {
		show() {
			this.showFlag = true

			this.$nextTick(() => {
				if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
						click: true
					})
				} else {
					this.scroll.refresh()
				}
			})
		},
		back() {
			this.showFlag = false
		},
		addFirst(event) {
			if (!event._constructed) {
				return
			}
			// 首次添加，因为el消失，找不到小球发出的位置，可以通过动画渐变，避免display：none
			this.$emit('cart-add', event.target)
			Vue.set(this.food, 'count', 1)
		}
	}
 }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.foodDetail
		position fixed
		top 0
		left 0
		width 100%
		height 100%
		z-index 15
		margin-bottom 48px
		background #ffffff
		&.fade-enter-active, &.fade-leave-active //&前没空格切记
			transition all 0.3s linear
			transform translate3d(0,0,0,)
		&.fade-enter, &.fade-leave-to
			transform translate3d(100%,0,0)
		.image-header
			position relative
			width 100%
			height 0
			padding-top 80%
			background red
			img // 标签直接使用标签名  而非.标签名 
				position absolute
				top 0
				left 0
				width 100%
				height 100%
			.back
				position absolute
				left 6px
				top 6px
				padding 8px
				color #ffffff
		.content
			position relative
			padding 18px
			.name
				font-size: 14px
				color: rgb(7, 17, 27)
				line-height: 14px
				font-weight 700
				margin: 0px
			.desc, .extra
				font-size: 10px
				line-height: 12px
				color: rgb(147, 153, 159)
				margin-top 8px
			.desc
				margin: 8px 0 8px 0
			.extra
				line-height: 10px
				.good-appraise
					margin-left: 10px
			.price
				line-height: 24px
				font-weight: 700
				margin-top 18px
				.now-price
					margin-right: 12px
					font-size: 14px
					color: rgb(240, 20, 20)
				.old-price
					text-decoration: line-through // 划屌的横线
					color: rgb(147, 153, 159)
					font-size: 10px
			.cartcontrol-wrapper
				position absolute
				right 12px
				bottom 12px
			.addShopCart
				position absolute
				right 12px
				bottom 12px
				font-size 10px
				color rgb(255,255,255)
				line-height 24px
				background rgb(0,160,220)
				height 24px
				text-align center
				padding 4px 12px
				border-radius 24px
				z-index 10
				&.fade-enter-active, &.fade-leave-active
					transition all 0.3s linear 
					opacity 1
				&.fade-enter, &.fade-leave-to
					opacity 0
		.info
			padding 18px
			.title
				font-size 14px
				font-weight 400
				line-height 14px
				margin-bottom 6px
				color rgb(7,17,27)
			.text
				font-size 12px
				font-weight 200
				line-height 24px
				margin-bottom 6px
				color rgb(77,85,93)
</style>
