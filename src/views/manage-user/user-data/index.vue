<!--
 * @Author: your name
 * @Date: 2019-10-26 15:00:10
 * @LastEditTime : 2020-01-03 13:58:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-user\user-data\index.vue
 -->
<template>
  <article style="padding:50px">
    <h1>个人信息修改</h1>
    <el-form
      ref="createForm"
      :rules="rules"
      :model="temp"
      label-position="left"
      label-width="70px"
      style="width: 400px;"
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
      <el-button type="primary" @click="submit">修改</el-button>
    </div>
  </article>
</template>

<script>
import { adminUpdate } from "@/api/manage-user";
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === undefined || value === "") {
        return callback();
      }
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      temp: {
        name: undefined,
        pwd: undefined,
        account: this.$store.state.user.account,
        id: this.$store.state.user.id
      },
      rules: {
        pwd: [{ trigger: "blur", validator: validatePassword }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["createForm"].validate(valid => {
        if (valid) {
          let params = { id: this.temp.id };
          if (this.temp.name) {
            params.name = this.temp.name;
          }
          if (this.temp.pwd) {
            params.pwd = this.temp.pwd;
          }
          adminUpdate(params).then(() => {
            Object.assign(this.temp, { name: undefined, pwd: undefined });
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
