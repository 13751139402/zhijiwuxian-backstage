<!--
 * @Author: your name
 * @Date: 2020-01-03 17:28:22
 * @LastEditTime: 2020-04-10 11:25:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\statistics-data\user-census\index.vue
 -->
<template>
  <div class="app-containeFr">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="推广渠道统计">
        <el-select v-model="chooseSearchForm.channel" placeholder="推广渠道名称" @change="getData">
          <el-option
            v-for="(value, name) in searchForm.ChannelNameToSpread"
            :key="name"
            :label="value"
            :value="name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="chooseSearchForm.date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="getData"
        ></el-date-picker>
      </el-form-item>
    </el-form>

    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="collsaps_title">数据</div>
        </template>
        <div class="collapse_text">
          <span>新增用户:</span>
          <span>{{form.new_user}}</span>
        </div>
        <p class="collapse_text">
          <span>活跃用户:</span>
          <span>{{form.active_user}}</span>
        </p>
        <p class="collapse_text">
          <span>留存用户:</span>
          <span>{{form.survival_user}}</span>
        </p>
        <p class="collapse_text">
          <span>总播放量:</span>
          <span>{{form.user_play}}</span>
        </p>
        <p class="collapse_text">
          <span>人均播放:</span>
          <span>{{form.user_average_play}}</span>
        </p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { dataCensus, getSpread } from "@/api/statistics-data";
export default {
  data() {
    return {
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
      activeNames: ["1"],
      form: {
        new_user: undefined, // 当日新增
        active_user: undefined,
        survival_user: undefined,
        user_play: undefined,
        user_average_play: undefined,
        test: undefined
      },
      searchForm: {
        ChannelNameToSpread: {}
      },
      chooseSearchForm: {
        channel: "spread0",
        date: undefined
      }
    };
  },
  methods: {
    getData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let { channel, date } = this.chooseSearchForm;
      let start_time, end_time;
      if (date) {
        start_time = date[0];
        end_time = date[1];
      }
      dataCensus({ channel, start_time, end_time })
        .then(({ result }) => {
          Object.assign(this.form, result);
          loading.close();
        })
        .catch(() => {
          loading.close();
        });
    }
  },
  created() {
    getSpread().then(({ result }) => {
      this.searchForm.ChannelNameToSpread = result;
    });
    this.getData();
  }
};
</script>

<style scoped>
.app-containeFr >>> .el-collapse-item__content {
  padding-bottom: 10px;
}
.app-containeFr >>> .el-collapse-item__header {
  line-height: 40px;
  height: 40px;
}
.collapse_text {
  font-size: 16px;
  font-weight: 700;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  display: flex;
  align-items: center;
}
.collapse_text *:nth-child(1) {
  color: rgba(0, 0, 0, 0.45);
  width: 114px;
  margin-right: 10px;
  text-align: end;
}
.collapse_text *:nth-child(2) {
  font-size: 20px;
  color: #666;
}
.collsaps_title {
  border-radius: 5px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 18px;
  color: #303133;
  box-sizing: content-box;
  flex: 1;
}
p {
  margin: 0;
  padding: 0;
}
.circle {
  width: 160px;
  height: 160px;
  color: #fff;
  box-shadow: 0 0 15px 0 rgba(12, 24, 16, 0.1);
  border-radius: 10px;
  display: inline-block;
  margin: 10px;
  transition: all 0.5s ease;
}
.circle:nth-of-type(1) {
  background-color: #04cb94;
}
.circle:nth-of-type(2) {
  background-color: #1dd2c6;
}
.circle:nth-of-type(3) {
  background-color: #1eb8f7;
}
.circle:nth-of-type(4) {
  background-color: #486dea;
}
.circle:nth-of-type(5) {
  background-color: #04cb94;
}
.circle:nth-of-type(6) {
  background-color: #04cb94;
}

.circle p:nth-of-type(1) {
  margin-top: 23px;
  color: #fff;
  text-align: center;
  margin-top: 28px;
  color: #fff;
  font-size: 25px;
  text-align: center;
  height: 58.75px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "\5FAE\8F6F\96C5\9ED1", arial, "\5b8b\4f53";
}
.circle p:nth-of-type(2) {
  font-weight: 500;
  line-height: 1.25;
  text-align: center;
  color: #fff;
  margin-top: 25px;
}
</style>