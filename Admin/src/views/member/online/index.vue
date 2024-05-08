<template>
  <div class="online-member">
    <div class="online">
      <span>{{ $t("member.currentOnlinePeople") }}{{ total }}</span>
    </div>
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item
            :label="$t('member.userName')"
            class="full-width"
            prop="userName"
          >
            <el-input
              v-model="queryParams.userName"
              :placeholder="$t('member.pleaseInput')"
              clearable
              maxlength="16"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            :label="$t('member.agentName')"
            class="full-width"
            prop="parentName"
          >
            <el-input
              v-model="queryParams.parentName"
              :placeholder="$t('member.pleaseInput')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="IP:" prop="lastLoginIp" class="full-width">
            <el-input
              v-model="queryParams.lastLoginIp"
              :placeholder="$t('member.pleaseInput')"
              clearable
              maxlength="16"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="pl-20">
          <el-button type="primary" @click="handleQuery">{{
            $t("member.search")
          }}</el-button>
          <el-button type="primary" @click="reset">{{
            $t("member.reset")
          }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      ref="tableRef"
      :data="tableData"
      :empty-text="$t('member.noData')"
      class="online-count"
      @filter-change="handleFilterChange"
    >
      <el-table-column
        :label="$t('member.serialNumber')"
        width="55"
        type="index"
        align="center"
      >
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.userNameNoQuote')"
        align="center"
        width="160"
      >
        <template #default="{ row }">
          <span>{{ row.userName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.agentNameNoQuote')" align="center">
        <template #default="{ row }">
          <span>{{ row.parentName || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="filter-icon"
        :label="$t('member.vipLevelNoQuote')"
        align="center"
        prop="vipLevel"
        column-key="vipLevelList"
        :filters="[
          { text: 'VIP0', value: '0' },
          { text: 'VIP1', value: '1' },
          { text: 'VIP2', value: '2' },
          { text: 'VIP3', value: '3' },
          { text: 'VIP4', value: '4' },
          { text: 'VIP5', value: '5' },
          { text: 'VIP6', value: '6' },
          { text: 'VIP7', value: '7' },
          { text: 'VIP8', value: '8' },
          { text: 'VIP9', value: '9' },
          { text: 'VIP10', value: '10' },
          { text: 'VIP11', value: '11' },
        ]"
      >
      </el-table-column>
      <el-table-column :label="$t('member.mainAccountBalance')" align="center">
        <template #default="{ row }">
          <span>{{ formatNumber(row.masterWalletBal) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.lastLoginIP')" align="center">
        <template #default="{ row }">
          <span>{{ row.lastLoginIp || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.loginArea')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.lastLoginArea || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="filter-icon"
        :label="$t('member.loginClient')"
        align="center"
        column-key="loginClientList"
        :filters="[
          { text: 'PC', value: 1 },
          { text: $t('member.nativeIOS'), value: 2 },
          { text: $t('member.webPageIOS'), value: 3 },
          { text: 'IOSH5', value: 4 },
          { text: $t('member.nativeAndroid'), value: 5 },
          { text: $t('member.webPageAndroid'), value: 6 },
          { text: 'Android H5', value: 7 },
          { text: $t('member.unknow'), value: 9 },
        ]"
      >
        <template #default="{ row }">
          {{ filterLabel(clientList, row.loginClient) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.loginTime')"
        align="center"
        prop="loginTime"
        sortable
      >
        <template #default="{ row }">
          <span>{{ row.lastLoginTime || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center" width="200">
        <template #default="scope">
          <el-button type="success" @click="loginLock(scope.row)">{{
            $t("member.loginLock")
          }}</el-button>
          <el-button type="primary" @click="kickOff(scope.row)">{{
            $t("member.kickOffline")
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
    />
  </div>
</template>

<script setup name="Online">
import i18n from "@/i18n";
import { getCurrentInstance, onMounted, ref } from "vue";
import { getOnlineList } from "@/api/member/online/index";
import { memberKickOffline } from "@/api/member/list/index";
import { formatNumber, filterLabel } from "@/utils";
import { clientList } from "@/utils/config";
import { updateMemberStatus } from "@/api/member/list/index";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const tableRef  = ref(null);
const queryParams = ref({
  userName: null,
  parentName: null,
  lastLoginIp: null,
  pageNum: 1,
  pageSize: 10,
});
const filterCondition = ref({}); //表格筛选条件存储的对象
const total = ref(0);
const tableData = ref([]);
const isFirstLoad = ref(true);

onMounted(async() => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
});
const getList = () => {
  return getOnlineList({
    ...queryParams.value,
    ...filterCondition.value,
  }).then((res) => {
    tableData.value = res.rows || [];
    total.value = res.total;
  });
};
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
const reset = () => {
  queryRef.value.resetFields();
  tableRef.value?.clearFilter();
  filterCondition.value = {};
};
//筛选条件，将条件存在全局变量
function handleFilterChange(val) {
  for (const key in val) {
    if (val.hasOwnProperty(key)) {
      filterCondition.value[key] = val[key];
    }
  }
  getList();
}
const loginLock = (row) => {
  updateMemberStatus({
    id: row.id,
    status: "1",
  }).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
    getList();
  });
};
const kickOff = (row) => {
  memberKickOffline({
    memberId:row.id
  }).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t('member.operateSuccessfully'))
    getList()
  })
};
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.online-member {
  padding: 20px;
  .online-count {
    :deep() {
      .filter-icon .el-icon svg {
        display: none;
      }
      .filter-icon .el-icon {
        content: url("@/assets/icons/svg/filter.svg") !important;
      }
    }
  }
  .online {
    font-weight: 600 !important;
    margin-bottom: 20px;
  }
  .pl-20 {
    padding-left: 20px;
  }
}
</style>
