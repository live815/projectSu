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
      <el-form-item :label="$t('live.pushchatroom')" prop="pushType">
        <el-select
          v-model="queryParams.pushType"
          :placeholder="$t('live.pleaseChose')"
          clearable
          style="width: 220px"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
        :label="$t('live.memberaccount')"
        prop="pushUserName"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('live.pushchatroom1')"
        prop="pushType"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template #default="scope">
          <span v-if="scope.row.pushType == '2'"
            >{{ $t("live.Livechatroom") }}&nbsp;&nbsp;</span
          >
          <span v-if="scope.row.pushType == '3'">{{
            $t("live.LeagueChatRoom")
          }}</span>
        </template>
      </el-table-column>

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
        prop="mainName"
        align="center"
      />
      <el-table-column
        :label="$t('live.awayteam')"
        prop="cusName"
        align="center"
      />
      <el-table-column
        :label="$t('live.Kickofftime')"
        prop="gameTime"
        align="center"
      />
      <el-table-column
        :label="$t('live.tip170')"
        prop="orderTitle"
        align="center"
      />
      <el-table-column
        :label="$t('live.Pushorders')"
        prop="gameId"
        align="center"
      >
        <template #default="scope">
          <span>{{ scope.row.betMarket }}&nbsp;&nbsp;</span>
          <span>{{ scope.row.betOdds }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('live.OrderpushTime1')"
        prop="createTime"
        align="center"
      />
      <el-table-column
        :label="$t('live.Numberfollowers')"
        prop="cusOdds"
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
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();
const { video_sports_type } = proxy.useDict("video_sports_type");
const showSearch = ref(true);
const total = ref(0);
const dateRange = ref([]);
const dateRangetwo = ref([]);
const loading = ref(true);
const tableData = ref([]);
const open = ref(false);
const pushOrderId = ref("");
const options2 = [
  {
    value: "2",
    label: i18n.global.t("live.Livechatroom"),
  },
  {
    value: "3",
    label: i18n.global.t("live.LeagueChatRoom"),
  },
];
const isFirstLoad = ref(true);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
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
// 推单时间
function handleChangetwo() {
  if (
    (dateRangetwo.value && !dateRangetwo.value.length) ||
    dateRangetwo.value == null
  ) {
    queryParams.value.gameBeginTime = "";
    queryParams.value.gameEndTime = "";
  } else {
    queryParams.value.gameBeginTime = dateRangetwo.value[0];
    queryParams.value.gameEndTime = dateRangetwo.value[1];
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
// 点击跟单次数跳转
function handleClick(row) {
  pushOrderId.value = row.betOrderCode;

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
