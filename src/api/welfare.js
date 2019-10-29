/*
 * @Author: your name
 * @Date: 2019-10-26 15:07:47
 * @LastEditTime: 2019-10-28 11:01:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\api\welfare.js
 */
import request from '@/utils/request'
/**
 * @description: 添加福利
 * @param {type}
 * @return:
 */
export function addWelfare(data) {
  return request({
    url: '/addWelfare',
    method: 'post',
    data
  })
}

/**
 * @description: 福利列表
 * @param {type}
 * @return:
 */
export function welfareList(data) {
  return request({
    url: '/welfareList',
    method: 'post',
    data
  })
}

/**
 * @description: 福利编辑 / 删除
 * @param {type}
 * @return:
 */
export function welfareUpdate(data) {
  return request({
    url: '/welfareUpdate',
    method: 'post',
    data
  })
}
