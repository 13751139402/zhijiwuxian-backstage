/*
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-09-28 10:33:37
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-30 11:20:32
 */
import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const initState = {
  token: false,
  id: false,
  name: false,
  account: false,
  rank: false,
  roles: false
}

const state = {
  token: false,
  id: false,
  name: false,
  account: false,
  rank: false,
  roles: false
}

const mutations = {
  SET_LOGIN: (state, data) => {
    if (!data) {
      Object.assign(state, initState);
      state.token = false;
    } else {
      Object.assign(state, data);
      state.token = true
      setToken(JSON.stringify(data));
    }

  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(({ result }) => {
        commit('SET_LOGIN', result)
        resolve()
      }).catch(error => {
        reject(error.message)
      })
    })
  },

  // // user logout
  // logout({ commit,},id) {
  //   return new Promise((resolve, reject) => {
  //     console.log(id);
      
  //     logout(id).then(() => {
  //       commit('SET_TOKEN', false)
  //       removeToken()
  //       resetRouter()
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // 重置用户信息
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', false)
      removeToken() // 移除cookie 的 token
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
