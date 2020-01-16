/*
 * @Author: your name
 * @Date: 2020-01-03 17:47:46
 * @LastEditTime : 2020-01-09 14:42:47
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\api\statistics-data.js
 */
import request from '@/utils/request'

export function getUserCensus(data) {
    return request({
        url: '/getUserCensus',
        method: 'post',
        data
    })
}

export function getUserAdPlay(data) {
    return request({
        url: '/getUserAdPlay',
        method: 'post',
        data
    })
}

export function getChannelUserData(params) {
    return request({
        url: '/getChannelUserData',
        method: 'get',
        params
    })
}

export function getChanUserInfo(data) {
    return request({
        url: '/getChanUserInfo',
        method: 'post',
        data
    })
}
export function getChannelUserDataToSpread(params) {
    return request({
        url: '/getChannelUserDataToSpread',
        method: 'get',
        params
    })
}