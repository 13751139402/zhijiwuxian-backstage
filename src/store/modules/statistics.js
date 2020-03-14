/*
 * @Author: your name
 * @Date: 2020-03-14 10:44:31
 * @LastEditTime: 2020-03-14 12:02:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\store\modules\statistics.js
 */

import { getChannelNameToSpread,getChannelAndNum } from "@/api/statistics-data";

getChannelNameToSpread().then(({result})=>{
    result['0']="全部"
    state.ChannelNameToSpread=result;
})
getChannelAndNum().then(({result})=>{
    state.ChannelAndNum=result;
    console.log(state.ChannelAndNum);
})
const state={
    ChannelNameToSpread:{},
    ChannelAndNum:[]
}

const mutations = {
}

const actions = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  