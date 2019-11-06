/*
 * @Author: 挖宝
 * @Date: 2019-10-26 15:07:47
 * @LastEditTime: 2019-10-31 14:13:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\api\welfare.js
 */
import request from '@/utils/request'
import store from '@/store'

const account = store.getters.account
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
    params: {
      account: account,
      ...params
    }
  })
}

/**
 * @description: 物品列表
 * @param {type}
 * @return:
 */
export function editProp(data) {
  return request({
    url: '/editProp',
    method: 'post',
    data: {
      account: account,
      ...data
    }
  })
}

/**
 * @description: 物品爆率列表
 * @param {type}
 * @return:
 */
export function getPropConfList(params) {
  return request({
    url: '/getPropConfList',
    method: 'get',
    params: {
      account: account,
      ...params
    }
  })
}

/**
 * @description: 添加物品爆率
 * @param {type}
 * @return:
 */
export function addPropConfig(data) {
  const validData = { ...data }
  validData.burst_rate = validData.burst_rate * 0.01
  return request({
    url: '/addPropConfig',
    method: 'post',
    data: {
      account: account,
      ...validData
    }
  })
}

/**
 * @description: 添加物品爆率
 * @param {type}
 * @return:
 */
export function editPropConfig(data) {
  const validData = { ...data }
  if (validData.burst_rate) {
    validData.burst_rate = validData.burst_rate * 0.01
  }
  return request({
    url: '/editPropConfig',
    method: 'post',
    data: {
      account: account,
      ...validData
    }
  })
}
