<template>
  <div class="member-exception-record">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="9">
          <el-form-item :label="$t('member.lockTime')" class="full-width">
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
            :label="$t('member.lockOrUnlockWay')"
            prop="type"
            class="full-width"
          >
            <el-select
              v-model="queryParams.type"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in optTypeList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('member.updateByQuote')"
            prop="createBy"
            class="full-width"
          >
            <el-input v-model="queryParams.createBy" :placeholder="$t('member.pleaseInput')" clearable></el-input>
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
      <el-table-column :label="$t('member.lockOrUnlockTime')" prop="createTime">
        <template #default="{row}">
          <span>{{ row.createTime ? row.createTime:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.lockOrUnlockWay')" prop="duration">
        <template #default="{row}">
          <span>{{ filterLabel(optTypeList,row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.lockOrUnlockReason')" prop="exInfo">
        <template #default="{row}">
          <span>{{ row.exInfo ? row.exInfo:"-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.updateBy')" prop="createBy">
        <template #default="{row}">
          <span>{{ row.createBy ? row.createBy:"-"}}</span>
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
import { getExceplogList } from "@/api/member/list/index";
import { filterLabel } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["activeName","activeChangeInfo","userName","tenantId"]);
const sharedData = inject("sharedData", null);
//接受父组件的activeName值

const { proxy } = getCurrentInstance()
const dateRange = ref([])
const queryRef = ref(null)
const queryParams = ref({
  tenantId:props.tenantId,
  userName:null,
  createBy:null,
  type:null,
  pageNum:1,
  pageSize:10
})
const tableData = ref([])
const total = ref(0)

const optTypeList = ref([
  {
    label:i18n.global.t("member.loginLock"),
    value:1
  },
  {
    label:i18n.global.t("member.gameLock"),
    value:2
  },
  {
    label:i18n.global.t("member.rechargeWithdrawLock"),
    value:3
  },
  {
    label:i18n.global.t("member.abandonWithdrawLock"),
    value:4
  },
  {
    label:i18n.global.t("member.offerLock"),
    value:5
  },
  {
    label:i18n.global.t("member.rebateLock"),
    value:6
  },
  {
    label:i18n.global.t("member.unlockLogin"),
    value:7
  },
  {
    label:i18n.global.t("member.unlockGame"),
    value:8
  },{
    label:i18n.global.t("member.unlockRechargeWithdraw"),
    value:9
  },
  {
    label:i18n.global.t("member.unlockBanWithdraw"),
    value:10
  },
  {
    label:i18n.global.t("member.unlockOffer"),
    value:11
  },
  {
    label:i18n.global.t("member.unlockRebate"),
    value:12
  }
])

function getList(){
  getExceplogList(proxy.addDateRange(queryParams.value,dateRange.value)).then(res=>{
    tableData.value = res.rows || [];
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

watch([()=>props.activeName,()=>props.activeChangeInfo,()=>props.userName],()=>{
  queryParams.value.userName = props.userName
  if(props.activeName==='6'&&props.activeChangeInfo==="4"){
    getList()
  }
},{immediate:true})
</script>

<style lang="scss" scoped>

</style>