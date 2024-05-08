<template>
  <div class="" v-loading="loading">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('live.tip168')" prop="pushUserName">
        <el-input
          v-model="queryParams.pushUserName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item :label="$t('live.sportsType')" prop="sportsType">
        <el-select
          v-model="queryParams.sportsType"
          :placeholder="$t('live.pleaseChose')"
          clearable
          style="width: 220px"
        >
          <el-option
            v-for="dict in video_sports_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('live.event1')" prop="leagueName">
        <el-input
          v-model="queryParams.leagueName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item :label="$t('live.hometeam1')" prop="mainName">
        <el-input
          v-model="queryParams.mainName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item :label="$t('live.awayteam1')" prop="cusName">
        <el-input
          v-model="queryParams.cusName"
          :placeholder="$t('live.pleaseEnter')"
          clearable
          @keyup.enter="handleQuery"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item :label="$t('live.CompetTime')" prop="">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('live.begintime')"
          :end-placeholder="$t('live.endtime')"
          @change="handleChange"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('live.OrderpushTime')" prop="">
        <el-date-picker
          v-model="dateRangetwo"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('live.begintime')"
          :end-placeholder="$t('live.endtime')"
          @change="handleChangetwo"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("live.Inquire")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("live.reset")
        }}</el-button>
        <!-- <el-button
              type="primary"
              icon="download"
              @click="handleExport"
              class="download-btn"
              >导出</el-button
            > -->
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('live.serialNumber')"
        prop="sortNum"
        :show-overflow-tooltip="true"
        align="center"
        width="80px"
      />
      <el-table-column
        :label="$t('live.AnchorName1')"
        prop="pushUserName"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.tip169')"
        prop="liveRoomTitle"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('live.sportsType1')"
        prop="sportsType"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template #default="scope">
          <span v-if="scope.row.sportsType == '1'">{{
            $t("live.soccer")
          }}</span>
          <span v-if="scope.row.sportsType == '2'">{{
            $t("live.basketball")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.event')"
        prop="leagueName"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <el-table-column
        :label="$t('live.hometeam')"
        align="center"
        prop="mainName"
      >
      </el-table-column>
      <el-table-column
        :label="$t('live.awayteam')"
        prop="cusName"
        align="center"
      />
      <el-table-column
        :label="$t('live.Kickofftime')"
        prop="gameTime"
        align="center"
        width="180px"
      />
      <el-table-column
        :label="$t('live.tip170')"
        prop="orderTitle"
        align="center"
      >
      </el-table-column>
      <el-table-column :label="$t('live.Pushorders')" prop="" align="center">
        <template #default="scope">
          <span>{{ scope.row.betMarket }}&nbsp;&nbsp;</span>
          <span>{{ scope.row.betOdds }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.OrderpushTime1')"
        prop="createTime"
        align="center"
        width="180px"
      />
      <el-table-column
        :label="$t('live.Numberfollowers')"
        prop="followNum"
        align="center"
      >
        <template #default="scope">
          <span class="text-color" @click="handleClick(scope.row)">{{
            scope.row.followNum
          }}</span>
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
    <FollowDialog
      v-model:open="open"
      v-if="open"
      v-model:pushOrderId="pushOrderId"
    ></FollowDialog>
  </div>
</template>
<script setup>
import { getOrderManageList } from "@/api/live/pushordermanage";
import FollowDialog from "./FollowDialog.vue";
import { defaultTime } from "@/utils/config";

const { proxy } = getCurrentInstance();
const { video_sports_type } = proxy.useDict("video_sports_type");
const showSearch = ref(true);
const total = ref(0);
const dateRange = ref([]);
const dateRangetwo = ref([]);
const loading = ref(true);
const open = ref(false);
const tableData = ref([]);
const pushOrderId = ref("");
const isFirstLoad = ref(true);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    pushType: "1",
  },
});
const { queryParams } = toRefs(data);

onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
/** 查询列表 */
function getList() {
  loading.value = true;
  return getOrderManageList(queryParams.value).then((response) => {
    tableData.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}
// 比赛时间
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.gameBeginTime = "";
    queryParams.value.gameEndTime = "";
  } else {
    queryParams.value.gameBeginTime = dateRange.value[0];
    queryParams.value.gameEndTime = dateRange.value[1];
  }
}
//推单时间
function handleChangetwo() {
  if (
    (dateRangetwo.value && !dateRangetwo.value.length) ||
    dateRangetwo.value == null
  ) {
    queryParams.value.beginTime = "";
    queryParams.value.endTime = "";
  } else {
    queryParams.value.beginTime = dateRangetwo.value[0];
    queryParams.value.endTime = dateRangetwo.value[1];
  }
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  dateRangetwo.value = [];
  proxy.resetForm("queryRef");
  handleChange();
  handleChangetwo();
  handleQuery();
}
// function handleExport() {
//   proxy.download(
//     "system/push/order/export",
//     {
//       ...queryParams.value,
//     },
//     `推单管理_${new Date().toLocaleString()}.xlsx`
//   );
// }
// 点击跟单次数跳转
function handleClick(row) {
  pushOrderId.value = row.id;
  open.value = true;
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell {
  white-space: pre-wrap;
}
.el-form--inline .el-form-item {
  margin-right: 30px;
}
.text-color {
  color: #1890ff;
}
</style>
