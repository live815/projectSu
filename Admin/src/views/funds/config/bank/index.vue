<template>
  <div class="funds-config-bank-index" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="" class="full-width">
            <el-form-item label="" prop="selected" class="half-width" style="margin-right:0">
              <el-select
              v-model="queryParams.selected"
              :placeholder="$t('funds.pleaseSelect')"
              clearable
              @change="clearValid"
              style="width:100%"
            >
              <el-option
                v-for="dict in bankList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
            </el-form-item>
            <el-form-item label="" prop="bankInput" 
            class="half-width" style="margin-right:0"
            :rules="dynamicRules">
              <el-input
                v-model="queryParams.bankInput"
                :placeholder="$t('funds.pleaseInput')"
                style="width:100%"
                clearable
              >
              </el-input>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="16">
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
      <el-table-column :label="$t('funds.handle')" width="80" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="editBank(row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.bankId')"
        prop="id"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.bankNameNoQuote')"
        prop="bankName"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="LOGO"
        prop="icon"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <img :src="getImgUrl(row.icon)" :alt="$t('funds.loadingFail')" v-if="row.icon" style="width:80px">
          <span v-else>{{ $t('funds.noPicture') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.statusC2C')"
        prop="status"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <el-switch v-model="row.status" 
          active-value="0" inactive-value="1"
          @click="changeSwitch(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.isMaintenance')"
        prop="maintenanceState"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <el-switch v-model="row.maintenanceState"
           active-value="0" inactive-value="1"
           @click="changeMaintenance(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.remark')"
        prop="remark"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        :label="$t('funds.lastUpdateByNoQuote')"
        prop="updateBy"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
      <template #default="{row}">
        <span>{{ row.updateBy?row.updateBy:'-' }}</span>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.lastUpdateTimeNoQuote')"
        prop="updateTime"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
      <template #default="{row}">
        <span>{{ row.updateTime?row.updateTime:'-' }}</span>
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
    <BankManageDia
     v-model:open="open"
     :cloneId="cloneId"
     @onrefresh="getList"
     v-if="open" />
  </div>
</template>

<script setup name="Bank">
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getImgUrl } from "@/utils";
import {getBankList,updateBankStatus} from "@/api/funds/config/index"
import BankManageDia from "./components/BankManageDia.vue"

const { proxy } = getCurrentInstance();
// const { sys_sports_type } = proxy.useDict("sys_sports_type");
const queryRef = ref(null);
const queryParams = ref({
  selected:1,
  bankName:null,
  id:null,
  bankInput:null,
  pageNum: 1,
  pageSize: 10,
});
const bankList = ref([
  {
    label: i18n.global.t("funds.bankNameNoQuote"),
    value: 1,
  },
  {
    label: i18n.global.t("funds.bankId"),
    value: 2,
  }
]);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
const open = ref(false)
const cloneId = ref(null);

const dynamicRules = computed(()=>{
  if(queryParams.value.selected===2){
    return [{pattern: /^\d{1,6}$/,message:i18n.global.t("funds.bankIdMustBePositiveInteger"),trigger:"blur"}]
  }else{
    return []
  }
})
const isFirstLoad = ref(true);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList()
    isFirstLoad.value = false
  }
})
function getList() {
  let params = {}
  if(queryParams.value.selected===1){
    params = {
      bankName:queryParams.value.bankInput
    }
  }else if(queryParams.value.selected===2){
    params = {
      id:queryParams.value.bankInput
    }
  }
  loading.value = true
  return getBankList({
    ...params,
    pageNum:queryParams.value.pageNum,
    pageSize:queryParams.value.pageSize
  }).then(res=>{
    loading.value = false
    tableData.value = res.rows || []
    total.value = res.total || 0
  }).catch(()=>{
    // proxy.$modal.msgError('123')
      loading.value = false
  })
}
function clearValid(){
  queryRef.value.clearValidate()
}
function handleQuery() {
  queryRef.value.validate(valid=>{
    if(valid){
      queryParams.value.pageNum = 1;
      getList();
    }else{
      return
    }
  })
}
function resetQuery() {
  queryRef.value.resetFields();
}
function changeMaintenance(row) {
  proxy.$modal.confirms(i18n.global.t("funds.areYouSureToUpdateSwicthStatus"), i18n.global.t("funds.tip")).then(()=>{
    changeStatus(row);
  }).catch(()=>{
    row.maintenanceState = row.maintenanceState==='0'?'1':'0'
  })
}
function changeSwitch(row){
  proxy.$modal.confirms(i18n.global.t("funds.areYouSureToUpdateSwicthStatus"), i18n.global.t("funds.tip")).then(()=>{
    changeStatus(row);
  }).catch(()=>{
    row.status = row.status==='0'?'1':'0'
  })
}
function changeStatus(row){
  updateBankStatus({
    id:row.id,
    maintenanceState:row.maintenanceState,
    status:row.status
  }).then(res=>{
    getList()
    proxy.$modal.msgSuccess(i18n.global.t("funds.updateStatusSuccessfully"))
  })
}
function editBank(row) {
  console.log(row)
  cloneId.value = row.id
  open.value = true
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-config-bank-index {
  padding: 20px;
  padding-bottom: 10px;
  .download-btn {
    background: #f59a23;
    color: #fff;
  }
}
</style>
