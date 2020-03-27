<!--
 * @Author: your name
 * @Date: 2019-12-30 17:06:47
 * @LastEditTime: 2020-03-27 14:42:29
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
      <el-table-column label="卡片图片" prop="image" align="center">
        <template slot-scope="scope">
          <img :src="server+scope.row.image" class="user-avatar" />
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
            <el-form-item label="卡片图片" prop="image">
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
  getArticlesBanner,
  addArticlesBanner,
  updateArticlesBanner,
  delArticlesBanner
} from "@/api/debris";
import { list, switchImageFormData } from "@/utils/mixin";
export default {
  name: "debris",
  data() {
    return {
      temp: {
        image: ""
      },
      ruleForm: {
        image: [
          { required: true, message: "请填写卡片图片", trigger: "change" }
        ]
      }
    };
  },

  mixins: [list],
  methods: {
    select() {
      return new Promise((resolve, reject) => {
        getArticlesBanner(this.listQuery).then(result => {
          resolve(result);
        });
      });
    },
    create() {
      return new Promise((resolve, reject) => {
        try {
          const data = switchImageFormData(this.temp, this.imageFile);
          addArticlesBanner(data)
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
        delArticlesBanner(data)
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
          updateArticlesBanner(data)
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