<!--
 * @Author: your name
 * @Date: 2020-01-03 17:28:22
 * @LastEditTime: 2020-03-18 14:45:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\statistics-data\user-census\index.vue
 -->
<template>
  <div class="app-containeFr">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="推广渠道粗略统计">
        <el-select v-model="chooseSearchForm.channel" placeholder="推广渠道名称" @change="handleAgetData">
          <el-option
            v-for="(value, name) in searchForm.ChannelNameToSpread"
            :key="name"
            :label="value"
            :value="name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道细分统计">
        <el-cascader
          @change="handleBgetData"
          :options="searchForm.ChannelAndNum"
          :props="{ checkStrictly: true }"
          :checkStrictly="true"
          v-model="chooseSearchForm.channel_num"
        ></el-cascader>
      </el-form-item>
    </el-form>

    <el-form ref="form" :model="form" label-width="180px">
      <div>
        <div class="circle">
          <p>{{form.today_user}}</p>
          <p class="h5">当日新增</p>
        </div>
        <div class="circle">
          <p>{{form.today_survival}}</p>
          <p class="h5">当日活跃--播放</p>
        </div>
        <div class="circle">
          <p>{{form.today_user_play}}</p>
          <p class="h5">当日总播放量</p>
        </div>
        <div class="circle">
          <p>{{form.today_user_survival_play}}</p>
          <p class="h5">人均播放量</p>
        </div>
      </div>
      <div>
        <div class="circle">
          <p>{{form.yesterday_user}}</p>
          <p class="h5">昨日新增</p>
        </div>
        <div class="circle" style="background:#a84156">
          <p>{{form.yesterday_survival}}</p>
          <p class="h5">昨日存活--播放</p>
        </div>
        <div class="circle" style="background:#5c7df4">
          <p>{{form.yesterday_user_survival}}</p>
          <p class="h5">昨日留存--登录</p>
        </div>
        <div class="circle" style="background:#5c7df4">
          <p>{{form.yesterday_user_survival_play}}</p>
          <p class="h5">昨日总播放量</p>
        </div>
        <div class="circle" style="background:#5c7df4">
          <p>{{form.survival_play}}</p>
          <p class="h5">昨日人均播放</p>
        </div>
      </div>
      <div>
        <div class="circle" style="background:#5c7df4">
          <p>{{form.three_days_user_survival}}</p>
          <p class="h5">三天留存</p>
        </div>
        <div class="circle" style="background:#5c7df4">
          <p>{{form.seven_days_user_survival}}</p>
          <p class="h5">7天留存</p>
        </div>
      </div>
      <div>
        <p v-for="(value,name) of AddData" :key="name">{{`${name}:${value}`}}</p>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getUserCensus,timelyDataCensus } from "@/api/statistics-data";
export default {
  data() {
    return {
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
        ChannelNameToSpread: this.$store.state.statistics.ChannelNameToSpread,
        ChannelAndNum: this.$store.state.statistics.ChannelAndNum
      },
      chooseSearchForm: {
        channel: "0",
        channel_num: [0]
      },
      AddData:{}
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
    timelyDataCensus().then(({result})=>{
      this.AddData=result;
    })
    this.getData();
  }
};
</script>

<style scoped>
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