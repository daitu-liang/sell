<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight' : totalPrice > 0}">
						<i class="fa fa-cart-plus" aria-hidden="true" :class="{'highlight' : totalPrice > 0}"></i>
					</div>
					<div class="num" v-show="totalCount > 0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight' : totalPrice > 0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">{{payDesc}}</div>
			</div>
			<div class="ball-container">
				<div v-for="(ball,index) in balls" :key="index">
					<transition
					@before-enter="handleBeforeEnter"
					@enter="handleEnter"
					@after-enter="handleAfterEnter"
					name="drop">
					<div class="ball" v-show="ball.show"> <!--外层盒子-->
						<div class="inner inner-hook"></div> <!--内层盒子-->
					</div>
					</transition>
				</div>
			</div>
			<transition name="fade">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="listContent">
						<ul>
							<li class="food" v-for="food in selectFoods" :key="food.id">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span> ￥{{food.price*food.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll';
export default {
	name: 'shopcart',
	data() { 
		return {
			// 维护当前小球的状态，初始化都是隐藏
			// 小球的数量 是指在一瞬间点多次+，同时出现多少小球飞
			balls: [
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				}
			],
			dropBalls: [], // 存已经下落的小球
			fold: true // 购物车详情列表默认折叠不显示
		}
	},
	props: {
		deliveryPrice: {
			type: Number,
			default: 0
		},
		minPrice: {
			type: Number,
			default: 0
		},
		selectFoods: {
			type: Array,
			default() {
				return [{

				}]
			}
			}
	},
	computed: {
		totalPrice() {
			let total = 0
			this.selectFoods.forEach((food) => {
				total += food.price * food.count
			})
			return total;
		},
		totalCount() {
			let count = 0
			this.selectFoods.forEach((food) => {
				count += food.count
			})
			return count
		},
		payDesc() {
			if (this.totalPrice === 0) {
				return `￥${this.minPrice}元起送`
			} else if (this.totalPrice < this.minPrice) {
				let diff = this.minPrice - this.totalPrice
				return `还差￥${diff}元起送`
			} else {
				return '去结算'
			}
		},
		payClass() {
			if (this.totalPrice < this.minPrice) {
				return 'no-enough'
			} else {
				return 'enough'
			}
		}
	},
	methods: {
		// 当触发drop方法时小球开始掉落
		drop(el) {
			console.log(this.dropBalls)
			for (let i = 0; i < this.balls.length; i++) {
				let ball = this.balls[i]
				if (!ball.show) { // 当小球显示状态为隐藏时
						ball.show = true
						ball.el = el // 将cartControl传过来的对象挂载到ball的el属性上
						this.dropBalls.push(ball)
						return
				}
			}
		},
		// beforeEnter在动画运行之前把小球移到到 ‘+’ 号位置，
		// 从左下角移动到右上，所以x是正数，y是负数
		handleBeforeEnter: function(el) {
				let count = this.balls.length
				while (count--) {
					let ball = this.balls[count]
					if (ball.show) {
							//  getBoundingClientRect()获取小球相对于视窗的位置，屏幕左上角坐标为0，0
							let rect = ball.el.getBoundingClientRect() 
							// 小球x方向位移= 小球距离屏幕左侧的距离-外层盒子距离水平的距离
							let x = rect.left - 32
								// 负数，因为是从左上角向下
							let y = -(window.innerHeight - rect.top - 22)
							el.style.display = ''
							el.style.webkitTransform = `translate3d(0,${y}px,0)`
							el.style.transform = `translate3d(0,${y}px,0)`
							// 获取内层盒子
							let inner = el.getElementsByClassName('inner-hook')[0]
							// 设置内层盒子，即小球水平方向的距离
							inner.style.webkitTransform = `translate3d(${x}px,0,0)` 
							inner.style.transform = `translate3d(${x}px,0,0)`
					}
				}
		},
			// enter
		handleEnter: function(el, done) {
				/* eslint-disable no-unused-vars */
				// 触发浏览器重绘
				let rf = el.offsetHeight
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0, 0, 0)'
					el.style.transform = 'translate3d(0, 0, 0)'
					let inner = el.getElementsByClassName('inner-hook')[0]
					inner.style.webkitTransform = 'translate3d(0, 0, 0)'
					inner.style.transform = 'translate3d(0, 0, 0)'
					// Vue为了知道过渡的完成，必须设置相应的事件监听器。
					// 如果没有这一句那将不会执行handleAfterEnter
					el.addEventListener('transitionend', done) 
				})
		},
		// AfterEnter
		handleAfterEnter: function(el) {
				// 完成一次动画就删除一个dropBalls的小球
				let ball = this.dropBalls.shift()
				if (ball) {
					ball.show = false
					// 如果没有这一句，小球到达终点后过一小段时间后才消失
					// 具体原因也是搞不清楚，上面也已经false掉了
					el.style.display = 'none'
				}
		},
		listShow() {
			if (!this.totalCount) {
				this.fold = true
				return false
			}
			// fold=true show=false不显示
			let show = !this.fold
			if (show) {
				this.$nextTick(() => {
					if (!this.scroll) {
							this.scroll = new BScroll(this.$$refs.listContent, {
							click: true
						})
					} else {
						this.scroll.refresh()
					}
				})
			}
			return show
		},
		toggleList() {
			if (!this.totalCount) {
				return
			}
			this.fold = !this.fold
		},
		empty() {
			this.selectFoods.forEach((food) => {
				food.count = 0
			})
		}
	},
	components: {
		cartcontrol
	}

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../commom/stylus/mixin'
	.shopcart
		position fixed
		left 0px
		bottom 0px
		z-index 20
		width 100%
		height 48px
		.content
			display flex
			background-color #141d27
			color rgba(255,255,255,0.4)
			.content-left
				flex 1
				.logo-wrapper
					display inline-block
					position relative
					top -10px
					margin 0 12px
					padding 6px
					height 46px
					width 46px
					border-radius 50%
					background-color #141d27
					vertical-align top
					.logo
						width 100%
						height 100%
						border-radius 50%
						background-color #2b343c
						text-align center
						&.highlight
							background rgb(0,160,220)
						.fa-cart-plus
							line-height 44px
							font-size 24px
							color #80858a
							&.highlight
								color #ffffff
					.num
						position absolute
						top 0
						right 0px
						font-size 9px
						font-weight 700
						color rgb(255,255,255)
						line-height 16px
						width 24px
						height 16px
						background-color rgb(240,20,20)
						box-shadow 0px 4px 8px 0px rgba(0,0,0,0.4)
						text-align center
						border-radius 16px
				.price
					display inline-block
					vertical-align top
					line-height 24px
					padding-right 12px
					block-size border-box
					font-size 16px
					font-weight 700
					border-right 1px solid rgba(255,255,255,0.1)
					margin 12px 0px
					&.highlight
						color #ffffff
				.desc
					display inline-block
					font-size 10px
					font-weight 700px
					line-height 24px
					vertical-align top
					margin 12px 0 12px 0
					margin-left 10px
			.content-right
				flex 0 0 105px
				width 105px
				.pay
					height 48px
					font-size 12px
					line-height 48px
					font-weight 700
					text-align center
					&.no-enough
						background #2b333b
					&.enough
						background #00b43c
						color #ffffff
			.ball-container
				.ball
					position fixed
					left 32px
					bottom 22px
					z-index 180
					transition all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41)
					.inner
							width 16px
							height 16px
							border-radius 50%
							background rgb(0,160,220)
							transition all 0.6s linear
			.shopcart-list
				position absolute
				top 0
				left 0
				z-index -1
				width 100%
				transform translate3d(0,-100%,0) // 整个列表相对当前自身高度做个Y偏移
				&.fade-enter-active, &.fade-leave-active
					transition all 0.5s linear
					transform translate3d(0,-100%,0)
				&.fade-enter, &.fade-leave-to
					transform translate3d(0,0,0)
				.list-header
						height 40px
						line-height 40px
						padding 0px 18px
						background #f3f5f7
						border-bottom 1px solid rgba(7,17,27,0.1)
						.title
							float left
							font-size 14px
							color rgb(7,17,27)
						.empty
							float right
							color rgb(0,160,220)
							font-size 12px
					.list-content
						padding 0px 18px
						max-height 217px
						overflow hidden
						background #ffffff
						.food
							position relative
							padding 12px 0px
							box-sizing border-box
							border-1px(rgba(7,17,27,0.1))
							.name
								line-height 24px
								font-size 14px
								color rgb(7,17,27)
							.price
								position absolute
								right 90px
								bottom 12px
								line-height 24px
								font-size 14px
								font-weight 700
								color rgb(240,20,20)
							.cartcontrol
								position absolute
								right 0
								bottom 6px

</style>
