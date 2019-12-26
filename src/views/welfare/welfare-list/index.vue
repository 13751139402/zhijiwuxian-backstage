<!--
 * @Author: your name
 * @Date: 2019-10-25 19:14:30
 * @LastEditTime: 2019-12-17 14:32:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\views\manage-user\administrator-list\index.vue
 -->
<template>
  <div id="administrator-list" class="app-containeFr">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      height="calc(100vh - 235px)"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="福利ID" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="福利名称" prop="name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="福利类型" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ typeList[scope.row.type] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="福利描述" prop="describe" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.describe }}</span>
        </template>
      </el-table-column>

      <el-table-column label="福利限定" prop="worth" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.worth }}</span>
        </template>
      </el-table-column>

      <el-table-column label="福利图片" prop="image" align="center">
        <template slot-scope="scope">
          <img :src="server+scope.row.image" class="user-avatar" />
        </template>
      </el-table-column>

      <el-table-column label="福利奖励" prop="reward" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.reward }}</span>
        </template>
      </el-table-column>

      <el-table-column label="过期时间" prop="time_valid" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.time_valid? scope.row.time_valid:'永久' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="福利数量" prop="amount" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否审核" prop="examine" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.examine=="1"?"需要":"不需要" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="福利状态" prop="status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status?"正常":"禁用" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" prop="updated_at" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>

      <el-table-column label="二级操作" prop="deleted_at" align="center">
        <template slot-scope="scope">
          <div class="second-btn" v-if="scope.row.type==4">
            <el-button type="primary" size="mini" @click="linkSecond(scope.row)">公众号推广</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="120px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.page_size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { welfareList, welfareUpdate } from "@/api/welfare";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  name: "welfare-list",
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      formFile: false,
      total: 0,
      server: this.$store.getters.server,
      listLoading: false,
      listQuery: {
        page: 1,
        page_size: 20,
        account: this.$store.getters.account
      }
    };
  },
  computed: {
    typeList() {
      return this.$store.state.welfare.typeList;
    }
  },
  mounted() {
    this.$store.dispatch("welfare/getWelfareType");
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    linkSecond({ type, id, reward }) {
      this.$store.dispatch("welfare/changeSecondData", {
        id: id,
        type: type,
        reward: reward
      });
      this.$router.push({
        path: "public-number-promotion"
      });
    },
    getList() {
      this.listLoading = true;
      welfareList(this.listQuery).then(({ result }) => {
        this.list = result.data;
        this.listLoading = false;
        this.total = result.total;
      });
    },

    handleEdit(temp) {
      this.$store.dispatch("welfare/changeData", {
        data: temp,
        type: "change",
        page: this.listQuery
      });
      this.$router.push({ path: "add-welfare" });
    },
    handleCreate() {
      this.$router.push("add-welfare");
    },
    handleUpdate(temp) {
      this.$confirm("此操作将永久删除该福利, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          temp.del = 1;
          temp.account = this.listQuery.account;
          welfareUpdate(temp).then(() => {
            this.getList();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.dialogFormVisible = false;
              }
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

