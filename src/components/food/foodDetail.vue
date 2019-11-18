<template>
	<transition name="fade">
		<div class="food" v-show="showFlag">
			<div class="food-content">
			<div class="image-header">
				<!-- <img src="food.image"> -->
				<div class="back">
					<i class="fa fa-arrow-left" aria-hidden="true" @click="back()"></i>
				</div>
			</div>
			<div class="content">
			</div>
			</div>
		</div>
	</transition>
</template>

<script>
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
		console.log('food=' + this.food)
	},
	methods: {
		show() {
			this.showFlag = true
		},
		back() {
			this.showFlag = false
		}
	}
 }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.food
		position fixed
		top 0
		left 0
		width 100%
		height 100%
		background blue
		z-index 15
		&.fade-enter-active, &.fade-leave-active
			transition all 0.3s linear
			transform translate3d(0,0,0,)
		&.fade-enter, &.fade-leave-to
			transform translate3d(100%,0,0)
			.image-header
				position relative
				width 100%
				padding-top 100%
				height 0
				.img
					position absolute
					top 0
					left 0
					width 100%
					height 100%
				.back
					position absolute
					left 10px
					top 10px
					padding 8px
</style>
