<!--
 * @Author: your name
 * @Date: 2019-10-26 15:00:10
 * @LastEditTime: 2019-10-26 15:06:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-user\user-data\index.vue
 -->
<template>
  <article style="padding:50px">
    <el-form
      ref="createForm"
      :rules="rules"
      :model="temp"
      label-position="left"
      label-width="70px"
      style="width: 400px; margin-left:50px;"
    >
      <article class="editForm">
        <section>
          <el-form-item label="名称" prop="name">
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="temp.pwd" />
          </el-form-item>
        </section>
      </article>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-left:10%">
      <el-button type="primary" @click="updataData">修改</el-button>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      temp: {
        name: "",
        pwd: ""
      }
    };
  },
  methods: {
    updataData() {
        
    }
  }
};
</script>

<style>
</style>