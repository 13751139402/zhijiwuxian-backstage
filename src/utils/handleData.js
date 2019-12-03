/*
 * @Author: your name
 * @Date: 2019-12-03 10:54:35
 * @LastEditTime: 2019-12-03 11:19:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\utils\handleData.js
 */


/**
 * @description: Object转化为formData,去除无效数据
 * @param {
 *  data : Object参数
 * } 
 * @return: formData
 */
export function switchFormData(data) {
    let formData = new FormData();
    for (let item of Object.keys(data)) {
        if (data[item]) {
            formData.append(item, data[item]);
        }
    }
    return formData;
}