/*
 * @Author: your name
 * @Date: 2019-10-21 14:54:15
 * @LastEditTime : 2019-12-31 17:13:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\api\article.js
 */
import request from '@/utils/request'

export function fetchList({ limit, page }) {
  return request({
    url: '/getUserList',
    method: 'get',
    params: {
      page_size: limit,
      page
    }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

/**
 * @description: 用户列表 编辑用户数据
 * @param {type}
 * @return:
 */
export function updateArticle(data) {
  return request({
    url: '/editUser',
    method: 'post',
    data
  })
}

/**
 * @description: 管理员列表
 * @param {type}
 * @return:
 */
export function getAdminList(data) {
  return request({
    url: '/getAdminList',
    method: 'post',
    data
  })
}

/**
 * @description: 修改管理员信息 / 删除
 * @param {type}
 * @return:
 */
export function adminUpdate(data) {
  return request({
    url: '/adminUpdate',
    method: 'post',
    data
  })
}

/**
 * @description: 批量添加用户
 * @param {type}
 * @return:
 */
export function autoRegisterUser(params) {
  return request({
    url: '/autoRegisterUser',
    method: 'get',
    params
  })
}
/**
 * @description: 添加管理员
 * @param {type}
 * @return:
 */
export function addAdmin(data) {
  return request({
    url: '/addAdmin',
    method: 'post',
    data
  })
}

/**
 * @description: 添加管理员
 * @param {type}
 * @return:
 */
export const industry =
  [
    '保险业',
    '采矿',
    '能源',
    '餐饮',
    '宾馆',
    '电讯业',
    '房地产',
    '服务',
    '服装业',
    '公益组织',
    '广告业',
    '航空航天',
    '化学',
    '健康',
    '保健',
    '建筑业',
    '教育',
    '培训',
    '计算机',
    '金属冶炼',
    '警察',
    '消防',
    '军人',
    '会计',
    '美容',
    '媒体',
    '出版',
    '木材',
    '造纸',
    '零售',
    '批发',
    '农业',
    '旅游业',
    '司法',
    '律师',
    '司机',
    '体育运动',
    '学术研究',
    '演艺',
    '医疗服务',
    '艺术',
    '设计',
    '银行',
    '金融',
    '因特网',
    '音乐舞蹈',
    '邮政快递',
    '运输业',
    '政府机关',
    '机械制造',
    '咨询',
    '其他'
  ]
