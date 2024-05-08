<template>
  <div class="funds-record-exception-config" v-loading="loading">
    <div class="recharge-exception-header">
      <div class="header-top">
        <div class="left">
          <span class="bar"></span>
          <span class="title">{{ exceptionTitle }}</span>
        </div>
        <div class="right">
          <el-button
            type="primary"
            size="small"
            v-if="!isEdit"
            @click="isEdit = !isEdit"
            >{{ $t('funds.edit') }}</el-button
          >
          <el-button
            type="primary"
            size="small"
            v-if="isEdit"
            @click="isEdit = !isEdit"
            >{{ $t('funds.cancel') }}</el-button
          >
          <el-button type="primary" size="small" v-if="isEdit" @click="submit"
            >{{ $t('funds.save') }}</el-button
          >
        </div>
      </div>
      <div class="header-bottom">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-input
              v-model="hours"
              :placeholder="$t('funds.pleaseInput')"
              clearable
              class="hour-input"
              :disabled="!isEdit"
            ></el-input>
            <span class="ml-8">{{ $t('funds.hoursAddException') }}</span>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="anomalTimes"
              :placeholder="$t('funds.pleaseInput')"
              clearable
              class="times-input"
              :disabled="!isEdit"
            ></el-input>
            <span class="ml-8">{{ $t('funds.timesAutoCloseChannel') }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="header-content-title">
      <span class="bar"></span>
      <span class="title">{{ closeRecordTitle }}</span>
    </div>
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="9">
          <el-form-item :label="$t('funds.operTimeQuote')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('funds.beginTime')"
              :end-placeholder="$t('funds.endTime')"
              @change="handleChange"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('funds.channelType')"
            prop="channelTypeId"
            class="full-width"
          >
            <el-select
              v-model="queryParams.channelTypeId"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in channelTypeIdList"
                :key="dict.id"
                :label="dict.channelName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('funds.storeName')" prop="mchId" class="full-width">
            <el-select
              v-model="queryParams.mchId"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in rechargeTypeList"
                :key="dict.mchId"
                :label="dict.mchName"
                :value="dict.mchId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t("funds.search") }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t("funds.reset") }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" :empty-text="$t('funds.noData')">
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.operTime')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.operType')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{
            row.operType === "0"
              ? $t('funds.closeChannel')
              : row.operType === "1"
              ? $t('funds.startChannel')
              : "-"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.channelTypeNoquote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.channelTypeName ? row.channelTypeName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.storeNameNoquote')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.mchName ? row.mchName : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.exceptionReason')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.remark ? row.remark : "-" }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import {
  getDpExceConfig,
  editDpExceConfig,
  getChannelCloseList,
} from "@/api/funds/record/index";
import { onMounted } from "vue";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["channelTypeIdList", "rechargeTypeList"]);
const { proxy } = getCurrentInstance();
const loading = ref(false);
const exceptionTitle = ref(i18n.global.t("funds.rechargeChanenlExceptionSetting"));
const closeRecordTitle = ref(i18n.global.t("funds.closeRecord"));
const hours = ref(null);
const anomalTimes = ref(null);
const queryRef = ref(null);
const queryParams = ref({
  mchId: null,
  channelTypeId: null,
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const dateRange = ref([]);
const tableData = ref([]);
const total = ref(0);
const isEdit = ref(false);
const isFirstLoad = ref(true);

onMounted(async () => {
  await queryDpExceConfig();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
function queryDpExceConfig() {
  return getDpExceConfig().then((res) => {
    hours.value = res&&res.hours || 0 
    anomalTimes.value = res&&res.anomalTimes || 0
  });
}
function getList() {
  loading.value = true;
  return getChannelCloseList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.rows || [];
      total.value = res.total;
    })
    .catch(() => {
      loading.value = false;
    });
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
}
// 选择时间
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
//修改异常设置时间和次数
function submit(){
  editDpExceConfig({
    hours:hours.value,
    anomalTimes:anomalTimes.value
  }).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t("funds.editConfigSuccessfully"))
    queryDpExceConfig()
    isEdit.value = false
  })
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await queryDpExceConfig();
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-record-exception-config {
  .recharge-exception-header {
    .header-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .left {
        display: flex;
        .bar {
          width: 15px;
          height: 21px;
          background: #1890ff;
        }
        .title {
          color: #333333;
          font-weight: 600;
          font-size: 18px;
          margin-left: 4px;
          line-height: 20px;
        }
      }
    }
    .header-bottom {
      .hour-input {
        width: calc(100% - 112px - 8px);
      }
      .times-input {
        width: calc(100% - 128px - 8px);
      }
      .ml-8 {
        margin-left: 8px;
      }
    }
  }
  .header-content-title {
    display: flex;
    margin-top: 30px;
    margin-bottom: 20px;
    .bar {
      width: 15px;
      height: 21px;
      background: #1890ff;
    }
    .title {
      color: #333333;
      font-weight: 600;
      font-size: 18px;
      margin-left: 4px;
      line-height: 20px;
    }
  }
  .pagination {
    padding-bottom: 10px;
  }
}
</style>
