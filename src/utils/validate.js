/*
 * @Description: 验证器
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-19 14:53:26
 * @LastEditors: Please set LastEditors
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @description: 判断是否为绝对路径
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
