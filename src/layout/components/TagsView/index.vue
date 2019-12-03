<!--
 * @Author: your name
 * @Date: 2019-10-22 14:24:49
 * @LastEditTime: 2019-11-11 18:01:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\layout\components\TagsView\index.vue
 -->
<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.native="addCachedView(tag)"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <!-- 右键菜单 -->
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <!-- 固钉 -->
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";
import path from "path";
export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      lastRoute: false
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
    routes() {
      return this.$store.state.permission.routes;
    }
  },
  watch: {
    $route(to, form) {
      this.lastRoute = form.path;
      this.addTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      // 当右击菜单展示时,在body中添加一个事件隐藏右击菜单
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted() {
    this.initTags();
    this.addTags();
  },
  methods: {
    addCachedView(tag) {
      this.$store.dispatch("tagsView/addCachedView", tag);
    },
    /**
     * @description: 判断是否为当前活跃router
     * @param {type}
     * @return:
     */

    isActive(route) {
      console.log("8922");
      if (this.$route.meta.navbar === false) {
        return route.path === this.lastRoute;
      } else {
        return route.path === this.$route.path;
      }
    },
    /**
     * @description: 判断是否有固钉
     * @param {type}
     * @return:
     */

    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    /**
     * @description: 过滤出图钉标签
     * @param {type}
     * @return:
     */

    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path); // 解析 当前路径
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]; // 把子固钉和父固钉合并在一起
          }
        }
      });
      return tags;
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        // 必须有标签名 keep-alive通过name来判断是否缓存
        if (tag.name) {
          this.$store.dispatch("tagsView/addVisitedView", tag);
        }
      }
    },
    /**
     * @description: 添加当前路由至访问/缓存数组中
     * @param {type}
     * @return:
     */
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("tagsView/addView", this.$route);
      }
      return false;
    },
    /**
     * @description: 移动至当前标签
     * @param {type}
     * @return:
     */

    moveToCurrentTag() {
      const tags = this.$refs.tag; // tags 是一个包含所有tags的标签
      this.$nextTick(() => {
        for (const tag of tags) {
          // 标签路径 === 路由路径
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag); // 修改子组件 触发 moveToTarget
            // 当完整路径是不同的，然后更新

            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch("tagsView/updateVisitedView", this.$route);
            }
            break;
          }
        }
      });
    },
    refreshSelectedTag(view) {
      this.$store.dispatch("tagsView/delCachedView", view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          // router是根据url的改变进行刷新的
          // 1.此处先跳转至中转页面 ==>redirect 再跳转回来fullPath 达到刷新的效果
          //   replace不保存redirect页面进记录
          // 2.添加new Date 进参数，但是url会很丑的跟着一串时间字符串
          this.$router.replace({
            path: "/redirect" + fullPath
          });
        });
      });
    },
    /**
     * @description: 删除某个导航条
     * @param {type}
     * @return:
     */

    closeSelectedTag(view) {
      this.$store
        .dispatch("tagsView/delView", view)
        .then(({ visitedViews }) => {
          // 返回删除后的新的访问数组
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view);
          }
        });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store
        .dispatch("tagsView/delOthersViews", this.selectedTag)
        .then(() => {
          this.moveToCurrentTag();
        });
    },
    closeAllTags(view) {
      this.$store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          // 如果图钉组中有path
          return;
        }
        this.toLastView(visitedViews, view); // 退回最后一个项中
      });
    },
    /**
     * @description:
     * @param {type}
     * @return:
     */

    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]; // slice 浅拷贝 最后一个项 ，返回一个数组
      if (latestView) {
        // 为真跳转上一次路由
        this.$router.push(latestView.fullPath);
      } else {
        // 现在默认是重定向到主页，如果没有标签视图，
        // 你可以根据你的需要来调整。
        if (view.name === "Dashboard") {
          // 要重新加载主页
          this.$router.replace({ path: "/redirect" + view.fullPath });
        } else {
          this.$router.push("/");
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right
      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }
      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
