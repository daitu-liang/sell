<template>
	<div class="shopcart">
		<div class="content">
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
		</div>
	</div>
</template>

<script>
export default {
	name: 'shopcart',
	data() { 
		return {
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
					price: 10,
					count: 3
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
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
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
</style>
