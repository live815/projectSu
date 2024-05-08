<template>
  <div class="message-send-exception-index">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-loading="loading">
      <el-row :gutter="10">
        <el-col :span="6">
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
          <el-form-item :label="$t('message.sendTime')" class="full-width">
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
        <el-col :span="6">
          <el-form-item
            :label="$t('message.stand')"
            prop="siteCode"
            class="full-width"
          >
            <el-select
              v-model="queryParams.siteCode"
              :placeholder="$t('risk.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in siteCodeList"
                :key="item.countryCn"
                :label="item.countryLocal"
                :value="item.countryCn"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('risk.userNameNoQuote')" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="mobile" class="full-width">
            <template #label>
              <span>{{ $t('member.phoneNumberNoQuote') }}</span>
            </template>
            <el-input
              v-model="queryParams.mobile"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery">{{
              $t('risk.search')
            }}</el-button>
            <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
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
      <el-table-column :label="$t('risk.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
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
        :label="$t('risk.userNameNoQuote')"
        align="center"
        width="240"
      >
        <template #default="{ row }">
          <span>{{ row.userName ||  '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.phoneNumberNoQuote')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.mobile || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.sendAction')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ filterLabel(actionTypeList,row.actionType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.exceptionCondition')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.sendErrorMsg || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('message.sendTime')" align="center" width="240">
        <template #default="{ row }">
          <span>{{ row.createTime || '-' }}</span>
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
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { defaultTime, shortcuts } from "@/utils/config";
import { filterLabel } from "@/utils/index";
import { getDicts } from "@/api/system/dict/data";
import { getCountrycodeList } from "@/api/member/list/index";
import { queryCodeList,querySupplierAllList } from "@/api/message/index";

const { proxy } = getCurrentInstance()
const queryRef = ref(null);
const queryParams = ref({
  userName: null, // 会员账号
  mobile: null, // 手机号
  supplierId: null, // 三方短信服务商id
  actionType:null, //发送行为
  siteCode:null, //站点
  sendStatus:1,
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10
})
const dateRange = ref([])
const total = ref(0)
const messageList = ref([])
const siteCodeList = ref([])
const tableData = ref([]); 
const loading = ref(false);
const isFirstLoad = ref(true);
const actionTypeList = ref([]);

onMounted(async () => {
  await queryActionType();
  await queryCountryList();
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
function queryActionType(){
 return getDicts("sys_mobile_action_type").then(res=>{
  actionTypeList.value = res || []
  actionTypeList.value = actionTypeList.value.map(item=>{
    return {
      value:item.dictValue,
      label:item.dictLabel
    }
  })
 })
}
function queryCountryList() {
  return getCountrycodeList().then((res) => {
    siteCodeList.value = res || []
  })
}
function getMessageAllList(){
  return querySupplierAllList().then(res=>{
    messageList.value = res || []
  })
}
function getList() {
  loading.value = true
  return queryCodeList(queryParams.value)
    .then((res) => {
      loading.value = false
      tableData.value = res.records || []
      total.value = res.total || 0
      updateTime.value = new Date().toLocaleString()
    })
    .catch(() => {
      loading.value = false
    })
}
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}
function resetQuery() {
  queryRef.value.resetFields()
  dateRange.value = []
  handleChange()
}
onActivated(async () => {
  if (!isFirstLoad.value) {
    await getList()
  }
})
</script>

<style lang="scss" scoped>
.message-send-exception-index {
}
</style>
