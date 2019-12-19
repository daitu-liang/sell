<template>
  <div class="list">
    <div class="list-content">{{listType}}</div>
    <p>刷新次数: {{ count }}</p>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <van-cell
        v-for="item in list"
        :key="item"
        :title="item"
      />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { List, Cell, PullRefresh } from 'vant'

export default {
  name: 'list',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh 
  },
  data() { 
    return {
    listType: '默认值',
    list: [],
    loading: false,
    finished: false,
    count: 0,
    isLoading: false
    }
  },
  created() {
    // route是一个跳转的路由对象，每一个路由都会有一个route对象，
    // 是一个局部的对象，可以获取对应的name,path,params,query等
    // route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等
   this.listType = this.$route.params.listType
   console.log('----', this.$route.query)
  //  this.listType = this.$route.query.listType
  //  this.listType = this.$route.params.id
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 15; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false
        console.log('onload------>>' + this.list.length)
        if (this.list.length >= 60) {
          this.finished = true
        }
      }, 3000)
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 2000);
    }
  }
 }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .list{

  }
</style>
