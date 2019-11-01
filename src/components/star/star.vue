<template>
    <div class="star">
        <div class="star-item" :class="starType">
            <span v-for="itemClass in itemClasses" :key=itemClass.id  :class="itemClass" class="star-item"></span>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        },
	},
	computed: {
		starType() {
			return 'star-'+this.size
		},
		 
	},
    name: 'star',
    data() {
        return {

        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.star
 font-size 0px
  .star-item
	  display inline-block
	  background-repeat no-repeat
	  &.star-48
		  .star-item
		   width 20px
		   height 20px
		   margin-right 22px
		   background-size 20px 20px
		   &:last-child
			   margin-right 0
		   &.on
			   bg-image('star48_on')
		   &.half
			   bg-image('star48_half')
		   &.on
			   bg-image('star48_on')
	  &.star-36
		  .star-item
		   width 30px
		   height 30px
		   margin-right 22px
		   background-size 30px 30px
		   &:last-child
			   margin-right 0
		   &.on
			   bg-image('star36_on')
		   &.half
			   bg-image('star36_half')
		   &.on
			   bg-image('star36_on')
	  &.star-24
		  .star-item
		   width 40px
		   height 40px
		   margin-right 22px
		   background-size 40px 40px
		   &:last-child
			   margin-right 0
		   &.on
			   bg-image('star24_on')
		   &.half
			   bg-image('star24_half')
		   &.on
			   bg-image('star24_on')
</style>