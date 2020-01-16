/*
 * @Descripttion: 用于向router添加异步路由,然后来展示侧边栏
 * @version:
 * @Author: 戴训伟
 * @Date: 2019-09-28 10:33:37
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-07 11:27:26
 */
import { asyncRoutes, constantRoutes, extension } from '@/router' // 导入同步路由和异步路由两个对象

/**
 * 使用元。角色确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // some() 方法用于检测数组中的元素是否满足指定条件（函数提供),如果有一个满足条件，则停止执行
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // includes 数组中是否包含
      if (roles[0] <= 3) { // 如果是管理员，则异步数据不需要过滤，直接赋予
        accessedRoutes = asyncRoutes || []
      } else { // 不为管理员则过滤数据
        if (roles[0] === 8) {
          accessedRoutes = extension
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
      }
      // accessedRoutes = filterAsyncRoutes(asyncRoutes, [9])
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
