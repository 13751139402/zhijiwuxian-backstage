<!--
 * @Description: layout的main，用于切换不同route
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-29 17:02:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="app-main">
    <!-- out-in 先出再进  -->
    <transition name="fade-transform" mode="out-in">
      <!-- include是缓存组件，不是缓存路由
      include缓存规则，判断组件中的name,失败则判断父组件中的name,匿名组件不参与缓存
      这里的cachedViews是通过router计算出的缓存条件，并不是直接缓存router页面-->
      <keep-alive :include="cachedViews">
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
