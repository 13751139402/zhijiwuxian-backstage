/*
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-09-28 10:33:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-16 13:39:37
 */
import { login, logout } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import store from '@/store'

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
    Object.assign(state, data);
    state.token = true
    setToken(JSON.stringify(data));
  },
  init_LOGIN: (state) => {
    Object.assign(state, initState);
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(({ result }) => {
        // result.rank = 9;
        setToken(JSON.stringify(result));

        resolve()
      }).catch(error => {
        reject(error.message)
      })
    })
  },

  // user logout
  logout({ commit, }, id) {
    removeToken()
    commit('init_LOGIN');
    store.dispatch("tagsView/delAllViews");
    resetRouter()
  },

  // 重置用户信息
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // 移除cookie 的 token
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
