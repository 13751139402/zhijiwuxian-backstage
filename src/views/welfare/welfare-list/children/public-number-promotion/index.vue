<!--
 * @Author: your name
 * @Date: 2019-10-25 19:14:30
 * @LastEditTime : 2020-01-06 11:28:48
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-user\administrator-list\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <article class="filter-container">
      <section>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-back"
          @click="linkReturn"
        >返回</el-button>
        <el-select v-model="listQuery.status" placeholder="请选择任务状态" @change="selectData">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="异常" :value="2"></el-option>
        </el-select>
        <el-button
          v-if="rank"
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >添加</el-button>
      </section>
      <section>
        <h1>公众号推广</h1>
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
            <el-form-item label="福利名称" prop="name">
              <el-input v-model="temp.name" placeholder="请填写福利名称" />
            </el-form-item>
            <el-form-item label="福利图片" prop="image">
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
            <el-form-item label="福利类型">
              <el-select v-model="showData.type" placeholder="请选择福利类型" disabled>
                <el-option
                  :label="item"
                  :value="Number(index)"
                  v-for="(item,index) in typeList"
                  :key="index"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="任务描述" prop="describe">
              <el-input v-model="describeMap" placeholder="请填写任务描述" disabled />
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
          v-if="rank"
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
  addWelfareListTask,
  welfareListTask,
  editWelfareListTask
} from "@/api/welfare";
import { handleFormData } from "../../../util.js";

import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { mapState } from "vuex";
import { list } from "@/utils/mixin";
export default {
  name: "public-number-promotion",
  components: {
    Pagination
  },
  data() {
    return {
      // ----------------- 自定义数据
      // -- 弹出窗标题
      textMap: {
        create: "添加福利",
        change: "修改福利"
      },
      // -- 临时数据，用于展示弹窗
      temp: {
        name: undefined,
        image: undefined,
        price: undefined,
        url: undefined,
        describe: undefined,
        status: 1
      },
      // -- 弹窗规则判断
      ruleForm: {
        name: [{ required: true, message: "请输入福利名称", trigger: "blur" }],
        image: [
          { required: true, message: "请输入福利图片", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapState("welfare", {
      secondId: state => state.second_id,
      showData: state => state.second_showData,
      typeList: state => state.typeList,
      describeMap: state => `${state.second_showData.reward}趣币`
    }),
    rank() {
      return this.$store.state.user.rank <= 3;
    }
  },
  mixins: [list],
  methods: {
    linkReturn() {
      this.$router.go(-1);
    },
    select() {
      return new Promise((resolve, reject) => {
        this.listQuery.welfare_id = this.secondId;
        welfareListTask(this.listQuery).then(result => {
          resolve(result);
        });
      });
    },
    create() {
      return new Promise((resolve, reject) => {
        let tempMap = JSON.parse(JSON.stringify(this.temp));
        tempMap.describe = this.describeMap;
        tempMap.welfare_id = this.secondId;
        tempMap.image = this.imageFile;
        const params = handleFormData(tempMap);
        addWelfareListTask(params).then(() => {
          resolve();
        });
      });
    },
    updata() {
      return new Promise((resolve, reject) => {
        let tempMap = JSON.parse(JSON.stringify(this.temp));
        tempMap.welfare_id = this.secondId;
        tempMap.image = this.imageFile;
        const params = handleFormData(tempMap);
        editWelfareListTask(params).then(() => {
          resolve();
        });
      });
    },
    delete(temp) {
      return new Promise((resolve, reject) => {
        editWelfareListTask(temp).then(() => {
          resolve();
        });
      });
    }
  },
  watch: {
    describeMap: {
      handler(to) {
        this.temp.describe = to;
      },
      immediate: true
    }
  }
};
</script>
