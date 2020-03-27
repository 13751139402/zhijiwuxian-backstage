/*
 * @Description: ROUTER
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2020-03-27 14:20:56
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

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
 * name:'router-name'            设定路由的名字，不设置名称则不在导航条中显示
 * meta : {
    roles: ['admin','editor']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    noCache: true                如果设置为true，页面将不会被缓存(默认为false)
    icon: 'svg-name'             设置该路由的图标
    breadcrumb: false            如果设置为false，则该项将隐藏在面包屑中(默认为true)
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
    navbar:true                  是否将当前路由展示到导航条中，默认为true
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基页
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*", // :path为 params , *为通配符 pathMath
        component: () => import("@/views/redirect/index")
      }
    ]
  }
];

export const asyncRoutes = [
  {
    path: "/", // 默认页面 如果没有登录会直接跳转login
    component: Layout,
    redirect: "/home",
    mete: { roles: [9] },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/statistics-data/user-census"),
        meta: {
          title: "首页",
          icon: "dashboard",
          affix: true,
          roles: [9]
        }
      }
    ]
  },
  {
    path: "/manage-user",
    component: Layout,
    meta: { title: "用户管理", icon: "user", roles: [9] },
    children: [
      {
        path: "user-list",
        name: "user-list",
        component: () => import("@/views/manage-user/user-list"),
        meta: { title: "用户列表", noCache: true, roles: [9] }
      },
      {
        path: "administrator-list",
        name: "administrator-list",
        component: () => import("@/views/manage-user/administrator-list"),
        meta: { title: "管理员列表", noCache: true, roles: [1] }
      },
      {
        path: "user-data",
        name: "user-data",
        component: () => import("@/views/manage-user/user-data"),
        meta: { title: "个人信息", noCache: true, roles: [9] }
      }
    ]
  },
  {
    path: "/welfare",
    component: Layout,
    meta: { title: "福利管理", icon: "form", roles: [9] },
    children: [
      {
        path: "add-welfare",
        name: "add-welfare",
        roles: [1],
        component: () => import("@/views/welfare/add-welfare"),
        meta: { title: "添加福利", noCache: true, roles: [1] }
      },
      {
        path: "welfare-list",
        name: "welfare-list",
        roles: [9],
        component: () => import("@/views/welfare/welfare-list"),
        meta: { title: "福利列表", roles: [9] }
      },
      {
        path: "DirSir-promotion",
        hidden: true,
        roles: [9],
        component: () =>
          import("@/views/welfare/welfare-list/children/DirSir-promotion"),
        meta: { title: "电商推广", navbar: false, roles: [9] }
      },
      {
        path: "public-number-promotion",
        hidden: true,
        roles: [9],
        component: () =>
          import(
            "@/views/welfare/welfare-list/children/public-number-promotion"
          ),
        meta: { title: "公众号推广", navbar: false, roles: [9] }
      }
    ]
  },

  {
    path: "/manage-treasure",
    component: Layout,
    name: "manage-treasure",
    alwaysShow: true,
    meta: { title: "财富管理", icon: "example", roles: [9] },
    children: [
      {
        path: "get-help-list",
        name: "get-help-list",
        component: () => import("@/views/manage-treasure/get-help-list"),
        meta: { title: "文档列表", roles: [9] }
      },
      {
        path: "tinymce",
        name: "TinymceDemo",
        roles: [1],
        component: () => import("@/views/manage-treasure/tinymce"),
        meta: { title: "添加文档", noCache: true, roles: [1] }
      },
      {
        path: "apply-list",
        name: "apply-list",
        component: () => import("@/views/manage-treasure/apply-list"),
        meta: { title: "提现列表", roles: [9] }
      }
    ]
  },
  {
    path: "/dig-treasure",
    component: Layout,
    meta: { title: "挖宝功能", icon: "nested", roles: [9] },
    children: [
      {
        path: "prob-list",
        name: "prob-list",
        component: () => import("@/views/dig-treasure/prob-list"),
        meta: { title: "挖宝道具列表", roles: [9] }
      },
      {
        path: "article-list",
        name: "article-list",
        component: () => import("@/views/dig-treasure/article-list"),
        meta: { title: "宝箱物品列表", roles: [9] }
      }
    ]
  },
  {
    path: "/answer-puzzles",
    component: Layout,
    meta: { title: "答题闯关", icon: "nested", roles: [9] },
    children: [
      {
        path: "answer-puzzles",
        name: "answer-puzzles",
        component: () => import("@/views/answer-puzzles"),
        meta: { title: "答题闯关", roles: [9] }
      }
    ]
  },
  {
    path: "/statistics-data",
    component: Layout,
    redirect: "/statistics-data",
    meta: { title: "数据统计", icon: "table", roles: [9, 8] },
    children: [
      {
        path: "user-census",
        name: "user-census",
        component: () => import("@/views/statistics-data/user-census"),
        meta: { title: "用户存活统计", roles: [9] }
      },
      {
        path: "user-adPlay",
        name: "user-adPlay",
        component: () => import("@/views/statistics-data/user-adPlay"),
        meta: { title: "用户广告播放次数统计", roles: [9] }
      },
      {
        path: "Channel-UserDataToSpread",
        name: "Channel-UserDataToSpread",
        component: () =>
          import("@/views/statistics-data/Channel-UserDataToSpread"),
        meta: { title: "渠道邀请信息统计", roles: [1] }
      }
    ]
  }, {
    path: "/debris",
    component: Layout,
    meta: { title: "碎片模块", icon: "password", roles: [9] },
    children: [
      {
        path: "debris",
        name: "debris",
        component: () => import("@/views/debris/debris"),
        meta: { title: "碎片列表", roles: [9] }
      },
      {
        path: "card",
        name: "card",
        component: () => import("@/views/debris/card"),
        meta: { title: "卡片列表", roles: [9] }
      },
      {
        path: "goods",
        name: "goods",
        component: () => import("@/views/debris/goods"),
        meta: { title: "物品列表", roles: [9] }
      }
      ,
      {
        path: "banner",
        name: "banner",
        component: () => import("@/views/debris/banner"),
        meta: { title: "banner展示", roles: [9] }
      }
      ,
      {
        path: "box",
        name: "box",
        component: () => import("@/views/debris/box"),
        meta: { title: "宝箱配置", roles: [9] }
      }
    ]
  },
  {
    path: "/Feedback",
    component: Layout,
    meta: { title: "其他", icon: "password", roles: [9] },
    children: [
      {
        path: "Feedback",
        name: "Feedback",
        component: () => import("@/views/Feedback/index"),
        meta: { title: "反馈列表", roles: [9] }
      },
      {
        path: "versions",
        name: "versions",
        component: () => import("@/views/Feedback/versions"),
        meta: { title: "版本列表", roles: [9] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export const extension = [
  {
    path: "/",
    component: Layout,
    redirect: "/Channel-UserData",
    meta: { title: "数据统计", icon: "table" },
    children: [
      {
        path: "Channel-UserData",
        name: "Channel-UserData",
        component: () => import("@/views/statistics-data/Channel-UserData"),
        meta: { title: "渠道用户信息统计" }
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];

export default router;
