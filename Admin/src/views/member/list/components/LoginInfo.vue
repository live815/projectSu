<template>
  <div class="member-detail-login-info">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('member.loginTimeQuote')"  class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.statusQuote')" prop="status" class="full-width">
            <el-select
              v-model="queryParams.status"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" icon="Search" @click="handleQuery"
            >{{ $t('member.search') }}</el-button
          >
          <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" :empty-text="$t('member.noData')">
        <el-table-column :label="$t('member.loginTime')" align="center" :show-overflow-tooltip="true">
          <template #default="{row}">
            <span>{{ row.loginTime||"-" }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.status')" align="center" :show-overflow-tooltip="true" width="80">
          <template #default="{row}">
            <span>
              {{ row.status===0?$t('member.success'):row.status===1?$t('member.reject'):"-" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.IPAddress')" align="center" :show-overflow-tooltip="true">
          <template #default="{row}">
            <span>
              {{ row.loginIp||"-" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.IPArea')" align="center" :show-overflow-tooltip="true">
          <template #default="{row}">
            <span>{{ row.loginArea||"-" }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.loginDomain')" align="center" :show-overflow-tooltip="true">
          <template #default="{row}">
            <span>{{ row.loginDomain||"-" }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.loginClient')" align="center" :show-overflow-tooltip="true">
          <template #default="{row}">
            <span>{{ filterLabel(clientList,row.loginClient) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.clientModel')" align="center" :show-overflow-tooltip="true">
          <template #default="{row}">
            <span>{{ row.clientModel||"-" }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.appVersion')" align="center" :show-overflow-tooltip="true">
          <template #default="{row}">
            <span>{{ row.appVersion||"-" }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('member.deviceNo')"  align="center" :show-overflow-tooltip="true" width="330">
          <template #default="{row}">
            <span>{{ row.deviceNo||"-" }}</span>
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
import i18n from "@/i18n";
import { filterLabel } from "@/utils";
import { clientList } from "@/utils/config";
import { defaultTime, shortcuts } from "@/utils/config";
import { getLoginlogList } from "@/api/member/list/index";
import { getCurrentInstance } from "vue";

const props = defineProps(["userName","activeName"])
const { proxy } = getCurrentInstance()
const queryRef = ref(null)
const queryParams = ref({
  status:null,
  userName:null,
  pageNum:1,
  pageSize:10
})
const dateRange = ref([])
const tableData = ref([])
const total = ref(0)
const statusList = ref([
  {value:0,label:i18n.global.t("member.success")},
  {value:1,label:i18n.global.t("member.reject")},
])

function getList(){
  getLoginlogList(proxy.addDateRange(queryParams.value,dateRange.value)).then(res=>{
    tableData.value = res.rows || []
    console.log(tableData.value)
    total.value = res.total || 0
  })
}
function handleQuery(){
  queryParams.value.pageNum = 1
  getList()
}
function resetQuery(){
  queryRef.value.resetFields()
  dateRange.value = []
}

watch([()=>props.userName,()=>props.activeName],()=>{
  queryParams.value.userName = props.userName
  if(props.activeName==="3"){
    getList()
  }
})
</script>

<style lang="scss" scoped>
.member-detail-login-info{
  
}
</style>