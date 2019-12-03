<!--
 * @Author: your name
 * @Date: 2019-10-25 19:14:30
 * @LastEditTime: 2019-11-11 16:04:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-user\administrator-list\index.vue
 -->
<template>
  <div id="public-number-promotion" class="app-containeFr">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-back"
        @click="linkReturn"
      >返回</el-button>
      <el-select v-model="listQuery.status" placeholder="请选择任务状态" @change="getList">
        <el-option label="正常" :value="1"></el-option>
        <el-option label="异常" :value="2"></el-option>
      </el-select>
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
      <el-table-column label="福利id" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="福利名称" prop="name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="福利图片" prop="image" align="center">
        <template slot-scope="scope">
          <img :src="server+scope.row.image" class="user-avatar" />
        </template>
      </el-table-column>

      <el-table-column label="商品价格" prop="price" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="跳转连接" prop="url" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.url }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务描述" prop="describe" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.describe }}</span>
        </template>
      </el-table-column>

      <el-table-column label="福利状态" prop="status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status==1?"正常":"异常" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="修改时间" prop="updated_at" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at }}</span>
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
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="temp.name" placeholder="请填写商品名称" />
            </el-form-item>
            <el-form-item label="商品图片" prop="image">
              <el-upload
                ref="upload"
                class="avatar-uploader"
                :show-file-list="false"
                action
                :http-request="beforeAvatarUpload"
              >
                <img
                  v-if="temp.image"
                  ref="updataImg"
                  :src="/^data/.test(temp.image)?temp.image:server+temp.image"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="任务描述" prop="describe">
              <el-input v-model="temp.describe" placeholder="请填写任务描述" />
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="temp.price" type="number" placeholder="请填写商品价格" :min="0" />
            </el-form-item>
            <el-form-item label="跳转连接" prop="url">
              <el-input v-model="temp.url" placeholder="请填写跳转连接" />
            </el-form-item>
            <el-form-item label="任务状态" prop="status">
              <el-select v-model="temp.status" placeholder="请选择任务状态">
                <el-option label="正常" :value="1"></el-option>
                <el-option label="异常" :value="2"></el-option>
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
  getRecommendTask,
  addRecommendTask,
  editRecommendTask
} from "@/api/welfare";
import { handleFormData } from "../../../util.js";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  name: "public-number-promotion",
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      total: 0,
      tableKey: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        page_size: 20,
        status: 1
      },
      textMap: {
        create: "添加商品",
        change: "修改商品"
      },
      temp: {
        name: undefined,
        image: undefined,
        describe: undefined,
        price: undefined,
        url: undefined,
        status: 1
      },
      ruleForm: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        image: [
          { required: true, message: "请输入商品图片", trigger: "change" }
        ],
        describe: [
          { required: true, message: "请输入任务描述", trigger: "blur" }
        ],
        price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur"
          }
        ],
        url: [
          { required: true, message: "请输入物品跳转链接", trigger: "blur" }
        ]
      },
      dialogStatus: "create",
      dialogFormVisible: false,
      imageFile: false
    };
  },
  computed: {
    server() {
      return this.$store.getters.server;
    },
    secondId() {
      return this.$store.state.welfare.secondId;
    }
  },
  methods: {
    linkReturn() {
      this.$router.go(-1);
    },
    getList() {
      this.listLoading = true;
      this.listQuery.welfare_id = this.secondId;
      getRecommendTask(this.listQuery).then(({ result }) => {
        this.list = result.data;
        this.listLoading = false;
        this.total = result.total;
      });
    },
    createItem() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          let tempMap = JSON.parse(JSON.stringify(this.temp));
          tempMap.welfare_id = this.secondId;
          tempMap.image = this.imageFile;
          const params = handleFormData(tempMap);
          addRecommendTask(params).then(() => {
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
          let tempMap = JSON.parse(JSON.stringify(this.temp));
          tempMap.welfare_id = this.secondId;
          tempMap.image = this.imageFile;
          const params = handleFormData(tempMap);
          editRecommendTask(params).then(() => {
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

    resetTemp() {
      this.temp = this.$options.data().temp;
    },

    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.resetTemp();
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    handleEdit(temp) {
      this.dialogStatus = "change";
      this.dialogFormVisible = true;
      Object.assign(this.temp, temp);
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    beforeAvatarUpload({ file }) {
      // API 读取 本地文件
      var reader = new FileReader();
      // 将文件读取为base64的格式，也就是可以当成图片的src
      reader.readAsDataURL(file);

      // 读取文件成功后执行的方法函数
      reader.onload = e => {
        this.temp.image = e.target.result;
      };
      this.imageFile = file;
    },

    handleDelete(temp) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          temp.del = 1;
          editRecommendTask(temp).then(() => {
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
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
#public-number-promotion {
  position: absolute;
  top: 0;
  padding: 20px;
  width: 100%;
}
.user-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 5px;
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
