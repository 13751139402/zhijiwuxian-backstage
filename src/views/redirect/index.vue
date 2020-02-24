<!--
 * @Date: 2019-10-23 09:25:01
 * @LastEditTime : 2020-01-20 09:36:56
 * @LastEditors  : Please set LastEditors
 * @Description: 中转页面
 * @FilePath: \vue-admit-template\src\views\redirect\index.vue
 -->
<script>
export default {
  created() {
    const { params, query } = this.$route // 获取到route的query 和 params
    const { path } = params // 解析params 到 path
    console.log(path);
    
    this.$router.replace({ path: '/' + path, query }) // 刷新是没有router记录的 , 回跳页面，达到刷新的效果
  },
  render: function(h) {
    return h() // 避免警告消息
  }
}
</script>
