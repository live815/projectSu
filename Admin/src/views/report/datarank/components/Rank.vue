<template>
  <el-form :model="queryParams" ref="queryRef" :inline="true">
    <el-row :gutter="10">
      <el-col :span="3">
        <el-form-item :label="$t('report.parentName')" prop="parentName" class="full-width">
          <el-input
              v-model="queryParams.parentName"
              :placeholder="$t('report.pleaseInput')"
              clearable
              class="full-width"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('report.timeRange')" class="full-width">
          <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="-"
              :clearable="false"
              :editable="false"
              @change="handleChange"
              class="full-width"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="full-width">
          <el-button
              type="primary"
              icon="Search"
              @click="handleQuery"
          >{{ $t('report.search') }}</el-button
          >
          <el-button icon="Refresh" @click="reset">{{ $t('report.reset') }}</el-button>
          <el-button
              icon="download"
              @click="handleExport"
              class="exoport-btn"
          >{{ $t('report.export') }}</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="clearfix">
    <div class="container" :class="{fl: n===1, fr: n===2}" v-for="n in 2">
      <h3>{{ titlePrefix }}{{ title(n, activeName) }}排行</h3>
      <el-table :data="rankList[n-1]" stripe :empty-text="$t('report.noData')">
        <el-table-column :label="$t('report.rank')" type="index" width="50">
        </el-table-column>
        <el-table-column :label="$t('report.userNameNoQuote')" v-if="activeName!=='3'" align="center" prop="userName">
          <template #default="{ row }">
            <span @click="goBetOrderDetail(row)" class="pointer">{{ row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('report.parentAnotherName')" v-if="activeName!=='3'" align="center" prop="parentName">
        </el-table-column>
        <el-table-column :label="$t('report.platformNoQuote')" v-else align="center" prop="lobbyName">
        </el-table-column>
        <el-table-column :label="$t('report.validBetAmountNoYuan')" v-if="activeName!=='2'" align="center" prop="validBetAmount">
        </el-table-column>
        <el-table-column :label="title(n, activeName)+'金额'" v-if="activeName!=='3'" sortable align="center" prop="sumAmount">
        </el-table-column>
        <el-table-column :label="title(n, activeName)+'金额'" v-else sortable align="center" prop="platformWin">
        </el-table-column>
        <el-table-column :label="$t('report.rankCount')" v-if="activeName!=='3'" align="center">
          <template #default="{ row }">
            <a href="javascript:;" @click="openDialog(n, row.userName)">{{ row.rankCount }}</a>
          </template>
        </el-table-column>
        <el-table-column :label="$t('report.orderCount')" v-else align="center" prop="betUsers">
        </el-table-column>
      </el-table>
      <el-dialog v-model="dialogVisible[n-1]" width="30%" align-center>
        <el-table :data="rankDialogList[n-1]" stripe>
          <el-table-column property="rankTime" :label="$t('report.date')" />
          <el-table-column property="userName" :label="$t('report.userNameNoQuote')" width="180px" />
          <el-table-column property="sumAmount" :label="title(n, activeName)" />
          <el-table-column property="rankCount" :label="$t('report.rank')" />
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { fix } from "@/utils";
import { getRankList } from "@/api/report/rankdata/index";
import {useRouter} from "vue-router";

const router = useRouter();
const { proxy } = getCurrentInstance();
const dateRange = ref([]);
const queryRef = ref(null);
const queryParams = ref({
  parentName: null,
  timeBeginStr: null,
  timeEndStr: null,
});
const rankList = ref([[], []]);
const rankDialogList = ref([[], []]);
const dialogVisible = ref([false, false]);
const urlPrefix = "/system/report/member/";
const { activeName } = defineProps(["activeName"]);

const titlePrefix = computed(()=> activeName === "3" ? "场馆" : "玩家");

const title = (n, activeName) => {
  if(activeName === "2") {
    return n === 1 ? "充值" : "提现";
  } else {
    return n === 1 ? "盈利" : "亏损";
  }
}

const openDialog = (n, userName) => {
  let url;
  if(activeName === "1") {
    url = urlPrefix + "queryUserWinLostRankDetail";  // 输赢排名（弹窗）接口地址
  } else {
    url = urlPrefix + "queryUserRechargeWithDrawRankDetail";  // 充提排名（弹窗）接口地址
  }
  queryParams.value.userName = userName;
  dialogVisible.value[n-1] = true;
  delete queryParams.value.parentName;
  // 输赢排名、充提排名（弹窗）
  getRankList({ ...queryParams.value, type: n }, url).then((res) => {
    rankDialogList.value[n-1] = res;
  });
  delete queryParams.value.userName;
}

function defaultData() {
  const date = new Date();
  const year = date.getFullYear();
  const month = fix(date.getMonth() + 1, 2);
  const day = fix(date.getDate(), 2);
  const ymd = year + '-' + month + '-' + day;
  dateRange.value = [date, date];
  if(activeName !== "3") {
    queryParams.value.timeBeginStr = ymd;
    queryParams.value.timeEndStr = ymd;
  } else {
    queryParams.value.startTime = ymd;
    queryParams.value.endTime = ymd;
  }
  getList();
}

const getList = () => {
  let url;
  if (activeName !== "3") {
    if (activeName === "1") {
      url = urlPrefix + "queryUserWinLostRank";  // 输赢排名接口地址
    } else {
      url = urlPrefix + "queryUserRechargeWithDrawRank";  // 充提排名接口地址
    }
    // 玩家盈利、充值排行
    getRankList({ ...queryParams.value, type: 1 }, url).then((res) => {
      rankList.value[0] = res;
    });
    // 玩家亏损、提现排行
    getRankList({ ...queryParams.value, type: 2 }, url).then((res) => {
      rankList.value[1] = res;
    });
  } else {
    const urlPrefix = "/system/report/game/";
    delete queryParams.value.timeBeginStr;
    delete queryParams.value.timeEndStr;
    // 场馆盈利排行
    getRankList(queryParams.value, urlPrefix + "queryLobbyWinSort").then((res) => {
      rankList.value[0] = res;
    });
    // 场馆亏损排行
    getRankList(queryParams.value, urlPrefix + "queryLobbyLossSort").then((res) => {
      rankList.value[1] = res;
    });
  }
};

onMounted(() => {
  defaultData();
});

const handleQuery = () => {
  getList();
};

// 选择时间
function handleChange() {
  let timeBeginStr = dateRange.value[0];
  let timeEndStr = dateRange.value[1];
  const year_s = timeBeginStr.getFullYear();
  const month_s = fix(timeBeginStr.getMonth() + 1, 2);
  const year_e = timeEndStr.getFullYear();
  const month_e = fix(timeEndStr.getMonth() + 1, 2);
  const date_s = fix(timeBeginStr.getDate(), 2);
  const date_e = fix(timeEndStr.getDate(), 2);
  dateRange.value = [timeBeginStr, timeEndStr];
  timeBeginStr = year_s + "-" + month_s + "-" + date_s;
  timeEndStr = year_e + "-" + month_e + "-" + date_e;
  if(activeName !== "3") {
    queryParams.value.timeBeginStr = timeBeginStr;
    queryParams.value.timeEndStr = timeEndStr;
  } else {
    queryParams.value.startTime = timeBeginStr;
    queryParams.value.endTime = timeEndStr;
  }
}

function goBetOrderDetail(row) {
  router.push({
    path: "/member/detail-basic/info/" + row.userName,
    query: {
      tenantId: row.tenantId,
      userId: row.userId,
    },
  });
}

const handleExport = () => {
  // proxy.download(
  //   "system/user/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `玩家限制_${new Date().toLocaleDateString()}.xlsx`
  // );
};
const reset = () => {
  queryRef.value.resetFields();
  defaultData();
};
</script>

<style lang="scss" scoped>
.container {
  width: 49.5%;
  &:nth-child(1) {
    :deep(.el-table) {
      td {
        &:nth-last-child(2) {
          .cell {
            color: #32941AC2;
          }
        }
      }
    }
  }
  &:nth-child(2) {
    :deep(.el-table) {
      td {
        &:nth-last-child(2) {
          .cell {
            color: #EA1212B6;
          }
        }
      }
    }
  }
  h3 {
    font-weight: bold;
  }
  :deep(.el-table) {
    a {
      text-decoration: underline;
    }
  }
}
</style>
