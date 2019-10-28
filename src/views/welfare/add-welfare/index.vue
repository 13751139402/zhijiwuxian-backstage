<!--
 * @Author: your name
 * @Date: 2019-10-26 15:09:04
 * @LastEditTime: 2019-10-26 17:56:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\welfare\add-welfare\index.vue
 -->
<template>
  <article style="padding:0px 30px;width: 70%;">
    <h1>添加福利</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="福利名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请填写福利名称"></el-input>
      </el-form-item>
      <el-form-item label="福利类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择福利类型">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="福利描述" prop="describe">
        <el-input v-model="ruleForm.describe" placeholder="请填写福利描述"></el-input>
      </el-form-item>
      <el-form-item label="福利限制" prop="worth">
        <el-input v-model="ruleForm.worth" disabled></el-input>
      </el-form-item>
      <el-form-item label="福利图片" prop="image">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          ref="upload"
          action
          :http-request="beforeAvatarUpload"
        >
          <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar" ref="updataImg" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="福利奖励" prop="reward">
        <section v-for="(item,index) in ruleForm.reward" :key="index" style="margin:5px 0">
          <el-input v-model="item.value" style="width:50%"></el-input>
          <el-button @click.prevent="removeReward(index)">删除</el-button>
        </section>
        <el-button @click="addReward" style="margin-top:10px">新增福利</el-button>
      </el-form-item>

      <el-form-item label="过期时间" prop="time_valid">
        <el-date-picker
          v-model="ruleForm.time_valid"
          type="datetime"
          placeholder="不填则不过期"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="任务数量" prop="amount">
        <el-input type="number" v-model="ruleForm.amount" placeholder="无限制则填0" :min="0"></el-input>
      </el-form-item>

      <el-form-item label="是否审核" prop="examine">
        <el-switch v-model="ruleForm.examine"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </article>
</template>

<script>
import { addWelfare } from "@/api/welfare";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        type: "",
        describe: "",
        worth: 0,
        image: "",
        reward: [{ value: "" }],
        time_valid: "",
        amount: "",
        examine: false
      },
      imageBinary: {},
      rules: {
        name: [
          { required: true, message: "请填写福利名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择福利类型", trigger: "blur" }],
        describe: [
          { required: true, message: "请填写福利描述", trigger: "blur" }
        ],
        worth: [{ required: true, message: "请填写福利限制", trigger: "blur" }],
        image: [{ required: true, message: "请上传福利图片", trigger: "blur" }],
        reward: [
          { required: true, message: "请填写福利奖励", trigger: "blur" }
        ],
        amount: [
          {
            required: true,
            message: "请填写任务数量",
            trigger: "blur"
          }
        ]
      },
      formFile: new FormData()
    };
  },
  computed: {
    account() {
      return this.$store.getters.account;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let ruleForm = JSON.parse(JSON.stringify(this.ruleForm));
          ruleForm.examine = ruleForm.examine ? 1 : 0;
          let reward = ruleForm.reward.reduce((target, item) => {
            target.push(item.value);
            return target;
          }, []);
          delete ruleForm.image;
          ruleForm.reward = JSON.stringify(reward);
          for (let i in ruleForm) {
            this.formFile.append(i, ruleForm[i]);
          }
          this.formFile.append("account", this.account);
          addWelfare(this.formFile).then(() => {
            this.$notify({
              title: "成功",
              message: "添加数据成功",
              type: "success",
              duration: 1000,
              onClose: () => {}
            });
          });
        }
      });
    },
    resetForm(formName) {
      Object.assign(this.$data, this.$options.data());
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },
    beforeAvatarUpload({ file }) {
      // API 读取 本地文件
      var reader = new FileReader();
      // 将文件读取为base64的格式，也就是可以当成图片的src
      reader.readAsDataURL(file);

      //读取文件成功后执行的方法函数
      reader.onload = e => {
        this.ruleForm.image = e.target.result;
      };
      console.log("打");
      this.formFile.append("image", file, file.name);
    },
    removeReward(index) {
      this.ruleForm.reward.splice(index, 1);
    },
    addReward() {
      this.ruleForm.reward.push({ value: "" });
    }
  }
};
</script>

<style scoped>
.user-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50px;
}
.el-button--mini {
  padding: 7px 10px;
  width: 60px;
}
.filter-container >>> .el-input__inner {
  height: 36px;
  line-height: 36px;
}
.filter-container >>> .el-button {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.el-form-item >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-form-item >>> .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
  /* border-radius: 100%; */
}
.editForm {
  display: flex;
  width: 100%;
}
.editForm section {
  flex: 1;
}
#user-list >>> .el-form--label-left {
  width: 100% !important;
  margin-left: 0 !important;
  box-sizing: border-box;
  padding: 0 50px;
}
</style>