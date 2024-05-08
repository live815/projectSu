<template>
  <div class="member-ban-record">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="9">
          <el-form-item :label="$t('member.banTime')" class="full-width">
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
            :label="$t('member.updateByQuote')"
            prop="banBy"
            class="full-width"
          >
            <el-input v-model="queryParams.banBy" :placeholder="$t('member.pleaseInput')" clearable></el-input>
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

    <el-table :data="tableData"> 
      <el-table-column :label="$t('member.banTimeNoQuote')" prop="banTime">
        <template #default="{row}">
          <span>{{ row.banTime ? row.banTime:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.banTimeHours')" prop="duration">
        <template #default="{row}">
          <span>{{ row.duration ? row.duration:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.banContent')" prop="content">
        <template #default="{row}">
          <span>{{ row.content ? row.content:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.banType')" prop="banType">
        <template #default="{row}">
          <span v-if="row.banType===1">{{ $t('member.systemBan') }}</span>
          <span v-else-if="row.banType===2">{{ $t('member.manualBan') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.updateBy')" prop="banBy">
        <template #default="{row}">
          <span>{{ row.banBy ? row.banBy:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.unbanTime')" prop="untieTime">
        <template #default="{row}">
          <span>{{ row.untieTime ? row.untieTime:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.unbanOperator')" prop="untieBy">
        <template #default="{row}">
          <span>{{ row.untieBy ? row.untieBy:"-"}}</span>
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
import { getBanlogList } from "@/api/member/list/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["activeName","activeChangeInfo","userName","tenantId","userId"]);

const { proxy } = getCurrentInstance()
const dateRange = ref([])
const queryRef = ref(null)
const queryParams = ref({
  tenantId:props.tenantId,
  userName:null,
  memberId:props.userId,
  banBy:null,
  pageNum:1,
  pageSize:10
})
const tableData = ref([])
const total = ref(0)


function getList(){
  getBanlogList(proxy.addDateRange(queryParams.value,dateRange.value)).then(res=>{
    tableData.value = res.records || [];
    total.value = res.total || 0 ;
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
function operateSelect(optType){
  const type = optTypeList.value.find(item=>item.value === optType)
  return type ? type.label : "-"
}

watch([()=>props.activeName,()=>props.activeChangeInfo,()=>props.userName],()=>{
  queryParams.value.userName = props.userName
  if(props.activeName==='6'&&props.activeChangeInfo==="3"){
    getList()
  }
},{immediate:true})
</script>

<style lang="scss" scoped>

</style>