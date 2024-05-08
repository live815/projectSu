<template>
  <div class="member-info-change">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item :label="$t('member.operateTime')" class="full-width">
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
        <el-col :span="4">
          <el-form-item :label="$t('member.userName')" prop="userName" class="full-width">
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('member.pleaseInput')"
              clearable
              maxlength="16"
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('member.accountType')" prop="memberType" class="full-width">
            <el-select
              v-model="queryParams.memberType"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in memberTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('member.changeType')" prop="optType" class="full-width">
            <el-select
              v-model="queryParams.optType"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in changeTypeList"
                :key="item.optType"
                :label="item.optDesc"
                :value="item.optType"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('member.updateByQuote')" prop="createBy" class="full-width">
            <el-input
              v-model="queryParams.createBy"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" class="pl-20">
          <el-button type="primary" @click="handleQuery">{{ $t('member.search') }}</el-button>
          <el-button type="primary" @click="reset">{{ $t('member.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.operateTimeNoQuote')" align="center" prop="createTime">
        <template #default="{row}">
          <span>{{ row.createTime||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.userNameNoQuote')" align="center" prop="userName">
        <template #default="{row}">
          <span>{{ row.userName||"-" }}</span>
          <span class="account-type ml-12">{{filterLabel(memberTypeList,row.type)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.changeTypeNoQuote')" align="center" prop="optType">
        <template #default="{row}">
          <span>{{ row.optType||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.changeBeforeInformation')" align="center" prop="optFrom">
        <template #default="{row}">
          <span>{{ row.optFrom||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.changeAfterInformation')" align="center" prop="optTo">
        <template #default="{row}">
          <span>{{ row.optTo||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.appliReasonNoQuote')" align="center" prop="createRemake">
        <template #default="{row}">
          <span>{{ row.createRemake||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.updateBy')" align="center" prop="createBy">
        <template #default="{row}">
          <span>{{ row.createBy||"-" }}</span>
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

<script setup name="Information">
import i18n from "@/i18n";
import { onMounted, ref } from "vue";
import { filterLabel } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";
import { changeMemberRecordList,getBackendLogTypes } from "@/api/member/account/index";

const queryRef = ref(null);
const queryParams = ref({
  beginTime: null,
  endTime: null,
  userName: null,
  memberType: null,
  optType: null,
  createBy: null,
  pageNum: 1,
  pageSize: 10,
});
const memberTypeList = ref([
  { label: i18n.global.t("member.normal"), value: "0" },
  { label: i18n.global.t("member.excellent"), value: "1" },
  { label: i18n.global.t("member.follow"), value: "2" },
]);
const changeTypeList = ref([]);
const total = ref(0);
const tableData = ref([]);
const dateRange = ref([]);
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

onMounted(async() => {
  await queryBackendLogTypes();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
});
function getList() {
  return changeMemberRecordList(queryParams.value).then((res) => {
    tableData.value = res.rows || [];
    total.value = res.total || 0;
  });
}
function queryBackendLogTypes(){
  return getBackendLogTypes().then(res=>{
    changeTypeList.value = res || []
  })
}
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
const reset = () => {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
};
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style scoped>
.member-info-change {
  padding: 20px;
  .account-type {
    font-size: 12px;
    color: rgba(245, 34, 45, 0.498);
    position: absolute;
    top: 0;
  }
}
</style>
