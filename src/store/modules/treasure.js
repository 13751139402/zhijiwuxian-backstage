/*
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-29 10:44:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /c:\Users\14374\Documents\GitHub\vue-admit-template\src\store\modules\settings.js
 */

const state = {
  data: false,
  type: 'create',
  page: {
    page: 1,
    page_size: 20
  }
}

const mutations = {
  CHANGE_DATA: (state, data) => {
    state.data = data
  },
  CHANGE_TYPE: (state, type) => {
    state.type = type
  },
  CHANGE_PAGE: (state, page) => {
    state.page = page
  }
}

const actions = {
  changeData({ commit }, { data, type, page }) {
    commit('CHANGE_DATA', data)
    commit('CHANGE_TYPE', type)
    commit('CHANGE_PAGE', page)
  },
  init({ commit }) {
    commit('CHANGE_WELFARE', false)
    commit('CHANGE_TYPE', 'create')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

