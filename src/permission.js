/*
 * @Descripttion: learning
 * @version:router跳转前进行权限验证
 *  1.用户无登录则跳转登录页面
 *  2.用户有roles则跳页，无则通过token获取roles,再通过roles筛选可访问路由,如果执行失败则跳转重新登录
 * @Author: 戴训伟
 * @Date: 2019-09-28 10:33:37
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-07 11:15:27
 */
import router from './router' // 获取router实例
import store from './store' // 获取store
import { Message } from 'element-ui' // 得到Message
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie中获取令牌
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress配置

const whiteList = ['/login', '/auth-redirect'] // 没有重定向白名单
router.beforeEach(async (to, from, next) => { // 路由跳转前触发
  // 开始进度条
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已登录
  const hasToken = getToken(); // Token会在用户登录的时候下发，如果没有token则跳转登录页面，有则直接进入主页
  // 登录页面只负责下传token,roles和可访问路由是在跳转页面时permission的router.beforeEach处理的


  if (hasToken) { // cookie中保存值
    if (!store.getters.token) { // store中未保存值,将cookie中的值保存至store
      const userData = JSON.parse(hasToken);
      if (!userData.id) { // 如果cookie中的值是错的,跳转登录页面重新登录
        store.dispatch('user/logout');
        next(`/login?redirect=${to.path}`)
      } else if (to.path === '/login') { // 去用户页面不需要权限验证 则重定向到"home"
        next({ path: '/' }) // 重定向至主页
      }
      store.commit('user/SET_LOGIN', userData); // 将cookie中的值保存至store
      let rank = userData.rank;
      // 根据角色生成可访问路由映射
      const accessRoutes = await store.dispatch('permission/generateRoutes', [rank])
      // 动态添加可访问路由

      router.addRoutes(accessRoutes)
      if (rank === 8) {
        console.log(router);
      }
      next({ path: '/', replace: true }) // 路由跳转如果不加replace,则跳转后,async的路由还没有生效
    }
    next();
    NProgress.done() // 结束进度条
  } else {
    /* 没有令牌*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单，直接去
      next()
    } else {
      // 没有访问权限的其他页面被重定向到登录页面。
      // redirect:从哪个页面被定向过来的
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
