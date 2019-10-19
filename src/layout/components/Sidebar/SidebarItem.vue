<!--
 * @Description: 侧边栏的子项
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-19 15:07:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 如果设置为真，项目将不会显示在侧栏(默认为假) -->
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 三种情况 ：
        多子 ：生成二级菜单 ，进入递归
        一子 ：子类变为父类
        无子 ：无子显示父类
    -->

    <!-- if 当一子且子节点没有children或者无子且alwaysShow为false -->
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <!-- 只有当子类有meta时才放入侧边栏 -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item
            :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>
    <!-- else el-submenu生成二级菜单 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: 用渲染函数重构
    this.onlyOneChild = null
    return {}
  },
  methods: {
    /**
     * @description: 判断项中是否有子类
     * @param {
     *  children ：子类
     *  parent   ：父类
     * }
     * @return:
     */

    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          // 子节点是否隐藏
          return false
        } else {
          // 临时设置(如果只有一个显示的子节点，则使用临时设置)
          this.onlyOneChild = item
          return true
        }
      })
      // 当只有一个子路由器时，默认显示子路由器
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有要显示的子路由器，则显示父路由器
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    /**
     * @description: 处理路径
     * @param {
     *  routePath ：需要处理的路径
     * }
     * @return:
     */
    resolvePath(routePath) {
      if (isExternal(routePath)) { // 为绝对路径直接返回
        return routePath
      }
      if (isExternal(this.basePath)) { // 为绝对路径直接返回
        return this.basePath
      }
      return path.resolve(this.basePath, routePath) // 组合路径
    }
  }
}
</script>
