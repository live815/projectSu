<template>
  <div class="member-exception-record">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="10">
        <el-col :span="9">
          <el-form-item :label="$t('member.adjustTime')" class="full-width">
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
        <el-col :span="5">
          <el-form-item :label="$t('member.adjustBefore')" prop="chgBefore" class="full-width">
            <el-select
              v-model="queryParams.chgBefore"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in vipLevelList"
                :key="dict.vipLevel"
                :label="dict.vipName"
                :value="dict.vipLevel"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('member.adjustAfter')" prop="chgAfter" class="full-width">
            <el-select
              v-model="queryParams.chgAfter"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in vipLevelList"
                :key="dict.vipLevel"
                :label="dict.vipName"
                :value="dict.vipLevel"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('member.adjustWay')" prop="chgWay" class="full-width">
            <el-select
              v-model="queryParams.chgWay"
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
          <el-form-item :label="$t('member.updateByQuote')" prop="createBy" class="full-width">
            <el-input
              v-model="queryParams.createBy"
              :placeholder="$t('member.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery"
              >{{ $t('member.search') }}</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">{{$t('member.reset')}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.adjustTimeNoQuote')" prop="createTime">
        <template #default="{ row }">
          <span>{{ row.createTime ? row.createTime : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.adjustBeforeNoQuote')" prop="chgBefore">
        <template #default="{ row }">
          <span v-if="row.chgBefore||row.chgBefore===0">VIP{{ row.chgBefore }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.adjustAfterNoQuote')" prop="chgAfter">
        <template #default="{ row }">
          <span v-if="row.chgAfter||row.chgAfter===0">VIP{{ row.chgAfter }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.adjustWayNoQuote')" prop="chgWay">
        <template #default="{ row }">
          <span>{{ filterLabel(optTypeList,row.chgWay) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.updateBy')" prop="createBy">
        <template #default="{ row }">
          <span>{{ row.createBy ? row.createBy : "-" }}</span>
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
import { getCurrentInstance, inject, onMounted, watch } from "vue";
import { getVipLogList } from "@/api/member/list/index";
import { getVIPList } from "@/api/funds/config/index";
import { filterLabel } from "@/utils/index";
import { defaultTime, shortcuts } from "@/utils/config";

const props = defineProps(["activeName","activeChangeInfo", "userName","tenantId"]);
//接受父组件的activeName值
const { proxy } = getCurrentInstance();
const dateRange = ref([]);
const queryRef = ref(null);
const queryParams = ref({
  tenantId:props.tenantId,
  userName: null,
  createBy: null,
  type: null,
  pageNum: 1,
  pageSize: 10,
});
const tableData = ref([]);
const total = ref(0);
const vipLevelList = ref([]);

const optTypeList = ref([
  {
    label: i18n.global.t("member.autoAdjust"),
    value: 0,
  },
  {
    label: i18n.global.t("member.manualAdjustment"),
    value: 1,
  },
  // {
  //   label: i18n.global.t("member.autoAdjust"),
  //   value: 2,
  // }
]);

// onMounted(async () => {
//   await queryVIP();
// });
//查询VIP层级
function queryVIP() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
function getList() {
  getVipLogList(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (res) => {
      tableData.value = res.rows || [];
      total.value = res.total;
    }
  );
}

function resetQuery() {
  queryRef.value.resetFields();
  dateRange.value = [];
}

function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

watch(
  [() => props.activeName,() => props.activeChangeInfo, () => props.userName],
  async () => {
    queryParams.value.userName = props.userName;
    if (props.activeName==='6'&&props.activeChangeInfo === "5") {
      await queryVIP()
      getList();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
