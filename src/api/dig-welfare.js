/*
 * @Author: 挖宝
 * @Date: 2019-10-26 15:07:47
 * @LastEditTime: 2019-11-07 15:58:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\api\welfare.js
 */
import request from '@/utils/request'

//-------------------------------------- 物品
/**
 * @description: 添加物品
 * @param {type}
 * @return:
 */
export function addProp(data) {
  return request({
    url: '/addProp',
    method: 'post',
    data
  })
}

/**
 * @description: 物品列表
 * @param {type}
 * @return:
 */
export function getPropList(params) {
  return request({
    url: '/getPropList',
    method: 'get',
    params
  })
}

/**
 * @description: 物品编辑 / 删除
 * @param {type}
 * @return:
 */
export function editProp(data) {
  return request({
    url: '/editProp',
    method: 'post',
    data
  })
}


// -----------------------------------------  宝箱物品
/**
 * @description: 物品爆率列表
 * @param {type}
 * @return:
 */
export function getArticleList(params) {
  return request({
    url: '/getArticleList',
    method: 'get',
    params
  })
}

/**
 * @description: 添加 宝箱物品
 * @param {type}
 * @return:
 */
export function addArticle(data) {
  return request({
    url: '/addArticle',
    method: 'post',
    data
  })
}

/**
 * @description: 宝箱-修改/删除物品
 * @param {type}
 * @return:
 */
export function editArticle(data) {
  return request({
    url: '/editArticle',
    method: 'post',
    data
  })
}

/**
 * @description: 宝箱-修改/删除物品
 * @param {type}
 * @return:
 */
export function getPropType(params) {
  return request({
    url: '/getPropType',
    method: 'get',
    params
  })
}