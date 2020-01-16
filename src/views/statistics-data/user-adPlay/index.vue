<!--
 * @Author: your name
 * @Date: 2020-01-03 17:28:41
 * @LastEditTime : 2020-01-07 10:26:10
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\statistics-data\user-adPlay\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <article class="filter-container">
      <section>
        <p>类型：</p>
        <el-select
          v-model="params.type"
          placeholder="请选择活动区域"
          style="width:150px"
          @change="initChange"
        >
          <el-option label="点击" :value="1"></el-option>
          <el-option label="播放" :value="2"></el-option>
          <el-option label="下载" :value="3"></el-option>
        </el-select>
        <p style="margin-left:5px">时间：</p>
        <el-date-picker
          v-model="params.time"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="initChange"
        ></el-date-picker>
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
      <!-- <el-table-column label="版本id" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="账号" prop="account" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" prop="icon" align="center">
        <template slot-scope="scope">
          <img :src="server+scope.row.icon" v-if="scope.row.icon" class="user-avatar" />
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="nickname" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="时间" prop="date_time" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.date_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="总数" prop="amount" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ typeMap[scope.row.type]}}</span>
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
  </div>
</template>

 <script>
import { getUserAdPlay } from "@/api/statistics-data";
import { list } from "@/utils/mixin";
import { format } from "@/utils/dateFormat";

export default {
  name: "user-adPlay",
  data() {
    return {
      textMap: {
        create: "添加$$",
        change: "修改$$"
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      params: {
        type: 1,
        time: "",
        start_time: undefined,
        end_time: undefined
      },
      temp: {},
      ruleForm: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      typeMap: {
        1: "点击",
        2: "播放",
        3: "下载"
      }
    };
  },
  mixins: [list],
  methods: {
    initChange() {
      this.listQuery.page = 1;
      this.listQuery.page_size = 20;
      this.selectData();
    },
    select() {
      return new Promise((resolve, reject) => {
        let params = Object.assign({}, this.listQuery, this.params);
        getUserAdPlay(params).then(result => {
          resolve(result);
        });
      });
    }
  },
  watch: {
    "params.time"(to) {
      if (to) {
        this.params.start_time = to[0].Format("yyyy-MM-dd hh:mm:ss");
        this.params.end_time = to[1].Format("yyyy-MM-dd hh:mm:ss");
      } else {
        this.params.start_time = undefined;
        this.params.end_time = undefined;
      }
    }
  }
};
</script>

<style scoped>
.el-date-editor .el-range-separator {
  display: inline-block;
  height: 100%;
  padding: 0 5px;
  margin: 0;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  width: 5%;
  color: #303133;
}
p {
  display: inline-block;
  margin: 0;
  margin-right: 10px;
}
.filter-container {
  display: block;
}
.user-avatar {
  width: auto;
}
.el-range-editor.el-input__inner {
  padding: 0 10px;
}
</style>