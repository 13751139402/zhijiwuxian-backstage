<!--
 * @Author: your name
 * @Date: 2020-01-07 11:47:57
 * @LastEditTime : 2020-01-17 17:09:38
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\statistics-data\Channel-UserData\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <article class="filter-container" style="font-size: 20px;display: block;">
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
      <p style="margin-top:2px">
        下载链接:
        <span>{{down_url}}</span>
        <el-button size="small" @click="copy(down_url)">一键复制</el-button>
        <a :href="down_url">
          <el-button size="small">一键下载</el-button>
        </a>
      </p>
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
import { getChannelUserData, getChanUserInfo } from "@/api/statistics-data";
import { Message } from "element-ui";
import { list } from "@/utils/mixin";

export default {
  name: "Channel-UserData",
  data() {
    return {
      textMap: {
        create: "添加$$",
        change: "修改$$"
      },
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
      down_url: "",
      temp: {
        name: undefined
      },
      ruleForm: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  computed: {
    chan() {
      return this.$store.state.user.account;
    },
    server() {
      return this.$store.getters.server + "/";
    }
  },
  mixins: [list],
  methods: {
    selectData() {
      this.listLoading = true;
      if (this.select) {
        this.select().then(result => {
          this.list = result.data;
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
    down(url) {
      let a = document.getElementById("down");
      if (!a) {
        a = document.createElement("a");
        a.setAttribute("id", "down");
        document.body.appendChild(a);
      }
    },
    copy(url) {
      let input = document.getElementById("copy");
      if (!input) {
        input = document.createElement("input");
        input.setAttribute("id", "copy");
        document.body.appendChild(input);
      }
      input.setAttribute("value", url);
      input.select();
      document.execCommand("Copy");
      Message({
        message: "复制成功",
        type: "success",
        duration: 1000
      });
    },
    select() {
      return new Promise((resolve, reject) => {
        getChanUserInfo({ chan: this.chan }).then(({ result }) => {
          this.down_url = this.server + result.down_url;
          getChannelUserData({ chan: result.chan }).then(({ result }) => {
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
            resolve(result.list);
          });
        });
      });
    }
  }
};
</script>

<style scoped>
.user-avatar {
  width: 80px;
}
.filter-container span {
  color: red;
}
.form-column {
  display: flex;
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
p {
  display: inline-block;
  margin: 0;
  margin-right: 10px;
}
.app-containeFr {
  padding: 20px;
  padding-top: 10px;
}
</style>