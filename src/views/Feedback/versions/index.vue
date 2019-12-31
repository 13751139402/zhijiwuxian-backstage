<!--
 * @Author: your name
 * @Date: 2019-12-30 17:06:47
 * @LastEditTime : 2019-12-31 14:02:06
 * @LastEditors  : Please set LastEditors
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
      <el-table-column label="版本id" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作系统" prop="os" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.os }}</span>
        </template>
      </el-table-column>
      <el-table-column label="强制更新" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type===1?"是":"否" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本号" prop="version" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.version }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述图片" prop="img" align="center">
        <template slot-scope="scope">
          <img :src="server+scope.row.img" class="user-avatar" />
        </template>
      </el-table-column>

      <el-table-column label="文字描述" prop="describe" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.describe }}</span>
        </template>
      </el-table-column>

      <el-table-column label="福利状态" prop="status" align="center">
        <template slot-scope="scope">
          <span>{{ statusMap[scope.row.status]}}</span>
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
            <el-form-item label="版本号" prop="version">
              <el-input v-model="temp.version" placeholder="请填写版本号" />
            </el-form-item>
            <el-form-item label="福利图片" prop="img">
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
            <el-form-item label="版本描述" prop="describe">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="temp.describe"
                placeholder="请填写版本描述"
              />
            </el-form-item>
            <el-form-item label="操作密码" prop="pwd">
              <el-input v-model="temp.pwd" placeholder="请填写操作密码" />
            </el-form-item>
            <el-form-item label="任务状态" prop="status">
              <el-select v-model="temp.status" placeholder="请选择任务状态">
                <el-option label="正常" :value="1"></el-option>
                <el-option label="预备更新" :value="2"></el-option>
                <el-option label="禁用" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作系统" prop="os">
              <el-radio v-model="temp.os" label="ios">ios</el-radio>
              <el-radio v-model="temp.os" label="android">android</el-radio>
            </el-form-item>
            <el-form-item label="强制更新">
              <el-radio v-model="temp.type" :label="1">是</el-radio>
              <el-radio v-model="temp.type" :label="2">否</el-radio>
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
  getAppVersionList,
  addAppVersion,
  editAppVersion
} from "@/api/Feedback";
import { list, switchFormData } from "@/utils/mixin";
const statusMap = {
  1: "正常",
  2: "预备更新",
  3: "禁用"
};

export default {
  name: "versions",
  data() {
    const isPwd = (rule, value, callback) => {
      if (value !== "rong7664APP") {
        callback(new Error("密码错误,不可操作"));
      } else {
        callback();
      }
    };
    const isVersion = (rule, value, callback) => {
      if (value.test()) {
        callback(new Error("请填写数字类型"));
      } else {
        callback();
      }
    };
    return {
      textMap: {
        create: "添加版本",
        change: "修改版本"
      },
      temp: {
        os: "android",
        type: 1,
        version: undefined,
        image: undefined,
        describe: undefined,
        pwd: undefined,
        status: 1
      },
      ruleForm: {
        version: [
          {
            required: true,
            message: "版本号不能为空",
            trigger: "blur"
          },
          // {
          //   validator: isVersion
          // }
        ],
        describe: [
          { required: true, message: "请填写描述信息", trigger: "blur" }
        ],
        pwd: [{ required: true, validator: isPwd, trigger: "blur" }],
        image: [{ required: true, message: "请选择图片", trigger: "change" }]
      },
      statusMap: statusMap
    };
  },
  mixins: [list],
  methods: {
    /**
     * @description: 显示弹出框，修改模式
     */
    handleEdit(temp) {
      this.dialogStatus = "change";
      this.dialogFormVisible = true;
      Object.assign(this.temp, temp, { image: temp.img });
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    select() {
      return new Promise((resolve, reject) => {
        getAppVersionList(this.listQuery).then(result => {
          resolve(result);
        });
      });
    },
    create() {
      return new Promise((resolve, reject) => {
        let img = document.getElementsByClassName("avatar")[0];
        const data = switchFormData(
          Object.assign({}, this.temp, {
            img: this.imageFile,
            image: "",
            width: img.naturalWidth,
            height: img.naturalHeight
          })
        );
        addAppVersion(data)
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
        let data;
        if (this.imageFile) {
          data = Object.assign({}, this.temp, { img: this.imageFile });
        } else {
          data = Object.assign({}, this.temp);
          Reflect.deleteProperty(data, "img");
        }
        editAppVersion(switchFormData(data))
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    }
  }
};
</script>