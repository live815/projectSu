<template>
  <div class="bank-record">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item :label="$t('member.operateType')" prop="type" class="full-width">
            <el-select
              v-model="queryParams.type"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in operatestatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="4">
          <el-form-item
            :label="$t('member.cardholder')"
            prop="cardholder"
            class="full-width"
          >
            <el-input
              v-model="queryParams.cardholder"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.bankname')" prop="bankname" class="full-width">
            <el-input
              v-model="queryParams.bankname"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.cardType')" prop="cardType" class="full-width">
            <el-select
              v-model="queryParams.cardType"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in cardTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('member.bankcardAccount')" prop="cardNo" class="full-width">
            <el-input
              v-model="queryParams.cardNo"
              :placeholder="$t('member.pleaseInput')"
              clearable
              class="full-width"
            ></el-input>
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
        <el-col :span="10">
          <el-button type="primary" @click="handleQuery">{{ $t('member.search') }}</el-button>
          <el-button @click="reset">{{ $t('member.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="bankRecordList" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('member.userNameNoQuote')"
        align="center"
        prop="userName"
      ></el-table-column>
      <el-table-column :label="$t('member.agentNameNoQuote')" align="center" prop="agentName"
        ><template #default="{ row }">
          <span>{{ row.agentName || "-" }}</span>
        </template></el-table-column
      >
      <el-table-column
        :label="$t('member.bankcardAccountNoQuote')"
        align="center"
        prop="cardNo"
        width="180"
      ></el-table-column>
      <el-table-column :label="$t('member.banknameNoQuote')" align="center" prop="bankname">
      </el-table-column>
      <el-table-column :label="$t('member.accountAddrNoQuote')" align="center" prop="accountAddr">
        <template #default="{ row }">
          <span>{{ row.accountAddr || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.cardTypeNoQuote')" align="center" prop="cardType"
        ><template #default="{ row }">
          <span>{{ filterLabel(cardTypeList,row.cardType) }}</span>
        </template></el-table-column
      >
      <el-table-column
        :label="$t('member.cardholderNoQuote')"
        align="center"
        prop="cardholder"
      ></el-table-column>
      <el-table-column
        :label="$t('member.operateTypeNoQuote')"
        align="center"
        prop="type"
      >
        <template #default="{ row }">
          <span>{{ filterLabel(operatestatusList,row.type) }}</span>
        </template>
    </el-table-column>
      <el-table-column :label="$t('member.remarkNoQuote')" align="center" prop="remark">
        <template #default="{ row }">
          <span>{{ row.remark || "-" }}</span>
        </template></el-table-column
      >
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
import { onMounted, ref } from "vue";
import { getBankcardLog } from "@/api/member/bankcard/index";
import { filterLabel } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const queryRef = ref(null);
const queryParams = ref(
  {
    type: null,
    operateTime: null,
    userName: null,
    cardholder: null,
    bankname: null,
    cardType: null,
    cardNo: null,
    agentName: null,
    beginTime:null,
    endTime:null,
    pageNum: 1,
    pageSize: 10,
  },
);
const operatestatusList = ref([
  { label: i18n.global.t("member.binding"), value: 1 },
  { label: i18n.global.t("member.openBinding"), value: 2 },
  { label: i18n.global.t("member.starting"), value: 3 },
  { label: i18n.global.t("member.disabled"), value: 4 },
  { label: i18n.global.t("member.delete"), value: 5 },
  { label: i18n.global.t("member.edit"), value: 6 }
]);
const cardTypeList = ref([
  { label: i18n.global.t("member.firstTypeCard"), value: "1" },
  { label: i18n.global.t("member.secondTypeCard"), value: "2" },
  { label: i18n.global.t("member.thirdTypeCard"), value: "3" },
  { label: i18n.global.t("member.rememberCard"), value: "4" },
  { label: i18n.global.t("member.unknowStatus"), value: "5" },
  { label: i18n.global.t("member.uncheck"), value: "6" },
]);
const bankRecordList = ref([]);
const total = ref(0);
const dateRange = ref([]);
const isFirstLoad = ref(true)

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
  return getBankcardLog(queryParams.value).then((res) => {
    bankRecordList.value = res.rows || [];
    total.value = res.total;
  });
};
const handleQuery = () => {
  queryParams.value.pageNum = 1
  getList()
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

<style lang="scss" scoped>
.bank-record {
}
</style>
