<!--
 * @Author: your name
 * @Date: 2019-10-25 19:14:30
 * @LastEditTime : 2019-12-26 17:22:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-user\administrator-list\index.vue
 -->
<template>
  <div id="public-number-promotion" class="app-containeFr">
    <article class="filter-container">
      <section>
        <el-select v-model="listQuery.status" placeholder="请选择任务状态" @change="selectData">
          <el-option
            :label="value"
            :value="Number(key)"
            v-for="(value,key) in statusMap"
            :key="key"
          ></el-option>
        </el-select>
      </section>
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
      <el-table-column label="提现id" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="nickname" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户账号" prop="account" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="贸易id" prop="trade_id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.trade_id }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="类型" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户名称" prop="trade_name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.trade_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现账号" prop="trade_account" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.trade_account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现金额" prop="amount_money" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.amount_money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="nickname" align="center">
        <template slot-scope="scope">
          <span>{{ statusMap[scope.row.status]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="120px"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.status===1">
            <el-button type="primary" size="mini" @click="apply(scope.row.id,2)">提现</el-button>
            <el-button type="primary" size="mini" @click="apply(scope.row.id,3)">拒绝</el-button>
          </template>
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
import { getUserTradeList, editUserTrade } from "@/api/treasure";
import { list } from "@/utils/mixin";
const statusMap = {
  1: "申请中",
  2: "已申请",
  3: "申请失败"
};
export default {
  name: "apply-list",
  data() {
    return {
      textMap: {
        create: "查看",
        change: "修改"
      },
      statusMap: statusMap,
      temp: {
        name: undefined
      },
      ruleForm: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  mixins: [list],
  methods: {
    select() {
      return new Promise((resolve, reject) => {
        getUserTradeList(this.listQuery).then(result => {
          resolve(result);
        });
      });
    },
    apply(id, status = 3) {
      editUserTrade({ id, status }).then(result => {
        if (result.code === 1) {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.selectData();
            }
          });
        } else {
          this.$notify({
            title: "失败",
            message: "操作失败",
            type: "error",
            duration: 1000,
            onClose: () => {
              this.selectData();
            }
          });
        }
      });
    }
  }
};
</script>