<template>
  <div class="app-container">
    <!-- 表格数据 -->
    <el-table v-loading="loading" :data="roleList">
      <el-table-column :label="'注单号\n三方订单号'" prop="" align="center">
        <template #default="scope">
          <div v-if="orderNo">{{ orderNo }}</div>
          <div v-else>--</div>

          <div v-if="scope.row.betOrderCode">{{ scope.row.betOrderCode }}</div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column
        :label="'下注时间\n派彩时间'"
        prop=""
        :show-overflow-tooltip="true"
        align="center"
      >
        <template #default="scope">
          <div v-if="scope.row.betTime">{{ scope.row.betTime }}</div>
          <div v-else>--</div>
          <div v-if="scope.row.settleTime">
            {{ scope.row.settleTime }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column
        :label="'会员账号名\n游戏账号名'"
        prop=""
        align="center"
      >
        <template #default="scope">
          <div v-if="scope.row.memberName">{{ scope.row.memberName }}</div>
          <div v-else>--</div>
          <div v-if="scope.row.gameAccount">{{ scope.row.gameAccount }}</div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column label="注单状态" align="center" prop="">
        <template #default="scope">
          <span v-if="scope.row.betOrderStateStr">{{ scope.row.betOrderStateStr }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        label="输赢结果"
        align="center"
        prop=""
        width="180"
      >
        <template #default="scope">
          <span v-if="scope.row.betResultStr">{{ scope.row.betResultStr }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="'下注金额\n派彩金额'"
        align="center"
        prop=""
        width="180"
      >
        <template #default="scope">
          <div v-if="scope.row.followBetAmount|| scope.row.followBetAmount == 0">{{ scope.row.followBetAmount }}</div>
          <div v-else>--</div>

          <div v-if="scope.row.settleAmount|| scope.row.settleAmount">{{ scope.row.settleAmount }}</div>
          <div v-else>--</div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getFolloworderList } from "@/api/game/gamebet";
import { computed } from "vue";

const { proxy } = getCurrentInstance();
const route = useRoute();
const loading = ref(true);
const total = ref(0);
const roleList = ref([]);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    betOrderCode: route.query.id,
  },
});
const { queryParams } = toRefs(data);
// 获取注单号
const orderNo=computed(()=>{
  return route.query.orderNo
})
getList();
/** 查询角色列表 */
function getList() {
  loading.value = true;
  getFolloworderList(proxy.addDateRange(queryParams.value)).then((response) => {
    roleList.value = response.records || [];
    total.value = response.total;
    loading.value = false;
  });
}
</script>

<style lang="scss" scoped>
.shuban {
  color: #889eff;
}
.yingban {
  color: red;
}
::v-deep .el-table .cell {
  white-space: pre-wrap;
}
</style>
