<!--
 * @Author: your name
 * @Date: 2019-12-05 17:51:15
 * @LastEditTime: 2019-12-06 09:40:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\Feedback\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <!-- <article class="filter-container">
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
    </article>-->

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
      <el-table-column label="昵称" prop="nickname" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="图标" prop="icon" align="center">
        <template slot-scope="scope">
          <img :src="server+scope.row.icon" class="user-avatar" v-if="scope.row.icon" />
        </template>
      </el-table-column>

      <el-table-column label="用户id" prop="uid" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.uid }}</span>
        </template>
      </el-table-column>

      <el-table-column label="型号" prop="brand" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brand }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统" prop="system" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.system }}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本" prop="version" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" prop="img" align="center">
        <template slot-scope="scope">
          <img
            :src="server+scope.row.img[0]"
            class="user-avatar"
            v-if="scope.row.img"
            @click="showCarousel(scope.row.img)"
          />
        </template>
      </el-table-column>

      <el-table-column label="描述" prop="describe" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.describe }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" prop="created_at" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
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

    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
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
                  :value="index"
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
          type="primary"
          :loading="buttonLoading"
          @click="dialogStatus==='create'?createData():updataData()"
        >{{ dialogStatus==='create'?"添加":"修改" }}</el-button>
      </div>
    </el-dialog>-->
    <el-dialog title="展示图片" :visible.sync="dialogCarouselVisible">
      <el-carousel
        indicator-position="outside"
        :autoplay="false"
        height="50vh"
        :loop="false"
        arrow="always"
      >
        <el-carousel-item v-for="(item,index) in imagesList" :key="index">
          <figure class="carousel-figure">
            <img :src="server+item" class="carousel-img" />
          </figure>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

 <script>
import { getFeedbackList } from "@/api/Feedback";
import { list } from "@/utils/mixin";
import { Carousel } from "element-ui";
export default {
  name: "Feedback",
  data() {
    return {
      textMap: {
        create: "添加$$",
        change: "修改$$"
      },
      temp: {
        name: undefined
      },
      ruleForm: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      dialogCarouselVisible: false,
      imagesList: []
    };
  },
  mixins: [list],
  methods: {
    showCarousel(images) {
      this.imagesList = images;
      this.$nextTick(() => {
        this.dialogCarouselVisible = true;
      });
    },
    select() {
      return new Promise((resolve, reject) => {
        getFeedbackList(this.listQuery).then(result => {
          resolve(result);
        });
      });
    },
    create() {
      return new Promise((resolve, reject) => {
        $createRequest(this.temp).then(() => {
          resolve();
        });
      });
    },
    updata() {
      return new Promise((resolve, reject) => {
        $updataRequest(this.temp).then(() => {
          resolve();
        });
      });
    },
    delete(temp) {
      return new Promise((resolve, reject) => {
        $deleteRequest(temp).then(() => {
          resolve();
        });
      });
    }
  }
};
</script>

<style scoped>
.carousel-figure {
  margin: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}
.carousel-img {
  height: 100%;
}
</style>