<template>
  <div class="retention-statistics">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="$t('report.timeRange')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              format="YYYY-MM-DD"
              type="daterange"
              range-separator="-"
              :clearable="false"
              :editable="false"
              @change="handleChange"
              class="full-width"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="full-width">
            <el-button
                type="primary"
                icon="Search"
                @click="handleQuery"
            >{{ $t('report.search') }}</el-button
            >
            <el-button  icon="Refresh" @click="reset">{{ $t('report.reset') }}</el-button>
            <el-button
                icon="download"
                @click="handleExport"
                class="exoport-btn"
            >{{ $t('report.export') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="retentionStatisticsList" :empty-text="$t('report.noData')">
      <el-table-column :label="$t('report.reportDayStr')" align="center" prop="reportDay" width="140">
        <template #default="{ row }">
          <span>{{ row.reportDay ? row.reportDay : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.regCountDaily')" align="center" prop="regCount" width="140">
      </el-table-column>
      <el-table-column :label="$t('report.firstDepCount')" align="center" prop="firstDepCount" width="140">
      </el-table-column>
      <el-table-column :label="$t('report.twoDayRetain')" align="center" width="140">
        <template #default="{ row }">
          <span>{{ row.twoDayRetainRatio }}%</span><br />
          <span>{{ row.twoDayRetain }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.threeDayRetain')" align="center" width="140">
        <template #default="{ row }">
          <span>{{ row.threeDayRetainRatio }}%</span><br />
          <span>{{ row.threeDayRetain }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.fourDayRetain')" align="center" width="140">
        <template #default="{ row }">
          <span>{{ row.fourDayRetainRatio }}%</span><br />
          <span>{{ row.fourDayRetain }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.fiveDayRetain')" align="center" width="140">
        <template #default="{ row }">
          <span>{{ row.fiveDayRetainRatio }}%</span><br />
          <span>{{ row.fiveDayRetain }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.sixDayRetain')" align="center" width="140">
        <template #default="{ row }">
          <span>{{ row.sixDayRetainRatio }}%</span><br />
          <span>{{ row.sixDayRetain }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.sevenDayRetain')" align="center" width="140">
        <template #default="{ row }">
          <span>{{ row.sevenDayRetainRatio }}%</span><br />
          <span>{{ row.sevenDayRetain }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.fifteenDayRetain')" align="center" width="140">
        <template #default="{ row }">
          <span>{{ row.fifteenDayRetainRatio }}%</span><br />
          <span>{{ row.fifteenDayRetain }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.thirtyDayRetain')" align="center" width="140">
        <template #default="{ row }">
          <span>{{ row.thirtyDayRetainRatio }}%</span><br />
          <span>{{ row.thirtyDayRetain }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.disposableRetain')" align="center" width="140">
        <template #default="{ row }">
          <span>{{ row.disposableRetainRatio }}%</span><br />
          <span>{{ row.disposableRetain }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { fix } from "@/utils";
import { getRetentionStatisticsList } from "@/api/report/analysismanage/index";

const { proxy } = getCurrentInstance();

const queryRef = ref(null);
const queryParams = ref({
  startDate: null,
  endDate: null,
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const dateRange = ref([]);
const retentionStatisticsList = ref([]);
const isFirstLoad = ref(true);

async function defaultData() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  dateRange.value = [new Date(year, month, 1), date];
  const day = fix(dateRange.value[1].getDate(), 2);
  const yearMonthStr = year + "-" + fix(month + 1, 2) + "-";
  queryParams.value.startDate = yearMonthStr + "01";
  queryParams.value.endDate = yearMonthStr + day;
  await getList();
}

onMounted(async() => {
  if(isFirstLoad.value){
    await defaultData();
    isFirstLoad.value = false
  }
});
const getList = () => {
  return getRetentionStatisticsList(queryParams.value).then((res) => {
    retentionStatisticsList.value = res?.rows;
    total.value = res?.total;
  });
};
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
// 选择时间
function handleChange() {
  let startDate = dateRange.value[0];
  let endDate = dateRange.value[1];
  const year_s = startDate.getFullYear();
  const month_s = fix(startDate.getMonth() + 1, 2);
  const date_s = fix(startDate.getDate(), 2);
  const year_e = endDate.getFullYear();
  const month_e = fix(endDate.getMonth() + 1, 2);
  const date_e = fix(endDate.getDate(), 2);
  startDate = year_s + "-" + month_s + "-" + date_s;
  endDate = year_e + "-" + month_e + "-" + date_e;
  dateRange.value = [startDate, endDate];
  queryParams.value.startDate = startDate;
  queryParams.value.endDate = endDate;
}
const handleExport = () => {
  // proxy.download(
  //   "system/user/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `玩家限制_${new Date().toLocaleDateString()}.xlsx`
  // );
};
const reset = () => {
  queryRef.value.resetFields();
};
onActivated(async()=>{
  if(!isFirstLoad.value){
    await defaultData();
  }
})
</script>

<style lang="scss" scoped>
.retention-statistics {
  height: 100%;
}
</style>
