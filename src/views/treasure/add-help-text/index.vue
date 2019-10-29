<!--
 * @Author: your name
 * @Date: 2019-10-28 16:57:45
 * @LastEditTime: 2019-10-29 16:51:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\treasure\add-help-text\index.vue
 -->
<template>
  <article id="add-help-text">
    <h1>{{ type==="change"?'修改文章':"添加文章" }}</h1>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="文档标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="文档类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择文档类型">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动形式" prop="texts">
        <el-input v-model="form.texts" type="textarea" rows="20" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="buttonLoading"
          @click="onSubmit(type==='change'?'change':'create')"
        >{{ type==="change"?'修改文章':"添加文章" }}</el-button>
        <el-button @click="returnRouter">返回</el-button>
      </el-form-item>
    </el-form>
  </article>
</template>

<script>
import { addHelpText, editHelpText } from '@/api/treasure'
export default {
  name: 'AddHelpText',
  data() {
    return {
      form: {
        title: '',
        type: '',
        texts: '',
        account: this.$store.getters.account
      },

      rules: {
        title: [
          { required: true, message: '请填写文章标题', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: '请选择文章类型', trigger: 'blur' }],
        texts: [{ required: true, message: '请填写文章内容', trigger: 'blur' }]
      },
      type: this.$store.state.treasure.type,
      buttonLoading: false
    }
  },
  mounted() {
    if (this.type === 'change') {
      this.$route.meta.title = '修改文档'
      this.form = Object.assign(this.form, this.$store.state.treasure.data)
    } else {
      this.$route.meta.title = '添加文档'
    }
  },
  beforeDestroy() {
    this.$store.dispatch('welfare/init')
  },
  methods: {
    onSubmit(type) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.buttonLoading = true
          if (type === 'create') {
            addHelpText(this.form).then(() => {
              this.$notify({
                title: '成功',
                message: '添加文档成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.buttonLoading = false
                  this.$router.push('get-help-list')
                }
              })
            })
          } else {
            editHelpText(this.form).then(() => {
              this.$notify({
                title: '成功',
                message: '修改文档成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.buttonLoading = false
                  this.$router.push('get-help-list')
                }
              })
            })
          }
        }
      })
    },
    returnRouter() {
      this.$router.push('get-help-list')
    }
  }
}
</script>

<style scoped>
#add-help-text {
  margin: 20px;
  width: 70%;
}
.textArea {
  min-height: 40%;
}
</style>
