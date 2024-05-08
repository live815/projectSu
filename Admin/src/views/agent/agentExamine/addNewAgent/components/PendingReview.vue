<!-- 新增代理{{$t('agent.review')}}待{{$t('agent.review')}} -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.applyTime')" prop="applicationTime">
        <el-date-picker
          v-model="applicationTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('agent.startTime')"
          :end-placeholder="$t('agent.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('agent.agentAccountQuote')" prop="agentName">
        <el-input
          v-model="queryParams.agentName"
          :placeholder="$t('agent.pleaseInput')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.orderNo')" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          :placeholder="$t('agent.pleaseInput')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.applier')" prop="review">
        <el-input
          v-model="queryParams.applicant"
          :placeholder="$t('agent.pleaseInput')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.agentType')" prop="agentType">
        <el-select
          v-model="queryParams.agentType"
          class="m-2"
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 120px"
        >
          <el-option
            v-for="item in agentTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.agentModel')" prop="agentMode">
        <el-select
          v-model="queryParams.agentMode"
          class="m-2"
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 120px"
        >
          <el-option
            v-for="item in agentModeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" type="primary" @click="handleQuery">{{
          $t("agent.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("agent.reset")
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="agentDataList" style="width: 100%">
      <el-table-column :label="$t('agent.handle')" width="120" align="center">
        <template #default="scope">
          <el-button type="primary" @click="reviewDetails(scope.row)">{{
            $t("agent.review")
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        property="orderNo"
        :label="$t('agent.orderNoNoQuote')"
        width="220"
      />
      <el-table-column
        property="agentName"
        :label="$t('agent.agentAccount')"
        width="180"
      />
      <el-table-column
        property="agentLevel"
        :label="$t('agent.agentLevel')"
        width="180"
      >
        <template #default="{ row }">
          <span>{{ row.agentLevel + 1 }} {{ $t("agent.level") }} </span>
        </template>
      </el-table-column>
      <el-table-column
        property="superiorAgentName"
        :label="$t('agent.parentAccount')"
        width="180"
      >
        <template #default="{ row }">
          <span>{{ row.superiorAgentName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="agentType"
        :label="$t('agent.agentTypeNoQuote')"
        width="180"
      >
        <template #default="scope">
          <span v-if="scope.row.agentType == 0" type="primary">{{
            $t("agent.innerAgent")
          }}</span>
          <span v-if="scope.row.agentType == 1" type="danger">{{
            $t("agent.outerAgent")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="agentMode"
        :label="$t('agent.agentModelNoQuote')"
        width="180"
      >
        <template #default="scope">
          <span v-if="scope.row.agentMode == 0">{{
            $t("agent.commissionMode")
          }}</span>
          <span v-if="scope.row.agentMode == 1">{{
            $t("agent.dispatchMode")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="status"
        :label="$t('agent.orderStatus')"
        width="180"
      >
        <template #default="scope">
          <el-tag v-if="scope.row.status == 0" type="success">{{
            $t("agent.waitReview")
          }}</el-tag>
          <el-tag v-if="scope.row.status == 1" type="danger">{{
            $t("agent.reviewRefuse")
          }}</el-tag>
          <el-tag v-if="scope.row.status == 2" type="info">{{
            $t("agent.reviewPass")
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        property=""
        :label="$t('agent.applyInformation')"
        width="330"
      >
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t("agent.applier") }}{{ row.applicant }}</p>
            <p class="margin">
              {{ $t("agent.applyTime") }}{{ row.applicantTime }}
            </p>
            <p class="margin">
              {{ $t("agent.applyRemark") }}{{ row.applicantMark || "-" }}
            </p>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />

    <el-dialog
      v-model="isShowReview"
      width="1000px"
      :before-close="closeParentDialog"
    >
      <ReviewAndView
        v-model:open="open"
        :rowItems="rowItems"
        @closeDialog="closeParentDialog"
        @changeStatus="handleUpdateOpen"
        v-if="open"
      ></ReviewAndView>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { ref, onMounted } from "vue";
import { defaultTime, shortcuts } from "@/utils/config";
import ReviewAndView from "./ReviewAndView.vue";
import { agentNewReviewApi } from "@/api/agent/agentReview/agentReview.js";

const queryParams = ref({
  agentMode: "",
  agentType: "",
  agentName: "",
  applicant: "",
  applicantEndTime: "",
  applicantStartTime: "",
  orderNo: "",
  pageNum: 1,
  pageSize: 10,
  review: "",
  reviewEndTime: "",
  reviewStartTime: "",
  statusList: [0],
  reviewMark: "",
});
const total = ref(5);
const open = ref(false);
const rowItems = ref({});
const loading = ref(false);

// 审核弹窗
const isShowReview = ref(false);
const reviewDetails = (row) => {
  isShowReview.value = !isShowReview.value;
  rowItems.value = row;
  open.value = true;
};
const handleUpdateOpen = (val) => {
  if (val) {
    agentListInformation();
    isShowReview.value = false;
    open.value = false;
  }
};
const closeParentDialog = () => {
  isShowReview.value = false;
  open.value = false;
};
// 表格数据
const agentDataList = ref([]);
// 获取新增代理列表信息
const agentListInformation = async () => {
  try {
    let res = await agentNewReviewApi(queryParams.value);
    agentDataList.value = res.records;
    agentDataList.value.forEach((item) => {
      item.id = BigInt(item.id).toString();
    });
    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};
const applicationTime = ref([]); //申请时间
function handleQuery() {
  if (applicationTime.value) {
    queryParams.value.applicantStartTime = applicationTime.value[0];
    queryParams.value.applicantEndTime = applicationTime.value[1];
  } else {
    queryParams.value.applicantStartTime = null;
    queryParams.value.applicantEndTime = null;
  }
  queryParams.value.pageNum = 1;
  agentListInformation();
}

function resetQuery() {
  queryParams.value.agentName = "";
  queryParams.value.orderNo = "";
  queryParams.value.applicant = "";
  queryParams.value.agentType = "";
  queryParams.value.agentMode = "";
  queryParams.value.review = "";
  queryParams.value.applicantStartTime = "";
  queryParams.value.applicantEndTime = "";
  applicationTime.value = "";
  // agentListInformation();
}
// 分页
function getList() {
  loading.value = true;
  agentNewReviewApi(queryParams.value)
    .then((res) => {
      loading.value = false;
      agentDataList.value = res.records || [];
      total.value = res.total;
    })
    .catch((err) => {
      loading.value = false;
    });
}
const agentTypeList = [
  {
    value: "",
    label: i18n.global.t("agent.all"),
  },
  {
    value: 0,
    label: i18n.global.t("agent.innerAgent"),
  },
  {
    value: 1,
    label: i18n.global.t("agent.outerAgent"),
  },
];
const agentModeList = [
  {
    value: "",
    label: i18n.global.t("agent.all"),
  },
  {
    value: 0,
    label: i18n.global.t("agent.commissionMode"),
  },
  {
    value: 1,
    label: i18n.global.t("agent.dispatchMode"),
  },
];
onMounted(() => {
  agentListInformation();
});
</script>

<style lang="scss" scoped>
.margin {
  margin: 5px;
  padding: 0;
  line-height: 1;
}
:deep() {
  .el-dialog__header {
    padding: 0 !important;
  }
}
</style>
