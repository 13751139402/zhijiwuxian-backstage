/*
 * @Author: your name
 * @Date: 2019-10-21 14:54:15
 * @LastEditTime: 2019-10-29 18:10:16
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

/**
 * @description: 用户列表 编辑用户数据
 * @param {type}
 * @return:
 */
export function updateArticle(data) {
  return request({
    url: '/editUser',
    method: 'post',
    data
  })
}

/**
 * @description: 管理员列表
 * @param {type}
 * @return:
 */
export function getAdminList(data) {
  return request({
    url: '/getAdminList',
    method: 'post',
    data
  })
}

/**
 * @description: 修改管理员信息 / 删除
 * @param {type}
 * @return:
 */
export function adminUpdate(data) {
  return request({
    url: '/adminUpdate',
    method: 'post',
    data
  })
}

/**
 * @description: 添加管理员
 * @param {type}
 * @return:
 */
export function addAdmin(data) {
  return request({
    url: '/addAdmin',
    method: 'post',
    data
  })
}
