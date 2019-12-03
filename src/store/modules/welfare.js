/*
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-11-11 14:10:44
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
    let dataMap = JSON.parse(JSON.stringify(data));
    if (dataMap.reward) {
      dataMap.reward = JSON.parse(dataMap.reward).reduce((target, item) => {
        target.push({ value: item })
        return target
      }, [])
      if (!dataMap.time_valid) {
        dataMap.time_valid = ''
      }
      dataMap.examine = String(dataMap.examine)
    }
    if (dataMap.describe) {
      dataMap.describe = JSON.parse(dataMap.describe).reduce((target, item) => {
        target.push({ value: item })
        return target
      }, [])
    }
    state.data = dataMap
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

