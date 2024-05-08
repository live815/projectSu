<template>
  <div class="member-front-operate-record">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="9">
          <el-form-item :label="$t('member.operateTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('member.operateProject')"
            prop="optType"
            class="full-width"
          >
            <el-select
              v-model="queryParams.optType"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in optTypeList"
                :key="dict.optType"
                :label="dict.optDesc"
                :value="dict.optType"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.operateClient')" prop="optClient" class="full-width">
            <el-select
              v-model="queryParams.optClient"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in clientList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('member.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" :empty-text="$t('member.noData')"> 
      <el-table-column :label="$t('member.operateTimeNoQuote')" prop="createTime">
        <template #default="{row}">
          <span>{{ row.createTime ? row.createTime:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.operateProjectNoQuote')" prop="optType">
        <template #default="{row}">
          <span>{{ row.optType ? row.optType:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.operateByBefore')" prop="optFrom">
        <template #default="{row}">
          <span>{{ row.optFrom? row.optFrom:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.operateByAfter')" prop="optTo">
        <template #default="{row}">
          <span>{{ row.optTo ? row.optTo:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.operateIPAddress')" prop="optIp">
        <template #default="{row}">
          <span>{{ row.optIp ? row.optIp:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.operateClientNoQuote')" prop="optClient">
        <template #default="{row}">
          <span>{{ filterLabel(clientList,row.optClient) }}</span>
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
import i18n from "@/i18n";
import { getCurrentInstance, inject, watch } from "vue";
import { getOperlogList } from "@/api/member/list/index";
import { getWebLogTypes } from "@/api/member/account/index";
import { filterLabel } from "@/utils/index";
import { clientList } from "@/utils/config";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["activeName","activeChangeInfo","userName","tenantId"]);
//接受父组件的activeName值

const { proxy } = getCurrentInstance()
const dateRange = ref([])
const queryRef = ref(null)
const queryParams = ref({
  tenantId:props.tenantId,
  userName:null,
  optSource:1,
  optType:null,
  optClient:null,
  pageNum:1,
  pageSize:10
})
const tableData = ref([])
const total = ref(0)

const optTypeList = ref([])

function getList(){
  getOperlogList(proxy.addDateRange(queryParams.value,dateRange.value)).then(res=>{
    tableData.value = res.rows || []
    total.value = res.total || 0
  })
}

//查询操作项目
function queryWebLogTypes(){
  return getWebLogTypes().then(res=>{
    optTypeList.value = res || []
  })
}
function resetQuery(){
  queryRef.value.resetFields()
  dateRange.value = []
}

function handleQuery(){
  queryParams.value.pageNum = 1
  getList()
}
watch(
  [()=>props.activeName,()=>props.activeChangeInfo,()=>props.userName],
  () => {
    queryParams.value.userName = props.userName
    if (props.activeChangeInfo === "1" && props.activeName === "6") {
      queryWebLogTypes()
      getList()
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
