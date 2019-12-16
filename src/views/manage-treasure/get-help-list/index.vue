<!--
 * @Author: your name
 * @Date: 2019-10-25 19:14:30
 * @LastEditTime: 2019-12-16 11:26:59
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

      <el-table-column label="文档标题" prop="title" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="文档状态" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ typeMap[scope.row.type] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="文档内容" prop="texts" min-width="300px" align="center">
        <template slot-scope="scope">
          <span class="texts">{{ scope.row.texts }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" prop="created_at" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="120px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">删除</el-button>
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
            <el-form-item label="文档标题" prop="title">
              <el-input v-model="temp.title" />
            </el-form-item>
            <el-form-item label="文档类型" prop="type">
              <el-select v-model="temp.type" placeholder="请选择文档类型">
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="文档形式" prop="texts">
              <el-input v-model="temp.texts" type="textarea" rows="20" />
            </el-form-item>
          </section>
        </article>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updataData()"
        >{{ dialogStatus==='create'?"添加":"修改" }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getHelpList, editHelpText, addHelpText } from "@/api/treasure";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  name: "GetHelpList",
  components: {
    Pagination
  },
  computed: {
    typeMap() {
      let array = this.$store.state.treasure.typeMap;
      let typeMap = array.reduce((target, item) => {
        target[item.key] = item.value;
        return target;
      }, {});
      return typeMap;
    }
  },
  data() {
    return {
      list: [],
      formFile: false,
      total: 0,
      tableKey: 0,
      listLoading: true,
      dialogStatus: "",
      buttonLoading: false,
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        page_size: 20
      },
      temp: {
        title: "",
        type: "",
        texts: ""
      },
      ruleForm: {
        title: [
          { required: true, message: "请填写文档标题", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择文档类型", trigger: "change" }
        ],
        texts: [{ required: true, message: "请填写文档内容", trigger: "blur" }]
      },
      textMap: {
        change: "修改",
        create: "添加"
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getHelpList(this.listQuery).then(({ result }) => {
        this.list = result.data;
        this.listLoading = false;
        this.total = result.total;
      });
    },

    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          addHelpText(this.temp).then(() => {
            this.$notify({
              title: "成功",
              message: "添加文档成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.getList();
                this.buttonLoading = false;
                this.dialogFormVisible = false;
              }
            });
          });
        }
      });
    },
    updataData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          editHelpText(this.temp).then(() => {
            this.$notify({
              title: "成功",
              message: "修改文档成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.getList();
                this.buttonLoading = false;
                this.dialogFormVisible = false;
              }
            });
          });
        }
      });
    },

    handleEdit(temp) {
      this.$store.dispatch("treasure/changeData", {
        data: temp,
        type: "change"
      });
      this.$router.push("./tinymce");
      // this.dialogStatus = "change";
      // this.dialogFormVisible = true;
      // Object.assign(this.temp, temp);
    },
    handleCreate() {
      this.$router.push("./tinymce");
      // this.dialogStatus = "create";
      // this.dialogFormVisible = true;
    },

    handleUpdate(temp) {
      this.$confirm("此操作将永久删除该文档, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          temp.del = 1;
          editHelpText(temp).then(() => {
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
  },
  watch: {
    dialogFormVisible(to, form) {
      if (to === false) {
        this.$refs["dataForm"].resetFields();
      }
    }
  }
};
</script>

<style scoped>
#administrator-list {
  padding: 20px;
}
#administrator-list >>> .el-form--label-right {
  width: 75% !important;
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
