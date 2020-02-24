<!--
 * @Author: your name
 * @Date: 2020-01-07 11:47:57
 * @LastEditTime : 2020-01-17 17:50:11
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
      <section class="form">
        <template v-if="currentSpread!=='all'">
          <section class="form-column">
            <div class="form-item">
              <label>下载单价:</label>
              <span>{{spread_price.down_price}}</span>
            </div>
            <div class="form-item">
              <label>激活单价:</label>
              <span>{{spread_price.activate_price}}</span>
            </div>
            <div class="form-item">
              <label>注册单价:</label>
              <span>{{spread_price.register_price}}</span>
            </div>
          </section>
          <section class="form-column">
            <div class="form-item">
              <label>总下载用户:</label>
              <span>{{total_user}}</span>
            </div>
            <div class="form-item">
              <label>总激活用户:</label>
              <span>{{activate_user}}</span>
            </div>
            <div class="form-item">
              <label>总注册用户:</label>
              <span>{{register_user}}</span>
            </div>
          </section>
          <section class="form-column">
            <div class="form-item">
              <label>总下载收益:</label>
              <span>{{totalObject.down_user_price}}</span>
            </div>
            <div class="form-item">
              <label>总激活收益:</label>
              <span>{{totalObject.activate_user_price}}</span>
            </div>
            <div class="form-item">
              <label>总注册收益:</label>
              <span>{{totalObject.register_user_price}}</span>
            </div>
            <div class="form-item">
              <label>总收益:</label>
              <span>{{total_price}}</span>
            </div>
          </section>
        </template>
        <template v-else>
          <section class="form-column">
            <div class="form-item">
              <label>下载单价:</label>
              <span>{{spread_price.down_price}}</span>
            </div>
            <div class="form-item">
              <label>激活单价:</label>
              <span>{{spread_price.activate_price}}</span>
            </div>
            <div class="form-item">
              <label>注册单价:</label>
              <span>{{spread_price.register_price}}</span>
            </div>
          </section>
        </template>
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
      <el-table-column label="总下载用户数" prop="total_user" align="center">
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
      <el-table-column label="总下载收益" prop="down_user_price" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.down_user_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总注册收益" prop="register_user_price" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.register_user_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总激活收益" prop="activate_user_price" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.activate_user_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总收益" prop="total_price" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total_price }}</span>
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
      register_user: 0,
      spread_price: {
        down_price: 0, // 下载单价
        activate_price: 0, // 激活单价
        register_price: 0 // 注册单价
      },
      totalObject: {
        down_user_price: 0, // 总下载收益
        activate_user_price: 0, // 总激活收益
        register_user_price: 0 // 总注册收益
      },
      total_price: 0 // 总下载收益
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
          this.spread_price = result.result[0].spread_price; // 收益报价
          resolve(result);
        });
      });
    },
    selectSpread(chan) {
      this.listLoading = true;
      getChannelUserData({ chan })
        .then(({ result }) => {
          let {
            total_user,
            activate_user,
            register_user,
            spread_price,
            total_price,
            down_user_price, // 总下载收益
            register_user_price, // 总注册收益
            activate_user_price // 总激活收益
          } = result;
          this.total_user = total_user;
          this.activate_user = activate_user;
          this.register_user = register_user;
          Object.assign(this.totalObject, {
            down_user_price,
            register_user_price,
            activate_user_price
          });
          this.spread_price = spread_price; // 收益报价
          this.total_price = total_price; // 总收益
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
.user-avatar {
  width: 80px;
}
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
.form {
  font-size: 20px;
}
.form-column span {
  color: red;
}
.form-column {
  display: flex;
  font-size: 20px;
}
.form-item {
  min-width: 150px;
  margin: 1px 20px;
}
.form-item label {
  width: 115px;
  text-align: right;
  display: inline-block;
  white-space: nowrap;
}
</style>