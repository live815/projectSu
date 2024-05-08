<template>
  <div class="first-review-dialog">
    <!-- 会员账户修改审核 -->
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      class="full-width"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="$t('member.applyTime')" class="full-width" prop="applyTime">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              class="full-width"
              @change="handleChange"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item
            :label="$t('member.firstReviewCompleteTime')"
            prop="completeTime"
            class="full-width"
          >
            <el-date-picker
              v-model="dateRangeFirst"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              class="full-width"
              @change="handleChangeFirst"
              :default-time="defaultTime"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item :label="$t('member.userName')" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('member.reviewStatus')" prop="status" class="full-width">
            <el-select
              v-model="queryParams.status"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in checkStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('member.applier')" prop="createBy" class="full-width">
            <el-input
              v-model="queryParams.createBy"
              :placeholder="$t('risk.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('member.reviewOrderNo')" prop="applyId" class="full-width">
            <el-input
              v-model="queryParams.applyId"
              :placeholder="$t('risk.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="pl-20">
          <el-button type="primary" @click="handleQuery">{{$t('member.search')}}</el-button>
          <el-button type="primary" @click="reset">{{$t('member.reset')}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- <span>数据更新时间：</span><span>{{ updateTime }}</span> -->
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.handle')" align="center" width="100">
        <template #default="{ row }">
          <el-button 
            @click="openReview(row)" 
            type="primary" 
            size="small"
            >
            {{ $t('member.firstReview') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.reviewOrderNoNoQuote')" align="center" width="180">
        <template #default="{ row }">
          <span>{{ row.applyId || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.reviewApplyTypeNoQuote')" align="center" width="180">
        <template #default="{ row }">
          <span>{{ row.optType || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.operateBeforeNoQuote')" align="center" width="200">
        <template #default="{ row }">
          <span>{{ row.optFrom || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.operateAfterNoQuote')" align="center" width="200">
        <template #default="{ row }">
          <span>{{ row.optTo || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.userNameNoQuote')" align="center" width="180">
        <template #default="{ row }">
          <span>{{ row.userName || "-" }}</span>
          <span class="ml-12 account-type">{{ filterLabel(accountList,row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.applierNoQuote')" align="center" width="100">
        <template #default="{ row }">
          <span>{{ row.createBy || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.applyTimeNoQuote')" align="center" width="160">
        <template #default="{ row }">
          <span>{{ row.createTime || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.appliReasonNoQuote')" align="center">
        <template #default="{ row }">
          <span>{{ row.createRemake || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.reviewStatusNoQuote')" align="center" width="120">
        <template #default="{ row }">
          <el-tag v-if="row.status === '0'">{{ $t('member.unhandle') }}</el-tag>
          <el-tag v-if="row.status === '1'">{{ $t('member.waitForFirstReview') }}</el-tag>
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
    <MemberAccountEditReview 
      v-model:open="open"
      :id="cloneId"
      :type="type"
      v-if="open"
      @freshlist="getList"
      />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { onMounted, ref } from "vue";
import { filterLabel } from "@/utils";
import { defaultTime, shortcuts } from "@/utils/config";
import { getReviewList } from "@/api/member/account/index";
import MemberAccountEditReview from "./MemberAccountEditReview.vue";

const queryRef = ref(null);
const queryParams = ref({
  beginTime: null, //申请开始时间
  endTime: null, //申请结束时间
  // completeTimeStart: null, //一审完成开始时间
  // completeTimeEnd: null, //一审完成结束时间
  userName: null, //会员账号
  status: null, //审核状态
  createBy: null, //申请人
  applyId: null, //审核单号
  pageNum: 1,
  pageSize: 10,
});
const checkStatusList = ref([
  { label: i18n.global.t("member.unhandle"), value: 0 },
  { label: i18n.global.t("member.waitForFirstReview"), value: 1 }
]);
const accountList = ref([
  { label: i18n.global.t("member.normal"), value: "0" },
  { label: i18n.global.t("member.excellent"), value: "1" },
  { label: i18n.global.t("member.follow"), value: "2" },
]);
const total = ref(0);
const tableData = ref([]);
const dateRange = ref([]);
const dateRangeFirst = ref([]);
const open = ref(false);
const cloneId = ref(null);
const type = ref(null);
const isFirstLoad = ref(true);

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
// function handleChangeFirst() {
//   if (
//     (dateRangeFirst.value && !dateRangeFirst.value.length) ||
//     dateRangeFirst.value == null
//   ) {
//     queryParams.value.completeTimeStart = null;
//     queryParams.value.completeTimeEnd = null;
//   } else {
//     queryParams.value.completeTimeStart = dateRangeFirst.value[0];
//     queryParams.value.completeTimeEnd = dateRangeFirst.value[1];
//   }
// }

onMounted(async ()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
function getList() {
  return getReviewList(queryParams.value).then(res=>{
    tableData.value = res.rows || [];
    total.value = res.total || 0 ;
  })
}
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
const reset = () => {
  queryRef.value.resetFields();
  dateRange.value = [];
  dateRangeFirst.value = [];
  handleChange();
  handleChangeFirst();
};
function openReview(row) {
  type.value = 'first'
  cloneId.value = row.id
  open.value = true
}
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.first-review-dialog {
  padding: 20px;

.full-width {
  width: 100%;
}
.header-wrapper {
  white-space: pre-wrap;
}
.pl-20 {
  padding-left: 20px;
}
.account-type {
  font-size: 12px;
  color: rgba(245, 34, 45, 0.498);
  position: absolute;
  top: 12px;
}
}
</style>
