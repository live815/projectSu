<template>
  <div class="phone-manage">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('friends.domainName')" prop="domainName">
        <el-input
          v-model="queryParams.domainName"
          :placeholder="$t('member.pleaseInput')"
          style="width: 235px"
          clearable
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
          style="width: 365px"
          @change="handleChange"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('member.endTime')">
        <el-date-picker
          v-model="endDateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('member.beginTime')"
          :end-placeholder="$t('member.endTime')"
          style="width: 365px"
          @change="handleChangeEnd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="primary-button">
        <el-button icon="Refresh" @click="resetQuery(queryRef)"
          >{{ $t("risk.reset") }}
        </el-button>
        <el-button type="primary" @click="handleQuery">{{
          $t("member.search")
        }}</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" v-loading="loading">
      <el-table-column
        :label="$t('friends.domainName')"
        align="center"
        prop="domainName"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row["domainName"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('friends.firstUseTime')"
        align="center"
        prop="startTime"
      >
        <template #default="{ row }">
          <span>{{ row["startTime"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('friends.lastUseTime')"
        align="center"
        prop="endTime"
      >
        <template #default="{ row }">
          <span>{{ row["endTime"] || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.totalInviteFriends')"
        align="center"
        prop="memberCount"
      >
        <template #default="{ row }">
          <span v-if="row['memberCount'] * 1 < 0" @click="openDialog(row)"
            >-</span
          >
          <span style="color: #1c84c6" @click="openDialog(row)" v-else>{{
            row["memberCount"]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.totalFirstSaveMoney')"
        align="center"
        prop="firstDepAmount"
      >
        <template #default="{ row }">
          <span>{{
            row["firstDepAmount"] * 1 < 0 ? "-" : row["firstDepAmount"]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.totalTurnover')"
        align="center"
        prop="betAmount"
      >
        <template #default="{ row }">
          <span v-if="row['betAmount'] * 1 < 0">-</span>
          <span v-else>{{ row["betAmount"] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.totalVipAward')"
        align="center"
        prop="vipAmount"
      >
        <template #default="{ row }">
          <span>{{ row["vipAmount"] * 1 < 0 ? "-" : row["vipAmount"] }}</span>
        </template>
      </el-table-column>
    </el-table>
<!--    <pagination-->
<!--      v-show="total > 0"-->
<!--      :total="total"-->
<!--      v-model:page="queryParams.pageNum"-->
<!--      v-model:limit="queryParams.pageSize"-->
<!--      @pagination="getList"-->
<!--    />-->
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :title="$t('member.totalInviteFriends')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <div>{{ id }}</div>
      <el-table :data="tableInviteData" border>
        <el-table-column :label="$t('member.userName')" prop="total">
          <template #default="{ row }">
            <span>{{ row }}</span>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
<!--          <pagination-->
<!--            v-show="totalInvite > 0"-->
<!--            :total="totalInvite"-->
<!--            v-model:page="queryParams.pageNum"-->
<!--            v-model:limit="queryParams.pageSize"-->
<!--            @pagination="getList"-->
<!--        />-->
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
// import i18n from "@/i18n";
import {
  queryInviteUrlList,
  querySubNameList,
} from "@/api/member/invite/index";
import { filterLabel, formatNumber } from "@/utils";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  domainName: null,
  // pageNum: 1,
  // pageSize: 10,
});
const dateRange = ref([]);
const endDateRange = ref([]);
const loading = ref(false);
const tableData = ref([]);
const total = ref(0);
const id = ref(null);
const dialogVisible = ref(false);
const tableInviteData = ref([]);
const totalInvite = ref(0);
const pageNumInvite = ref(1);
// const pageSizeInvite = ref(10);

onMounted(async () => {
  await getList();
});

function getList() {
  loading.value = true;
  queryInviteUrlList(queryParams.value).then((res = []) => {
    loading.value = false;
    tableData.value = res;
    total.value = res.length || 0;
  });
}

const resetQuery = (queryRef) => {
  if (!queryRef) return;
  reset(queryRef);
  dateRange.value = [];
  endDateRange.value = [];
  handleChange();
  getList();
};

const handleQuery = () => {
  // queryParams.value.pageNum = 1;
  getList();
};

const reset = (queryRef) => {
  queryRef.resetFields();
};

// 使用时间
const handleChange = () => {
  if (
    (dateRange.value && !dateRange.value.length) ||
    dateRange.value === null
  ) {
    queryParams.value.startTimeMin = null;
    queryParams.value.startTimeMax = null;
  } else {
    queryParams.value.startTimeMin = dateRange.value[0];
    queryParams.value.startTimeMax = dateRange.value[1];
  }
};

// 结束时间
const handleChangeEnd = () => {
  if (
    (endDateRange.value && !endDateRange.value.length) ||
    endDateRange.value === null
  ) {
    queryParams.value.endTimeMin = null;
    queryParams.value.endTimeMax = null;
  } else {
    queryParams.value.endTimeMin = endDateRange.value[0];
    queryParams.value.endTimeMax = endDateRange.value[1];
  }
};

const getSubNameList = () => {
  const data = {
    pageNumInvite
  }
  querySubNameList({ domainName: id.value }).then((res = []) => {
    tableInviteData.value = res;
    totalInvite.value = res.length || 0;
  });
};

const openDialog = (row) => {
  id.value = row.domainName;
  dialogVisible.value = true;
  getSubNameList();
};

const cancel = () => {
  dialogVisible.value = false;
};

// function updateStatus(row) {
//   changeCountrycodeStatus({
//     id: row.id,
//     status: row.status,
//   }).then(() => {
//     proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
//     getList();
//   });
// }
</script>

<style scoped>
.phone-manage {
  padding: 20px;
}
</style>
