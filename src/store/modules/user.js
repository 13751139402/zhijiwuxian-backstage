/*
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-09-28 10:33:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-24 10:23:22
 */
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  id: '',
  name: '',
  account: '',
  rank: ""
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_RANK: (state, rank) => {
    state.rank = rank
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { id, name, account, rank } = response.result
        // commit('SET_TOKEN', "data.token") // commit不能传入undefined 否则会出错
        // setToken(data.token)
        commit('SET_ID', id)
        commit('SET_NAME', name)
        commit('SET_ACCOUNT', account)
        commit('SET_RANK', rank)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // 通过用户token 获取用户角色roles
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => { // 给axios实例添加then和catch并返回一个Promise
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败，请重新登录')
        }

        const { roles, name, avatar, introduction } = data

        // 角色必须是非空数组
        if (!roles || roles.length <= 0) {
          reject('getInfo: 角色必须是非空数组!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重置用户信息
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '') // 设置token为空
      commit('SET_ROLES', []) // 设置权限为空
      removeToken() // 移除cookie 的 token
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
