<!--
 * @Author: your name
 * @Date: 2019-10-19 17:14:45
 * @LastEditTime: 2019-11-11 11:10:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-user\user-list\index.vue
 -->
<!--
 * @Author: your name
 * @Date: 2019-10-19 17:14:45
 * @LastEditTime: 2019-10-25 19:03:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /c:\Users\14374\Documents\GitHub\vue-admit-template\src\views\manage-user\user-list\index.vue
 -->
<template>
  <div id="user-list" class="app-container">
    <!--<div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="标题"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.importance"
        placeholder="级别"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select
        v-model="listQuery.type"
        placeholder="类型"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >审核人</el-checkbox>
    </div>-->

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      height="calc(100vh - 235px)"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <!-- sortable="custom" -->
      <el-table-column label="用户ID" prop="id" align="center" :class-name="getSortClass('id')">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户账号" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户昵称" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系方式" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>

      <!-- v-if="showReviewer" -->
      <el-table-column label="出生日期" max-width="170px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.birth&&`${scope.row.birth}`.split(" ")[0] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gender===1?'男':'女' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户头像" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.icon" :src="server+scope.row.icon" class="user-avatar" />
        </template>
      </el-table-column>

      <!-- <el-table-column label="职业" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.industry }}</span>
        </template>
      </el-table-column>-->

      <el-table-column label="行业" align="center">
        <template slot-scope="scope">
          <span>{{ industry[scope.row.industry] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="财富值" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gold_amount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
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
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <article class="editForm">
          <section>
            <el-form-item label="标识" prop="tags">
              <el-select v-model="temp.tags" placeholder="请选择">
                <el-option :label="1" :value="1" />
                <el-option :label="2" :value="2" />
                <el-option :label="3" :value="3" />
                <el-option :label="4" :value="4" />
                <el-option :label="5" :value="5" />
                <el-option :label="6" :value="6" />
                <el-option :label="7" :value="7" />
                <el-option :label="8" :value="8" />
                <el-option :label="9" :value="9" />
              </el-select>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="temp.nickname" />
            </el-form-item>
            <el-form-item label="行业" prop="industry">
              <el-select v-model="temp.industry" filterable placeholder="请选择">
                <el-option
                  v-for="(item,index) in industry"
                  :key="index"
                  :label="item"
                  :value="`${index}`"
                />
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="职业" prop="occupation">
              <el-input v-model="temp.occupation" />
            </el-form-item>-->
          </section>
          <section style="margin-left:30px">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="temp.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日" prop="birth">
              <el-date-picker
                v-model="temp.birth"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
              />
            </el-form-item>
            <el-form-item label="头像" prop="icon">
              <el-upload
                ref="upload"
                class="avatar-uploader"
                :show-file-list="false"
                action
                :http-request="beforeAvatarUpload"
              >
                <img
                  v-if="temp.icon"
                  ref="updataImg"
                  :src="/^data/.test(temp.icon)?temp.icon:server+temp.icon"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </section>
        </article>
        <!-- <el-form-item label="地址" prop="address_tag">
          <div class="linkage">
            <el-select
              v-model="activeAddress.province"
              @change="choseProvince"
              placeholder="省级地区"
              filterable
            >
              <el-option
                v-for="(item,index) in address.province"
                :key="index"
                :label="item.label"
                :value="index"
              ></el-option>
            </el-select>
            <el-select
              v-model="activeAddress.city"
              @change="choseCity"
              placeholder="市级地区"
              filterable
            >
              <el-option
                v-for="(item,index) in address.city"
                :key="index"
                :label="item.label"
                :value="index"
              ></el-option>
            </el-select>
            <el-select
              v-model="activeAddress.area"
              @change="choseArea"
              placeholder="区级地区"
              filterable
            >
              <el-option
                v-for="(item,index) in address.area"
                :key="item.value"
                :label="item.label"
                :value="index"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ dialogStatus==='create'?"添加":"修改" }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle,
  industry
} from "@/api/manage-user";
import waves from "@/directive/waves"; // waves directive
import address from "@/assets/address";
import { parseTime } from "@/utils";
import "@/utils/dateFormat.js";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { resizeImage } from "@/utils/handleImage";

