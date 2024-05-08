<template>
  <div class="message-uasge-total-index">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-loading="loading">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item
            :label="$t('message.threePartMessage')"
            prop="supplierId"
            class="full-width"
          >
            <el-select
              v-model="queryParams.supplierId"
              :placeholder="$t('risk.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in messageList"
                :key="dict.id"
                :label="dict.supplierName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('message.requestTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('risk.beginTime')"
              :end-placeholder="$t('risk.endTime')"
              @change="handleChange"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery">{{
              $t('risk.search')
            }}</el-button>
            <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
            <el-button
              icon="download"
              @click="handleExport"
              class="download-btn"
              >{{ $t('funds.export') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      max-height="350"
      style="margin-top: 20px"
      :empty-text="$t('risk.noData')"
    >
      <!-- <el-table-column :label="$t('risk.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        :label="$t('message.threePartMessage')"
        align="center"
        width="260"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.supplierName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.requestNum')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.sendTotalCount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.requestSuccess')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.resultSuccessCount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.requestFail')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.resultFailureCount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.sendSuccess')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.sendSuccessCount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('message.sendFail')" align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.sendFailureCount) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('message.requestSuccessRate')" align="center">
        <template #default="{ row }">
          <span>{{ formatDataPercent(row.resultSuccessRatio) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('message.sendSuccessRate')" align="center" width="240">
        <template #default="{ row }">
          <span>{{ formatDataPercent(row.sendSuccessRatio) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { defaultTime, shortcuts } from "@/utils/config";
import { formatNumber,formatDataPercent } from "@/utils/index";
import { querySupplierAllList } from "@/api/message/index";
import { queryStatisticsListList } from "@/api/message/index";

const { proxy } = getCurrentInstance()
const queryRef = ref(null);
const queryParams = ref({
  supplierId: null, // 短信服务商
  beginTime: null,
  endTime: null,
})
const dateRange = ref([])
const tableData = ref([]); 
const loading = ref(false);
const isFirstLoad = ref(true);
const messageList = ref([])

onMounted(async () => {
  await getMessageAllList();
  if (isFirstLoad.value) {
    await getList()
    isFirstLoad.value = false
  }
})
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = null
    queryParams.value.endTime = null
  } else {
    queryParams.value.beginTime = dateRange.value[0]
    queryParams.value.endTime = dateRange.value[1]
  }
}
function getMessageAllList(){
  return querySupplierAllList().then(res=>{
    messageList.value = res || []
  })
}
function getList() {
  loading.value = true
  return queryStatisticsListList(queryParams.value)
    .then((res) => {
      loading.value = false
      tableData.value = res || []
    })
    .catch(() => {
      loading.value = false
    })
}
function handleQuery() {
  getList()
}
function resetQuery() {
  queryRef.value.resetFields()
  dateRange.value = []
  handleChange()
}
function handleExport() {
  // proxy.download(
  //   "/system/fund/deposit/bonus/record/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `${i18n.global.t("message.messageUsageTotal")}${new Date().toLocaleString()}.xlsx`
  // );
}

onActivated(async () => {
  if (!isFirstLoad.value) {
    await getList()
  }
})
</script>

<style lang="scss" scoped>
.message-uasge-total-index {
}
</style>
