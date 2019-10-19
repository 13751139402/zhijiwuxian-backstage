/*
 * @Description: icon
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-19 15:37:29
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 全局注册组件 svg-icon
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/) // 找到svg目录下的svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
