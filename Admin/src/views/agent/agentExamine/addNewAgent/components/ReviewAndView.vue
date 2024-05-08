<!-- 新增代理待审核 -->
<template>
  <div v-if="agentData">
    <div class="headtitle">{{ $t("agent.addAgentReview") }}</div>
    <div class="title">{{ $t("agent.agentInformation") }}</div>
    <div class="agent-information">
      <div>
        {{ $t("agent.agentAccountQuote") }}&nbsp;{{ agentData.agentName }}
      </div>
      <div>
        {{ $t("agent.agentLevelQuote") }}&nbsp;{{ agentData.agentLevel + 1 }}
      </div>
      <div>
        {{ $t("agent.parentAccountQuote") }}&nbsp;{{
          agentData.superiorAgentName || "-"
        }}
      </div>
    </div>
    <div class="title">{{ $t("agent.commissionInformation") }}</div>
    <div class="titles agentMode">
      <div>{{ $t("agent.agentModel") }}&nbsp;</div>
      <div v-if="agentData.hasOwnProperty('agentMode')">
        <div v-if="agentData.agentMode == 0">
          {{ $t("agent.commissionMode") }}
        </div>
        <div v-else>{{ $t("agent.dispatchMode") }}</div>
      </div>
    </div>

    <div class="titles">
      {{ $t("agent.commisionPlan") }}&nbsp;{{
        agentData.commissionRebateConfigName
      }}
    </div>
    <div v-if="agentData.hasOwnProperty('agentMode')">
      <div class="commission-service" v-if="agentData.agentMode == 0">
        <div class="title">{{ $t("agent.commissionSetting") }}</div>
        <div class="agent">
          <div
            class="display"
            v-for="(item, index) in superiorAgentData"
            :key="index"
          >
            <div>
              {{
                $t("agent.commissionSetting", {
                  num: getChineseNum(item.agentLevel + 1),
                })
              }}&nbsp;
              {{ item.agentName }}
            </div>

            <div>
              {{ $t("agent.extractionRatio") }}&nbsp;{{ item.percent }}%
            </div>
          </div>
        </div>
      </div>
      <div class="commission-service" v-else>
        <div class="title">{{ $t("agent.dividedIntoSetting") }}</div>
        <div class="agent">
          <div class="display">
            {{ $t("agent.totalCommissionRatio") }}&nbsp;
            {{ superiorAgentData.totalProportion }}
          </div>
          <div
            class="display"
            v-for="(item, index) in superiorAgentData.shareProportionSet"
            :key="index"
          >
            <div>
              {{
                $t("agent.levelOfAgent", {
                  num: getChineseNum(item.agentLevel + 1),
                })
              }}&nbsp;
              {{ item.agentName }}
            </div>

            <div>
              {{ $t("agent.extractionRatio") }}&nbsp;{{ item.proportion }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="title">{{ $t("agent.applyDetail") }}</div>
    <div class="agent-information">
      <div>{{ $t("agent.applier") }}&nbsp;{{ rowItem.applicant }}</div>
      <div>{{ $t("agent.applyTime") }}&nbsp;{{ rowItem.applicantTime }}</div>
    </div>
    <div class="remark">
      {{ $t("agent.applyRemark") }}&nbsp;{{ rowItem.applicantMark || "-" }}
    </div>
    <div class="remark">
      <!-- <div>{{ $t("agent.reviewRemark") }}</div> -->
      <div style="width: 92%">
        <el-form-item
          :label="$t('agent.reviewRemark')"
          prop="reviewMark"
          :rules="[
            {
              required: true,
              message: $t('agent.reviewRemarkCannotBeEmpty'),
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            v-model="reviewMark"
            :rows="8"
            type="textarea"
            :placeholder="$t('agent.pleaseInput')"
            style="width: 100%"
            maxLength="100"
          />
        </el-form-item>
      </div>
    </div>
    <div class="container">
      <div class="bottom">
        <div class="cancel" @click="confirmAndClose">
          {{ $t("agent.cancel") }}
        </div>
        <div class="pass" @click="onClickCheck(2)">
          {{ $t("agent.reviewPass") }}
        </div>
        <div class="reject" @click="onClickCheck(1)">
          {{ $t("agent.reviewRefuse") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, onMounted, getCurrentInstance, ref } from "vue";
import {
  approvedOrRejectedApi,
  addAgentDetailsApi,
} from "@/api/agent/agentReview/agentReview.js";
import useUserStore from "@/store/modules/user";
const user = useUserStore();
const props = defineProps(["open", "rowItems"]);
const emit = defineEmits(["update:open", "changeStatus", "closeDialog"]);
const { proxy } = getCurrentInstance();

const reviewMark = ref(""); //{{$t('agent.review')}}备注

const rowItem = computed(() => {
  return props.rowItems;
});
const confirmAndClose = () => {
  emit("closeDialog");
};
//校验
const rules = ref({
  reviewMark: [
    {
      required: true,
      message: i18n.global.t("agent.reviewRemarkCannotBeEmpty"),
      trigger: "blur",
    },
  ],
});
// {{$t('agent.review')}}
const onClickCheck = (val) => {
  if (!reviewMark.value) {
    proxy.$modal.msgWarning(i18n.global.t("agent.remarksCannotBeEmpty"));
    return;
  }
  if (val == 2) {
    const params = {
      id: rowItem.value.id,
      type: "",
      passOrRejectionFlag: 2,
      review: user.userInfo.userName,
      reviewMark: reviewMark.value,
    };
    approvedOrRejectedApi(params).then(() => {
      proxy.$modal.msgSuccess(i18n.global.t("agent.reviewPass"));
      emit("changeStatus", true);
      cancel();
    });
  } else {
    const params = {
      id: rowItem.value.id,
      textarea: "",
      type: "",
      passOrRejectionFlag: 1,
      review: user.userInfo.userName,
      reviewMark: reviewMark.value,
    };
    approvedOrRejectedApi(params).then(() => {
      proxy.$modal.msgError(i18n.global.t("agent.reviewRefuse"));
      emit("changeStatus", true);
      cancel();
    });
  }
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
// 验证

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
}
.title {
  margin-top: 20px;
  font-weight: bold;
}
.title::before {
  content: "";
  height: 20px;
  border-left: 2px solid rgb(24, 144, 255);
  margin-right: 5px;
}
.titles,
.agent {
  margin-top: 20px;
}
.agentMode {
  display: flex;
  gap: 5px;
}
.agent-information {
  margin-top: 20px;
  display: flex;
  gap: 200px;
}
.commission-service {
  display: flex;
  gap: 30px;
  border-bottom: 1px solid #e9e9e9;
}
.display {
  display: flex;
  gap: 120px;
  margin-bottom: 20px;
}
.remark {
  margin-top: 20px;
}
.container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  .bottom {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    margin-left: auto;
    div {
      width: 80px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 5px;
      cursor: pointer;
    }
    .cancel {
      border: 1px solid #0079fe;
      color: #0079fe;
    }
    .reject {
      color: #ffffff;
      background-color: #d9001b;
    }
    .pass {
      color: #ffffff;
      background-color: #0079fe;
    }
  }
}
</style>
