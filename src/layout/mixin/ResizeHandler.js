/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-10-18 18:22:26
 * @LastEditors: Please set LastEditors
 */
import store from '@/store'

const { body } = document // 获取元素Body
const WIDTH = 992 // 参考Bootstrap的响应式设计

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) { // 当路由改变时 如果为移动端，且侧边栏打开
        store.dispatch('app/closeSideBar', { withoutAnimation: false }) // 关闭侧边栏
      }
    }
  },
  beforeMount() {
    // 挂载前添加"窗口调整"事件
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    // 毁灭前移除"窗口调整"事件
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile() // 判断是否为移动端
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // 对mixin属性使用$_
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    /**
     * @name: $_isMobile
     * @des : 判断是否为移动端
     * @param {type}
     * @return: true为移动端
     */
    $_isMobile() {
      const rect = body.getBoundingClientRect() // 获取页面的大小
      return rect.width - 1 < WIDTH // 如果页面宽度小于 992 返回true
    },
    /**
     * @name: $_resizeHandler
     * @des : 判断窗口大小是否小于992，小于则为移动端
     * @param {type}
     * @return: 关闭侧边栏
     */
    $_resizeHandler() {
      if (!document.hidden) { // 如果元素没有隐藏
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop') // 设置为移动端或者pc端

        if (isMobile) { // 如果为移动端口，关闭侧边栏
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
