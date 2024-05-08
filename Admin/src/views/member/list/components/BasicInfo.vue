<template>
  <div class="member-detail-basic-info">
    <!-- 会员基本信息 -->
    <div class="header">
      <el-row>
        <el-col :span="5" class="header-col-left">
          <el-button class="basic-info-btn">{{ $t('member.basicInformation') }}</el-button>
          <el-button icon="Refresh" type="primary" @click="refresh" size="small"
            >{{ $t('member.refresh') }}</el-button
          >
        </el-col>
        <el-col :span="19" class="header-col-right">
          <div class="edit-btn" @click="openLabelEditDia">
              <el-icon>
                <Edit />
              </el-icon>
            <span>{{ $t('member.labelEditNoQuote') }}</span>
          </div>
          <el-tag  type="success" class="ml-12" v-for="item in queryParams.optionLabelRespVOList">
            {{ item.labelName }}
          </el-tag>
        </el-col>
      </el-row>
      <h3 class="h3-title">{{ $t('member.basicInformation') }}</h3>
      <el-row :gutter="40" class="basic-info-title-row">
        <el-col :span="6" class="basic-info-title-col">
        <span class="col-span-key">
          <span>{{ $t('member.name') }}</span>
          <span class="col-span-value">{{ queryParams.realName || "-" }}</span>
        </span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.registerNation') }}</span>
            <span class="col-span-value">{{ queryParams.regNation || "-" }}</span>
          </span>
          <span v-if="false" class="col-btn-edit" @click="openEditDia('edit_member_reg_nation')">{{ $t('member.update') }}</span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="font-14" style="min-width:60px;">{{ $t('member.accountStatusQuote') }}</span>
          <span class="col-span-key">
            <div v-if="queryParams.status">
            <el-tag v-for="item in queryParams.status.split(',')"
            :type="colorSwitch(item)" style="margin-right:4px;margin-bottom:4px;">
              {{ statusSwitchToLabel(item) }}
            </el-tag>
          </div>
          <span v-else>-</span>
            <!-- <el-tag type="success" class="col-span-value">{{ filterStatus(queryParams.status) }}</el-tag> -->
          </span>
          <span class="col-btn-edit" @click="openEditDia('edit_member_status')" style="display: inline-block;min-width:28px;">{{ $t('member.update') }}</span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.vipLevel') }}</span>
            <span class="col-span-value">{{ queryParams.vipName }}</span>
          </span>
          <span class="col-btn-edit" @click="openEditDia('edit_member_vip_level')">{{ $t('member.update') }}</span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.agentName') }}</span>
            <span class="col-span-value">{{ queryParams.parentName || "-" }}</span>
          </span>
          <span class="col-btn-edit" @click="openEditDia('edit_member_parent_id')">{{ $t('member.update') }}</span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.riskTier') }}</span>
            <span class="col-span-value">{{ queryParams.riskControlTierStr || "-" }}</span>
          </span>
          <span class="col-btn-edit" @click="openEditDia('edit_member_risk_control_tier')">{{ $t('member.update') }}</span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.financeTier') }}</span>
            <span class="col-span-value">{{ queryParams.financeTierStr || "-" }}</span>
          </span>
          <span class="col-btn-edit" @click="openEditDia('edit_member_finance_tier')">{{ $t('member.update') }}</span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.phoneNumberUser') }}</span>
            <span class="col-span-value">{{ queryParams.mobile ? queryParams['mobileCode'] + '-' + queryParams.mobile : '-' }}</span>
          </span>
          <span class="col-btn-edit" @click="openEditDia('edit_member_mobile')">{{ $t('member.update') }}</span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.email') }}</span>
            <span class="col-span-value">{{ queryParams.email || "-" }}</span>
          </span>
          <span class="col-btn-edit" @click="openEditDia('edit_member_email')">{{ $t('member.update') }}</span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.nickName') }}</span>
            <span class="col-span-value">{{ queryParams.nickName || "-" }}</span>
          </span>
          <span class="col-btn-edit" @click="openEditDia('edit_member_nick_name')">{{ $t('member.update') }}</span>
        </el-col>
        <!-- <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>称号:</span>
            <span class="col-span-value">{{ queryParams.vest || "-" }}</span>
          </span>
          <span class="col-btn-edit">{{ $t('member.update') }}</span>
        </el-col> -->
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.birthday') }}</span>
            <span class="col-span-value">{{ queryParams.birthday || "-" }}</span>
          </span>
          <span class="col-btn-edit" @click="openEditDia('edit_member_birthday')">{{ $t('member.update') }}</span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.loginPassword') }}</span>
            <span class="col-span-value" style="color:#FF5A00;">{{ $t('member.secret') }}</span>
          </span>
          <span class="col-btn-edit"  @click="openEditDia('reset_member_pwd')">{{ $t('member.reset') }}</span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.gender') }}</span>
            <span class="col-span-value">{{ queryParams.sex==='0'?$t('member.man'):queryParams.sex==='1'?$t('member.woman'):'-' }}</span>
          </span>
          <span class="col-btn-edit" @click="openEditDia('edit_member_sex')">{{ $t('member.update') }}</span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.invitor') }}</span>
            <span class="col-span-value">{{ queryParams.invitor || "-" }}</span>
          </span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.loginArea') }}:</span>
            <span class="col-span-value">{{ queryParams.lastLoginArea || "-" }}</span>
          </span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.offlineDays') }}</span>
            <span class="col-span-value">{{ queryParams.offlineDays || "-" }}</span>
          </span>
        </el-col>
        <el-col :span="6" class="basic-info-title-col">
          <span class="col-span-key">
            <span>{{ $t('member.loginTimes') }}</span>
            <span class="col-span-value">{{ queryParams.loginTimes || "-" }}</span>
          </span>
        </el-col>
      </el-row>
      <h3 class="h3-title">{{ $t('member.registerInformation') }}</h3>
      <RegisterInfo :queryParams="queryParams" />
      <VipInfo :queryParams="queryParams" />
      <RemarkInfo :formData="queryParams" :activeName="activeName" :tenantId="tenantId" />
    </div>
    <ChangeAccountStatus
      v-model:openStatus="openStatus"
      :cloneRow="queryParams"
      :type="editType"
      :mobileCode="queryParams['mobileCode']"
      v-if="openStatus"
      @freshfield="refresh"
    />
    <LabelEditDialog 
      v-model:openLabel="openLabel"
      :cloneRow="queryParams"
      v-if="openLabel"
      @freshlabel="refresh"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import i18n from "@/i18n";
