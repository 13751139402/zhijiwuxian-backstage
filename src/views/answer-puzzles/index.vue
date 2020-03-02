<!--
 * @Author: your name
 * @Date: 2019-10-25 19:14:30
 * @LastEditTime: 2020-02-28 14:41:49
 * @LastEditors: Please set LastEditors
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
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            @click="categoryListVisible=!categoryListVisible"
            v-if="rank"
          >分类列表</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            @click="rewardVisible=!rewardVisible"
            v-if="rank"
          >奖励列表</el-button>
        </el-form-item>
        <el-form-item label="题目等级">
          <el-select v-model="listQuery.grade" placeholder="请选择题目等级" @change="selectData">
            <el-option v-for="(value,key) of statusMap" :key="key" :label="value" :value="key" />
          </el-select>
        </el-form-item>

        <el-form-item label="题目分类">
          <el-select v-model="listQuery.cate" placeholder="请选择" @change="selectData">
            <el-option label="全部" value="-1"></el-option>
            <el-option v-for="{id,name} of categoryList" :key="id" :label="name" :value="id"></el-option>
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

      <el-table-column label="级别" prop="grade" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.grade }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分类" prop="cate" align="center">
        <template slot-scope="scope">
          <span>{{ categoryObject[scope.row.cate]}}</span>
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

      <el-table-column
        v-if="rank"
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="120px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="deleteData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      style="min-width: 960px"
    >
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
                <el-radio-button label="6"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="题目分类" prop="cate">
              <el-radio-group v-model="temp.cate" v-if="categoryList.length<=5">
                <el-radio-button v-for="{id,name} of categoryList" :key="id" :label="id">{{name}}</el-radio-button>
              </el-radio-group>
              <el-select v-model="temp.cate" placeholder="请选择" v-else>
                <el-option v-for="{id,name} of categoryList" :key="id" :label="name" :value="id"></el-option>
              </el-select>
            </el-form-item>
            <template v-if="dialogStatus==='change'">
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
            </template>
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
    <category-list
      :title="'分类列表'"
      :visible.sync="categoryListVisible"
      :list="categoryListMap.slice(0,categoryListMap.length-1)"
      @createItem="createCateItem"
      @updateItem="updateCateItem"
      @deleteItem="deleteCateItem"
    ></category-list>
    <category-list
      :title="'奖励列表'"
      :visible.sync="rewardVisible"
      :list="rewardList"
      @deleteItem="deleteRewardItem"
      @createItem="createRewardItem"
      @updateItem="updateRewardItem"
    >
      <template #item="{item}">
        <label class="el-form-item__label">闯关级别</label>
        <el-input-number v-model="item.grade" :min="1" label="闯关级别"></el-input-number>
        <label class="el-form-item__label">奖励类型</label>
        <el-select v-model="item.rewardType" placeholder="请选择奖励类型">
          <el-option :label="key" :value="value" v-for="(key,value) of rewardType" :key="key"></el-option>
        </el-select>
        <label class="el-form-item__label">奖励数量</label>
        <el-input-number v-model="item.rewardValue" :min="1" label="奖励数量"></el-input-number>
      </template>
      <template #addItem>
        <label class="el-form-item__label">闯关级别</label>
        <el-input-number v-model="addReward.grade" :min="1" label="闯关级别"></el-input-number>
        <label class="el-form-item__label">奖励类型</label>
        <el-select v-model="addReward.type" placeholder="请选择奖励类型">
          <el-option :label="key" :value="value" v-for="(key,value) of rewardType" :key="key"></el-option>
        </el-select>
        <label class="el-form-item__label">奖励数量</label>
        <el-input-number v-model="addReward.value" :min="1" label="奖励数量"></el-input-number>
      </template>
    </category-list>
  </div>
