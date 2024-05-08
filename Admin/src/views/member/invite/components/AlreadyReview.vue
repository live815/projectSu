<template>
  <div class="invite-second-review">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('member.invitedAccount') + '：'" prop="subName">
        <el-input
          v-model="queryParams.subName"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 235px"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('member.inviterAccount') + '：'"
        prop="inviteName"
      >
        <el-input
          v-model="queryParams.inviteName"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 235px"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('friends.useTime')">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('member.beginTime')"
          :end-placeholder="$t('member.endTime')"
          @change="handleChange"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="primary-button">
        <el-button icon="Refresh" @click="reset"
          >{{ $t("risk.reset") }}
        </el-button>
        <el-button type="primary" icon="download"
          >{{ $t("risk.export") }}
        </el-button>
        <el-button type="primary" @click="handleQuery"
          >{{ $t("member.search") }}
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('member.invitedAccount')"
        align="center"
        prop="subName"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row["subName"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.inviterAccount')"
        align="center"
        prop="inviteName"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row["inviteName"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.inviterVipRank')"
        align="center"
        prop="inviteVipLevelName"
        width="130"
      >
        <template #default="{ row }">
          <span>{{ row["inviteVipLevelName"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.invitedRegisterTime')"
        align="center"
        prop="regTime"
        width="130"
      >
        <template #default="{ row }">
          <span>{{ row["regTime"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.invitedFirstDepositTime')"
        align="center"
        prop="firstDepTime"
        width="130"
      >
        <template #default="{ row }">
          <span>{{ row["firstDepTime"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.invitedFirstDepositBalance')"
        align="center"
        prop="firstDepAmount"
        width="130"
      >
        <template #default="{ row }">
          <span>{{ row["firstDepAmount"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.inviterForwardTime')"
        align="center"
        prop="awardTime"
        width="150"
      >
        <template #default="{ row }">
          <span>{{ row["awardTime"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.inviterFirstDepositForward')"
        align="center"
        prop="inviteFirstAward"
        width="130"
      >
        <template #default="{ row }">
          <span>{{ row["inviteFirstAward"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.invitedFirstForwardTime')"
        align="center"
        prop="firstAward"
        width="130"
      >
        <template #default="{ row }">
          <span>{{ row["firstAward"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.invitedDeviceId')"
        align="center"
        prop="deviceNo"
        width="140"
      >
        <template #default="{ row }">
          <span>{{ row["deviceNo"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.orderStatusNoQuote')" align="center">
        <template #default="{ row }">
          <span>{{ filterLabel(statusList,row.unbindStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        :label="$t('member.firstReviewInformation')" 
        align="center"
        width="200">
        <template #default="{ row }">
          <div>
            <span>一审审核人:</span>
            <span>{{ row.firstReview || "-" }}</span>
          </div>
          <div>
            <span>一审审核时间:</span>
            <span>{{ row.firstReviewTime || "-" }}</span>
          </div>
          <div>
            <span>审核备注:</span>
            <span>{{ row.firstReviewRemark || "-" }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column 
        :label="$t('member.secondReviewInformation')" 
        align="center"
        width="200">
        <template #default="{ row }">
          <div>
            <span>二审审核人:</span>
            <span>{{ row.finalReview || "-" }}</span>
          </div>
          <div>
            <span>二审审核时间:</span>
            <span>{{ row.finalReviewTime || "-" }}</span>
          </div>
          <div>
            <span>审核备注:</span>
            <span>{{ row.finalReviewRemark || "-" }}</span>
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
    />
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
// import i18n from "@/i18n";
import { filterLabel } from "@/utils/index";
import { querySubFinalList } from "@/api/member/invite/index";

const queryRef = ref(null);
const dateRange = ref([]);
const loading = ref(false);
const queryParams = ref({
  subName: null,
  inviteName: null,
  dateRange: null,
  pageNum: 1,
  pageSize: 10,
});
const tableData = ref([]);
const total = ref(0);
const statusList = ref([
  {
    value:"0",
    label:"未解绑"
  },
  {
    value:"1",
    label:"待一审"
  },
  {
    value:"2",
    label:"一审拒绝"
  },
  {
    value:"3",
    label:"待二审"
  },
  {
    value:"4",
    label:"二审拒绝"
  },
  {
    value:"5",
    label:"二审通过"
  },
])

onMounted(async () => {
  await getList();
});

const getList = () => {
  loading.value = true;
  return querySubFinalList({...queryParams.value}).then((res) => {
    loading.value = false;
    tableData.value = res?.["rows"] || [];
    total.value = res?.["total"] || 0;
  });
};

const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

const reset = () => {
  queryRef.value.resetFields();
};

// 选择时间
const handleChange = () => {
  if (
    (dateRange.value && !dateRange.value.length) ||
    dateRange.value === null
  ) {
    queryParams.value.regTimeStart = null;
    queryParams.value.regTimeEnd = null;
  } else {
    queryParams.value.regTimeStart = dateRange.value[0];
    queryParams.value.regTimeEnd = dateRange.value[1];
  }
};
</script>

<style scoped lang="scss">
.invite-second-review {
  padding: 20px;
}
</style>
