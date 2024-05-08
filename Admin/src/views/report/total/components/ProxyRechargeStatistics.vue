<template>
  <div class="proxy-recharge-statistics">
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
          <el-form-item :label="$t('report.time')" class="full-width">
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
    <el-table :data="proxyRechargeStatisticsList" :empty-text="$t('report.noData')">
      <el-table-column :label="$t('report.parentNameNoQuote')" align="center" prop="parentName" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.newRegCount')" align="center" prop="newRegCount" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.rechargeSum')" align="center" prop="rechargeSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.firstRechargeSum')" align="center" prop="firstRechargeSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.twoDayRechargeSum')" align="center" prop="twoDayRechargeSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.thirdDayRechargeSum')" align="center" prop="thirdDayRechargeSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.fourDayRechargeSum')" align="center" prop="fourDayRechargeSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.fiveDayRechargeSum')" align="center" prop="fiveDayRechargeSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.sixDayRechargeSum')" align="center" prop="sixDayRechargeSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.sevenDayRechargeSum')" align="center" prop="sevenDayRechargeSum" width="153">
      </el-table-column>
      <el-table-column :label="$t('report.fifteenDayRechargeSum')" align="center" prop="fifteenDayRechargeSum" width="153">
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
import { getProxyRechargeStatisticsList } from "@/api/report/analysismanage/index";

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
const proxyRechargeStatisticsList = ref([]);
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
  return getProxyRechargeStatisticsList(queryParams.value).then((res) => {
    proxyRechargeStatisticsList.value = res?.rows;
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
.proxy-recharge-statistics {
  height: 100%;
  h3 {
    font-weight: bold;
  }
}
</style>
