/*
 * @Author: your name
 * @Date: 2019-10-28 17:42:54
 * @LastEditTime: 2019-12-10 10:30:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\api\treasure.js
 */
import request from '@/utils/request'

/**
 * @description: 文档添加
 * @param {type}
 * @return:
 */
export function addHelpText(data) {
  return request({
    url: '/addHelpText',
    method: 'post',
    data
  })
}

/**
 * @description: 文档列表
 * @param {type}
 * @return:
 */
export function getHelpList(data) {
  return request({
    url: '/getHelpList',
    method: 'post',
    data
  })
}

/**
 * @description: 文档修改 / 删除
 * @param {type}
 * @return:
 */
export function editHelpText(data) {
  return request({
    url: '/editHelpText',
    method: 'post',
    data
  })
}


/**
 * @description: 文档添加 --- 图片
 * @param {type}
 * @return:
 */
export function updateHelpImg(data) {
  return request({
    url: '/updateHelpImg',
    method: 'post',
    data
  })
}