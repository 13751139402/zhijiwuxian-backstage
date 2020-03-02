<!--
 * @Author: your name
 * @Date: 2020-02-27 16:23:17
 * @LastEditTime: 2020-02-28 14:42:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\answer-puzzles\category.vue
 -->
<template>
  <div id="categoryList">
    <el-dialog :title="title" :visible.sync="visibleData">
      <el-form ref="dataForm">
        <el-form-item v-for="item of activeList" :key="item.id">
          <slot name="item" :item="item">
            <el-input v-model="item.name"></el-input>
          </slot>
          <el-button type="primary" icon="el-icon-edit" @click="updateItem(item.id,item.name)"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteItem(item.id)"></el-button>
        </el-form-item>
        <el-form-item>
          <slot name="addItem">
            <el-input v-model="addValue"></el-input>
          </slot>
          <el-button type="success" icon="el-icon-plus" @click="createItem"></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      default() {
        return [];
      },
      type: Array
    },
    title: {
      default: "",
      type: String
    },
    visible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      activeList: this.list,
      visibleData: this.visible,
      addValue: ""
    };
  },
  watch: {
    visible(value) {
      this.visibleData = value;
    },
    visibleData(value) {
      this.$emit("update:visible", value);
    },
    list(data) {
      this.activeList = data;
    }
  },
  methods: {
    updateItem(id, name) {
      this.$emit("updateItem", id, name);
    },
    deleteItem(id) {
      this.$emit("deleteItem", id);
    },
    createItem() {
      this.$emit("createItem", this.addValue);
      this.addValue = "";
    }
  }
};
</script>

<style scoped>
#categoryList >>> .el-button {
  margin-left: 5px;
}
#categoryList >>> .el-input {
  max-width: 750px;
}
</style>