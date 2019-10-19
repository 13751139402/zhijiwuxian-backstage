<!--
 * @Description: 侧边栏 节点跳转
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-19 15:11:52
 * @LastEditors: Please set LastEditors
 -->

<template>
  <!-- eslint-disable vue/require-component-is -->
  <!-- linkProps返回一个对象,对象中包含了component中需要的属性 比如 is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      if (isExternal(url)) { // 如果路径为真，则创建a标签
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
