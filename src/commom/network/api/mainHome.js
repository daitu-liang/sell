/**
 * 首页主模块
 * 按模块进行接口管理
 * 在命名的时候 按模块命名，避免命名冲突
 */
import base from './base'
import axios from '../http'
import qs from 'qs'

const bannerInfo = {
  // 获取banner接口
  getBanner (params) {
    return axios.post(`${base.sp}super_service/api/notice/bannerList`, qs.stringify(params))
  }
}
export default {
  methods: bannerInfo
}
