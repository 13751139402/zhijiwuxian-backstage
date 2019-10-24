/*
 * @Description: user API
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-23 19:19:07
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request' // request是封装过的axios

export function login({ username, password }) {
  return request({
    url: '/adminLogin',
    method: 'post',
    data: {
      account: username,
      pwd: password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
