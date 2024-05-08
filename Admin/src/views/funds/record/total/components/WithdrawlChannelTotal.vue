<template>
  <div class="withdrawl-channel-total-index">
    <el-row class="btn-group">
      <el-col :span="12">
        <el-button
          size="small"
          :class="{ activebtn: currentIndex === index }"
          v-for="(item, index) in btnList"
          :key="item.label"
          @click="handleQuery(item, index)"
          >{{ item.label }}</el-button
        >
      </el-col>
      <el-col :span="12" style="display: flex; align-items: center">
        <div class="time-range">{{ $t('funds.TimeRanges') }}</div>
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('funds.beginTime')"
          :end-placeholder="$t('funds.endTime')"
          @change="handleChange"
          style="width: 70%"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-table :data="tableData" :empty-text="$t('funds.noData')">
      <el-table-column :label="$t('funds.belongStoreName')" prop="mchName" align="center">
        <template #default="{row}">
          <span>{{ row.mchName||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.channelTypeNoquote')" prop="channelTypeName" align="center">
        <template #default="{row}">
          <span>{{ row.channelTypeName||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.channelCodeNoQuote')" prop="mchChannelCode" width="200" align="center">
        <template #default="{row}">
          <span>{{ row.mchChannelCode||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.channelStatusNoQuote')" prop="status" align="center">
        <template #default="{row}">
          <span v-if="row.status==='0'">{{ $t('funds.normal') }}</span>
          <span v-else-if="row.status==='0'">{{ $t('funds.stopUsing') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.orderTotalNumber')" prop="totalOrder" align="center">
        <template #default="{row}">
          <span>{{ row.totalOrder||row.totalOrder===0?row.totalOrder:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.orderTotalSuccessNumber')" prop="totalSuccessfulOrder" align="center">
        <template #default="{row}">
          <span>{{ row.totalSuccessfulOrder||row.totalSuccessfulOrder===0?row.totalSuccessfulOrder:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.totalAmount')" prop="totalAmount" align="center">
        <template #default="{row}">
          <span>{{ formatNumber(row.totalAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.totalSuccessfulAmount')" prop="totalSuccessfulAmount" align="center">
        <template #default="{row}">
          <span>{{ formatNumber(row.totalSuccessfulAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.successfulRate')" prop="successfulRate" align="center">
        <template #default="{row}">
          <span>{{ row.successfulRate||row.successfulRate===0?(row.successfulRate*100).toFixed()+"%":"-" }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { getDateTime } from "../common/common.js";
import { getWithdrawlListByDatetime } from "@/api/funds/record/index";
import { formatNumber } from "@/utils";
import { defaultTime, shortcuts } from "@/utils/config";

const currentIndex = ref(3);
const btnList = ref(getDateTime());
const dateRange = ref([]);
const queryParams = ref({
  beginTime: null,
  endTime: null,
});

const tableData = ref([]);
const isFirstLoad = ref(true);

onMounted(async ()=>{
  if(isFirstLoad.value){
    await handleQuery(btnList.value[3],3)
    isFirstLoad.value = false
  }
})
function getList(){
  return getWithdrawlListByDatetime(queryParams.value).then(res=>{
    tableData.value = res || []
  })
}

async function handleQuery(item, index) {
  dateRange.value = []
  currentIndex.value = index;
  queryParams.value.beginTime = item.beginTime;
  queryParams.value.endTime = item.endTime;
  getList()
}

function handleChange() {
  currentIndex.value = -1;
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
    getList()
  }
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await handleQuery(btnList.value[currentIndex.value],currentIndex.value)
  }
})
</script>

<style lang="scss" scoped>
.withdrawl-channel-total-index {
  padding: 20px;
  .btn-group {
    margin-bottom: 16px;
    .el-button {
      width: 73px;
    }
    .time-range {
      border: 1px solid rgba(127, 127, 127, 1);
      height: 32px;
      line-height: 32px;
      color: #7f7f7f;
      font-size: 13px;
      padding: 0 4px;
      border-radius: 5px;
      background: #ffffff;
    }
    & .activebtn {
      border: 1px solid red;
      color: #409eff;
    }
  }
}
</style>
