<!--
 * @Author: your name
 * @Date: 2020-01-07 11:47:57
 * @LastEditTime : 2020-01-15 18:25:38
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\statistics-data\Channel-UserData\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <article class="filter-container">
      <section>
        <label class="item_label">选择推广员</label>
        <el-select v-model="currentSpread" placeholder="请选择" @change="chooseSpread">
          <el-option label="所有" value="all"></el-option>
          <el-option
            :label="item.spread"
            :value="item.spread"
            v-for="(item) in spreadList"
            :key="item.spread"
          ></el-option>
        </el-select>
      </section>
      <section v-if="currentSpread!=='all'">
        <label class="item_label">
          总下载用户 :
          <span>{{total_user}}</span>
        </label>
        <label class="item_label">
          总激活用户 :
          <span>{{activate_user}}</span>
        </label>
        <label class="item_label">
          总注册用户 :
          <span>{{register_user}}</span>
        </label>
      </section>
    </article>
    <el-table
      v-if="currentSpread==='all'"
      v-loading="listLoading"
      :data="list"
      height="calc(100vh - 235px)"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="渠道号" prop="spread" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.spread }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总用户数" prop="total_user" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total_user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册用户数" prop="register_user" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.register_user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="激活用户数" prop="activate_user" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.activate_user }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-loading="listLoading"
      v-else
      :data="list"
      height="calc(100vh - 235px)"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
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
      <el-table-column label="渠道" prop="channel" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.channel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告播放次数" prop="amount" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
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
import {
  getChannelUserDataToSpread,
  getChannelUserData
} from "@/api/statistics-data";
import { list } from "@/utils/mixin";

export default {
  name: "Channel-UserDataToSpread",
  data() {
    return {
      currentSpread: "all",
      spreadList: [],
      total_user: 0,
      activate_user: 0,
      register_user: 0
    };
  },
  mixins: [list],
  methods: {
    selectData() {
      this.listLoading = true;
      this.select().then(({ result }) => {
        this.list = this.spreadList = result;
        this.total = 0;
        this.listLoading = false;
      });
    },
    select() {
      return new Promise((resolve, reject) => {
        getChannelUserDataToSpread(this.listQuery).then(result => {
          resolve(result);
        });
      });
    },
    selectSpread(chan) {
      this.listLoading = true;
      getChannelUserData({ chan })
        .then(({ result }) => {
          let { total_user, activate_user, register_user } = result;
          this.total_user = total_user;
          this.activate_user = activate_user;
          this.register_user = register_user;
          return result.list;
        })
        .then(result => {
          this.list = result.data;
          this.listLoading = false;
          this.total = result.total;
        });
    },
    chooseSpread(value) {
      if (value === "all") {
        this.selectData();
      } else {
        this.selectSpread(value);
      }
    }
  }
};
</script>

<style scoped>
.item_label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 20px;
  color: #606266;
  height: 100%;
  line-height: 36px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.item_label > span {
  color: red;
}
</style>