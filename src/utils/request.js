/*
 * @Author: 创建axios实例，添加token验证
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-25 17:24:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /c:\Users\14374\Documents\GitHub\vue-admit-template\src\utils\request.js
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = 基本url +请求url
  withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000, // 请求超时
})

// 请求 拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    config.credentials = true;
    if (store.getters.token) {
      // 让每个请求携带toekn
      // ['X-Token']是一个自定义key
      // 请根据实际情况修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // 报错
    return Promise.reject(error)
  }
)

// 响应 拦截器
service.interceptors.response.use(
  /**
   * 如果您想获得http信息，如头信息或状态信息
   * Please return  response => response
  */

  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您还可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data

    // 如果自定义代码不是1，则判断为错误。

    if (res.code !== 1) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: 非法令牌;50012:其他客户登录;50014:令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登陆
        MessageBox.confirm('您已经登出，您可以取消停留在这个页面，或再次登录', '确认登出', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
