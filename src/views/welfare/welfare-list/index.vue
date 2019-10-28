<!--
 * @Author: your name
 * @Date: 2019-10-25 19:14:30
 * @LastEditTime: 2019-10-26 18:17:07
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
      height="calc(100vh - 135px)"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="id" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column label="账号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="等级" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rank }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <article class="editForm">
          <section>
            <el-form-item label="账号" prop="account">
              <el-input v-model="temp.account" disabled />
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="temp.pwd" />
            </el-form-item>
            <el-form-item label="等级" prop="rank">
              <el-select v-model="temp.rank" placeholder="请选择">
                <el-option :label="1" :value="1"></el-option>
                <el-option :label="2" :value="2"></el-option>
                <el-option :label="3" :value="3"></el-option>
                <el-option :label="4" :value="4"></el-option>
                <el-option :label="5" :value="5"></el-option>
                <el-option :label="6" :value="6"></el-option>
                <el-option :label="7" :value="7"></el-option>
                <el-option :label="8" :value="8"></el-option>
                <el-option :label="9" :value="9"></el-option>
              </el-select>
            </el-form-item>
          </section>
        </article>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{dialogStatus==='create'?"添加":"修改"}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="createVisible">
      <el-form
        ref="createForm"
        :rules="createRules"
        :model="createTemp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <article class="editForm">
          <section>
            <el-form-item label="名称" prop="name">
              <el-input v-model="createTemp.name" />
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="createTemp.pwd" />
            </el-form-item>
            <el-form-item label="等级" prop="rank">
              <el-select v-model="createTemp.rank" placeholder="请选择">
                <el-option :label="1" :value="1"></el-option>
                <el-option :label="2" :value="2"></el-option>
                <el-option :label="3" :value="3"></el-option>
                <el-option :label="4" :value="4"></el-option>
                <el-option :label="5" :value="5"></el-option>
                <el-option :label="6" :value="6"></el-option>
                <el-option :label="7" :value="7"></el-option>
                <el-option :label="8" :value="8"></el-option>
                <el-option :label="9" :value="9"></el-option>
              </el-select>
            </el-form-item>
          </section>
        </article>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createVisible = false">取消</el-button>
        <el-button type="primary" @click="createData">{{dialogStatus==='create'?"添加":"修改"}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAdminList, adminUpdate, addAdmin } from "@/api/manage-user";
export default {
  data() {
    return {
      list: [],
      formFile: false,
      total: 0,
      tableKey: 0,
      listLoading: false,
      listQuery: {
        account: 1728309
      },
      textMap: {
        edit: "修改",
        create: "添加"
      },
      dialogFormVisible: false, // 显示弹窗
      dialogStatus: false, // 弹窗样式
      createVisible: false,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        rank: [{ required: true, message: "请输入等级", trigger: "blur" }]
      },
      createRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        rank: [{ required: true, message: "请输入级别", trigger: "blur" }]
      },
      temp: {
        id: "",
        account: "",
        name: "",
        pwd: "",
        rank: ""
      },
      createTemp: {
        name: "",
        pwd: "",
        rank: 9
      }
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      getAdminList(this.listQuery).then(({ result }) => {
        this.list = result;
        this.listLoading = false;
      });
    },
    handleEdit(row) {
      this.temp.pwd = "";
      this.temp = Object.assign({}, this.temp, row); // copy obj
      this.dialogStatus = "edit";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.createVisible = true;
      this.$nextTick(() => {
        this.$refs["createForm"].clearValidate();
      });
    },
    handleUpdate(temp) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          temp.del = 1;
          temp.account = 1728309;
          adminUpdate(temp).then(() => {
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
    },
    createData() {
      this.$refs["createForm"].validate(valid => {
        if (valid) {
          const createTemp = Object.assign({}, this.createTemp);
          console.log(createTemp);
          createTemp.account = 1728309;
          addAdmin(createTemp).then(() => {
            this.getList();
            this.$notify({
              title: "成功",
              message: "添加数据成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.createVisible = false;
              }
            });
          });
        }
      });
    },
    resetTemp() {
      this.createTemp = {
        name: "",
        pwd: "",
        rank: 9
      };
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (!this.temp.pwd) {
            delete this.temp.pwd;
          }
          const account = this.temp.account;
          const temp = Object.assign({}, this.temp);
          console.log(temp);
          temp.account = 1728309;
          adminUpdate(temp).then(() => {
            console.log(temp);
            this.getList();
            this.$notify({
              title: "成功",
              message: "修改数据成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.dialogFormVisible = false;
              }
            });
          });
        }
      });
    }
  },
  mounted() {
    this.getList();
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
</style>