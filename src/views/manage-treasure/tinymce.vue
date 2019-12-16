<!--
 * @Author: your name
 * @Date: 2019-12-09 10:48:09
 * @LastEditTime: 2019-12-16 11:37:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-treasure\tinymce.vue
 -->
<template>
  <section>
    <div class="warn">
      <p>提示:图片请单独放置一行</p>
    </div>
    <div class="components-container">
      <h1>{{ this.docType==="create"?"添加文档":"修改文档" }}</h1>
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules="ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文档标题" style="margin-left: 80px;" prop="title">
              <el-input v-model="form.title" style="width:50%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文档类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择类型">
                <el-option
                  :label="item.value"
                  :value="item.key"
                  v-for="item in typeMap"
                  :key="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item prop="texts">
          <tinymce v-model="form.texts" :height="'55vh'" />
        </el-form-item>

        <el-form-item class="submit-item">
          <el-button type="primary" @click="onCreate" v-if="this.docType==='create'">创建</el-button>
          <el-button type="primary" @click="onChange" v-else>修改</el-button>
          <router-link to="get-help-list">
            <el-button>返回</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Tinymce from "@/components/Tinymce";
import { addHelpText, editHelpText } from "@/api/treasure";
import { stat } from "fs";

export default {
  name: "TinymceDemo",
  components: { Tinymce },
  data() {
    return {
      form: {
        title: "",
        type: undefined,
        texts: "",
        id: ""
      },
      ruleForm: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择文档类型", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState("treasure", {
      docType: state => state.type,
      data: state => state.data,
      typeMap: state => state.typeMap
    }),
    server() {
      return this.$store.getters.server;
    }
  },
  methods: {
    handleSubmitData(value) {
      console.log("修改前" + value);
      let texts = value
        .replace(/&nbsp;/g, " ")
        .split("</p>")
        .reduce((target, item) => {
          let text = item.replace(/<(\/?p)*>/g, "");
          let img = /(?<=src=")(.+?)(?=")/.exec(item);
          if (img) {
            target.push({ img: img[0] });
          } else {
            target.push({ text });
          }
          return target;
        }, []);
      console.log("修改后" + JSON.stringify(texts));
      return JSON.stringify(texts);
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
    }
  },

  mounted() {
    if (this.docType === "change") {
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
p {
  margin: 0;
}
.warn {
  background: #d0d0d0;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
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

