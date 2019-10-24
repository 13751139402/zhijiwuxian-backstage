/*
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-22 14:30:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /c:\Users\14374\Documents\GitHub\vue-admit-template\src\store\modules\settings.js
 */
import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo, tagsView } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  tagsView: tagsView // 是否需要 标签栏
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

