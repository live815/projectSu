<template>
  <div class="detail-info-dialog">
    <!-- 新增/编辑黑名单 -->
    <el-dialog
      v-model="dialogVisible"
      width="80%"
      :title="type==='edit'?$t('risk.review'):$t('risk.checkDetails')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="left"
        ref="queryRef"
        class="review-form"
      >
        <el-row :gutter="20" style="border:1px solid red;border-radius:5px;">
          <el-col :span="16">
            <el-col>
              <el-form-item :label="$t('risk.userName')" prop="userName">
                <span>{{ queryParams.userName || "-" }}</span>
                <el-tag type="danger" class="ml-12">{{ vipChange(queryParams.vipLevel) }}</el-tag>
                <el-tag  class="ml-12 mr-12">{{ queryParams.financeTierName||"-" }}</el-tag>
                <el-tag  class="mr-12">{{ queryParams.riskTierName||"-" }}</el-tag>
                <div v-if="queryParams.userStatus" style="display:flex;flex-wrap: wrap;justify-content: center;">
                  <el-tag v-for="item in queryParams.userStatus.split(',')"
                  :type="colorSwitch(item)" style="margin-right:4px;">
                    {{ statusSwitchToLabel(item) }}
                  </el-tag>
                </div>
                <span v-else>-</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item :label="$t('risk.parentName')" prop="parentName">
                <span>{{ queryParams.parentName || "-" }}</span>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="8" style="text-align:right;padding-top:16px">
            <el-button @click="dialogVisible = false">{{ $t('risk.cancel') }}</el-button>
            <el-button @click="submit(wait)" type="warning" v-if="queryParams.status==='0'">{{ $t('risk.holdOn') }}</el-button>
            <el-button @click="openRefuseDia" type="danger" v-if="queryParams.status==='0'||queryParams.status==='1'">{{ $t('risk.reject') }}</el-button>
            <el-button @click="submit(success)" type="success" v-if="queryParams.status==='0'||queryParams.status==='1'">{{ $t('risk.pass') }}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('risk.riskType')" prop="createTime">
              <span>{{ queryParams.programNames?queryParams.programNames.replace(/,/g, '|'): "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('risk.userLabel')" prop="labelNames">
              <template v-if="queryParams.optionLabelRespVOList&&queryParams.optionLabelRespVOList.length">
                <!-- <span class="mr-12">{{ queryParams.labelNames }}</span> -->
                <el-tag class="mr-8" type="success" v-for="item in queryParams.optionLabelRespVOList">{{ item.labelName }}</el-tag>
              </template>
              <span class="mr-12" v-else>-</span>
              <span class="pointer" @click="openLabelEditDia">{{ $t('risk.editLabel') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('risk.withdrawAmountQuote')" prop="amount">
              <span class="mr-4">{{ formatNumber(queryParams.amount) }}</span>
              <span class="mr-4">{{ queryParams.currency }}</span>
              <span>({{ $t('risk.wdFee') }}:<span class="ml-4">{{ formatNumber(queryParams.wdFee) }}</span>)</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('risk.withdrawNo')" prop="orderNo">
              <span class="mr-12">{{ queryParams.orderNo || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('risk.withdrawTime')" prop="createTime">
              <span>{{ queryParams.createTime || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('risk.bankInformation')">
              <div v-if="queryParams.orderType==='0'">
                <span class="mr-12">{{ queryParams.payeeName || "-" }}</span>
                <span class="mr-12">{{ queryParams.payeeBankName || "-" }}</span>
                <span class="mr-12">{{ queryParams.payeeCardNo || "-" }}</span>
              </div>
              <div v-if="queryParams.orderType==='1'">
                <span class="mr-12">{{ queryParams.tradeProtocol || "-" }}</span>
                <span class="mr-12">{{ queryParams.tradeAddr || "-" }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('risk.userRegisterTime')" prop="regTime">
              <span>{{ queryParams.regTime || "-" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('risk.userRemark')" prop="remark">
              <span class="mr-12">{{ queryParams.remark || "-" }}</span>
              <span class="pointer" @click="editRemark">{{ $t('risk.editRemark') }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('risk.basicSettings')" name="1">
          <BasicConfig v-if="activeName === '1'" :userId="cloneRow.userId" :userName="cloneRow.userName" />
        </el-tab-pane>
        <el-tab-pane :label="$t('risk.loginAction')" name="2">
          <LoginAction v-if="activeName === '2'" :userName="cloneRow.userName" />
        </el-tab-pane>
        <el-tab-pane :label="$t('risk.accountChangeDetail')" name="3">
          <AccountChangeDetails v-if="activeName === '3'" :userName="queryParams.userName" />
        </el-tab-pane>
        <el-tab-pane :label="$t('risk.betDetails')" name="4">
          <BetDetails v-if="activeName === '4'" :userName="queryParams.userName" />
        </el-tab-pane>
        <el-tab-pane :label="$t('risk.riskAnalysis')" name="5">
          <RiskAnalysis v-if="activeName === '5'" :userName="cloneRow.userName" />
        </el-tab-pane>
        <el-tab-pane :label="$t('risk.rechargeRecord')" name="6">
          <RechargeRecord v-if="activeName === '6'" :userName="queryParams.userName" />
        </el-tab-pane>
        <!-- <el-tab-pane label="同付款人" name="7">
          <SamePayer v-if="activeName === '7'" :userName="cloneRow.userName" />
        </el-tab-pane> -->
      </el-tabs>
    </el-dialog>
    <LabelEditDialog 
      v-model:openLabel="openLabel"
      :cloneRow="queryParams"
      :labelType="labelType"
      v-if="openLabel"
      @freshlabel="queryInfo"
      />
      <EditRemarkDialog 
        v-model:open="openRemark"
        :cloneRow="queryParams"
        v-if="openRemark"
        @onrefresh="queryInfo"
        />
      <WithdrawRefuseDialog
        v-model:openRefuse="openRefuse"
        :cloneRow="queryParams"
        v-if="openRefuse"
        @close="closeRefuseDia"
      />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance } from "vue";
import BasicConfig from "./BasicConfig.vue";
import LoginAction from "./LoginAction.vue";
import AccountChangeDetails from "./AccountChangeDetails.vue";
import EditRemarkDialog from "./EditRemarkDialog.vue";
import BetDetails from "./BetDetails.vue";
import RiskAnalysis from "./RiskAnalysis.vue";
import RechargeRecord from "./RechargeRecord.vue";
import SamePayer from "./SamePayer.vue";
import WithdrawRefuseDialog from "./WithdrawRefuseDialog.vue";
import LabelEditDialog from "@/views/member/list/components/basicinfo/LabelEditDialog.vue";
import { getMulReviewOrder,getWithdrawlOrderUserDetail } from "@/api/risk/review/index";
import { formatNumber } from "@/utils/index";
import { statusSwitchToLabel,colorSwitch } from "@/views/member/list/common/common";
import usePermissionStore from "@/store/modules/permission";

const props = defineProps(["open", "cloneRow","type"]);
const emit = defineEmits(["update:open", "onrefresh"]);

const { proxy } = getCurrentInstance();

const queryRef = ref(null);
const queryParams = ref({});
const wait = ref("1");
const inject = ref("2");
const success = ref("3");
const openLabel = ref(false);
const openRemark = ref(false);
const labelType = ref(null);
const openRefuse = ref(false); //操作拒绝时的弹窗

const activeName = ref("1");

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

onMounted(async () => {
  (props.type === 'edit') && await queryInfo()
});

function queryInfo(){
  return getWithdrawlOrderUserDetail(props.cloneRow.orderNo).then(res=>{
    queryParams.value = res || {}
  })
}
function vipChange(level){
  return (level||level===0)?"VIP"+level:"-"
}
function openLabelEditDia(){
  openLabel.value = true
  labelType.value = 'risk'
}
function editRemark(){
  openRemark.value = true;
}
function openRefuseDia(){
  openRefuse.value = true;
}
function cancel() {
  dialogVisible.value = false;
}
function submit(type) {
  queryRef.value.validate((valid) => {
    if (valid) {
      console.log(props.cloneRow,111)
      getMulReviewOrder({
        orderNos:[props.cloneRow.orderNo],
        type:type
      }).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("risk.operateSuccessfully"));
        //搁置或者通过操作成功之后去刷新提现风控审核未读数
        usePermissionStore().getRiskUnreview();
        dialogVisible.value = false;
        emit("onrefresh")
      })
    } else {
      return;
    }
  });
}
function closeRefuseDia(){
  //取消操作成功之后去刷新提现风控审核未读数
  usePermissionStore().getRiskUnreview();
  dialogVisible.value = false
  emit("onrefresh");
}
</script>

<style lang="scss" scoped>
.detail-info-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top:0;
    }
    .dialog-footer .el-button {
      width: 140px;
      height: 40px;
      &:first-child {
        color: #8c8c8c;
        border: 1px solid rgba(121, 121, 121, 1);
      }
      &:nth-child(2) {
        background: #1890ff;
      }
    }
    .review-form .el-form-item--default{
      margin-bottom:0
    }
  }
}
</style>