import RegisterInfo from "./basicinfo/RegisterInfo.vue";
import VipInfo from "./basicinfo/VipInfo.vue";
import RemarkInfo from "./basicinfo/RemarkInfo.vue";
import ChangeAccountStatus from "./ChangeAccountStatus.vue";
import LabelEditDialog from "./basicinfo/LabelEditDialog.vue"
import { statusSwitchToLabel,colorSwitch } from "../common/common";

const props = defineProps(["queryParams","activeName","tenantId"]);
const emit = defineEmits(["onrefresh"]);

const openStatus = ref(false);
const editType = ref(null);
const openLabel = ref(false);

function openEditDia(type){
  editType.value = type
  openStatus.value = true
}
function openLabelEditDia(){
  openLabel.value = true
}
function refresh() {
  emit("onrefresh")
}
function filterStatus(status) {
  switch (status) {
    case "0":
      return i18n.global.t("member.regular");
    case "1":
      return i18n.global.t("member.loginLock");
    case "2":
      return i18n.global.t("member.rechargeWithdrawLock");
    case "3":
      return i18n.global.t("member.abandonWithdrawLock");
    case "4":
      return i18n.global.t("member.offerLock");
    case "5":
      return i18n.global.t("member.rebateLock");
    case "6":
      return i18n.global.t("member.gameLock");;

    default:
      return "-";
  }
}
</script>

<style lang="scss" scoped>
.member-detail-basic-info {
  .header {
    .header-col-left {
      border-right: 1px solid #eee;
      .basic-info-btn {
        width: 50%;
        height: 41px;
        background: #000000;
        color: #ffffff;
      }
    }
    .header-col-right{
      padding-left:16px;
      display: flex;
      align-items: center;
      .edit-btn{
        width:56px;
        font-size:14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
  .h3-title{
    font-size:16px;
    font-weight: 600;
  }
  .basic-info-title-row{
    .basic-info-title-col{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .col-span-key{
        font-size:14px;
        .col-span-value{
          margin-left:12px;
        }
      }
      .col-btn-edit{
        font-size: 14px;
        color:#1890FF;
        cursor: pointer;
      }
    }
  }
}
</style>
