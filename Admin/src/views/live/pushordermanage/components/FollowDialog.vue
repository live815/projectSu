<template>
  <div class="">
    <el-dialog
      v-model="dialogVisible"
      width="50%"
      :title="$t('live.Numberfollowers')"
      center
      :close-on-click-modal="false"
    >
      <!-- 表格数据 -->
      <el-table v-loading="loading" :data="roleList">
        <el-table-column :label="$t('live.tip171')" prop="" align="center">
          <template #default="scope">
            <div v-if="scope.row.betOrderCode">
              {{ scope.row.betOrderCode }}
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.tip172')"
          prop=""
          :show-overflow-tooltip="true"
          align="center"
        >
          <template #default="scope">
            <div v-if="scope.row.createTime">
              {{ scope.row.createTime }}
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.tip173')"
          prop="gamename"
          align="center"
        >
          <template #default="scope">
            <div v-if="scope.row.memberName">{{ scope.row.memberName }}</div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.Betstatus')"
          align="center"
          prop="betOrderState"
        >
          <template #default="scope">
            <div v-if="scope.row.betOrderState == '0'">
              {{ $t("live.Unsettle") }}
            </div>
            <div v-if="scope.row.betOrderState == '1'">
              {{ $t("live.Settled") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.tip174')"
          align="center"
          prop="betResult"
          width="180"
        >
          <template #default="scope">
            <div v-if="scope.row.betResult == '1'">
              {{ $t("live.win") }}
            </div>
            <div v-if="scope.row.betResult == '2'">
              {{ $t("live.lose") }}
            </div>
            <div v-if="scope.row.betResult == '3'">
              {{ $t("live.winhalf") }}
            </div>
            <div v-if="scope.row.betResult == '4'">
              {{ $t("live.losehalf") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('live.tip1755')"
          align="center"
          prop="followBetAmount"
          width="180"
        >
          <template #default="scope">
            <div v-if="scope.row.followBetAmount">
              {{ scope.row.followBetAmount }}
            </div>
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
    </el-dialog>
  </div>
</template>

<script setup>
import { followOrdersList } from "@/api/live/pushordermanage";

const { proxy } = getCurrentInstance();
const emit = defineEmits(["update:open"]);
const props = defineProps(["open", "pushOrderId"]);
const loading = ref(true);
const total = ref(0);
const roleList = ref([]);
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    pushOrderId: props.pushOrderId,
  },
});
const { queryParams } = toRefs(data);

getList();
/** 查询角色列表 */
function getList() {
  loading.value = true;
  followOrdersList(queryParams.value).then((response) => {
    roleList.value = response.rows || [];
    total.value = response.total;
    loading.value = false;
  });
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
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
