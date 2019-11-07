/*
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-11-06 17:53:03
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
  },
  secondId: false // 二级福利对应的id
}

const mutations = {
  CHANGE_WELFARE: (state, data) => {
    if (data.reward) {
      const rewardList = JSON.parse(data.reward)
      data.reward = rewardList.reduce((target, item) => {
        target.push({ value: item })
        return target
      }, [])
      if (!data.time_valid) {
        data.time_valid = ''
      }
      data.examine = String(data.examine)
    }
    state.data = data
  },
  CHANGE_TYPE: (state, type) => {
    state.type = type
  },
  CHANGE_PAGE: (state, page) => {
    state.page = page
  },
  CHANGE_SECONDID: (state, secondId) => {
    state.secondId = secondId
  },
}

const actions = {
  changeData({ commit }, { data, type, page }) {
    commit('CHANGE_WELFARE', data)
    commit('CHANGE_TYPE', type)
    commit('CHANGE_PAGE', page)
  },
  init({ commit }) {
    commit('CHANGE_WELFARE', false)
    commit('CHANGE_TYPE', 'create')
  },
  changeSecondId({ commit }, id) {
    commit('CHANGE_SECONDID', id);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

