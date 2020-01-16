<!--
 * @Author: your name
 * @Date: 2020-01-07 11:47:57
 * @LastEditTime : 2020-01-16 10:35:08
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhijiwuxian\src\views\statistics-data\Channel-UserData\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <article class="filter-container" style="font-size: 20px;display: block;">
      <section>
        <p>
          总下载用户 :
          <span>{{total_user}}</span>
        </p>
        <p>
          总激活用户 :
          <span>{{activate_user}}</span>
        </p>
        <p>
          总注册用户 :
          <span>{{register_user}}</span>
        </p>
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
            let { total_user, activate_user, register_user } = result;
            this.total_user = total_user;
            this.activate_user = activate_user;
            this.register_user = register_user;
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
  width: auto;
}
.filter-container span {
  color: red;
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