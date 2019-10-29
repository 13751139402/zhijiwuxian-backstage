/*
 * @Description: ROUTER
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-29 17:03:11
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 几乎所有的页面一级url都是layout，二级url才是内容，path需要redirect
/**
 * Note : 子菜单仅在路由子菜单时出现。长度> = 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                  当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true              当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
                                 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
                                 若你想不管路由下面的 children 声明的个数都显示你的根路由
                                 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根F路由
 * redirect: noRedirect          当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'            设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    noCache: true                如果设置为true，页面将不会被缓存(默认为false)
    icon: 'svg-name'             设置该路由的图标
    breadcrumb: false            如果设置为false，则该项将隐藏在面包屑中(默认为true)
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基页
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*', // :path为 params , *为通配符 pathMath
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/', // 默认页面 如果没有登录会直接跳转login
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页', icon: 'dashboard', affix: true
      }
    }]
  },

  {
    path: '/manage-user',
    component: Layout,
    meta: { title: '用户管理', icon: 'user' },
    children: [{
      path: 'user-list',
      name: 'user-list',
      component: () => import('@/views/manage-user/user-list'),
      meta: { title: '用户列表', noCache: true }
    },
    {
      path: 'administrator-list',
      name: 'administrator-list',
      component: () => import('@/views/manage-user/administrator-list'),
      meta: { title: '管理员列表', noCache: true }
    }, {
      path: 'user-data',
      name: 'user-data',
      component: () => import('@/views/manage-user/user-data'),
      meta: { title: '用户信息', noCache: true }
    }

      // {
      //   path: 'batch-signup-user',
      //   name: 'batch-signup-user',
      //   component: () => import('@/views/manage-user/batch-signup-user'),
      //   meta: { title: '批量注册用户' }
      // }
    ]
  },

  {
    path: '/welfare',
    component: Layout,
    meta: { title: '福利管理', icon: 'user' },
    children: [{
      path: 'add-welfare',
      name: 'add-welfare',
      component: () => import('@/views/welfare/add-welfare'),
      meta: { title: '添加福利', noCache: true }
    }, {
      path: 'welfare-list',
      name: 'welfare-list',
      component: () => import('@/views/welfare/welfare-list'),
      meta: { title: '福利列表' }
    }
    ]
  },

  {
    path: '/treasure',
    component: Layout,
    name: 'treasure',
    meta: { title: '财富管理', icon: 'user' },
    children: [{
      path: 'add-help-text',
      name: 'add-help-text',
      component: () => import('@/views/treasure/add-help-text'),
      meta: { title: '文档添加', noCache: true }
    }, {
      path: 'get-help-list',
      name: 'get-help-list',
      component: () => import('@/views/treasure/get-help-list'),
      meta: { title: '文档列表' }
    }]
  },

  {
    path: '/advertis',
    component: Layout,
    redirect: '/advertis/advertis-docking',
    meta: { title: '广告对接', icon: 'eye-open' },
    children: [{
      path: 'advertis-docking',
      name: 'advertis-docking',
      component: () => import('@/views/advertis/advertis-docking'),
      meta: { title: '广告对接' }
    },
    {
      path: 'advertis-list',
      name: 'advertis-list',
      component: () => import('@/views/advertis/advertis-list'),
      meta: { title: '广告列表' }
    },
    {
      path: 'play-stats',
      name: 'play-stats',
      component: () => import('@/views/advertis/play-stats'),
      meta: { title: '播放统计' }
    }]
  },

  {
    path: '/dig-treasure',
    component: Layout,
    redirect: '/dig-treasure/goods-control',
    meta: { title: '挖宝功能', icon: 'nested' },
    children: [{
      path: 'goods-control',
      name: 'goods-control',
      component: () => import('@/views/dig-treasure/goods-control'),
      meta: { title: '福利管理' }
    },
    {
      path: 'treasure-record',
      name: 'treasure-record',
      component: () => import('@/views/dig-treasure/treasure-record'),
      meta: { title: '物品管理' }
    },
    {
      path: 'welfare-control',
      name: 'welfare-control',
      component: () => import('@/views/dig-treasure/welfare-control'),
      meta: { title: '挖宝记录' }
    }]
  },

  {
    path: '/statistics-deal',
    component: Layout,
    meta: { title: '交易统计', icon: 'password' },
    children: [{
      path: 'apply-list',
      name: 'apply-list',
      component: () => import('@/views/statistics-deal/apply-list'),
      meta: { title: '申请列表' }
    },
    {
      path: 'withdraw-account',
      name: 'withdraw-account',
      component: () => import('@/views/statistics-deal/withdraw-account'),
      meta: { title: '提现账户' }
    },
    {
      path: 'withdraw-record',
      name: 'withdraw-record',
      component: () => import('@/views/statistics-deal/withdraw-record'),
      meta: { title: '提现记录' }
    }]
  },

  {
    path: '/statistics-data',
    component: Layout,
    redirect: '/statistics-data',
    children: [{
      path: 'statistics-data',
      name: 'statistics-data',
      component: () => import('@/views/statistics-data'),
      meta: { title: '数据统计', icon: 'table' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
