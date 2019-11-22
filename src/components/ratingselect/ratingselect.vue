<template>
	<div class="ratingselect">
		<div class="rating-type" border-1px>
			<span class="block positive" :class="{'active': mSelectType ==2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span  class="block positive" :class="{'active': mSelectType ==0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span  class="block negative" :class="{'active': mSelectType ==1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div class="swtich" :class="{'on': mOnlyContent}" @click="checkContent($event)">
			<i class="fa fa-check-circle" aria-hidden="true"></i>
			<span class="text">只看有内容的评价</span>
		</div>
		<div class="rating-wrapper">
			<ul v-show="ratings&&ratings.length">
				<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" :key="rating.id" class="rating-item border-1px">
					<div class="user">
						<span class="name">{{rating.username}}</span>
						<span class="avatar">{{rating.avatar}}</span>
					</div>
					<div class="time">{{rating.time}}</div>
					<p class="text">
						<span class="{'fa fa-thumbs-up':rating.rateType === 0,'fa fa-thumbs-down':rating.rateType === 1}">{{rating.text}}</span>
					</p>
				</li>
			</ul>
			<div class="no-ratings-data" v-show="!ratings||!ratings.length">暂无评价</div>
		</div>
	</div>
</template>

<script>

	const POSITIVE = 0
	const NEGATIVE = 1
	const ALL = 2
export default {
	name: '',
	data() { 
		return {
			mSelectType: this.selectType,
			mOnlyContent: this.onlyContent
		}
	},
	props: {
		ratings: {
			type: Array,
			default() {
				return []
			}
		},
		selectType: {
			type: Number,
			default: ALL
		},
		onlyContent: {
			type: Boolean,
			default: false
		},
		desc: {
			type: Object,
			default() {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			}
		}
	},
	methods: {
		select(type, event) {
			if (!event._constructed) {
				return
			}
			this.mSelectType = type
			console.log('selectType=' + this.mSelectType);
			this.$emit('ratingtype.select', this.mSelectType)
		},
		checkContent(event) {
			if (!event._constructed) {
				return
			}
			this.mOnlyContent = !this.mOnlyContent
			console.log('checkContent=' + this.mOnlyContent);
			this.$emit('checkContent', this.mOnlyContent)
		},
		needShow(type, text) {
			console.log('this.selectType= ' + this.selectType + '  type= ' + type + ' text=' + text)
			if (this.onlyContent && !text) {
				return false
			}
			if (this.selectType === ALL) {
				return true
			} else {
				return type === this.selectType
			}
		}
	},
	computed: {
		positives() {
			return this.ratings.filter((rating) => {
				return rating.rateType === POSITIVE
			})
		},
		negatives() {
			return this.ratings.filter((rating) => {
				return rating.rateType === NEGATIVE
			})
		}
	}
 }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import '../../commom/stylus/mixin'
	.ratingselect
		padding-bottom 50px
		.rating-type
			padding 18px 0px
			margin 0 18px
			border-1px(rgba(7,17,27,0.1))
			.block
				display inline-block
				padding 8px 12px
				margin-right 8px
				border-radius 2px
				color rgb(77,85,93)
				line-height 16px
				&.active
					color #ffffff
				&.count
					margin-left 2px
					font-size 8px
				&.positive
					background  rgba(0,160,220,0.2)
					&.active
						background rgb(0,160,220)
				&.negative
					background rgba(77,85,93,0.2)
					&.active
						background rgb(77,85,93)
		.swtich
			padding 12px 18px
			line-height 24px
			border-bottom 1px solid rgba(7,17,27,0.1)
			color rgb(147,153,159)
			&.on
				.fa-check-circle
					color #00c850
			.fa-check-circle
				display inline-block
				vertical-align top
				margin-right 4px
				font-size 24px
			.text
				font-size 12px
				color rgb(147,153,159)
				line-height 24px
		.rating-wrapper
			padding 0px 18px
			.rating-item
				position relative
				padding 16px 0
				border-1px(rgb(7,17,27,0.1))
				.user
					position absolute
					right 0px
					top 16px
					line-height 12px
					.username
						display inline-block
						font-size 10px
						color rgb(147,153,159)
						vertical-align top
						margin-right 6px
					.avatar
						border-radius 50%
				.time
					font-size 10px
					color rgb(147,153,159)
					line-height 12px
				.text
					margin-top 6px
					font-size 12px
					color rgb(7,17,27)
					line-height 12px
					// &.fa-thumbs-up, &.fa-thumbs-down
					// 	font-size 12px
					// 	line-height 24px
					// 	.fa-thumbs-up
					// 		color rgb(0,160.220)
					// 	.fa-thumbs-down
					// 		color rgb(147,153,159)
</style>
