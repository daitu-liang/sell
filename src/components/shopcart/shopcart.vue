<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo">
						<i class="fa fa-cart-plus" aria-hidden="true"></i>
					</div>
				</div>
				<div class="price">￥{{10}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay">￥{{minPrice}}起送</div>
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
						.fa-cart-plus
							line-height 44px
							font-size 24px
							color #80858a
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
					background #2b333b
</style>
