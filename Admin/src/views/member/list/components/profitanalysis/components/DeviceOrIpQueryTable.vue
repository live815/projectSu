<template>
  <div class="device-or-ip-query-table">
    <el-dialog
      v-model="dialogVisible"
      width="70%"
      :title="
        type === 'device'
          ? $t('member.sameDeviceNoInfo')
          : $t('member.sameIpInfo')
      "
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-table
        :data="tableData"
        :empty-text="$t('member.noData')"
        class="device-ip-table"
        @filter-change="handleFilterChange"
      >
        <el-table-column
          :label="$t('member.userNameNoQuote')"
          prop=""
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.realNameNoQuote')"
          prop=""
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.nation')"
          prop=""
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.agentNameNoQuote')"
          prop=""
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.memberLabel')"
          prop="memberTag"
          class-name="filter-icon"
          column-key="statusList"
          :filters="memberTagList"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.accountStatus')"
          prop="status"
          width="100"
          align="center"
          class-name="filter-icon"
          column-key="statusList"
          :filters="[
            { text: $t('member.regular'), value: '0' },
            { text: $t('member.loginLock'), value: '1' },
            { text: $t('member.rechargeWithdrawLock'), value: '2' },
            { text: $t('member.abandonWithdrawLock'), value: '3' },
            { text: $t('member.offerLock'), value: '4' },
            { text: $t('member.rebateLock'), value: '5' },
            { text: $t('member.gameLock'), value: '6' },
          ]"
        >
        </el-table-column>
        <el-table-column
          :label="$t('member.isBindingPhoneNumber')"
          prop=""
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.registerTimeNoQuote')"
          sortable
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.lastLoginTimeNoQuote')"
          sortable
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.recentlyThreeMonth')"
          prop=""
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.rechargeAmount')"
          prop=""
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.withdrawAmountNoQuote')"
          prop=""
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.balanceLeftMoneyL')"
          prop=""
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('member.companyWinLosses')"
          prop=""
          align="center"
        ></el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel" type="primary">{{
            $t("member.cancel")
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { formatNumber } from "@/utils";
import { getLabelSelect } from "@/api/member/list/index";
import { getLoginUserByIp } from "@/api/member/profitanalysis/index";

const props = defineProps(["open", "type", "cloneRow"]);
const emit = defineEmits(["update:open"]);

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const tableData = ref([]);
const memberTagList = ref([]);
const filterCondition = ref({});

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

onMounted(() => {
  getList();
  queryMemberTag();
});
function getList() {
  const params = {
    ...queryParams.value,
    ...filterCondition.value
  }
  console.log(props.type,params);
}
function queryMemberTag(){
  return getLabelSelect().then(res=>{
    memberTagList.value = res || []
    memberTagList.value.forEach(item=>{
      item.text = item.labelName
      item.value = item.id
    })
  })
}
function cancel() {
  dialogVisible.value = false;
}
function handleFilterChange(val) {
  for (const key in val) {
    if (val.hasOwnProperty(key)) {
      filterCondition.value[key] = val[key];
    }
  }
  getList();
}
</script>

<style lang="scss" scoped>
.device-or-ip-query-table {
  :deep() {
    .el-dialog__title {
      color: #333333;
      font-weight: 600;
    }
  }
  .device-ip-table {
    :deep() {
      .filter-icon .el-icon svg {
        display: none;
      }
      .filter-icon .el-icon {
        content: url("@/assets/icons/svg/filter.svg") !important;
      }
    }
  }
}
</style>
