<template>
  <div class="member-back-operate-record">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="9">
          <el-form-item :label="$t('member.applyTime')" class="full-width">
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
          <el-form-item :label="$t('member.updateByQuote')" prop="createBy" class="full-width">
            <el-input
              v-model="queryParams.createBy"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
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
      <el-table-column :label="$t('member.applyTimeNoQuote')" prop="createTime">
        <template #default="{row}">
          <span>{{ row.createTime ? row.createTime:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.updateBy')" prop="createBy">
        <template #default="{row}">
          <span>{{ row.createBy ? row.createBy:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.operateProjectNoQuote')" prop="optType">
        <template #default="{row}">
          <span>{{ row.optType ? row.optType:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.operateByBefore')" prop="optFrom">
        <template #default="{row}">
          <span>{{ row.optFrom ? row.optFrom:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.operateByAfter')" prop="optTo">
        <template #default="{row}">
          <span>{{ row.optTo ? row.optTo:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.appliReasonNoQuote')" prop="createRemake">
        <template #default="{row}">
          <span>{{ row.createRemake ? row.createRemake:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.status')" prop="status">
        <template #default="{row}">
          <span v-if="row.status === '0'">{{ $t('member.creative') }}</span>
          <span v-if="row.status === '1'">{{ $t('member.reviewing') }}</span>
          <span v-if="row.status === '2'">{{ $t('member.reviewPass') }}</span>
          <span v-if="row.status === '3'">{{ $t('member.firstReviewRefuse') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('funds.reviewTimeNoQuote')" prop="createTime">
        <template #default="{row}">
          <span>{{ row.createTime ? row.createTime:"-"}}</span>
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
import { getCurrentInstance, inject, watch } from "vue";
import { getOperlogBackList } from "@/api/member/list/index";
import { getBackendLogTypes } from "@/api/member/account/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["activeName","activeChangeInfo","userName","tenantId"]);

const { proxy } = getCurrentInstance()
const dateRange = ref([])
const queryRef = ref(null)
const queryParams = ref({
  tenantId:props.tenantId,
  userName:null,
  optType:null, //操作类型
  createBy:null, //操作人
  pageNum:1,
  pageSize:10
})
const tableData = ref([])
const total = ref(0)

const optTypeList = ref([])
const optClientList = ref([
  {
    label:"未知",
    value:0
  },
  {
    label:"安卓",
    value:1
  },
  {
    label:"安卓H5",
    value:2
  },
  {
    label:"IOS 4",
    value:3
  },
  {
    label:"IOSH5",
    value:4
  },
  {
    label:"PC",
    value:5
  },
  {
    label:"后台",
    value:6
  }
])

function getList(){
  getOperlogBackList(proxy.addDateRange(queryParams.value,dateRange.value)).then(res=>{
    tableData.value = res.rows || []
    total.value = res.total || 0
  })
}
//查询操作项目
function queryBackendLogTypes(){
  return getBackendLogTypes().then(res=>{
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
function operateSelect(list,optType){
  const type = list.find(item=>item.value === optType)
  return type ? type.label : "-"
}

watch([()=>props.activeName,()=>props.activeChangeInfo,()=>props.userName],()=>{
  queryParams.value.userName = props.userName
  if(props.activeName==='6'&&props.activeChangeInfo==="2"){
    queryBackendLogTypes()
    getList()
  }
},{immediate:true})
</script>

<style lang="scss" scoped>

</style>