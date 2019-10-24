/*
 * @Descripttion:
 * @version:
 * @Author: 戴训伟
 * @Date: 2019-09-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-22 15:18:44
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

/**
 * @name :require.context
 * @des : require.context 它允许您传递要搜索的目录，指示是否也应搜索子目录的标志以及用于匹配文件的正则表达式。它允许您传递要搜索的目录，指示是否也应搜索子目录的标志以及用于匹配文件的正则表达式。
 * @param {
 *  directory{String} ：读取文件的路径
 *  useSubdirectories{Boolean} ：是否遍历文件的子目录
 *  regExp{RegExp} ：匹配文件的正则
 * }
 * @return {  函数
 *   参数：
 *    resolve {Function} : 是一个函数，它返回 request 被解析后得到的模块 id
 *    keys {Function} : 返回匹配成功模块的名字组成的数组
 *    id {String} : 执行环境的id,返回的是一个字符串,主要用在module.hot.accept,应该是热加载?
 *
 * }
 * @detail : https://webpack.docschina.org/guides/dependency-management/#require-context
 */
const modulesFiles = require.context('./modules', true, /\.js$/)// 找到modules目录下所有以.js结尾的文件

// 你不需要导入应用程序从 './modules/app'`
// 它将自动导入所有vuex模块从模块文件
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 取出文件名 './app.js' 替换为 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')// modulePath为相对路径
  const value = modulesFiles(modulePath)// 调用子文件,子文件export数据
  modules[moduleName] = value.default // 将子文件export的数据添加到modules属性中
  return modules
}, {})

const store = new Vuex.Store({// 实例化Vuex 创建一个store
  modules, // Vuex会组装模块并导出方法
  getters // 这里单独使用getters是为了将模块化内的通用属性拿出来，快速调用
})

export default store
