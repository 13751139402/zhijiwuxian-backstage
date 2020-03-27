<!--
 * @Author: your name
 * @Date: 2020-01-03 17:28:22
 * @LastEditTime: 2020-03-21 18:07:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\statistics-data\user-census\index.vue
 -->
<template>
  <div class="app-containeFr">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="推广渠道统计">
        <el-select v-model="chooseSearchForm.channel" placeholder="推广渠道名称" @change="handleAgetData">
          <el-option
            v-for="(value, name) in searchForm.ChannelNameToSpread"
            :key="name"
            :label="value"
            :value="name"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="渠道细分统计">
        <el-cascader
          @change="handleBgetData"
          :options="searchForm.ChannelAndNum"
          :props="{ checkStrictly: true }"
          :checkStrictly="true"
          v-model="chooseSearchForm.channel_num"
        ></el-cascader>
      </el-form-item> -->
    </el-form>

    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="collsaps_title">当日数据</div>
        </template>
        <div class="collapse_text">
          <span>当日新增:</span>
          <span>{{form.today_user}}</span>
        </div>
        <p class="collapse_text">
          <span>当日活跃-播放:</span>
          <span>{{form.today_survival}}</span>
        </p>
        <p class="collapse_text">
          <span>当日总播放量:</span>
          <span>{{form.today_user_play}}</span>
        </p>
        <p class="collapse_text">
          <span>人均播放量:</span>
          <span>{{form.today_user_survival_play}}</span>
        </p>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <div class="collsaps_title">昨日数据</div>
        </template>
        <div class="collapse_text">
          <span>昨日新增:</span>
          <span>{{form.yesterday_user}}</span>
        </div>
        <div class="collapse_text">
          <span>昨日存活-播放:</span>
          <span>{{form.yesterday_survival}}</span>
        </div>
        <div class="collapse_text">
          <span>昨日留存-登录:</span>
          <span>{{form.yesterday_user_survival}}</span>
        </div>
        <div class="collapse_text">
          <span>昨日总播放量:</span>
          <span>{{form.yesterday_user_survival_play}}</span>
        </div>
        <div class="collapse_text">
          <span>昨日人均播放:</span>
          <span>{{form.survival_play}}</span>
        </div>
      </el-collapse-item>
      <el-collapse-item title="留存数据" name="3">
        <template slot="title">
          <div class="collsaps_title">留存数据</div>
        </template>
        <div class="collapse_text">
          <span>三天留存:</span>
          <span>{{form.three_days_user_survival}}</span>
        </div>
        <div class="collapse_text">
          <span>七天留存:</span>
          <span>{{form.seven_days_user_survival}}</span>
        </div>
      </el-collapse-item>
      <el-collapse-item title="其他数据" name="4">
        <template slot="title">
          <div class="collsaps_title">其他数据</div>
        </template>
        <div class="collapse_text" v-for="(value,name) of AddData" :key="name">
          <span>{{name}}:</span>
          <span>{{value}}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { getUserCensus, timelyDataCensus } from "@/api/statistics-data";
export default {
  data() {
    return {
      activeNames: ["1", "2", "3"],
      form: {
        today_user: undefined, // 当日新增
        today_survival: undefined,
        today_user_play: undefined,
        today_user_survival_play: undefined,
        yesterday_user: undefined,
        yesterday_survival: undefined,
        yesterday_user_survival: undefined,
        yesterday_user_survival_play: undefined,
        survival_play: undefined,
        three_days_user_survival: undefined,
        seven_days_user_survival: undefined
      },
      searchForm: {
        ChannelNameToSpread: {'0':"全部","1":"趣头条","2":"今日头条","3":"其他"},
        ChannelAndNum: this.$store.state.statistics.ChannelAndNum
      },
      chooseSearchForm: {
        channel: "0",
        channel_num: [0]
      },
      AddData: {}
    };
  },
  methods: {
    handleAgetData() {
      this.chooseSearchForm.channel_num = [0];
      this.getData();
    },
    handleBgetData() {
      this.chooseSearchForm.channel = "0";
      this.getData();
    },
    getData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      var {
        channel_num: [channel_type, channel, channel_num]
      } = this.chooseSearchForm;
      if (!channel_type) {
        channel = this.chooseSearchForm.channel;
      }
      getUserCensus({
        channel,
        channel_type,
        channel_num
      })
        .then(({ result }) => {
          Object.assign(this.form, result);
          loading.close();
        })
        .catch(() => {
          loading.close();
        });
    }
  },
  mounted() {
    timelyDataCensus().then(({ result }) => {
      this.AddData = result;
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