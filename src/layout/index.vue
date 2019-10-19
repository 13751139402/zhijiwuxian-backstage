<!--
 * @Description: 布局主页
 * @Author: 戴训伟
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-19 11:34:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 布局container -->
  <div :class="classObj" class="app-wrapper">
    <!-- 移动端的遮罩层，用于隐藏侧边栏 -->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 侧边栏组件 -->
    <sidebar class="sidebar-container" />
    <!-- 主体区 -->
    <div class="main-container">
      <!-- 导航条 -->
      <nav :class="{'fixed-header':fixedHeader}">
        <!-- 面包屑 -->
        <navbar />
      </nav>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler' // 窗口调整切换移动端或PC端

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar // 侧边栏
    },
    device() {
      return this.$store.state.app.device // 手机端
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader // 右侧布局配置板是否显示
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    /**
     * @name: handleClickOutside
     * @des : 手机端展示侧边栏时的遮罩层，点击时添加过渡动画
     */
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false }) // 展开或关闭侧边栏时（是否没有动画）
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
