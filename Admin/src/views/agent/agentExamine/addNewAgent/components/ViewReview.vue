<!-- 新增代理已审核 -->
<template>
  <el-form :model="queryParams" v-if="agentData">
    <div class="headtitle">{{ $t("agent.addAgentReview") }}</div>
    <div class="agent">{{ $t("agent.agentInformation") }}</div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item :label="$t('agent.agentAccountQuote')">
          {{ agentData.agentName }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('agent.agentLevelQuote')">{{
          agentData.agentLevel + 1
        }}</el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('agent.parentAccountQuote')">{{
          agentData.superiorAgentName || "-"
        }}</el-form-item>
      </el-col>
    </el-row>
    <div class="agent">{{ $t("agent.commissionInformation") }}</div>
    <el-form-item :label="$t('agent.agentModel')">
      <template #default>
        <div v-if="agentData.hasOwnProperty('agentMode')">
          <span class="margin" v-if="agentData.agentMode == 0">{{
            $t("agent.commissionMode")
          }}</span>
          <span class="margin" v-else>{{ $t("agent.dispatchMode") }}</span>
        </div>
      </template>
    </el-form-item>
    <el-form-item :label="$t('agent.commisionPlan')">{{
      agentData.commissionRebateConfigName
    }}</el-form-item>
    <div v-if="agentData.hasOwnProperty('agentMode')">
      <div v-if="agentData.agentMode == 0">
        <div class="agent">{{ $t("agent.commissionSetting") }}</div>
        <el-row v-for="(item, index) in superiorAgentData" :key="index">
          <el-col :span="8"
            ><el-form-item>
              {{
                $t("agent.levelOfAgent", {
                  num: getChineseNum(item.agentLevel + 1),
                })
              }}
              {{ item.agentName }}
            </el-form-item></el-col
          >
          <el-col :span="8"
            ><el-form-item :label="$t('agent.commisionRatio')">
              {{ item.percent }}%
            </el-form-item></el-col
          >
        </el-row>
      </div>
      <div v-else>
        <div class="agent">{{ $t("agent.dividedIntoSetting") }}</div>
        <el-form-item :label="$t('agent.totalCommissionRatio')"
          >{{ superiorAgentData.totalProportion }}%</el-form-item
        >
        <el-row
          v-for="(item, index) in superiorAgentData.shareProportionSet"
          :key="index"
        >
          <el-col :span="8"
            ><el-form-item
              >{{
                $t("agent.levelOfAgent", {
                  num: getChineseNum(item.agentLevel + 1),
                })
              }}
              {{ item.agentName }}</el-form-item
            ></el-col
          >
          <el-col :span="8"
            ><el-form-item :label="$t('agent.commisionRatio')"
              >{{ item.proportion }}%</el-form-item
            ></el-col
          >
        </el-row>
      </div>
    </div>
    <div class="border"></div>
    <div class="agent">{{ $t("agent.applyDetail") }}</div>
    <el-row>
      <el-col :span="8"
        ><el-form-item :label="$t('agent.applier')">
          {{ rowItem.applicant }}
        </el-form-item></el-col
      >
      <el-col :span="8"
        ><el-form-item :label="$t('agent.applyTime')">{{
          rowItem.applicantTime
        }}</el-form-item></el-col
      >
    </el-row>
    <el-row>
      <el-form-item :label="$t('agent.applyRemark')">{{
        rowItem.applicantMark || "-"
      }}</el-form-item>
    </el-row>
    <el-row>
      <el-col :span="8"
        ><el-form-item :label="$t('agent.reviewer')">
          {{ rowItem.review }}
        </el-form-item></el-col
      >
      <el-col :span="8"
        ><el-form-item :label="$t('agent.reviewTime')">
          {{ rowItem.reviewTime }}</el-form-item
        ></el-col
      >
    </el-row>
    <el-row>
      <el-form-item :label="$t('agent.reviewRemark')">
        {{ rowItem.reviewMark }}</el-form-item
      >
    </el-row>
    <div class="button-container">
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="confirmAndClose">{{
          $t("agent.close")
        }}</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, onMounted, reactive, ref } from "vue";
import { addAgentDetailsApi } from "@/api/agent/agentReview/agentReview.js";
import useUserStore from "@/store/modules/user";

const props = defineProps(["open", "rowItems"]);
const emit = defineEmits(["update:open", "changeStatus", "closeDialog"]);

const queryParams = ref({});

const rowItem = computed(() => {
  return props.rowItems;
});
const confirmAndClose = () => {
  emit("closeDialog");
};
const agentData = ref({});
const superiorAgentData = ref();
onMounted(() => {
  addAgentDetailsApi(rowItem.value.id)
    .then((res) => {
      agentData.value = res;
      if (res.agentMode == 0) {
        superiorAgentData.value = res.commissionSetDto.takeCommissionSet;
      } else {
        superiorAgentData.value = res.commissionSetDto.shareSetDto;
      }
    })
    .catch((error) => {
      console.error("Error fetching agent details:", error);
    });
});
// 取得中文数字
const getChineseNum = (number) => {
  const chineseNumbers = [
    i18n.global.t("agent.one"),
    i18n.global.t("agent.two"),
    i18n.global.t("agent.three"),
    i18n.global.t("agent.four"),
    i18n.global.t("agent.five"),
    i18n.global.t("agent.six"),
    i18n.global.t("agent.seven"),
    i18n.global.t("agent.eight"),
    i18n.global.t("agent.nine"),
    i18n.global.t("agent.ten"),
  ];
  if (number >= 1 && number <= 10) {
    return chineseNumbers[number - 1];
  } else {
    return "";
  }
};
</script>

<style lang="scss" scoped>
.headtitle {
  color: #333333;
  font-size: 20px;
  line-height: 50px;
  border-bottom: 1px solid #e9e9e9;
  font-weight: bold;
  margin-bottom: 10px;
}
.agent {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  line-height: 30px;
}
.agent::before {
  content: "";
  height: 20px;
  border-left: 2px solid rgb(24, 144, 255);
  margin-right: 5px;
}
.border {
  border-bottom: 1px solid #e9e9e9;
  margin-bottom: 10px;
}
.button-container {
  display: flex;
  justify-content: flex-end;
}
</style>
