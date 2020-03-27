/*
 * @Author: 创建axios实例，添加token验证
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2020-03-27 15:46:10
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
  changeOrigin: true, // 允许跨域
  withCredentials: false, // 当跨域请求时发送cookie,当允许发送cookie时,access-contron-allow-origin不能为*,安全
  timeout: 20000 // 请求超时
})

// 请求 拦截器
service.interceptors.request.use(
  config => {
    const account = store.getters.account;
    // 在发送请求之前做些什么

    // 如果账号存在则添加，因为大部分请求都需要添加操作人账号
    if (config.url.includes("debris")) {
      var data = config.data || config.params;
      if (!data) {
        config.data = data = {};
      }
      if (data instanceof FormData) {
        data.append('apply', 1);
      } else {
        data.apply = 1;
      }
    }
    if (account) {
      var data = config.data || config.params;
      if (!data) {
        config.data = data = {};
      }
      if (data instanceof FormData) {
        data.append('account', account);
      } else {
        data.account = account;
      }
    }
    config.credentials = true
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
        message: res.msg || 'Error',
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
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
