/*
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2020-04-01 17:11:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /c:\Users\14374\Documents\GitHub\vue-admit-template\src\store\modules\settings.js
 */

const state = {
  data: false,
  type: 'create',
  typeMap: [
    {
      key: 1,
      value: "商城规则"
    },
    {
      key: 2,
      value: "签到规则"
    },
    {
      key: 3,
      value: "邀请好友"
    },
    {
      key: 4,
      value: '群发规则'
    },
    {
      key: 5,
      value: "关注公众号规则"
    },

    {
      key: 6,
      value: "热推商品"
    },
    {
      key: 7,
      value: "获取说明"
    },
    {
      key: 8,
      value: "币值说明"
    },
    {
      key: 9,
      value: "解锁说明"
    },
    {
      key: 10,
      value: "玩法说明"
    },
    {
      key: 11,
      value: "答题闯关"
    },
    {
      key: 12,
      value: "奖励规则"
    },
  ],
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
        if (item.width) {
          rows = `<img src="${item.img}" width="${item.width}" height="${item.height}"></img>`
        } else {
          rows = `<img src="${item.img}"></img>`
        }
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

