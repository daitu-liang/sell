<template>
  <div class="app">
    <div class="logn">登录界面</div>
    <button @click="login">点击登录</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() { 
    return {

    }
  },
  methods: {
    login () {
      window.api.userInfo.login({
        'userName': 'cheng',
        'password': 'c12345678',
        'deviceType': '1',
        'deviceNo': '5555'
      }).then(res => {
        console.log('login', res)
      })
    }
  }

 }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .app{

  }
</style>
