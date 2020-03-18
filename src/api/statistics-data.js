/*
 * @Author: your name
 * @Date: 2020-01-03 17:47:46
 * @LastEditTime: 2020-03-18 14:39:54
 * @LastEditors: Please set LastEditors
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


/**
 * @description: 获取广告推广渠道名称
 */
export function getChannelNameToSpread(params) {
    return request({
        url: '/getChannelNameToSpread',
        method: 'get',
        params
    })
}

/**
 * @description: 获取渠道组合名称
 */
export function getChannelAndNum(params) {
    return request({
        url: '/getChannelAndNum',
        method: 'get',
        params
    })
}


/**
 * @description: 获取渠道组合名称
 */
export function timelyDataCensus(data) {
    return request({
        url: '/timelyDataCensus',
        method: 'post',
        data
    })
}
