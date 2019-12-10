<!--
 * @Author: your name
 * @Date: 2019-12-09 10:48:09
 * @LastEditTime: 2019-12-10 18:08:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-treasure\tinymce.vue
 -->
<template>
  <div class="components-container">
    <h1>{{ this.type==="create"?"添加文档":"修改文档" }}</h1>
    <el-form ref="ruleForm" :model="form" label-width="80px" :rules="ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章标题" style="margin-left: 80px;" prop="title">
            <el-input v-model="form.title" style="width:50%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务状态">
            <el-select v-model="form.type" placeholder="请选择类型">
              <el-option label="1" :value="1"></el-option>
              <el-option label="2" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="texts">
        <tinymce v-model="form.texts" :height="'60vh'" />
      </el-form-item>

      <el-form-item class="submit-item">
        <el-button type="primary" @click="onCreate" v-if="this.type==='create'">创建</el-button>
        <el-button type="primary" @click="onChange">修改</el-button>
        <router-link to="get-help-list">
          <el-button>返回</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Tinymce from "@/components/Tinymce";
import { addHelpText, editHelpText } from "@/api/treasure";

export default {
  name: "TinymceDemo",
  components: { Tinymce },
  data() {
    return {
      form: {
        title: "",
        type: 1,
        texts: "",
        id: ""
      },
      ruleForm: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState("treasure", {
      type: state => state.type,
      data: state => state.data
    }),
    server() {
      return this.$store.getters.server;
    }
  },
  methods: {
    handleSubmitData(value) {
      let uuid = "06ab9d23dfe04880f7edc5c63731153f";
      // let imgFilter = new RegExp(`/<img.*src="${this.server}([^"]*).*\/>/g`);
      value = value
        .replace(/<img.*src="([^"]*).*\/>/g, (item, $1) => {
          return uuid + $1;
        })
        .replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g, "")
        .replace(/\n|↵/g, "/n");
      value = value.split("/n").reduce((target, item) => {
        if (item.indexOf(uuid) !== -1) {
          target.push({ img: item.replace(uuid, "") });
        } else {
          target.push({ text: item });
        }
        return target;
      }, []);
      return JSON.stringify(value);
    },
    onCreate() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let data = this.handleSubmitData(this.form.texts);
          let { title, type, id } = this.form;
          let params = {
            title,
            type,
            texts: data
          };
          addHelpText(params)
            .then(() => {
              this.$notify({
                title: "成功",
                message: "添加成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.$router.push("./get-help-list");
                  this.dialogFormVisible = false;
                }
              });
            })
            .catch(() => {});
        }
      });
    },
    onChange() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let data = this.handleSubmitData(this.form.texts);
          let { title, type, id } = this.form;
          let params = {
            title,
            type,
            id,
            texts: data
          };
          editHelpText(params)
            .then(() => {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.$router.push("./get-help-list");
                  this.dialogFormVisible = false;
                }
              });
            })
            .catch(() => {});
        }
      });
    },
    initData() {
      if (this.type === "change") {
        this.$route.meta.title = "修改文档";
      } else {
        this.$route.meta.title = "添加文档";
      }
      this.form = Object.assign(this.form, this.data);
    }
  },

  mounted() {
    if (this.type === "change") {
      this.$route.meta.title = "修改文档";
    } else {
      this.$route.meta.title = "添加文档";
    }
    this.form = Object.assign(this.form, this.data);
  },
  beforeDestroy() {
    this.$store.dispatch("treasure/init");
  }
};
</script>

<style scoped>
.form {
  margin-bottom: 12px;
}
.form-item-input {
  width: 50%;
}
.submit-item {
  display: flex;
  justify-content: center;
}
.editor-content {
  margin-top: 20px;
}
.el-form-item__label {
  font-size: 18px;
  white-space: pre;
}
</style>

