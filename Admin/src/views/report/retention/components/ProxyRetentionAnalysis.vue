<template>
  <div class="proxy-retention-analysis">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-form-item :label="$t('report.parentName')" prop="parentName" class="full-width">
            <el-input
                v-model="queryParams.parentName"
                :placeholder="$t('report.pleaseInput')"
                clearable
                class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('report.statisticsTime')" class="full-width">
            <el-date-picker
                v-model="startDate"
                format="YYYY-MM-DD"
                type="date"
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
    <h3>时间周期：{{ queryParams.startDate }}</h3>
    <el-table :data="proxyRetentionAnalysisList" :empty-text="$t('report.noData')">
      <el-table-column :label="$t('report.parentNameNoQuote')" align="center" prop="parentName" width="140">
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
import { getProxyRetentionAnalysisList } from "@/api/report/analysismanage/index";

const { proxy } = getCurrentInstance();

const queryRef = ref(null);
const queryParams = ref({
  parentName: null,
  startDate: null,
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const startDate = ref("");
const proxyRetentionAnalysisList = ref([]);
const isFirstLoad = ref(true);

async function defaultData() {
  const date = new Date();
  const year = date.getFullYear();
  const month = fix(date.getMonth() + 1, 2);
  const day = fix(date.getDate(), 2);
  startDate.value = date;
  queryParams.value.startDate = year + "-" + month + "-" + day;
  await getList();
}

onMounted(async() => {
  if(isFirstLoad.value){
    await defaultData();
    isFirstLoad.value = false
  }
});
const getList = () => {
  return getProxyRetentionAnalysisList(queryParams.value).then((res) => {
    proxyRetentionAnalysisList.value = res?.rows;
    total.value = res?.total;
  });
};
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
// 选择时间
function handleChange() {
  let date = startDate.value;
  const year = date.getFullYear();
  const month = fix(date.getMonth() + 1, 2);
  const day = fix(date.getDate(), 2);
  startDate.value = year + "-" + month + "-" + day;
  queryParams.value.startDate = startDate;
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
.proxy-retention-analysis {
  height: 100%;
  h3 {
    font-weight: bold;
  }
}
</style>
