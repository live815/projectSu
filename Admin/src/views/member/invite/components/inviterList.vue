<template>
  <div class="phone-manage">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('member.inviterAccount')" prop="inviteName">
        <el-input
          v-model="queryParams.inviteName"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 235px"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('friends.useTime') + '：'">
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
        <el-button icon="Refresh" @click="resetQuery(queryRef)"
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
    <el-table :data="tableData" v-loading="loading">
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
        :label="$t('member.inviteTotalFriends')"
        align="center"
        prop="subCount"
      >
        <template #default="{ row }">
          <span>{{ row["subCount"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.totalFirstDepositForward')"
        align="center"
        prop="firstDepAward"
      >
        <template #default="{ row }">
          <span>{{ row["firstDepAward"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.totalTurnoverForward')"
        align="center"
        prop="betAward"
      >
        <template #default="{ row }">
          <span>{{ row["betAward"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.totalFirstSaveMoney')"
        align="center"
        prop="firstDepAward"
      >
        <template #default="{ row }">
          <span>{{ row["firstDepAward"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.unissuedTurnoverForward')"
        align="center"
        prop="unBetAward"
      >
        <template #default="{ row }">
          <span>{{ row["unBetAward"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.totalVipAward')"
        align="center"
        prop="vipAward"
      >
        <template #default="{ row }">
          <span>{{ row["vipAward"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.handle')"
        align="center"
        prop="inviteStatus"
      >
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            v-if="row['inviteStatus']  + '' === '1'"
            @click="updateStatus(row)"
            >{{ i18n.global.t("friends.startForward") }}</el-button
          >
          <el-button
            type="danger"
            size="small"
            v-else
            @click="updateStatus(row)"
            >{{ i18n.global.t("member.stopForward") }}</el-button
          >
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
import i18n from "@/i18n";
import { queryInviteList, updateInviteStatus } from "@/api/member/invite/index";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const loading = ref(false);
const queryParams = ref({
  inviteName: null,
  dateRange: null,
  pageNum: 1,
  pageSize: 10,
});
const tableData = ref([]);
const total = ref(0);
const dateRange = ref([]);

onMounted(async () => {
  await getList();
});

const getList = () => {
  loading.value = true;
  return queryInviteList({...queryParams.value}).then((res) => {
    loading.value = false;
    tableData.value = res?.["rows"] || [];
    total.value = res?.["total"] || 0;
  });
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

const resetQuery = (queryRef) => {
  if (!queryRef) return;
  reset(queryRef);
  dateRange.value = [];
  handleChange();
  getList();
};

const reset = (queryRef) => {
  queryRef.resetFields();
};

const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

const updateStatus = (row) => {
  updateInviteStatus({
    inviteName: row.inviteName,
    inviteStatus: row.inviteStatus + '' === '0' ? 1 : 0,
  }).then(() => {
    proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
    getList();
  });
}
</script>

<style scoped>
.phone-manage {
  padding: 20px;
}
</style>
