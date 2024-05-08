<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('operation.Reviewordernumber')" prop="number">
        <el-input
          v-model="queryParams.number"
          :placeholder="$t('operation.pleaseEnter')"
        />
      </el-form-item>
      <el-form-item :label="$t('operation.Accounttype1')" prop="deliveryType">
        <el-select
          v-model="queryParams.deliveryType"
          clearable
          :placeholder="$t('operation.paleaseChose')"
        >
          <el-option
            v-for="item in accountTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('operation.memberaccount1')"
        prop="deliveryAccount"
      >
        <el-input
          v-model="queryParams.deliveryAccount"
          :placeholder="$t('operation.pleaseEnter')"
        />
      </el-form-item>
      <el-form-item :label="$t('operation.title1')" prop="title">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('operation.pleaseEnter')"
        />
      </el-form-item>
      <el-form-item :label="$t('operation.type1')" prop="type">
        <el-select
          v-model="queryParams.type"
          clearable
          :placeholder="$t('operation.pleaseEnter')"
        >
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('operation.applicattime1')"
        prop="applicationTime"
      >
        <el-date-picker
          v-model="queryParams.dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('operation.applicant1')" prop="createBy">
        <el-input
          v-model="queryParams.createBy"
          :placeholder="$t('operation.pleaseEnter')"
        />
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" type="primary" @click="handleQuery">{{
          $t("operation.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("operation.reset")
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="carouselList" style="width: 100%">
      <el-table-column :label="$t('operation.operate')" width="120">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="onClickAudit(scope.row)"
            >{{ $t("operation.tip158") }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        :label="$t('operation.Reviewordernumber')"
        width="280"
      />
      <el-table-column
        prop="deliveryType"
        :label="$t('operation.Accounttype')"
        width="180"
      >
        <template #default="scope">
          <div v-if="scope.row.deliveryType == 1">
            {{ $t("operation.Ordinaryaccount") }}
          </div>
          <div v-if="scope.row.deliveryType == 2">
            {{ $t("operation.Agentaccount") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="deliveryAccountList"
        :label="$t('operation.memberaccount')"
        width="180"
      >
        <template #default="scope">
          <template v-if="scope.row.deliveryAccountList">
            <el-button
              type="primary"
              @click="onClickAccount(scope.row)"
              v-if="scope.row.deliveryAccountList.length > 2"
            >
              {{ $t("operation.tip159") }}
            </el-button>
            <div v-else>{{ scope.row.deliveryAccountList.join(",") }}</div>
          </template>
        </template>
      </el-table-column>

      <el-table-column
        prop="title"
        :label="$t('operation.title')"
        width="180"
      />
      <el-table-column prop="type" :label="$t('operation.type')" width="90">
        <template #default="scope">
          <div v-if="scope.row.type == 1">{{ $t("operation.cash") }}</div>
          <div v-if="scope.row.type == 2">
            {{ $t("operation.cashcoupons") }}
          </div>
          <div v-if="scope.row.type == 3">
            {{ $t("operation.depositcoupon") }}
          </div>
          <div v-if="scope.row.type == 4">
            {{ $t("operation.TurnoverCoupons") }}
          </div>
          <div v-if="scope.row.type == 5">
            {{ $t("operation.physicalObject") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        :label="$t('operation.issuebonus')"
        width="90"
      >
        <template #default="scope">
          <div>{{ toFormatNumber(Number(scope.row.amount)) }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="multiple"
        :label="$t('operation.TurnoverMultiple')"
        width="90"
      />
      <el-table-column prop="remark" :label="$t('operation.remark')" />
      <el-table-column
        prop="createBy"
        :label="$t('operation.applicant')"
        width="100"
      />
      <el-table-column
        prop="createTime"
        :label="$t('operation.applicattime')"
        sortable
        width="180"
      />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />

    <!-- 审核弹框 -->
    <AuditDialog
      v-model:open="open"
      :rowItems="rowItems"
      :audit="audit"
      @changeStatus="handleUpdateOpen"
      v-if="open"
    ></AuditDialog>

    <!-- 查看会员账号   -->
    <ReviewMemberType
      v-model:open="open1"
      :rowItems="rowItems"
      v-if="open1"
    ></ReviewMemberType>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch, computed } from "vue";
import { defaultTime, shortcuts } from "@/utils/config";
import { getWelfareApi } from "@/api/operation/welfare";

import AuditDialog from "../../../components/AuditDialog.vue";
import ReviewMemberType from "../../../components/ReviewMemberType.vue";
import { toFormatNumber } from "@/utils/index";
import i18n from "@/i18n";

const props = defineProps(["activeName"]);

const queryParams = reactive({
  auditOneBy: "", // 一审审核人
  auditTwoBy: "", // 二审审核人,
  createBy: "", // 申请人
  createTimeEnd: "", // 申请结束时间
  createTimeStart: "", // 申请开始时间
  deliveryAccount: "", // 会员账号
  deliveryAccountList: [], // 会员账号数组
  deliveryType: "", // 账号类型
  number: "", // 审核单号
  operateType: "0", // 0待一审 1一审通过（二审） 2结单查看
  tenantId: "",
  title: "", // 红利标题
  type: "", // 存入类型
  pageNum: 1,
  pageSize: 10,
  dateRange: [],
});

const rowItems = ref({});
const open = ref(false);
const open1 = ref(false);
const audit = ref("one");
const carouselList = ref([]);

const total = ref(0);

const accountTypes = [
  {
    value: "",
    label: i18n.global.t("operation.all"),
  },
  {
    value: "1",
    label: i18n.global.t("operation.Ordinaryaccount"),
  },
  {
    value: "2",
    label: i18n.global.t("operation.Agentaccount"),
  },
];
const types = [
  {
    value: "",
    label: i18n.global.t("operation.all"),
  },
  {
    value: "1",
    label: i18n.global.t("operation.cash"),
  },
  {
    value: "2",
    label: i18n.global.t("operation.cashcoupons"),
  },
  {
    value: "3",
    label: i18n.global.t("operation.depositcoupon"),
  },
  {
    value: "4",
    label: i18n.global.t("operation.TurnoverCoupons"),
  },
  {
    value: "5",
    label: i18n.global.t("operation.physicalObject"),
  },
];

const handleUpdateOpen = (val) => {
  if (val) {
    getList();
  }
};

onMounted(() => {
  getList();
});

// 获取表格数据
const getList = async () => {
  const params = {
    auditOneBy: queryParams.auditOneBy, // 一审审核人
    auditTwoBy: queryParams.auditTwoBy, // 二审审核人,
    createBy: queryParams.createBy, // 申请人
    createTimeStart: queryParams.dateRange[0], // 申请开始时间
    createTimeEnd: queryParams.dateRange[1], // 申请结束时间
    deliveryAccount: queryParams.deliveryAccount, // 会员账号
    deliveryType: queryParams.deliveryType, // 账号类型
    number: queryParams.number, // 审核单号
    tenantId: queryParams.tenantId,
    title: queryParams.title, // 红利标题
    type: queryParams.type, // 存入类型
    operateType: Number(queryParams.operateType), // 0待一审 1一审通过（二审） 2结单查看
    pageNum: queryParams.pageNum,
    pageSize: queryParams.pageSize,
  };

  const res = await getWelfareApi(params);
  if (res.rows) {
    // 创建一个新数组，以免直接修改原始数组
    const newArray = [...res.rows];
    carouselList.value = newArray;
    total.value = res.total;
  } else {
    carouselList.value = [];
    total.value = res.total;
  }
};

// 审核弹窗
const onClickAudit = (row) => {
  rowItems.value = row;
  open.value = true;
};

// 查看会员账号
const onClickAccount = (row) => {
  rowItems.value = row;
  open1.value = true;
};

// 搜索
const handleQuery = () => {
  getList();
};
// 重置
const resetQuery = () => {
  queryParams.operateType = "0";
  queryParams.status = "";
  queryParams.pageNum = 1;
  queryParams.pageSize = 10;
  queryParams.auditOneBy = "";
  queryParams.auditTwoBy = "";
  queryParams.createBy = "";
  queryParams.createTimeEnd = "";
  queryParams.createTimeStart = "";
  queryParams.deliveryAccount = "";
  queryParams.deliveryType = "";
  queryParams.number = "";
  queryParams.tenantId = "";
  queryParams.title = "";
  queryParams.dateRange = [];
  queryParams.type = "";
  getList();
};

watch(
  () => props.activeName,
  (newVal) => {
    if (newVal === "1") {
      getList();
    }
  }
);
</script>

<style lang="scss" scoped></style>
