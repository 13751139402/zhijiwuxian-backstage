/*
 * @Author: your name
 * @Date: 2019-12-05 17:53:29
 * @LastEditTime : 2019-12-30 17:09:08
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\api\Feedback.js
 */
import request from '@/utils/request'

//-------------------------------------- 物品
/**
 * @description: 反馈列表
 * @param {type}
 * @return:
 */
export function getFeedbackList(params) {
    return request({
        url: '/getFeedbackList',
        method: 'get',
        params
    })
}

//-------------------------------------- 版本信息
/**
 * @description: 版本列表
 * @param {type}
 * @return:
 */
export function getAppVersionList(params) {
    return request({
        url: '/getAppVersionList',
        method: 'get',
        params
    })
}

/**
 * @description: 添加版本信息
 * @param {type}
 * @return:
 */
export function addAppVersion(data) {
    return request({
        url: '/addAppVersion',
        method: 'post',
        data
    })
}

/**
 * @description: 更新版本信息
 * @param {type}
 * @return:
 */
export function editAppVersion(data) {
    return request({
        url: '/editAppVersion',
        method: 'post',
        data
    })
}