<template>
  <div id="appLoggin">
    <div class="login-content">
      <h1 class="login-title">登录界面</h1>
      <van-cell-group>
        <van-field v-model="username"
          required
          clearable
          label="用户名"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          right-icon="question-o"
          @click-right-icon="$toast('请输入6-12位包含字母数字的密码')"
          required
        />
      </van-cell-group>
      <van-button color="#7232dd" @click="toLogin" class="login-btn">点击登录</van-button>
    </div>
  </div>
</template>

<script>
import apiMixins from '../../commom/network/api/userInfo'
import { Field, Button, Cell, CellGroup } from 'vant'
export default {
  mixins: [apiMixins],
  name: 'loginIndex',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() { 
    return {
      username: 'cheng',
      password: 'c12345678'
    }
  },
  methods: {
    toLogin () {
      this.login({
        'userName': this.username,
        'password': this.password,
        'deviceType': '1',
        'deviceNo': '5555'
      }).then(res => {
        this.loginDes = window.qs.stringify(res)
        console.log('login', res)
        LocalForage.setItem('id', res.id)
        LocalForage.setItem('fullName', res.fullName)
        // LocalForage.setItem('token', res.token)
        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('fullName', res.fullName)
        const token = window.localStorage.getItem('token')
        this.$router.push({
          path: '/mainHome'
        })
      })
    }
  }
 }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #appLoggin
    position absolute
    width 100%
    height 100%
    background-color #f3f3f3
    .login-content
      position relative
      padding 20px
      text-align center
      .login-title
        margin-bottom 80px
      .login-btn
        width 80%
        margin-top 50px
</style>
