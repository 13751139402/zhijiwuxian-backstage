/*
 * @Description: 路由每次跳转时进行权限验证，添加异步路由
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-19 10:10:23
 * @LastEditors: Please set LastEditors
 */
import router from './router' // 导入router
import store from './store' // 导入vuex
import { Message } from 'element-ui' // 导入 element 的 message模块
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie获取令牌
import getPageTitle from '@/utils/get-page-title' // 返回《title》元素的text

NProgress.configure({ showSpinner: false }) // NProgress配置

const whiteList = ['/login'] // 设置不需要重定向的白名单

router.beforeEach(async(to, from, next) => { // 路由-跳转前 钩子
  // 开始进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录 , 如果登录则在cookie中会保存Token
  const hasToken = getToken()

  if (hasToken) { // 登录
    if (to.path === '/login') { // 如果跳转的页面是登录页面
      // 如果已登录，则重定向到主页
      next({ path: '/' }) // 因为已经登录了，再跳转登录页面没有意义，所以直接返回主页
      NProgress.done() // 进度条结束
    } else { // 如果跳转的不是登录页面
      const hasGetUserInfo = store.getters.name // 获取用户信息
      if (hasGetUserInfo) { // 有用户信息则直接跳转登录页面
        next()
      } else { // 有token没有UserInfo  , 则进行用户数据获取
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')

          next() // 获取完成后进入页面
        } catch (error) {
          // 删除token，进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || '用户信息错误，请重新登录') // 给用户一个提示
          next(`/login?redirect=${to.path}`) // 跳转login页面，redirect是用于页面登录成功后反跳回来
          NProgress.done() // 结束进度条
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中是不需要token的，直接跳转
      next()
    } else {
      // 没有访问权限的其他页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 路由跳转完毕后完成进度条
  NProgress.done()
})
