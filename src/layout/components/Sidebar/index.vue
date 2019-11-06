<!--
 * @Description: 侧边栏 index
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-11-04 16:58:14
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div :class="{'has-logo':showLogo}">
    <!-- 是否显示徽标，因为徽标不是el-menu组件中的，所以折叠效果要另做 -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 之前版本的滚动都是用 css 来做处理的 ：overflow-y: scroll
      首先这样写会有兼容性问题，在火狐或者其它低版本浏览器中都会比较不美观。其次在侧边栏收起的情况下，受限于 element-ui的 menu 组件的实现方式，不能使用该方式来处理。
      所以现版本中使用了 el-scrollbar 来处理侧边栏滚动问题。
    -->
    <!-- el-scrollbar  滚动条效果-->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['sidebar']), // TODO: 这里映射的时getter
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      // 当路由跳转时 将路由"映射"到选中的侧边栏

      const route = this.$route
      const { meta, path } = route
      // 如果设置路径，侧栏将突出显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      // 是否在侧栏中显示徽标
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      // 导出样式
      return variables
    },
    /**
     * @name: isCollapse
     * @des : 展开就取消折叠，收起就打开折叠
     */

    isCollapse() {
      return !this.sidebar.opened // 侧边栏是否展开
    }
  }
}
</script>
