<!--
 * @Author: your name
 * @Date: 2020-01-07 11:47:57
 * @LastEditTime: 2020-03-16 17:49:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\statistics-data\Channel-UserData\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <article class="filter-container">
      <el-form :inline="true" :model="selectParamas" class="demo-form-inline">
        <el-form-item label="选择推广类型">
          <el-select v-model="selectParamas.type" placeholder="请选择" @change="handleSelectType">
            <el-option label="线下推广" :value="1"></el-option>
            <el-option label="广告投放" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道细分统计" v-show="Showchannel">
          <el-cascader
            @change="chooseSpread"
            :options="ChannelAndNum"
            :props="{ checkStrictly: true}"
            :checkStrictly="true"
            v-model="selectParamas.channelList"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <section class="form">
        <template v-if="!listType">
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
        <template v-else-if="listType&&selectParamas.type!==2">
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
      v-if="listType"
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
      <template v-if="selectParamas.type===1">
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
      </template>
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
      selectParamas: {
        currentSpread: "all",
        channelList: [0],
        type: 2
      },
      Showchannel: false,
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
      total_price: 0, // 总下载收益
      listType: true
    };
  },
  computed: {
    ChannelAndNum() {
      let list = this.$store.state.statistics.ChannelAndNum[2].children;
      list = JSON.parse(JSON.stringify(list));
      list.unshift({
        label: "全部",
        value: 0
      });
      return list;
    }
  },
  mixins: [list],
  methods: {
    handleSelectType() {
      this.Showchannel = this.selectParamas.type === 1 ? true : false;
      this.listType = true;
      this.selectParamas.channelList = [0];
      this.selectData();
    },
    selectData() {
      this.listLoading = true;
      this.select().then(({ result }) => {
        this.list = result;
        this.total = result.length;
        this.listLoading = false;
      });
    },
    select() {
      return new Promise((resolve, reject) => {
        let { channelList, type } = this.selectParamas;
        let chan = channelList[channelList.length - 1];
        getChannelUserDataToSpread({ chan, type }).then(result => {
          this.spread_price = result.result[0].spread_price; // 收益报价
          resolve(result);
        });
      });
    },
    selectSpread(chan) {
      this.listLoading = true;
      getChannelUserData({ chan, type: 1 })
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
      if (this.selectParamas.channelList.length === 1) {
        this.listType = true;
        this.selectData();
      } else {
        this.listType = false;
        let chan = this.selectParamas.channelList[1];
        this.selectSpread(chan);
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