<template>
  <div class="currency-record">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-form-item :label="$t('member.operateType')" prop="type" class="full-width">
            <el-select
              v-model="queryParams.type"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in operateTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item
            :label="$t('member.accountType')"
            prop="accountStatus"
            class="full-width"
          >
            <el-select
              v-model="queryParams.accountStatus"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in accountStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.agentName')" prop="agentName" class="full-width">
            <el-input
              v-model="queryParams.agentName"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="handleQuery"
            icon="Search"
            >{{ $t('member.search') }}</el-button
          >
          <el-button @click="reset" icon="Refresh">{{ $t('member.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="currencyRecordList" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('member.userNameNoQuote')"
        align="center"
        prop="userName"
      ></el-table-column>
      <el-table-column :label="$t('member.agentNameNoQuote')" align="center" prop="agentName">
        <template #default="{ row }">
          <span>{{ row.agentName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.vitualCurrencyAddressNoQuote')"
        align="center"
        prop="addr"
      ></el-table-column>
      <el-table-column
        :label="$t('member.currencyTypeNoQuote')"
        align="center"
        prop="currency"
      ></el-table-column>
      <el-table-column
        :label="$t('member.protocolNoQuote')"
        align="center"
        prop="protocol"
      ></el-table-column>
      <el-table-column :label="$t('member.operateTypeNoQuote')" align="center" prop="type">
        <template #default="{ row }">
          <span>{{ filterLabel(operateTypeList,row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.remarkNoQuote')" align="center" prop="remark">
        <template #default="{ row }">
          <span>{{ row.remark || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.updateBy')"
        align="center"
        prop="createBy"
      ></el-table-column>
      <el-table-column
        :label="$t('member.operateTimeNoQuote')"
        align="center"
        prop="createTime"
        width="160"
      ></el-table-column>
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
import { ref } from "vue";
import { getCryptocyLog } from "@/api/member/bankcard/index";
import { filterLabel } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const queryRef = ref(null);
const queryParams = ref({
  type: null,
  userName: null,
  accountStatus: null,
  agentName: null,
  beginTime: null,
  endTime: null,
  pageNum: 1,
  pageSize: 10,
});
const operateTypeList = ref([
  { label: i18n.global.t("member.delete"), value: 5 },
  { label: i18n.global.t("member.binding"), value: 1 },
  { label: i18n.global.t("member.openBinding"), value: 2 },
  { label: i18n.global.t("member.starting"), value: 3 },
  { label: i18n.global.t("member.edit"), value: 6 },
  { label: i18n.global.t("member.disabled"), value: 4 },
]);
const accountStatusList = ref([
  // { label: "全部", value: 0 },
  { label: i18n.global.t("member.tryPlay"), value: 1 },
  { label: i18n.global.t("member.business"), value: 2 },
  { label: i18n.global.t("member.formal"), value: 3 },
  { label: i18n.global.t("member.test"), value: 4 },
  { label: i18n.global.t("member.replacement"), value: 5 },
]);
const currencyRecordList = ref([]);
const total = ref(0);
const dateRange = ref([]);
const isFirstLoad = ref(true);

function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.beginTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.beginTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
});
const getList = () => {
  return getCryptocyLog(queryParams.value).then((res) => {
    currencyRecordList.value = res.rows || [];
    total.value = res.total || 0;
  });
};
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
const reset = () => {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
};
// const handleSortChange = ({ column, prop, order }) => {
//   console.log(column, prop, order);
//   queryParams.value.sortProp = prop;
//   queryParams.value.sortOrder = order === "ascending" ? "asc" : "desc";
//   console.log(queryParams.value);
// };
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.currency-record {
}
</style>
