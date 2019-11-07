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
				<div class="desc">另需配送费￥{{0}}元</div>
			</div>
			<div class="content-right"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'shopcart',
	data() { 
		return {

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
					line-height 48px
					padding-right 12px
					block-size border-box
					font-size 16px
					color rgb(255,255,255,0.4)
					font-weight 700px
					border-right 1px solide rgba(255,255,255,0.1)
				.desc
					display inline-block
					font-size 10px
					color rgb(255,255,255,0.4)
					font-weight 700px
					line-height 24px
					vertical-align top
					margin 12px 0 12px 0
			.content-right
				flex 0 0 105px
				width 105px

</style>
