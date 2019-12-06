/*
 * @Author: your name
 * @Date: 2019-12-05 17:53:29
 * @LastEditTime: 2019-12-05 17:54:03
 * @LastEditors: Please set LastEditors
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