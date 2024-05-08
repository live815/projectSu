<!-- 通道类型管理 -->
<template>
  <div class="funds-config-aisle-index" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="$t('funds.channelType')" prop="channelCode" class="full-width">
            <el-select
              v-model="queryParams.channelCode"
              :placeholder="$t('funds.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in channelList"
                :key="dict.channelCode"
                :label="dict.channelName"
                :value="dict.channelCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('funds.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('funds.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.handle')" width="160" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="editChannel(row)">{{ $t('funds.edit') }}</el-button>
          <el-button type="primary" size="small" @click="chargeChannel(row)">{{ $t('funds.rechargeTip') }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.channelTypeId')"
        prop="channelCode"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.channelTypeNoquote')"
        prop="channelName"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        label="LOGO"
        prop="icon"
        align="center"
        width="120"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <img :src="getImgUrl(row.icon)" :alt="$t('funds.loadingFail')" v-if="row.icon" style="width:80px">
          <span v-else>{{ $t('funds.noPicture') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.waitForPaymentTimeNoQuote')"
        prop="waitPaymentTime"
        align="center"
        width="160"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.labelNoQuote')"
        prop="label"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.addPercentNoQuote')"
        prop="addPercent"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.dailyLimit')"
        prop="dailyLimit"
        align="center"
        width="120"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.dailyLimit) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.multipleNoQuote')"
        prop="multiple"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.isNeedFirstnameNoQuote')"
        prop="needRealName"
        align="center"
        width="160"
        :show-overflow-tooltip="true"
      >
      <template #default="{ row }">
        <span>{{ changeNameToLabel(row.needRealName) }}</span>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.isNeedBindingTelephone')"
        prop="bindPhoneState"
        align="center"
        width="160"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <el-switch v-model="row.bindPhoneState"
           active-value="1" inactive-value="0"
           @click="changePhone(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.isNeedBindingBankcard')"
        prop="bindCardState"
        align="center"
        width="160"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <el-switch v-model="row.bindCardState"
           active-value="1" 
           inactive-value="0"
           @click="changeCard(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.remark')"
        prop="remark"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.lastUpdateByNoQuote')"
        prop="updateBy"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
      <template #default="{ row }">
        <span>{{ row.updateBy?row.updateBy:'-'}}</span>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.lastUpdateTimeNoQuote')"
        prop="updateTime"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
      <template #default="{ row }">
        <span>{{ row.updateTime?row.updateTime:'-'}}</span>
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
    <ChannelTypeManageDia
     v-model:open="open"
     :cloneId="cloneId"
     :list="fund_channel_type_need_name"
     @onrefresh="getList"
     v-if="open" />
     <EditChargeAlert
     v-model:openContent="openContent"
     :cloneId="cloneId"
     v-if="openContent" />
  </div>
</template>

<script setup name="Aisle">
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getImgUrl } from "@/utils";
import { getSelectAll,getListByPagination,changeStatus } from "@/api/funds/config/index";
import ChannelTypeManageDia from "./components/ChannelTypeManageDia.vue";
import EditChargeAlert from "./components/EditChargeAlert.vue";
import { formatNumber } from "@/utils/index";

const { proxy } = getCurrentInstance();
const { fund_channel_type_need_name } = proxy.useDict("fund_channel_type_need_name");
const queryRef = ref(null);
const queryParams = ref({
  channelCode: null,
  pageNum: 1,
  pageSize: 10,
});
const channelList = ref([]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const cloneId = ref(null);
const open = ref(false)
const openContent = ref(false)
const isFirstLoad = ref(true)

onMounted(async()=>{
  await getChannelList()
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
})
function getChannelList(){
  return getSelectAll().then(res=>{
    channelList.value = res ||[]
  })
}
function getList() {
  loading.value = true
  return getListByPagination(queryParams.value).then(res=>{
    loading.value = false
    tableData.value = res.rows || []
    total.value = res.total
  }).catch(()=>{
      loading.value = false
  })
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
}
function changePhone(row) {
  proxy.$modal.confirms(i18n.global.t("funds.areYouSureToUpdateTelephoneSwicthStatus"), i18n.global.t("funds.tip")).then(()=>{
    updateStatus(row);
  }).catch(()=>{
    row.bindPhoneState = row.bindPhoneState==='0'?'1':'0'
  })
}
function changeCard(row) {
  proxy.$modal.confirms(i18n.global.t("funds.areYouSureToUpdateBankcardSwicthStatus"), i18n.global.t("funds.tip")).then(()=>{
    updateStatus(row);
  }).catch(()=>{
    row.bindCardState = row.bindCardState==='0'?'1':'0'
  })
}
function updateStatus(row){
  changeStatus({
    id:row.id,
    bindCardState:row.bindCardState,
    bindPhoneState:row.bindPhoneState
  }).then(res=>{
    getList()
    proxy.$modal.msgSuccess(i18n.global.t("funds.updateStatusSuccessfully"))
  })
}
function changeNameToLabel(needRealName){
  const item = fund_channel_type_need_name.value.find(name=>name.value === needRealName)
  return item?item.label:'-'
}
function editChannel(row) {
  cloneId.value = row.id
  open.value = true
}
function chargeChannel(row){
  cloneId.value = row.id
  openContent.value = true
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-config-aisle-index {
  padding: 20px;
  padding-bottom: 10px;
  .download-btn {
    background: #f59a23;
    color: #fff;
  }
}
</style>
