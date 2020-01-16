<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime : 2020-01-06 09:42:16
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">权限: {{ rank }}</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("user");
export default {
  name: "Dashboard",
  computed: {
    ...mapState(["rank"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
