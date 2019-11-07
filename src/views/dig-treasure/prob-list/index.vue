<!--
 * @Author: your name
 * @Date: 2019-10-25 19:14:30
 * @LastEditTime: 2019-11-07 15:59:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-user\administrator-list\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <div class="filter-container">
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

      <el-table-column label="物品类型" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type|propType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物品名称" prop="name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物品描述" prop="describe" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.describe }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物品爆率" prop="burst_rate" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.burst_rate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="过期时间" prop="expire_time" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.expire_time?scope.row.expire_time+'分钟':"永久" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物品状态" prop="status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status==1?"正常":"异常" }}</span>
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
              <el-input v-model="temp.name" placeholder="请填写物品名称" />
            </el-form-item>
            <el-form-item label="物品类型" prop="type">
              <el-select v-model="temp.type" placeholder="请选择物品类型">
                <el-option label="普通" :value="1" />
                <el-option label="进阶" :value="2" />
                <el-option label="高级" :value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="物品描述" prop="describe">
              <el-input v-model="temp.describe" type="textarea" placeholder="请填写物品目标" />
            </el-form-item>

            <el-form-item label="物品爆率" prop="burst_rate">
              <el-input
                v-model="temp.burst_rate"
                type="number"
                placeholder="请填写物品爆率爆率"
                :step="0.01"
                :min="0.00"
                :max="100.00"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>

            <el-form-item label="过期时间" prop="expire_time">
              <el-input
                v-model="temp.expire_time"
                type="number"
                placeholder="请填写过期时间,不填则永久"
                :min="0"
              >
                <template slot="append">分钟</template>
              </el-input>
            </el-form-item>

            <el-form-item label="状态" prop="status">
              <el-select v-model="temp.status" placeholder="请选择状态">
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
import { getPropList, addProp, editProp } from "@/api/dig-welfare";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  name: "GetHelpList",
  filters: {
    propType(text) {
      switch (text) {
        case 1:
          return "普通";
          break;
        case 2:
          return "进阶";
          break;
        case 3:
          return "高级";
          break;
        default:
          return "类型错误";
      }
    }
  },
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
      list: [],
      total: 0,
      server: this.$store.getters.server,
      tableKey: 0,
      account: this.$store.getters.account,
      listLoading: false,
      listQuery: {
        page: 1,
        page_size: 20,
        account: this.$store.getters.account
      },
      textMap: {
        create: "添加物品",
        change: "修改物品"
      },
      temp: {
        name: "",
        type: undefined,
        describe: undefined,
        burst_rate: undefined,
        expire_time: undefined,
        status: 1
      },
      ruleForm: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        type: [{ required: true, message: "请输入物品类型", trigger: "blur" }],
        amount: [
          { required: true, message: "请输入物品数量", trigger: "blur" }
        ],
        affect: [
          { required: true, message: "请输入作用目标", trigger: "blur" }
        ],
        describe: [
          { required: true, message: "请输入物品描述", trigger: "blur" }
        ],
        burst_rate: [
          {
            trigger: "blur",
            required: true,
            validator: validateBurst
          }
        ]
      },
      dialogStatus: "create",
      dialogFormVisible: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getPropList(this.listQuery).then(({ result }) => {
        this.list = result.data;
        this.listLoading = false;
        this.total = result.total;
      });
    },
    resetTemp() {
      this.temp = {
        name: "",
        type: undefined,
        amount: undefined,
        affect: "[]",
        describe: undefined,
        status: undefined
      };
    },
    createItem() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.account = this.account;
          addProp(this.temp).then(() => {
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
          addProp(this.temp).then(() => {
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
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(temp) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          temp.del = 1;
          editProp(temp).then(() => {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
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