const { area, city, province } = address;
const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];
// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});
export default {
  name: "ComplexTable",
  components: {
    Pagination
  },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    const validateCity = (rule, value, callback) => {
      if (!(value && value.length === 3)) {
        callback(new Error("请输入完整的地址"));
      }
      callback();
    };
    return {
      server: this.$store.getters.server,
      tableKey: 0,
      list: null,
      formFile: false,
      total: 0,
      listLoading: true,
      address: {
        area: [],
        city: [],
        province: []
      },
      activeAddress: {
        area: "",
        city: "",
        province: ""
      },
      listQuery: {
        page: 1,
        page_size: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        tags: 1,
        gender: 1,
        icon: false,
        nickname: "",
        birth: "",
        title: "",
        type: "",
        status: "published",
        city: []
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        change: "修改",
        create: "添加"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        tags: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        industry: [{ required: true, message: "请输入行业", trigger: "blur" }],
        occupation: [
          { required: true, message: "请输入职业", trigger: "blur" }
        ],
        birth: [{ required: true, message: "请输入生日", trigger: "blur" }]
        // city: [{ required: true, validator: validateCity, trigger: "blur" }],
        // icon: [{ required: true, trigger: "blur", message: "请选择头像" }]
      },
      downloadLoading: false,
      industry: industry
    };
  },
  watch: {
    activeAddress: {
      handler: function({ province, city, area }, oldVal) {
        if (area !== "") {
          this.temp.address_tag = [province, city, area];
        } else {
          this.temp.address_tag = [];
        }
      },
      deep: true
    },
    dialogFormVisible(to, form) {
      if (to === false) {
        this.$refs["dataForm"].resetFields();
      }
    }
  },
  created() {
    this.getList();
    this.getProvinceData();
  },
  methods: {
    changeCityData() {},
    getProvinceData() {
      this.address.province = province;
    },
    choseProvince(index) {
      this.address.city = city[index];
      this.address.area = [];
      this.activeAddress.city = "";
      this.activeAddress.area = "";
    },
    choseCity(index) {
      this.address.area =
        area[this.activeAddress.province][this.activeAddress.city];
      this.activeAddress.area = "";
    },
    choseArea() {},
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(({ result }) => {
        this.list = result.data;
        this.total = result.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success"
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          createArticle(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.birth = new Date(this.temp.birth);
      this.dialogStatus = "change";
      this.dialogFormVisible = true;
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const {
            tags,
            nickname,
            birth,
            gender,
            icon,
            industry,
            occupation,
            account,
            address_tag
          } = this.temp;
          const tempData = {
            account,
            tags,
            nickname,
            birth,
            gender,
            industry,
            occupation
            // icon
          };
          if (tempData.birth) {
            tempData.birth = tempData.birth.Format("yyyy-MM-dd");
          }
          updateArticle(tempData).then(() => {
            // this.getList();
            for (const v of this.list) {
              if (v.account === this.temp.account) {
                const index = this.list.indexOf(v);
                this.list.splice(index, 1, this.temp);
                break;
              }
            }
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
    },
    handleDelete(row) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status"
        ];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}`
        ? "ascending"
        : sort === `-${key}`
        ? "descending"
        : "";
    },
    blobToDataURL(blob, cb) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        var base64 = evt.target.result;
        cb(base64);
      };
      reader.readAsDataURL(blob);
    },

    async beforeAvatarUpload({ file }) {
      const imageData = await resizeImage(file);
      this.temp.icon = imageData.base64;
      // 图片上传有两种数据格式
      // 1.base64上传，但是需要后端进行转化
      // 2.blob对象（类文件对象）可以直接转化为二进制对象
      // 表单上传的content-type 两种格式
      // 1.multipart/form-data 表单里有文件的上传,form的input会以二进制的方式转过去 窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分。
      // 2.application/x-www-form-urlencoded 窗体数据被编码为名称/值对。这是标准（默认）的编码格式
      const formFile = new FormData(); // 创建一个新的FormData对象 (窗体数据)

      // 在窗体数据中添加一个“部分”
      // 这里添加了一个blob对象，该对象会传输时会转化为二进制，传入服务器进行保存
      // (键,值,图片名称)
      formFile.append("icon", imageData.blob, file.name);
      const { account } = this.temp;
      formFile.append("account", account); // 添加一个键值对,账号account,用于判断是需要修改哪个账号的头像
      updateArticle(formFile).then(() => {
        this.getList();
        this.$notify({
          title: "成功",
          message: "头像更改成功",
          type: "success",
          duration: 2000,
          onClose: () => {
            this.getList();
          }
        });
      });
    }
  }
};
</script>

<style scoped>
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
</style>
