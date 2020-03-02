<!--
 * @Author: your name
 * @Date: 2020-02-28 10:36:18
 * @LastEditTime: 2020-02-28 10:59:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\answer-puzzles\rewardList.vue
 -->
<template>
  <div id="categoryList">
    <el-dialog title="奖励列表" :visible.sync="visibleData">
      <el-form ref="dataForm"></el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      visibleData: this.visible
    };
  },
  watch: {
    visible(value) {
      this.visibleData = value;
    },
    visibleData(value) {
      this.$emit("update:visible", value);
    }
  }
};
</script>

<style>
</style>