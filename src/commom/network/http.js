import axios from 'axios'
// import qs from 'qs' // 引入qs模块，用来序列化post类型的数据
import { Toast } from 'vant'
// 不建议 axios挂载到VUE，"会污染vue"框架，让Vue干自己任务，当然挂载到vue功能也可以实现
// Vue.prototype.$axios = axios
// 创建一个axios实例
const instance = axios.create({
  baseURL: 'https://wx.palmnest.com/', // url = base url + request url
  withCredentials: true, // 当跨域请求时发送cookie
  timeout: 15000 // 请求时间
})

// Add a request interceptor
instance.interceptors.request.use((config) => {
  // Do something before request is sent
  // if (config.json) {
  //   config.headers['Content-Type'] = 'application/json'
  // } else {
  //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  //   config.data = qs.stringify(config.data) // 利用qs做json序列化
  // }LocalForage.getItem('openId')

  // const token = LocalForage.getItem('token')
  // console.log('interceptors1', 'axios.interceptors.request.use-----token=' + token)
  // token && (config.headers.token = token)
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  return config
}, (error) => {
  // Do something with request error
  // 处理请求错误
  console.log(error) // 调试
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('interceptors2', 'axios.interceptors.response.use' + response.status)
  if (response && response.status === 200) {
    console.log('response.data.data', response.data.data)
    if (response.data && response.data.code === '200') {
      console.log('response.data.data', response.data.data)
      return Promise.resolve(response.data.data)
    } else {
      return Promise.reject(response)
    }
  } else {
    return Promise.reject(response)
  }
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error && error.status === 200 && error.data) {
    errorHandle(error.data.code, error.data.msg)
  } else {
    switch (error.status) {
      case 404:
        msgTip('请求地址不存在404')
        break
    }
  }
  return Promise.reject(error)
})

/**
 * 不可点击背景的toast提示
 */
const msgTip = msg => {
  Toast({
    message: msg,
    forbidClick: true
  })
}

/**
 * 跳转登录界面
 */
const toLogin = () => {
  msgTip('去登录界面')
}

/**
 * 请求异常统一处理
 * @param {} code
 * @param {*} msg
 */
const errorHandle = (code, msg) => {
  switch (code) {
    case 401:
      msgTip('登录过期，请重新登录')
      toLogin()
      break
    case 403:
      msgTip('登录过期，请重新登录403')
      toLogin()
      break
    default:
      msgTip(msg)
  }
}
export default instance
