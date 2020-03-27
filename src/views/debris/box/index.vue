<!--
 * @Author: your name
 * @Date: 2019-12-30 17:06:47
 * @LastEditTime: 2020-03-27 14:38:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\Feedback\versions\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <article class="filter-container">
      <section>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >添加</el-button>
      </section>
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
      <el-table-column label="宝箱名称" prop="name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="宝箱图片" prop="image" align="center">
        <template slot-scope="scope">
          <img :src="server+scope.row.image" class="user-avatar" />
        </template>
      </el-table-column>
      <el-table-column label="宝箱等级" prop="level" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包含碎片数" prop="amount" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="120px"
        v-if="rank"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="deleteData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.page_size"
      @pagination="selectData"
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
            <el-form-item label="宝箱名称" prop="name">
              <el-input v-model="temp.name" placeholder="宝箱名称" />
            </el-form-item>
            <el-form-item label="宝箱图片" prop="image">
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
            <el-form-item label="宝箱等级" prop="level">
              <el-select v-model="temp.level" placeholder="宝箱等级">
                <el-option label="1" :value="1"></el-option>
                <el-option label="2" :value="2"></el-option>
                <el-option label="3" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="包含碎片数" prop="amount">
              <el-input
                v-model.number="temp.amount  "
                type="number"
                placeholder="请填写包含碎片数"
                :min="0"
              />
            </el-form-item>
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
  </div>
</template>

 <script>
import {
  getArticlesBox,
  addArticlesBox,
  updateArticlesBox,
  delArticlesBox
} from "@/api/debris";
import { list, switchImageFormData } from "@/utils/mixin";
export default {
  name: "debris",
  data() {
    return {
      temp: {
        id: "",
        name: "",
        image: "",
        level: "",
        amount: ""
      },
      ruleForm: {
        name: [{ required: true, message: "请填写名称", trigger: "change" }],
        image: [
          { required: true, message: "请填写宝箱图片", trigger: "change" }
        ],
        level: [
          { required: true, message: "请填写宝箱等级", trigger: "change" }
        ],
        amount: [
          {
            required: true,
            message: "请填写包含碎片数量",
            trigger: "change"
          }
        ]
      }
    };
  },

  mixins: [list],
  methods: {
    select() {
      return new Promise((resolve, reject) => {
        getArticlesBox(this.listQuery).then(result => {
          resolve(result);
        });
      });
    },
    create() {
      return new Promise((resolve, reject) => {
        try {
          const data = switchImageFormData(this.temp, this.imageFile);
          addArticlesBox(data)
            .then(() => {
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        } catch (error) {
          console.log(error);
        }
      });
    },
    delete(data) {
      return new Promise((resolve, reject) => {
        delArticlesBox(data)
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    updata() {
      return new Promise((resolve, reject) => {
        try {
          const data = switchImageFormData(this.temp, this.imageFile);
          updateArticlesBox(data)
            .then(() => {
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        } catch (error) {
          console.log(error);
        }
      });
    }
  }
};
</script>