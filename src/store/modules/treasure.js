/*
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-12-10 18:03:52
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
    let params = data.texts;
    if (!params) {
      return;
    }
    let array = JSON.parse(params);
    let texts = array.reduce((target, item) => {
      let rows;
      if (item.img) {
        rows = `<img src="${item.img}"></img>`
      } else {
        rows = item.text;
      }
      return target += `<p>${rows}</p>`
    }, "");
    state.data.texts = texts
  },
  CHANGE_TYPE: (state, type) => {
    state.type = type
  },
  CHANGE_PAGE: (state, page) => {
    state.page = page
  }
}

const actions = {
  changeData({ commit }, { data, type }) {
    commit('CHANGE_DATA', data)
    commit('CHANGE_TYPE', type)
    //commit('CHANGE_PAGE', page)
  },
  init({ commit }) {
    commit('CHANGE_DATA', false)
    commit('CHANGE_TYPE', 'create')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

