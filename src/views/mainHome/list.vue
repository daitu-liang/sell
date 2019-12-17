<template>
  <div class="list">
    <div class="list-content">{{listType}}</div>
  </div>
</template>

<script>
export default {
  name: 'list',
  // listType: this.$route.params.listType,
  data() { 
    return {
    listType: '545'
    }
  },
  created() {
   this.listType = this.$router.params.listType
  }
 }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .list{

  }
</style>
