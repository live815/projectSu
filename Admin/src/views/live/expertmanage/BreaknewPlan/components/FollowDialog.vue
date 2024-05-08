<template>
  <div class="">
    <el-dialog
      v-model="dialogVisible"
      width="50%"
      :title="$t('live.Numberfollowers')"
      center
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        ref="queryRef"
        :inline="true"
        label-width=""
      >
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item
              :label="$t('live.memberaccount')"
              prop="gamename"
              class="full-width"
            >
              <el-input
                v-model="queryParams.gamename"
                :placeholder="$t('live.pleaseEnter')"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">{{
                $t("live.Inquire")
              }}</el-button>
              <el-button icon="Refresh" @click="resetQuery">{{
                $t("live.reset")
              }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 表格数据 -->
      <el-table :data="tableData">
        <el-table-column
          :label="$t('live.memberaccount')"
          prop="memberName"
          align="center"
        />
        <el-table-column
          :label="$t('live.tip115')"
          prop="betName"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :label="$t('live.tip117')"
          prop="recommendation"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :label="$t('live.OrderAmount')"
          align="center"
          prop="followBetAmount"
        />

        <el-table-column
          :label="$t('live.ProfitAmount')"
          align="center"
          prop="winAmount"
          width="180"
        />
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
const props = defineProps(["open", "rowData"]);

const total = ref(0);
const roleList = ref([]);
const loading = ref();
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
const tableData = computed(() => {
  return roleList.value.map((obj) => ({
    ...obj,
    betName: props.rowData.betName,
    recommendation: props.rowData.recommendation,
  }));
});
const queryParams = ref({
  pushOrderId: props.rowData.id,
  pageNum: 1,
  pageSize: 10,
});
getList();
/** 查询角色列表 */
function getList() {
  loading.value = true;

  followOrdersList(queryParams.value)
    .then((response) => {
      roleList.value = response.rows || [];
      total.value = response.total;
      loading.value = false;
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
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
