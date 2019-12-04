/**
 * 按模块进行接口管理
 * 在命名的时候 按模块命名，避免命名冲突
 */
import base from './base'
import axios from '../http'
import qs from 'qs'

const userInfo = {
  // 登录接口
  login (params) {
    console.log('login (params)', qs.stringify(params))
    return axios.post(`${base.sp}/super_service/api/user/login`, qs.stringify(params))
  }
}
export default userInfo
