<template>
  <div class="black-list-adjust-record">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="labelChange" prop="value" class="full-width">
            <el-input
              v-model="queryParams.value"
              :placeholder="$t('risk.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('risk.operateType')"
            prop="adjustType"
            class="full-width"
          >
            <el-select
              v-model="queryParams.adjustType"
              :placeholder="$t('risk.pleaseSelect')"
              class="full-width"
              clearable
            >
              <el-option
                v-for="dict in operateList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('risk.lastUpdateTimeQuote')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('risk.beginTime')"
              :end-placeholder="$t('risk.endTime')"
              @change="handleChange"
              class="full-width"
              :default-time="defaultTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="Search" @click="handleQuery">{{
            $t("risk.search")
          }}</el-button>
          <el-button icon="Refresh" @click="resetQuery">{{
            $t("risk.reset")
          }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" :empty-text="$t('risk.noData')">
      <el-table-column :label="$t('risk.operateTypeNoQuote')" align="center">
        <template #default="{ row }">
          <span>{{ row.adjustType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tableLabelChange" align="center">
        <template #default="{ row }">
          <span>{{ row.value || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.adjustBeforeAction')" align="center">
        <template #default="{ row }">
          <template v-if="row.adjustBeforeName&&row.adjustBeforeName.length">
            <span>{{ row.adjustBeforeName.join() }}</span>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.adjustAfterAction')" align="center">
        <template #default="{ row }">
          <template v-if="row.adjustAfterName&&row.adjustAfterName.length">
            <span>{{ row.adjustAfterName.join() }}</span>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.createBy')"
        prop="createBy"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.createBy ? row.createBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.creativeTime')"
        prop="createTime"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.lastUpdateBy')"
        prop="updateBy"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.updateBy ? row.updateBy : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.lastUpdateTime')"
        prop="updateTime"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.updateTime ? row.updateTime : "-" }}</span>
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
import { filterLabel } from "@/utils/index";
import { getBlackAdjustlist } from "@/api/risk/config/index";
import { defaultTime } from "@/utils/config";
import { computed, getCurrentInstance, onMounted } from "vue";

const props = defineProps(["activeName"]);
const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  blackListType: props.activeName,
  value: null,
  adjustType: null,
  startTime:null,
  endTime:null,
  pageNum: 1,
  pageSize: 10,
});
const tableData = ref([]);
const total = ref(0);
const dateRange = ref([]); //最后操作时间

const operateList = ref([
  {
    label: i18n.global.t('risk.delete'),
    value: "DELETE",
  },
  {
    label: i18n.global.t('risk.increase'),
    value: "INSERT",
  },
  {
    label: i18n.global.t('risk.edit'),
    value: "UPDATE",
  },
]);
const labelChange = computed(() => {
  switch (props.activeName) {
    case 1:
      return i18n.global.t("risk.userName");
    case 2:
      return i18n.global.t("risk.IPAddressQuote");
    case 3:
      return i18n.global.t("risk.deviceNo");
    case 4:
      return i18n.global.t("risk.bankCardQuote");
    case 5:
      return i18n.global.t("risk.virtualAddressQuote");
    case 6:
      return i18n.global.t("risk.virtualNumberParagraphQuote");
    case 7:
      return i18n.global.t("risk.phoneNumberQuote");
  }
});
const tableLabelChange = computed(() => {
  switch (props.activeName) {
    case 1:
      return i18n.global.t("risk.userNameNoQuote");
    case 2:
      return i18n.global.t("risk.IPAddress");
    case 3:
      return i18n.global.t("risk.deviceNoNoQuote");
    case 4:
      return i18n.global.t("risk.bankcard");
    case 5:
      return i18n.global.t("risk.virtualAddress");
    case 6:
      return i18n.global.t("risk.virtualNumberParagraph");
    case 7:
      return i18n.global.t("risk.phoneNumber");
  }
});
const isFirstLoad = ref(true);

function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.startTime = null;
    queryParams.value.endTime = null;
  } else {
    queryParams.value.startTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
});
function getList() {
  return getBlackAdjustlist(queryParams.value).then((res) => {
    tableData.value = res.records || [];
    total.value = res.total || 0;
  });
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
  handleChange();
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.black-list-adjust-record {
  .add-btn {
    background: #f59a23;
    color: #fff;
  }
  .refresh-title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
