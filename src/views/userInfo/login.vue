<template>
  <div id="appLoggin">
    <div class="logn">登录界面</div>
    <button @click="toLogin">点击登录</button>
    <p>{{loginDes}}</p>
  </div>

</template>

<script>
import apiMixins from '../../commom/network/api/userInfo'
export default {
  mixins: [apiMixins],
  name: 'loginIndex',
  data() { 
    return {
      loginDes: '888'
    }
  },
  methods: {
    toLogin () {
       this.$router.push({
          path: '/home'
        })
      // this.login({
      //   'userName': 'cheng',
      //   'password': 'c12345678',
      //   'deviceType': '1',
      //   'deviceNo': '5555'
      // }).then(res => {
      //   this.loginDes = window.qs.stringify(res)
      //   console.log('login', res)
      //   LocalForage.setItem('id', res.id)
      //   LocalForage.setItem('fullName', res.fullName)
      //   LocalForage.setItem('token', res.token)
       
      // })
    }
  }

 }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #appLoggin{

  }
</style>
