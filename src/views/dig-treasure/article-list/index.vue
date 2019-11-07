<!--
 * @Author: your name
 * @Date: 2019-10-25 19:14:30
 * @LastEditTime: 2019-11-07 16:12:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-user\administrator-list\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <div class="filter-container">
      <!-- <el-select
        v-model="listQuery.type"
        placeholder="请输入物品类型"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option label="立即生效" value="1" />
        <el-option label="延时生效" value="2" />
        <el-option label="道具" value="3" />
      </el-select>

      <el-select
        v-model="listQuery.conf_type"
        placeholder="请输入爆率类型"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option label="金币" value="1" />
        <el-option label="道具" value="2" />
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">搜索</el-button>-->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
    </div>
    <el-table
      :key="tableKey"
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

      <el-table-column label="物品名称" prop="name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物品类型" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ typeMap[scope.row.type]||'错误' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物品描述" prop="describe" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.describe }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物品级别" prop="stage" align="center">
        <template slot-scope="scope">
          <span>{{ stageMap[scope.row.stage]||"错误" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="默认数量" prop="amount" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.amount}}</span>
        </template>
      </el-table-column>

      <el-table-column label="物品爆率" prop="rate" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rate+'%' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="最小数量" prop="min_amount" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.min_amount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="最大数量" prop="max_amount	" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.max_amount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物品状态" prop="status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status===1?"正常":"异常" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="120px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleChange(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.page_size"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="ruleForm"
        :model="temp"
        label-position="right"
        label-width="100px"
        style="width: 60%; margin-left:50px;"
      >
        <article class="editForm">
          <section>
            <el-form-item label="物品名称" prop="name">
              <el-input v-model.number="temp.name" type="text" placeholder="请填写物品名称" />
            </el-form-item>

            <el-form-item label="物品类型" prop="type">
              <el-select v-model="temp.type" placeholder="请选择物品类型">
                <el-option v-for="(item,name) in typeMap" :label="item" :value="+name" :key="name" />
              </el-select>
            </el-form-item>

            <el-form-item label="物品级别" prop="stage">
              <el-select v-model="temp.stage" placeholder="请选择物品级别">
                <el-option
                  v-for="(item,name) in stageMap"
                  :label="item"
                  :value="+name"
                  :key="name"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="物品描述" prop="describe">
              <el-input v-model.number="temp.describe" type="text" placeholder="请填写物品描述" />
            </el-form-item>

            <el-form-item label="默认数量" :prop="temp.type===4?'amount':''">
              <el-input v-model.number="temp.amount" type="number" placeholder="请填写默认数量" :min="0" />
            </el-form-item>

            <el-form-item label="爆率" :prop="temp.type===4?'rate':''">
              <el-input
                v-model="temp.rate"
                type="number"
                placeholder="请填写爆率"
                :step="0.01"
                :min="0.00"
                :max="100.00"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>

            <el-form-item label="最小数量" :prop="temp.type===1||temp.type===3?'min_amount':''">
              <el-input
                v-model="temp.min_amount"
                type="number"
                placeholder="请填写最小数量"
                :step="1"
                :min="0"
                :max="100"
              ></el-input>
            </el-form-item>

            <el-form-item label="最大数量" :prop="temp.type===1||temp.type===3?'max_amount':''">
              <el-input
                v-model="temp.max_amount"
                type="number"
                placeholder="请填写最大数量"
                :step="1"
                :min="0"
                :max="100"
              ></el-input>
            </el-form-item>

            <el-form-item label="物品级别" prop="status">
              <el-select v-model="temp.status" filterable placeholder="请选择物品级别">
                <el-option label="正常" :value="1" />
                <el-option label="异常" :value="2" />
              </el-select>
            </el-form-item>
          </section>
        </article>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createItem():updataItem()"
        >{{ dialogStatus==='create'?"添加":"修改" }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArticleList,
  addArticle,
  editArticle,
  getPropType
} from "@/api/dig-welfare";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  name: "GetHelpList",
  components: {
    Pagination
  },
  data() {
    var validateBurst = (rule, value, callback) => {
      if (Number(value)) {
        if (value >= 0 && value <= 100) {
          callback();
        } else {
          callback(new Error("请输入0~100的数字"));
        }
      } else {
        callback(new Error("请输入数字"));
      }
    };
    return {
      stageMap: {
        1: "普通",
        2: "进阶",
        3: "高级"
      },
      typeMap: {},
      list: [],
      total: 0,
      tableKey: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        page_size: 20,
        type: undefined,
        conf_type: undefined
      },
      textMap: {
        create: "创建宝箱物品",
        change: "修改宝箱物品"
      },
      temp: {
        name: "",
        type: undefined,
        stage: undefined,
        describe: "",
        amount: undefined,
        rate: undefined,
        min_amount: undefined,
        max_amount: undefined,
        status: 1
      },
      ruleForm: {
        name: [{ required: true, message: "请输入物品名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择物品类型", trigger: "change" }
        ],
        stage: [
          { required: true, message: "请选择物品级别", trigger: "change" }
        ],
        describe: [
          { required: true, message: "请输入物品描述", trigger: "blur" }
        ],
        amount: [
          {
            type: "number",
            message: "请输入数字",
            trigger: "blur",
            required: true
          }
        ],
        rate: [
          {
            trigger: "blur",
            required: true,
            validator: validateBurst
          }
        ],
        min_amount: [
          { required: true, message: "请输入最小数量", trigger: "blur" }
        ],
        max_amount: [
          { required: true, message: "请输入最大数量", trigger: "blur" }
        ]
      },
      dialogStatus: "create",
      dialogFormVisible: false,
      itemList: []
    };
  },
  mounted() {
    this.getList();
    this.getPropType();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getArticleList(this.listQuery).then(({ result }) => {
        this.list = result.data;
        this.listLoading = false;
        this.total = result.total;
      });
    },
    getPropType() {
      getPropType().then(({ result }) => {
        this.typeMap = result.reduce((target, item) => {
          target[item.type] = item.name;
          return target;
        }, {});
      });
    },
    resetTemp() {
      Object.assign(this.temp, this.$options.data().temp);
    },
    createItem() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          addArticle(this.temp).then(() => {
            this.getList();
            this.$notify({
              title: "成功",
              message: "添加成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.dialogFormVisible = false;
              }
            });
          });
        }
      });
    },
    updataItem() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          editArticle(this.temp).then(() => {
            this.getList();
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.dialogFormVisible = false;
              }
            });
          });
        }
      });
    },
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.resetTemp();
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleChange(temp) {
      this.dialogStatus = "change";
      this.dialogFormVisible = true;
      Object.assign(this.temp, temp);
      this.temp.burst_rate = temp.burst_rate * 100;
      this.temp.prop_id = temp.name;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(temp) {
      this.$confirm("此操作将永久删除该物品爆率, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        temp.del = 1;
        editArticle(temp).then(() => {
          this.getList();
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.dialogFormVisible = false;
            }
          });
        });
      });
    }
  }
};
</script>

<style scoped>
#administrator-list {
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
.el-button--mini {
  margin: 2px;
}
.el-button + .el-button {
  margin-left: 0;
}
.texts {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
