import axios from 'axios'
import qs from 'qs'
// 不建议 axios挂载到VUE，"会污染vue"框架，让Vue干自己任务，当然挂载到vue功能也可以实现
// Vue.prototype.$axios = axios
// 创建一个axios实例
const instance = axios.create({
  baseURL: 'XXXXXX', // url = base url + request url
  withCredentials: true, // 当跨域请求时发送cookie
  timeout: 15000 // 请求时间
})
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (config.json) {
    config.headers['Content-Type'] = 'application/json'
  } else {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    config.data = qs.stringify(config.data) // 利用qs做json序列化
  }
  console.log('interceptors1', 'axios.interceptors.request.use')
  return config
}, function (error) {
  // Do something with request error
  // 处理请求错误
  console.log(error) // 调试
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('interceptors2', 'axios.interceptors.response.use')
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
export default instance
