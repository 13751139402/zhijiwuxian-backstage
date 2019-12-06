<!--
 * @Author: your name
 * @Date: 2019-10-26 15:09:04
 * @LastEditTime: 2019-12-05 16:27:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\welfare\add-welfare\index.vue
 -->
<template>
  <article style="padding:20px;width: 70%;">
    <h1>{{ this.$route.meta.title }}</h1>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="福利名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请填写福利名称" />
      </el-form-item>
      <el-form-item label="福利类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择福利类型">
          <el-option :label="item" :value="index" v-for="(item,index) in typeList" :key="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="福利描述" prop="describe">
        <section v-for="(item,index) in ruleForm.describe" :key="index" style="margin:5px 0">
          <el-input v-model.trim="item.value" style="width:50%" />
          <el-button @click.prevent="removeArray(index,'describe')">删除</el-button>
        </section>
        <el-button style="margin-top:10px" @click="addArray('describe')">新增描述</el-button>
      </el-form-item>
      <el-form-item label="福利限制" prop="worth">
        <el-input v-model="ruleForm.worth" disabled />
      </el-form-item>
      <el-form-item label="福利图片" prop="image">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          :show-file-list="false"
          action
          :http-request="beforeAvatarUpload"
        >
          <img
            v-if="ruleForm.image"
            ref="updataImg"
            :src="/^data/.test(ruleForm.image)?ruleForm.image:server+ruleForm.image"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="福利奖励" prop="reward">
        <section v-for="(item,index) in ruleForm.reward" :key="index" style="margin:5px 0">
          <el-input v-model.trim="item.key" style="width:10%" />
          <el-input v-model.trim="item.value" style="width:35%" />
          <el-button @click.prevent="removeArray(index,'reward')">删除</el-button>
        </section>
        <el-button style="margin-top:10px" @click="addArray('reward')">新增福利</el-button>
      </el-form-item>

      <el-form-item label="过期时间" prop="time_valid">
        <el-date-picker
          v-model="ruleForm.time_valid"
          type="datetime"
          placeholder="不填则不过期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="任务数量" prop="amount">
        <el-input v-model="ruleForm.amount" type="number" placeholder="无限制则填0" :min="0" />
      </el-form-item>

      <el-form-item label="是否审核" prop="examine">
        <el-switch v-model="ruleForm.examine" inactive-value="2" active-value="1" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="buttonLoading"
          @click="submitForm('ruleForm',type==='change'?'change':'create')"
        >{{ type==="change"?"修改福利":"添加福利" }}</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        <el-button @click="returnRouter">返回</el-button>
      </el-form-item>
    </el-form>
  </article>
</template>

<script>
import { addWelfare, welfareUpdate } from "@/api/welfare";
export default {
  name: "AddWelfare",
  data() {
    const validateDescribe = (rule, value, callback) => {
      for (const item of value) {
        if (!item.value) {
          callback(new Error("请完整的输入描述，或者删除空的描述"));
          return;
        }
      }
      callback();
    };
    const validateReward = (rule, value, callback) => {
      for (const item of value) {
        if (!item.value || !item.key) {
          callback(new Error("请完整的输入奖励，或者删除空的奖励"));
          return;
        }
      }
      callback();
    };
    return {
      ruleForm: {
        name: "",
        type: "",
        describe: [{ value: "" }],
        worth: 0,
        image: "",
        reward: [
          {
            key: "",
            value: ""
          }
        ],
        time_valid: "",
        amount: "",
        examine: "2",
        id: ""
      },
      buttonLoading: false,
      server: this.$store.getters.server,
      type: this.$store.state.welfare.type,
      imageBinary: {},
      rules: {
        name: [
          { required: true, message: "请填写福利名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择福利类型", trigger: "blur" }],
        describe: [
          { required: true, validator: validateDescribe, trigger: "blur" }
        ],
        worth: [{ required: true, message: "请填写福利限制", trigger: "blur" }],
        image: [{ required: true, message: "请上传福利图片", trigger: "blur" }],
        reward: [
          { required: true, validator: validateReward, trigger: "blur" }
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
    },
    typeList() {
      return this.$store.state.welfare.typeList;
    }
  },
  methods: {
    returnRouter() {
      this.$router.push("welfare-list");
    },
    handleDescribe(query) {
      const data = query.reduce((target, { value }) => {
        target.push(value);
        return target;
      }, []);
      return JSON.stringify(data);
    },
    handleReward(query) {
      const data = query.reduce((target, { key, value }) => {
        Reflect.set(target, key, value);
        return target;
      }, {});
      return JSON.stringify(data);
    },
    submitForm(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          const ruleForm = JSON.parse(JSON.stringify(this.ruleForm));
          delete ruleForm.image;
          ruleForm.reward = this.handleReward(ruleForm.reward);
          ruleForm.describe = this.handleDescribe(ruleForm.describe);
          for (const i in ruleForm) {
            this.formFile.append(i, ruleForm[i]);
          }
          this.formFile.append("account", this.account);
          if (type === "create") {
            addWelfare(this.formFile).then(() => {
              this.$notify({
                title: "成功",
                message: "添加数据成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.buttonLoading = false;
                  this.$router.push("welfare-list");
                }
              });
            });
          } else {
            welfareUpdate(this.formFile).then(() => {
              this.$notify({
                title: "成功",
                message: "修改数据成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.buttonLoading = false;
                  this.$router.push("welfare-list");
                }
              });
            });
          }
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

      // 读取文件成功后执行的方法函数
      reader.onload = e => {
        this.ruleForm.image = e.target.result;
      };
      this.formFile.append("image", file, file.name);
    },
    removeArray(index, key) {
      this.ruleForm[key].splice(index, 1);
    },
    addArray(key) {
      this.ruleForm[key].push({ value: "" });
    }
  },
  mounted() {
    if (this.type === "change") {
      this.$route.meta.title = "修改福利";
      console.log(this.$store.state.welfare.data);
      this.ruleForm = Object.assign(
        this.ruleForm,
        this.$store.state.welfare.data
      );
    } else {
      this.$route.meta.title = "添加福利";
    }
    this.$store.dispatch("welfare/getWelfareType");
  },
  beforeDestroy() {
    this.$store.dispatch("welfare/init");
  }
};
</script>

<style scoped>
h1{
  margin: 20px;
}
.app-main {
  padding: 20px;
}
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
