/*
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-12-05 15:32:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /c:\Users\14374\Documents\GitHub\vue-admit-template\src\store\modules\settings.js
 */

import { getWelfareType } from "@/api/welfare";

const state = {
  data: false,
  type: 'create',
  typeList: [],          // 福利类型
  page: {
    page: 1,
    page_size: 20
  },
  second_showData: false,  // 二级福利展示数据
  second_id: false         // 二级福利对应的id
}

const mutations = {
  CHANGE_WELFARE: (state, data) => {
    let dataMap = JSON.parse(JSON.stringify(data));
    if (dataMap.reward) {
      let reward = JSON.parse(dataMap.reward);
      dataMap.reward = Object.keys(reward).reduce((target, item) => {
        target.push({ key: item, value: reward[item] });
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
  CHANGE_TYPELIST: (state, type) => {
    state.typeList = type
  },
  CHANGE_TYPE: (state, type) => {
    state.type = type
  },
  CHANGE_PAGE: (state, page) => {
    state.page = page
  },
  CHANGE_SECOND_SECONDID: (state, secondId) => {
    state.second_id = secondId
  },
  CHANGEE_SECOND_SHOWDATA: (state, data) => {
    data.reward = JSON.parse(data.reward).amount;
    state.second_showData = data
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
  changeSecondData({ commit }, data) {
    commit('CHANGE_SECOND_SECONDID', data.id);
    commit('CHANGEE_SECOND_SHOWDATA', data);
  },
  getWelfareType({ commit, state }, data) {
    if (state.typeList.length == 0) {
      getWelfareType().then(({ result }) => {
        commit('CHANGE_TYPELIST', result);
      });
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

