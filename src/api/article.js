/*
 * @Author: your name
 * @Date: 2019-10-21 14:54:15
 * @LastEditTime: 2019-10-24 11:27:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\api\article.js
 */
import request from '@/utils/request'

export function fetchList({ limit, page }) {
  return request({
    url: '/getUserList',
    method: 'get',
    params: {
      page_size: limit,
      page
    }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
