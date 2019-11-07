/*
 * @Author: your name
 * @Date: 2019-10-26 15:07:47
 * @LastEditTime: 2019-11-06 17:29:33
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

/**
 * @description: 福利类型
 * @param {type}
 * @return:
 */
export function getWelfareType(params) {
  return request({
    url: '/getWelfareType',
    method: 'get',
    params
  })
}

/*------------------------------       二级福利      ----------------------------- */
/*---     电商      --- */
/**
 * @description: 电商列表
 * @param {type}
 * @return:
 */
export function getRecommendTask(params) {
  return request({
    url: '/getRecommendTask',
    method: 'get',
    params
  })
}

/**
 * @description: 添加电商福利
 * @param {type}
 * @return:
 */
export function addRecommendTask(data) {
  return request({
    url: '/addRecommendTask',
    method: 'post',
    data
  })
}

/**
 * @description: 编辑/删除电商福利
 * @param {type}
 * @return:
 */
export function editRecommendTask(data) {
  return request({
    url: '/editRecommendTask',
    method: 'post',
    data
  })
}

/*---     公众号      --- */
/**
 * @description: 添加 公众号推广
 * @param {type}
 * @return:
 */
export function addWelfareListTask(data) {
  return request({
    url: '/addWelfareListTask',
    method: 'post',
    data
  })
}

/**
 * @description: 公众号列表
 * @param {type}
 * @return:
 */
export function welfareListTask(params) {
  return request({
    url: '/welfareListTask',
    method: 'get',
    params
  })
}

/**
 * @description: 编辑/删除电商福利
 * @param {type}
 * @return:
 */
export function editWelfareListTask(data) {
  return request({
    url: '/editWelfareListTask',
    method: 'post',
    data
  })
}