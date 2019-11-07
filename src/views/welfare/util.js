/*
 * @Author: your name
 * @Date: 2019-11-06 15:26:52
 * @LastEditTime: 2019-11-06 15:46:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\welfare\util.js
 */
/**
 * @description: 将params对象的属性遍历到formData中
 * @param {
 *  params : 参数
 * } 
 * @return: 
 */
export function handleFormData(params) {
    let formFile = new FormData;
    for (const i in params) {
        formFile.append(i, params[i]);
    }
    return formFile;
}