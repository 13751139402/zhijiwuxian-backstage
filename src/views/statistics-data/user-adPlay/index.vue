<!--
 * @Author: your name
 * @Date: 2020-01-03 17:28:41
 * @LastEditTime: 2020-03-16 13:43:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\statistics-data\user-adPlay\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <article class="filter-container">
      <el-form :inline="true" :model="params" class="demo-form-inline">
        <el-form-item label="类型">
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
        </el-form-item>
        <el-form-item label="时间">
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
        </el-form-item>
        <el-form-item label="渠道细分统计">
          <el-cascader
            @change="initChange"
            :options="ChannelAndNum"
            :props="{ checkStrictly: true}"
            :checkStrictly="true"
            v-model="params.channelList"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="是否查询已经与广告渠道匹配成功的用户">
          <el-switch
            v-model="params.match"
            active-color="#13ce66"
            inactive-color="#bfcbd9"
            :active-value="1"
            :inactive-value="0"
            @change="initChange"
          ></el-switch>
        </el-form-item>

        <el-form-item label="总计">
          <span>{{total_ad_play}}</span>
        </el-form-item>
      </el-form>
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
        type: 2,
        time: "",
        match: 0,
        channelList: [],
        start_time: undefined,
        end_time: undefined
      },
      total_ad_play: 0,
      ChannelNameToSpread: this.$store.state.statistics.ChannelNameToSpread,
      ChannelAndNum: this.$store.state.statistics.ChannelAndNum,
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
    selectData() {
      this.listLoading = true;
      if (this.select) {
        this.select().then(({ result }) => {
          this.list = result.data;
          console.log(result);
          this.total_ad_play = result.total_ad_play;
          this.listLoading = false;
          this.total = result.total;
        });
      } else {
        this.$notify({
          title: "失败",
          message: "请在组件中添加select函数用于查询列表数据",
          type: "error",
          duration: 3000
        });
      }
    },
    select() {
      return new Promise((resolve, reject) => {
        let params = Object.assign({}, this.listQuery, this.params);
        let { channelList } = params;
        let cate = channelList[0];
        let chan = channelList[1];
        let cate_num = channelList[2];
        params = Object.assign(params, { cate, chan, cate_num });
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
.filter-container {
  padding-bottom: 0;
}
.app-containeFr {
  padding-top: 15px;
}
</style>