</template>
<script>
import {
  getQuestionAndAnswerList,
  addQuestionBank,
  addQuestionAnswer,
  deleteQuestionBankAndAnswer,
  getQuestionCateList,
  editQuestionBankAndAnswer,
  editQuestionCate,
  deleteQuestionCate,
  addQuestionCate,
  getRewardType,
  getRewardList,
  addReward,
  deleteReward,
  editReward
} from "@/api/answer-puzzles";
import { list } from "@/utils/mixin";
import categoryList from "./categoryList";
import rewardList from "./rewardList";
const statusMap = {
  0: "全部",
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5
};
export default {
  name: "ApplyList",
  mixins: [list],
  components: {
    "category-list": categoryList,
    "reward-list": rewardList
  },
  data() {
    return {
      textMap: {
        create: "添加",
        change: "修改"
      },
      listQuery: {
        // 分页参数
        page: 1, // 页码
        page_size: 20, // 页码大小'
        grade: "0",
        cate: "-1"
      },
      statusMap: statusMap,
      temp: {
        id: "",
        question: "",
        grade: "",
        cate: "",
        correct: "",
        answer0: "",
        answer1: "",
        answer2: "",
        answer3: ""
      },
      dataForm: {
        question: [
          { required: true, message: "请输入题目描述", trigger: "blur" }
        ],
        grade: [{ required: true, message: "请选择等级", trigger: "change" }],
        cate: [{ required: true, message: "请选择分类", trigger: "change" }],
        answer0: [{ required: true, message: "请输入选项1", trigger: "blur" }],
        answer1: [{ required: true, message: "请输入选项2", trigger: "blur" }],
        answer2: [{ required: true, message: "请输入选项3", trigger: "blur" }],
        answer3: [{ required: true, message: "请输入选项4", trigger: "blur" }],
        correct: [
          { required: true, message: "请选择正确答案", trigger: "change" }
        ]
      },
      // ----- 分类列表
      categoryList: [],
      categoryListMap: [],
      categoryObject: {},
      categoryListVisible: false,
      // ----- 奖励列表
      rewardVisible: true,
      rewardType: {},
      rewardList: [],
      addReward: {
        grade: undefined,
        type: "",
        value: undefined
      }
    };
  },
  computed: {
    rank() {
      return this.$store.state.user.rank <= 3;
    }
  },
  methods: {
    select() {
      return new Promise((resolve, reject) => {
        getQuestionAndAnswerList(this.listQuery).then(result => {
          resolve(result);
        });
      });
    },
    handleEdit(temp) {
      this.dialogStatus = "change";
      this.resetTemp();
      this.dialogFormVisible = true;
      if (temp.answer_list.length) {
        let correct = temp.answer_list.findIndex(({ correct }) => {
          return correct;
        });
        temp.answer_list.forEach(({ answer }, index) => {
          temp[`answer${index}`] = answer;
        });
        temp.correct = correct;
      }
      Object.assign(this.temp, temp);
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    apply(id, status = 3) {
      editUserTrade({ id, status }).then(result => {
        if (result.code === 1) {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.selectData();
            }
          });
        } else {
          this.$notify({
            title: "失败",
            message: "操作失败",
            type: "error",
            duration: 1000,
            onClose: () => {
              this.selectData();
            }
          });
        }
      });
    },
    create() {
      return new Promise(resolve => {
        addQuestionBank(this.temp).then(() => {
          resolve();
        });
      });
    },
    updata() {
      return new Promise(async (resolve, reject) => {
        let { answer_list } = this.temp;
        if (answer_list.length) {
          this.editQuestionBankAndAnswer().then(() => {
            resolve();
          });
        } else {
          this.addQuestionAnswer().then(() => {
            resolve();
          });
        }
      });
    },
    editQuestionBankAndAnswer() {
      return new Promise(resolve => {
        let requestList = [];
        console.log(Object.assign({}, this.temp, { type: 1 }));
        requestList.push(
          editQuestionBankAndAnswer(Object.assign({}, this.temp, { type: 1 }))
        );
        let { correct, answer_list } = this.temp;
        answer_list.forEach(({ id }, index) => {
          requestList.push(
            editQuestionBankAndAnswer({
              type: 2,
              id,
              answer: this.temp[`answer${index}`],
              correct: correct === index ? 1 : 0
            })
          );
        });
        Promise.all(requestList).then(() => {
          resolve();
        });
      });
    },
    addQuestionAnswer() {
      return new Promise(resolve => {
        let { id: question_id, correct } = this.temp;
        let answer = [];
        for (let index = 0; index < 4; index++) {
          answer.push({
            answer: this.temp[`answer${index}`],
            correct: correct === index ? 1 : 0
          });
        }
        answer = JSON.stringify(answer);
        addQuestionAnswer({ question_id, answer }).then(() => {
          resolve();
        });
      });
    },
    delete(data) {
      return new Promise(resolve => {
        data.type = 1;
        deleteQuestionBankAndAnswer(data).then(() => {
          resolve();
        });
      });
    },

    // ------------------------------ 分类列表 ----------------------
    selectCategory() {
      getQuestionCateList().then(({ result }) => {
        this.categoryList = result;
        this.categoryList.push({
          id: 0,
          name: "默认"
        });
        this.categoryObject = result.reduce((target, item) => {
          target[item.id] = item.name;
          return target;
        }, {});
        this.categoryListMap = JSON.parse(JSON.stringify(this.categoryList));
      });
    },
    createCateItem(name) {
      if (this.isEmpty(name)) {
        return;
      }
      addQuestionCate({ name, grade: 0, super_id: 0 })
        .then(() => {
          this.$message({
            type: "success",
            duration: 1000,
            message: "添加成功",
            onClose: () => {
              this.selectCategory();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            duration: 1000,
            message: "添加失败,请稍后再试",
            onClose: () => {
              this.selectCategory();
            }
          });
        });
    },
    deleteCateItem(id) {
      deleteQuestionCate({ id })
        .then(() => {
          this.$message({
            type: "success",
            duration: 1000,
            message: "删除成功",
            onClose: () => {
              this.selectCategory();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            duration: 1000,
            message: "删除失败,请稍后再试",
            onClose: () => {
              this.selectCategory();
            }
          });
        });
    },
    updateCateItem(id, name) {
      if (this.isEmpty(name)) {
        return;
      }
      editQuestionCate({ id, name })
        .then(() => {
          this.$message({
            type: "success",
            duration: 1000,
            message: "修改成功",
            onClose: () => {
              this.selectCategory();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            duration: 1000,
            message: "修改失败,请稍后再试",
            onClose: () => {
              this.selectCategory();
            }
          });
        });
    },
    isEmpty(value) {
      if (value.trim() === "") {
        this.$message({
          type: "warning",
          duration: 1000,
          message: "值不能为空",
          onClose: () => {
            this.selectCategory();
          }
        });
        return true;
      } else {
        return false;
      }
    },

    // ----- 分类列表 END ---

    // ------------------------------ 奖励列表 ----------------------
    getRewardType() {
      getRewardType().then(({ result }) => {
        this.rewardType = result;
      });
    },
    getRewardList() {
      getRewardList().then(({ result }) => {
        this.rewardList = result.map(item => {
          let reward = JSON.parse(item.reward);
          item.rewardType = Object.keys(reward)[0];
          item.rewardValue = Object.values(reward)[0];
          return item;
        });
      });
    },
    deleteRewardItem(id) {
      deleteReward({ id })
        .then(() => {
          this.$message({
            type: "success",
            duration: 1000,
            message: "删除成功",
            onClose: () => {
              this.getRewardList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            duration: 1000,
            message: "删除失败,请稍后再试",
            onClose: () => {
              this.getRewardList();
            }
          });
        });
    },
    createRewardItem() {
      let { grade, type, value } = this.addReward;
      if (!(grade && type && value)) {
        this.$message({
          type: "warning",
          duration: 1000,
          message: "数据不完整,请输入完整"
        });
        return;
      }
      let reward = JSON.stringify({ [type]: value });
      addReward({ grade, reward })
        .then(() => {
          this.$message({
            type: "success",
            duration: 1000,
            message: "添加成功",
            onClose: () => {
              Object.assign(this.addReward, { type: "", grade: undefined, value: undefined });
              this.getRewardList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            duration: 1000,
            message: "添加失败,请稍后再试",
            onClose: () => {
              this.getRewardList();
            }
          });
        });
    },
    updateRewardItem(id) {
      let updateItem = this.rewardList.find(item => {
        return item.id === id;
      });
      let { grade, rewardType, rewardValue } = updateItem;
      if (!(grade && rewardType && rewardValue)) {
        this.$message({
          type: "warning",
          duration: 1000,
          message: "数据不完整,请输入完整"
        });
        return;
      }
      let reward = JSON.stringify({ [rewardType]: rewardValue });
      editReward({ id, grade, reward })
        .then(() => {
          this.$message({
            type: "success",
            duration: 1000,
            message: "修改成功",
            onClose: () => {
              this.getRewardList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            duration: 1000,
            message: "修改失败,请稍后再试",
            onClose: () => {
              this.getRewardList();
            }
          });
        });
    }
  },
  created() {
    this.selectCategory();
    this.getRewardType();
    this.getRewardList();
  }
};
</script>

<style scoped>
.answer_correct {
  background: red;
  color: white;
}
.filter-container {
  padding-bottom: 0;
}
.el-form-item__label {
  display: inline-block;
  float: none;
}
#public-number-promotion >>> .el-form-item {
  margin-bottom: 15px;
}
#public-number-promotion >>> .el-dialog {
  min-width: 960px;
}
</style>