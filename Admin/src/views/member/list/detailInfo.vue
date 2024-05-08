<template>
  <div class="detail-info">
    <div class="member-account">
      <el-form :model="queryParamsAccount" ref="queryRef" :inline="true">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item :label="$t('member.userName')" prop="userName" class="full-width">
              <el-input
                v-model="queryParamsAccount.userName"
                :placeholder="$t('member.pleaseInput')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button
              type="primary"
              @click="queryAccount"
              :disabled="!queryParamsAccount.userName"
              >{{ $t('member.search') }}</el-button
            >
            <el-button @click="reset">{{ $t('member.reset') }}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-form :model="queryParams" :inline="true" class="form-show">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item :label="$t('member.userName')" prop="userName" class="full-width">
            <span>{{ queryParams.userName || "-" }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="VIP:" prop="vipLevel" class="full-width">
            <span>{{ queryParams.vipName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('member.riskTier')"
            prop="riskControlTierStr"
            class="full-width"
          >
            <span>{{ queryParams.riskControlTierStr || "-" }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('member.financeTier')"
            prop="financeTierStr"
            class="full-width"
          >
            <span>{{ queryParams.financeTierStr || "-" }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.agentName')" prop="parentName" class="full-width">
            <span>{{ queryParams.parentName || "-" }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.invitor')" prop="invitor" class="full-width">
            <span>{{ queryParams.invitor ? queryParams.invitor : "-" }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.onlineStatus')" prop="online" class="full-width">
            <span>{{
              queryParams.online === "0"
                ? $t('member.offline')
                : queryParams.online === "1"
                ? $t('member.online')
                : "-"
            }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.registerTime')" prop="regTime" class="full-width">
            <span>{{ queryParams.regTime || "-" }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('member.type')" prop="type" class="full-width">
            <div class="type" v-if="queryParams.type === '0'">{{ $t('member.normal') }}</div>
            <div class="type" v-else-if="queryParams.type === '1'">{{ $t('member.excellent') }}</div>
            <div class="type" v-else-if="queryParams.type === '2'">{{ $t('member.follow') }}</div>
            <div class="type" v-else>-</div>
            <el-button
              type="primary"
              size="small"
              @click="openTypeDia"
              class="ml-4"
              >{{ $t('member.update') }}</el-button
            >
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="activeName === '1'">
          <el-form-item :label="$t('member.accountStatusQuote')" prop="status" class="full-width">
            <div
              v-if="queryParams.status"
              style="display: flex; flex-wrap: wrap"
            >
              <el-tag
                v-for="item in queryParams.status.split(',')"
                :type="colorSwitch(item)"
                style="margin-right: 4px;"
              >
                {{ statusSwitchToLabel(item) }}
              </el-tag>
            </div>
            <span v-else>-</span>
            <el-button type="primary" size="small" @click="openStatusDia"
              >{{ $t('member.update') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('member.basicInformation')" name="1">
        <BasicInfo
          :queryParams="queryParams"
          :activeName="activeName"
          @onrefresh="refreshData"
          :tenantId="tenantId"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.financeInformation')" name="2">
        <FinancialInfo :queryParams="queryParams" :activeName="activeName" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.loginInformation')" name="3">
        <LoginInfo :userName="queryParams.userName" :activeName="activeName" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.profitsAnalysis')" name="4">
        <ProfitAnalysis
          :activeName="activeName"
          :userName="queryParams.userName"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.betOrderDetails')" name="5">
        <BetDetails :userName="queryParams.userName" :activeName="activeName" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.changeInformation')" name="6">
        <ChangeInfo
          :activeName="activeName"
          :userName="queryParams.userName"
          :tenantId="tenantId"
          :userId="userId"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.bankOrVirtualAccountInformation')" name="7">
        <BankOrVirtualAccountInfo
          :activeName="activeName"
          :userName="queryParams.userName"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.depositOrWithdrawlInformation')" name="8">
        <DepositOrWithdrawlInfo
          :activeName="activeName"
          :userName="queryParams.userName"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.turnoverDetail')" name="9">
        <RunningDetail
          :activeName="activeName"
          :userName="queryParams.userName"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.memberTransferRecord')" name="10">
        <TransferRecord
          :activeName="activeName"
          :userName="queryParams.userName"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.memberAccountChangeRecord')" name="11">
        <AccountChangeRecord
          :activeName="activeName"
          :userName="queryParams.userName"
        />
      </el-tab-pane>
    </el-tabs>
    <ChangeAccountStatus
      v-model:openStatus="openStatus"
      :cloneRow="queryParams"
      :type="editType"
      v-if="openStatus"
      @freshfield="queryMemberInfo"
    />
  </div>
</template>

<script setup name="DetailInfo">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getMemberInfo } from "@/api/member/list/index";
import BasicInfo from "./components/BasicInfo.vue";
import FinancialInfo from "./components/FinancialInfo.vue";
import LoginInfo from "./components/LoginInfo.vue";
import ProfitAnalysis from "./components/ProfitAnalysis.vue";
import BetDetails from "./components/BetDetails.vue";
import ChangeAccountStatus from "./components/ChangeAccountStatus.vue";
import ChangeInfo from "./components/ChangeInfo.vue";
import BankOrVirtualAccountInfo from "./components/BankOrVirtualAccountInfo.vue";
import DepositOrWithdrawlInfo from "./components/DepositOrWithdrawlInfo.vue";
import RunningDetail from "./components/runningdetail/RunningDetail.vue";
import TransferRecord from "./components/membertransfer/TransferRecord.vue";
import AccountChangeRecord from "./components/memberaccount/AccountChangeRecord.vue";
import { statusSwitchToLabel, colorSwitch } from "./common/common";

const route = useRoute();
const tenantId = ref(route.query.tenantId);
const userId = ref(route.query.userId);
const queryRef = ref(null);
const queryParams = ref({});
const activeName = ref(route.query.activeTab?route.query.activeTab:"1");
const openStatus = ref(false);
const editType = ref(null);
const queryParamsAccount = ref({
  userName: null,
  tenantId: null,
});
provide("sharedData", activeName);
// onBeforeMount(async () => {
//   await queryMemberInfo();
// });
queryMemberInfo();
//进入页面查询会员详情
function queryMemberInfo() {
  return getMemberInfo({
    userName: route.params.userName,
    tenantId: route.query.tenantId || 1,
  }).then((res) => {
    queryParams.value = res || {};
  });
}
//基本信息里面点击刷新按钮，重新获取会员详情
function refreshData() {
  getMemberInfo({
    userName: queryParamsAccount.value.userName || route.params.userName,
    tenantId: queryParamsAccount.value.tenantId || route.query.tenantId || 1,
  }).then((res) => {
    queryParams.value = res || {};
  });
}
function openTypeDia() {
  editType.value = "edit_member_type";
  openStatus.value = true;
}
function openStatusDia() {
  editType.value = "edit_member_status";
  openStatus.value = true;
}

function queryAccount() {
  // queryParams.value.userName = queryParamsAccount.value.userName;
  getMemberInfo({
    userName: queryParamsAccount.value.userName || route.params.userName,
    tenantId: queryParamsAccount.value.tenantId || route.query.tenantId || 1,
  }).then((res) => {
    queryParams.value = res || {};
  });
}
function reset() {
  queryRef.value.resetFields();
}
</script>

<style lang="scss">
.detail-info {
  padding: 20px;
  .member-account {
    border-bottom: 1px solid #eee;
  }
  .form-show {
    margin-top: 20px;
    .type {
      width: 50px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      background: rgba(226, 241, 255, 0.9);
      color: #1890ff;
      border-radius: 5px;
      display: inline-block;
    }
    .status {
      width: 50px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      border: 1px solid rgba(82, 196, 26, 0.5);
      color: rgba(82, 196, 26, 0.5);
      border-radius: 5px;
      display: inline-block;
    }
  }
}
</style>
