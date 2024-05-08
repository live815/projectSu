<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('operation.memberaccount')" prop="memberAccount">
        <el-input
          v-model="queryParams.account"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.tip183')" prop="originate">
        <el-select
          v-model="queryParams.source"
          class="m-2"
          :placeholder="$t('operation.pleaseEnter')"
          style="width: 120px"
        >
          <el-option
            v-for="item in originates"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.tip184')" prop="questionType">
        <el-select
          v-model="queryParams.problemType"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in questionTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.status2')" prop="position">
        <el-select
          v-model="queryParams.status"
          class="m-2"
          :placeholder="$t('operation.paleaseChose')"
          style="width: 120px"
        >
          <el-option
            v-for="item in positions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.Feedbackperson')" prop="createBy">
        <el-input
          v-model="queryParams.createBy"
          :placeholder="$t('operation.pleaseEnter')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('operation.tip185')" prop="pushTime">
        <el-date-picker
          v-model="registerTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('operation.tip186')" prop="pushTime">
        <el-date-picker
          v-model="processingTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime1')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button icon="Download" type="warning" @click="handleExport">{{
          $t("operation.export")
        }}</el-button>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("operation.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("operation.reset")
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格内容 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="account"
        :label="$t('operation.memberaccount')"
        width="180"
      />
      <el-table-column
        prop="vipLevel"
        :label="$t('operation.VIPlevel')"
        width="180"
      />
      <el-table-column
        prop="riskControlTier"
        :label="$t('operation.Riskcontrollevel')"
        width="180"
      />
      <el-table-column
        prop="financeTier"
        :label="$t('operation.tip151')"
        width="180"
      />
      <el-table-column
        prop="parentName"
        :label="$t('operation.SuperiorAgent')"
        width="180"
      />
      <el-table-column
        prop="source"
        :label="$t('operation.source')"
        width="180"
      />
      <el-table-column
        prop="problemType"
        :label="$t('operation.questionType')"
        width="180"
      />
      <el-table-column
        prop="title"
        :label="$t('operation.tip187')"
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <div class="content-box" v-html="row.title"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        :label="$t('operation.FeedbackContent')"
        width="180"
        class="content-box"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <div class="content-box" v-html="row.content"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="dataAddress"
        :label="$t('operation.Feedbackinformat')"
        width="280"
        align="center"
      >
        <template #default="{ row }">
          <el-button type="primary" plain @click="toshowPreview(row)">{{
            $t("operation.tip188")
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('operation.status')"
        width="180"
      >
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status == 1">{{
            $t("operation.Processed")
          }}</el-tag>

          <el-tag type="danger" v-else>{{ $t("operation.Pending") }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="feedbackTime"
        :label="$t('operation.feedbacktime')"
        sortable
        width="240"
      />
      <el-table-column
        prop="handle"
        :label="$t('operation.Processor')"
        width="180"
      />
      <el-table-column
        prop="handleTime"
        :label="$t('operation.procestime')"
        sortable
        width="240"
      />
      <el-table-column
        :label="$t('operation.operate')"
        align="center"
        width="220"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="disableBtn(scope.row)"
            v-if="scope.row.status == 0"
            >{{ $t("operation.Pending") }}</el-button
          >
          <el-button type="primary" size="small" v-else>{{
            $t("operation.Processed")
          }}</el-button>
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
      v-model="showPreview"
      :title="$t('operation.tip189')"
      width="700px"
      :center="true"
    >
      <PreviewText :previewContent="previewContent" />
    </el-dialog>
  </div>
</template>
<script setup>
import PreviewText from "./PreviewText.vue";
import { ref, reactive, onMounted } from "vue";
import { defaultTime, shortcuts } from "@/utils/config";
import { getReConfigList, getIpAccountStatus } from "@/api/operation/resource";
import { getImgUrl } from "@/utils";
import { ElMessageBox, ElMessage } from "element-plus";
import i18n from "@/i18n";

const previewContent = ref();
const showPreview = ref(false);
const toshowPreview = (item) => {
  previewContent.value = item;
  showPreview.value = !showPreview.value;
};
const queryParams = ref({
  account: "",
  source: "",
  problemType: "",
  status: "",
  createBy: "",
  feedbackTime: "",
  pageNum: 1,
  pageSize: 10,
});
const queryRef = ref();
const total = ref(5);
const loading = ref(false);
const dateRange = ref([]);
const tableData = ref([]);

const originates = [
  {
    value: "",
    label: i18n.global.t("operation.all"),
  },
  {
    value: "PC",
    label: "PC",
  },
  {
    value: "H5",
    label: "H5",
  },
  {
    value: "ios",
    label: "ios",
  },
  {
    value: "安卓",
    label: i18n.global.t("operation.Android"),
  },
];
const questionTypes = [
  {
    value: "",
    label: i18n.global.t("operation.all"),
  },
  {
    value: "财务问题",
    label: i18n.global.t("operation.financialProblem"),
  },
  {
    value: "账号问题",
    label: i18n.global.t("operation.AccountProblem"),
  },
  {
    value: "游戏问题",
    label: i18n.global.t("operation.GameIssues"),
  },
  {
    value: "活动问题",
    label: i18n.global.t("operation.activityquestion"),
  },
  {
    value: "平台建议",
    label: i18n.global.t("operation.tip190"),
  },
  {
    value: "投诉意见",
    label: i18n.global.t("operation.Complaints"),
  },
];
const positions = [
  {
    value: "",
    label: i18n.global.t("operation.all"),
  },
  {
    value: 1,
    label: i18n.global.t("operation.Processed"),
  },
  {
    value: 0,
    label: i18n.global.t("operation.Pending"),
  },
];
//导出
function handleExport() {
  // queryParams.value.vipScope = queryParams.value.vipLevelName.join(",");
  // proxy.download(
  //   "/system/fund/withdrawl/bonus/record/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `意见反馈记录_${new Date().toLocaleString()}.xlsx`
  // );
}
//列表
const getDataList = async () => {
  try {
    let res = await getReConfigList(queryParams.value);
    console.log(res, "ref.data.records");
    tableData.value = res.records;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  }
};
const disableBtn = (row) => {
  let txt = i18n.global.t("operation.tip191");
  ElMessageBox.confirm(txt)
    .then(() => {
      getIpAccountStatus(row.id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("operation.operatSuccess"),
        });
        getDataList();
      });
    })
    .catch(() => {});
};
/** 查询按钮操作 */
const registerTime = ref([]); //反馈时间
const processingTime = ref([]);
const handleQuery = () => {
  if (registerTime.value) {
    queryParams.value.feedbackTimeBegin = registerTime.value[0];
    queryParams.value.feedbackTimeEnd = registerTime.value[1];
  } else {
    queryParams.value.feedbackTime = null;
    queryParams.value.feedbackTimeEnd = null;
  }
  if (processingTime.value) {
    queryParams.value.handleTimeBegin = processingTime.value[0];
    queryParams.value.handleTimeEnd = processingTime.value[1];
  } else {
    queryParams.value.handleTimeBegin = null;
    queryParams.value.handleTimeEnd = null;
  }
  getDataList();
};
1;
// 重置
const resetQuery = () => {
  queryParams.value.account = "";
  queryParams.value.source = "";
  queryParams.value.problemType = "";
  queryParams.value.status = "";
  queryParams.value.createBy = "";
  queryParams.value.feedbackTimeBegin = "";
  queryParams.value.feedbackTimeEnd = "";
  queryParams.value.handleTimeBegin = "";
  queryParams.value.handleTimeEnd = "";
  registerTime.value = [];
  processingTime.value = [];
  getDataList();
};
//分页
function getList() {
  loading.value = true;
  getReConfigList(queryParams.value)
    .then((res) => {
      loading.value = false;
      tableData.value = res.records || [];
      total.value = res.total;
    })
    .catch((err) => {
      loading.value = false;
    });
  console.log(tableData.value);
}

onMounted(() => {
  getDataList();
});
</script>

<style lang="scss" scoped></style>
