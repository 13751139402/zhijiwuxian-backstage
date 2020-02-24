/*
 * @Author: your name
 * @Date: 2020-02-13 17:14:59
 * @LastEditTime : 2020-02-14 12:51:13
 * @LastEditors  : Please set LastEditors
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
