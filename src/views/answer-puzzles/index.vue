<!--
 * @Author: your name
 * @Date: 2019-10-25 19:14:30
 * @LastEditTime : 2020-02-14 13:24:47
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-user\administrator-list\index.vue
 -->
<template>
  <div id="public-number-promotion" class="app-containeFr">
    <article class="filter-container">
      <el-form ref="form" :model="listQuery" label-width="80px" :inline="true">
        <el-form-item>
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-edit"
            @click="handleCreate"
            v-if="rank"
          >添加</el-button>
        </el-form-item>
        <el-form-item label="题目等级">
          <el-select v-model="listQuery.grade" placeholder="请选择题目等级" @change="selectData">
            <el-option v-for="(value,key) of statusMap" :key="key" :label="value" :value="key" />
          </el-select>
        </el-form-item>
      </el-form>
    </article>

    <el-table
      v-loading="listLoading"
      :data="list"
      height="calc(100vh - 235px)"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="id" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="问题" prop="question" align="center" :min-width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.question }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选项1" prop="answer_list" align="center">
        <template slot-scope="scope">
          <span
            :class="{answer_correct:scope.row.answer_list[0]&&scope.row.answer_list[0].correct}"
          >{{ scope.row.answer_list[0]&&scope.row.answer_list[0].answer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选项2" prop="answer_list" align="center">
        <template slot-scope="scope">
          <span
            :class="{answer_correct:scope.row.answer_list[1]&&scope.row.answer_list[1].correct}"
          >{{ scope.row.answer_list[1]&&scope.row.answer_list[1].answer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选项3" prop="answer_list" align="center">
        <template slot-scope="scope">
          <span
            :class="{answer_correct:scope.row.answer_list[2]&&scope.row.answer_list[2].correct}"
          >{{ scope.row.answer_list[2]&&scope.row.answer_list[2].answer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选项4" prop="answer_list" align="center">
        <template slot-scope="scope">
          <span
            :class="{answer_correct:scope.row.answer_list[3]&&scope.row.answer_list[3].correct}"
          >{{ scope.row.answer_list[3]&&scope.row.answer_list[3].answer }}</span>
        </template>
      </el-table-column>

      <el-table-column label="级别" prop="grade" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.grade }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="rank"
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="120px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="primary" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="dataForm"
        :model="temp"
        label-position="left"
        label-width="80px"
        style="width: 80%; margin-left:50px;"
      >
        <article class="editForm">
          <section>
            <el-form-item label="题目描述" prop="question">
              <el-input type="textarea" v-model="temp.question"></el-input>
            </el-form-item>
            <el-form-item label="题目等级" prop="grade">
              <el-radio-group v-model="temp.grade">
                <el-radio-button label="1"></el-radio-button>
                <el-radio-button label="2"></el-radio-button>
                <el-radio-button label="3"></el-radio-button>
                <el-radio-button label="4"></el-radio-button>
                <el-radio-button label="5"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!-- <template v-if="dialogStatus==='change'"> -->
            <el-form-item label="选项1" prop="answer0">
              <el-input v-model="temp.answer0" style="width:400px"></el-input>
              <el-radio v-model="temp.correct" :label="0">正确答案</el-radio>
            </el-form-item>
            <el-form-item label="选项2" prop="answer1">
              <el-input v-model="temp.answer1" style="width:400px"></el-input>
              <el-radio v-model="temp.correct" :label="1">正确答案</el-radio>
            </el-form-item>
            <el-form-item label="选项3" prop="answer2">
              <el-input v-model="temp.answer2" style="width:400px"></el-input>
              <el-radio v-model="temp.correct" :label="2">正确答案</el-radio>
            </el-form-item>
            <el-form-item label="选项4" prop="answer3">
              <el-input v-model="temp.answer3" style="width:400px"></el-input>
              <el-radio v-model="temp.correct" :label="3">正确答案</el-radio>
            </el-form-item>
            <el-form-item label="正确答案" prop="correct">
              <el-radio-group v-model="temp.correct">
                <el-radio-button :label="0">选项1</el-radio-button>
                <el-radio-button :label="1">选项2</el-radio-button>
                <el-radio-button :label="2">选项3</el-radio-button>
                <el-radio-button :label="3">选项4</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!-- </template> -->
          </section>
        </article>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          :loading="buttonLoading"
          @click="dialogStatus==='create'?createData():updataData()"
        >{{ dialogStatus==='create'?"添加":"修改" }}</el-button>
      </div>
    </el-dialog>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.page_size"
      @pagination="selectData"
    />
  </div>
</template>
<script>
import {
  getQuestionAndAnswerList,
  addQuestionBank,
  addQuestionAnswer
} from '@/api/answer-puzzles'
import { list } from '@/utils/mixin'
const statusMap = {
  0: '全部',
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5
}
export default {
  name: 'ApplyList',
  mixins: [list],
  data() {
    return {
      textMap: {
        create: '添加',
        change: '修改'
      },
      listQuery: {
        // 分页参数
        page: 1, // 页码
        page_size: 20, // 页码大小'
        grade: '0'
      },
      statusMap: statusMap,
      temp: {
        id: '',
        question: '',
        grade: false,
        correct: '',
        answer0: '',
        answer1: '',
        answer2: '',
        answer3: ''
      },
      dataForm: {
        question: [
          { required: true, message: '请输入题目描述', trigger: 'blur' }
        ],
        grade: [{ required: true, message: '请选择等级', trigger: 'change' }],
        answer0: [{ required: true, message: '请输入选项1', trigger: 'blur' }],
        answer1: [{ required: true, message: '请输入选项2', trigger: 'blur' }],
        answer2: [{ required: true, message: '请输入选项3', trigger: 'blur' }],
        answer3: [{ required: true, message: '请输入选项4', trigger: 'blur' }],
        correct: [
          { required: true, message: '请选择正确答案', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    rank() {
      return this.$store.state.user.rank <= 3
    }
  },
  methods: {
    select() {
      return new Promise((resolve, reject) => {
        getQuestionAndAnswerList(this.listQuery).then(result => {
          resolve(result)
        })
      })
    },
    handleEdit(temp) {
      this.dialogStatus = 'change'
      this.resetTemp()
      this.dialogFormVisible = true
      if (temp.answer_list.length) {
        let correct = temp.answer_list.findIndex(({ correct }) => {
          return correct
        })
        temp.answer_list.forEach(({ answer }, index) => {
          temp[`answer${index}`] = answer
        })
        temp.correct = correct
      }
      Object.assign(this.temp, temp)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    apply(id, status = 3) {
      editUserTrade({ id, status }).then(result => {
        if (result.code === 1) {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.selectData()
            }
          })
        } else {
          this.$notify({
            title: '失败',
            message: '操作失败',
            type: 'error',
            duration: 1000,
            onClose: () => {
              this.selectData()
            }
          })
        }
      })
    },
    create() {
      return new Promise(resolve => {
        let { question, grade } = this.temp
        addQuestionBank({ question, grade }).then(() => {
          resolve()
        })
      })
    },
    updata() {
      return new Promise((resolve, reject) => {
        console.log('updata')
        let { id: question_id, correct } = this.temp
        let answer = []
        for (let index = 0; index < 4; index++) {
          answer.push({
            answer: this.temp[`answer${index}`],
            correct: correct === index ? 1 : 0
          })
        }
        answer = JSON.stringify(answer)
        addQuestionAnswer({ question_id, answer }).then(() => {
          resolve()
        })
      })
    }
  }
}
</script>

<style scoped>
.answer_correct {
  background: red;
  color: white;
}
</style>