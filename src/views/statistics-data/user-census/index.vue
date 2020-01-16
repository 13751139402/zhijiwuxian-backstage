<!--
 * @Author: your name
 * @Date: 2020-01-03 17:28:22
 * @LastEditTime : 2020-01-09 10:51:50
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\statistics-data\user-census\index.vue
 -->
<template>
  <div class="app-containeFr">
    <el-form ref="form" :model="form" label-width="180px" style="margin:100px">
      <div>
        <div class="circle">
          <p>{{form.yesterday_user}}</p>
          <p class="h5">昨日用户</p>
        </div>
        <div class="circle">
          <p>{{form.yesterday_survival}}</p>
          <p class="h5">昨日存活</p>
        </div>
        <div class="circle">
          <p>{{form.yesterday_user_survival}}</p>
          <p class="h5">昨日留存</p>
        </div>
        <div class="circle">
          <p>{{form.yesterday_user_survival_play}}</p>
          <p class="h5">昨日播放量</p>
        </div>
        <div class="circle">
          <p>{{form.survival_play}}</p>
          <p class="h5">昨日人均播放量</p>
        </div>
      </div>
      <div style="margin-top:50px">
        <div class="circle" style="background:#a84156">
          <p>{{form.three_days_user_survival}}</p>
          <p class="h5">3日留存</p>
        </div>
        <div class="circle" style="background:#5c7df4">
          <p>{{form.seven_days_user_survival}}</p>
          <p class="h5">7日留存</p>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getUserCensus } from "@/api/statistics-data";
export default {
  data() {
    return {
      form: {
        yesterday_user: undefined,
        yesterday_survival: undefined,
        yesterday_user_survival: undefined,
        yesterday_user_survival_play: undefined,
        survival_play: undefined,
        three_days_user_survival: undefined,
        seven_days_user_survival: undefined
      }
    };
  },
  mounted() {
    getUserCensus().then(({ result }) => {
      Object.assign(this.form, result);
    });
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