<template>
	<div class="cartcontrol">
		<transition name="fade">
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="cartDescrease">
					<i class="fa fa-minus-circle" aria-hidden="true"></i>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div @click.stop.prevent="addCart" class="cart-add">
			<i class="fa fa-plus-circle" aria-hidden="true"></i>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
	name: 'cartcontrol',
	data() { 
		return {

		}
	},
	props: {
		food: {
			type: Object
		}
	},
	created() {
		// console.log(this.food)
	},
	methods: {
		addCart(event) {
			if (!event._constructed) {
				return
			}
			if (!this.food.count) {
				// food.count 在原json中不存在的属性，所以不能直接添加，通过set添加对象属性
				Vue.set(this.food, 'count', 1)
			} else {
				this.food.count++
			}
			// 添加商品，触发一个事件，把当前DOM传递给goods.vue
			// 向父组件触发一个自定义的cart-add事件，并将事件对象传递给父组件
			console.log('addCart-触发一个自定义的cart-add事件' + event.target)
			this.$emit('cart-add', event.target)
		},
		cartDescrease(event) {
			if (!event._constructed) {
				return
			}
			if (this.food.count) {
				this.food.count--
		}
	}
 }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.cartcontrol
		.cart-decrease, .cart-add
			display inline-block
			padding 6px
			color rgb(0,160,220)
			font-size 24px
			line-height 24px
			&.fade-enter-active, &.fade-leave-active // 进入动画的状态/离开动画的状态
				transition all 0.4s linear // all 0 ease 0 --all=所有属性 0=持续 ease=动画类型  0=延迟多久出现动画
				opacity 1 // 透明度
				transform translate3d(0,0,0) rotate(0) // 动画方法很多  平移 缩放 旋转(3D可开启硬件加速）
			&.fade-enter, &.fade-leave-to  /* .fade-leave-active below version 2.1.8 */ 
				opacity 0
				transform translate3d(24px,0,0) rotate(180deg)
		.cart-count
			display inline-block
			color rgb(147,153,159)
			font-size 16px
			line-height 24px
			padding-top 8px
			min-width 16px
			vertical-align top
</style>
