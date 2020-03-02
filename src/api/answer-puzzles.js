/*
 * @Author: your name
 * @Date: 2020-02-13 17:14:59
 * @LastEditTime: 2020-02-28 11:46:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian-backstage\src\api\answer-puzzles.js
 */
import request from "@/utils/request";

//-------------------------------------- 物品
/**
 * @description: 题目列表
 * @param {type}
 * @return:
 */
export function getQuestionAndAnswerList(params) {
  return request({
    url: "/getQuestionAndAnswerList",
    method: "get",
    params
  });
}

/**
 * @description: 添加题目
 * @param {type}
 * @return:
 */
export function addQuestionBank(data) {
  return request({
    url: "/addQuestionBank",
    method: "post",
    data
  });
}

/**
 * @description: 添加答案
 * @param {type}
 * @return:
 */
export function addQuestionAnswer(data) {
  return request({
    url: "/addQuestionAnswer",
    method: "post",
    data
  });
}

/**
 * @description: 删除题目
 * @param {type}
 * @return:
 */
export function deleteQuestionBankAndAnswer(data) {
  return request({
    url: "/deleteQuestionBankAndAnswer",
    method: "post",
    data
  });
}

/**
 * @description: 编辑题目
 * @param {type}
 * @return:
 */
export function editQuestionBankAndAnswer(data) {
  return request({
    url: "/editQuestionBankAndAnswer",
    method: "post",
    data
  });
}

// --------------------------------- 分类模块
/**
 * @description: 分类列表
 * @param {type}
 * @return:
 */
export function getQuestionCateList(params) {
  return request({
    url: "/getQuestionCateList",
    method: "get",
    params
  });
}

/**
 * @description: 编辑分类
 * @param {type}
 * @return:
 */
export function editQuestionCate(data) {
  return request({
    url: "/editQuestionCate",
    method: "post",
    data
  });
}

/**
 * @description: 删除分类
 * @param {type}
 * @return:
 */
export function deleteQuestionCate(data) {
  return request({
    url: "/deleteQuestionCate",
    method: "post",
    data
  });
}

/**
 * @description: 添加分类
 * @param {type}
 * @return:
 */
export function addQuestionCate(data) {
  return request({
    url: "/addQuestionCate",
    method: "post",
    data
  });
}

// --------------------- 奖励列表

/**
 * @description: 奖励类型
 * @param {type}
 * @return:
 */
export function getRewardType(params) {
  return request({
    url: "/getRewardType",
    method: "get",
    params
  });
}

/**
 * @description: 奖励列表
 * @param {type}
 * @return:
 */
export function getRewardList(params) {
  return request({
    url: "/getRewardList",
    method: "get",
    params
  });
}

/**
 * @description: 添加奖励
 * @param {type}
 * @return:
 */
export function addReward(data) {
  return request({
    url: "/addReward",
    method: "post",
    data
  });
}

/**
 * @description: 删除奖励
 * @param {type}
 * @return:
 */
export function deleteReward(data) {
  return request({
    url: "/deleteReward",
    method: "post",
    data
  });
}

/**
 * @description: 编辑奖励
 * @param {type}
 * @return:
 */
export function editReward(data) {
  return request({
    url: "/editReward",
    method: "post",
    data
  });
}