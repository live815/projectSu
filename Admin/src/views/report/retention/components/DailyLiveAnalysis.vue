<template>
  <div class="dailyLive-analysis">
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
    <ul>
      <li><strong>普通日活：</strong>当天在线时长5分钟算普通日活</li>
      <li><strong>有效日活：</strong>累积存款>500或有效流水>1000元算有效日活</li>
    </ul>
    <el-table :data="dailyLiveAnalysisList" :empty-text="$t('report.noData')">
      <el-table-column :label="$t('report.reportDayStr')" align="center" prop="reportDay" width="153">
        <template #default="{ row }">
          <span>{{ row.reportDay ? row.reportDay : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.dayActiveSum')" align="center" prop="dayActiveSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.validDayActiveSum')" align="center" prop="validDayActiveSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.webDayActiveSum')" align="center" prop="webDayActiveSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.h5DayActiveSum')" align="center" prop="h5DayActiveSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.androidDayActiveSum')" align="center" prop="androidDayActiveSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.iosDayActiveSum')" align="center" prop="iosDayActiveSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.validWebDayActiveSum')" align="center" prop="validWebDayActiveSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.validH5DayActiveSum')" align="center" prop="validH5DayActiveSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.validAndroidDayActiveSum')" align="center" prop="validAndroidDayActiveSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.validIosDayActiveSum')" align="center" prop="validIosDayActiveSum" width="153">
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
import { getDailyLiveAnalysisList } from "@/api/report/analysismanage/index";

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
const dailyLiveAnalysisList = ref([]);
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
  return getDailyLiveAnalysisList(queryParams.value).then((res) => {
    dailyLiveAnalysisList.value = res?.rows;
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
.dailyLive-analysis {
  height: 100%;
  ul {
    margin: 0 0 20px -40px;
    li {
      list-style: none;
      line-height: 1.7;
    }
  }
}
</style>
