<!-- 好友推荐 -->
<template>
  <div class="app-container">
    <el-form
      ref="queryRef"
      label-width="140px"
      :model="queryParams"
      :rules="rules"
      :inline="true"
    >
      <el-form-item :label="$t('friends.activityTime')" prop="activityTime">
        <el-radio-group
          v-model="queryParams.activityTime"
          class="ml-4"
          @change="handleChangeActivity(queryRef)"
        >
          <el-radio label="0" size="large">{{ $t("friends.open") }}</el-radio>
          <el-radio label="1" size="large"
            >{{ $t("friends.notOpenYet") }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <br />
      <el-form-item
        :label="$t('friends.inviterFirstDepositAward')"
        prop="inviterFirstDepositAward"
      >
        <el-input
          v-model="queryParams.inviterFirstDepositAward"
          :placeholder="$t('friends.pleaseInput')"
          clearable
          type="text"
          maxlength="13"
          oninput="value=value.toString().match(/^\d+(?:\.\d{0,4})?/)"
          style="width: 200px"
        >
          <template #append>
            <span>%</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        :label="$t('member.turnoverMultiple')"
        prop="turnoverMultiple1"
      >
        <el-input
          v-model="queryParams.turnoverMultiple1"
          :placeholder="$t('member.pleaseInput')"
          clearable
          type="text"
          maxlength="5"
          oninput="value=value.replace(/\D/g,'')"
          style="width: 200px"
        />
      </el-form-item>
      <br />
      <el-form-item
        :label="$t('member.invitedFirstDepositAward')"
        prop="invitedFirstDepositAward"
      >
        <el-input
          v-model="queryParams.invitedFirstDepositAward"
          :placeholder="$t('member.pleaseInput')"
          clearable
          type="text"
          oninput="value=value.toString().match(/^\d+(?:\.\d{0,4})?/)"
          maxlength="13"
          style="width: 200px"
        >
          <template #append>
            <span>%</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        :label="$t('member.turnoverMultiple')"
        prop="subBetMultiple"
      >
        <el-input
          v-model="queryParams.subBetMultiple"
          :placeholder="$t('member.pleaseInput')"
          clearable
          type="text"
          maxlength="5"
          oninput="value=value.replace(/\D/g,'')"
          style="width: 200px"
        />
      </el-form-item>
      <br />
      <el-form-item
        :label="$t('member.effectiveFirstDepositAmount')"
        prop="minEffectiveMoney"
      >
        <el-input
          v-model="queryParams.minEffectiveMoney"
          :placeholder="$t('member.pleaseInput')"
          clearable
          type="text"
          maxlength="5"
          oninput="value=value.replace(/\D/g,'')"
          @blur="compareValue('minEffectiveMoney')"
          style="width: 100px"
        />
      </el-form-item>
      <span>&nbsp; - &nbsp;</span>
      <el-form-item
        prop="maxEffectiveMoney"
      >
        <el-input
          v-model="queryParams.maxEffectiveMoney"
          :placeholder="$t('member.pleaseInput')"
          clearable
          type="text"
          maxlength="5"
          oninput="value=value.replace(/\D/g,'')"
          @blur="compareValue('maxEffectiveMoney')"
          style="width: 100px"
        />
      </el-form-item>
      <br />
      <el-form-item
        :label="$t('member.inviteDomain')"
        prop="domain"
      >
        <el-input
          v-model="queryParams.domain"
          :placeholder="$t('friends.inputInviteDomain')"
          clearable
          style="width: 444px"
        >
          <!--          <template #append >{{ $t("member.edit") }}</template>-->
        </el-input>
      </el-form-item>
      <br />
      <el-form-item
        class="primary-button"
      >
        <el-button type="primary" @click="onSubmit(queryRef)"
          >{{ $t("member.save") }}
        </el-button>
        <el-button @click="handleReset(queryRef)"
          >{{ $t("member.recoverLastSetting") }}
        </el-button>
      </el-form-item>

<!--      <el-form-item v-if="queryParams.activityTime === '1'" class="no-open-activity">-->
<!--        <div>邀请好友维护中，请耐心等待 ~</div>-->
<!--      </el-form-item>-->
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import {
  queryInviteDepConfig,
  saveInviteDepConfig,
} from "@/api/member/invite/index";
import { ElMessage } from "element-plus";
import i18n from "@/i18n";
import { deepCopy } from "@/utils/index";

// oninput="value=value.toString().match(/^\d+(?:\.\d{0,2})?/)"
const FromDefaultValue = () => ({
  activityTime: "0",
  inviterFirstDepositAward: "",
  turnoverMultiple1: "",
  invitedFirstDepositAward: "",
  subBetMultiple: "",
  minEffectiveMoney: "",
  maxEffectiveMoney: "",
  domain: "",
});

const queryRef = ref(null);
let queryParams = ref(FromDefaultValue());
let disabledDomain = ref(false);
const tableDataClone = ref([]);

const checkMinVal = (rule, value, callback) => {
  const { minEffectiveMoney, maxEffectiveMoney } = queryParams.value;
  if (value === "") {
    callback(new Error(i18n.global.t("member.pleaseInput")));
  } else if (
    minEffectiveMoney &&
    maxEffectiveMoney &&
    minEffectiveMoney * 1 > maxEffectiveMoney * 1
  ) {
    return callback(`输入值需小于${maxEffectiveMoney}`);
  } else {
    return callback();
  }
};

const checkMaxVal = (rule, value, callback) => {
  const { minEffectiveMoney, maxEffectiveMoney } = queryParams.value;
  if (value === "") {
    callback(new Error(i18n.global.t("member.pleaseInput")));
  } else if (
    maxEffectiveMoney &&
    minEffectiveMoney &&
    minEffectiveMoney * 1 > maxEffectiveMoney * 1
  ) {
    return callback(`输入值需大于${minEffectiveMoney}`);
  } else {
    return callback();
  }
};

const checkInputVal = (rule, value, callback) => {
  if (value === "") {
    callback(new Error(i18n.global.t("member.pleaseInput")));
  } else if (value * 1 > 100) {
    return callback(new Error(i18n.global.t("friends.pleaseInputLess100")));
  } else {
    return callback();
  }
};

const handleChangeActivity = (queryRef) => {
  if (!queryRef) return;
  queryParams.value.activityTime === "1"
    ? Object.assign(queryParams.value, { activityTime: "1" })
    : queryRef.resetFields();
};

const rules = reactive({
  activityTime: [
    {
      required: true,
      message: i18n.global.t("member.pleaseSelect"),
      trigger: "change",
    },
  ],
  inviterFirstDepositAward: [
    {
      required: true,
      validator: checkInputVal,
      // pattern: /^[0-9]\d*$/,
      // pattern:  /^(([1-9]?\d{0,1}(\.\d{1, 4})?)|100|100\.(0){1,4})$/,
      // message: i18n.global.t("friends.pleaseInputTwoRangeFromZeroToOneHundred"),
      trigger: "blur",
    },
  ],
  turnoverMultiple1: [
    {
      required: true,
      message: i18n.global.t("member.pleaseInputTurnoverMultiple"),
      trigger: "blur",
    },
    {
      required: true,
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("friends.pleaseInputTurnoverMultiple1"),
      trigger: "blur",
    },
  ],
  invitedFirstDepositAward: [
    {
      required: true,
      validator: checkInputVal,
      // pattern: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/,
      // pattern: /^[1-9]\d*$/,
      // message: i18n.global.t("friends.pleaseInputTwoRangeFromZeroToOneHundred"),
      trigger: "blur",
    },
  ],
  subBetMultiple: [
    {
      required: true,
      message: i18n.global.t("friends.pleaseInputTurnoverMultiple"),
      trigger: "blur",
    },
    {
      required: true,
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("friends.pleaseInputTurnoverMultiple1"),
      trigger: "blur",
    },
  ],
  domain: [
    {
      required: true,
      message: i18n.global.t("member.pleaseInputDomain"),
      trigger: "blur",
    },
  ],
  // minEffectiveMoney: [
  //   {validator: checkMinVal, trigger: blur, required: true},
  //   // {
  //   //   required: true,
  //   //   message: i18n.global.t("member.pleaseInput"),
  //   //   trigger: "blur",
  //   // },
  // ],
  minEffectiveMoney: [
    { validator: checkMinVal, trigger: "blur", required: true },
  ],
  maxEffectiveMoney: [
    { validator: checkMaxVal, trigger: "blur", required: true },
  ],
});

const compareValue = (type) => {
  if (type === "minEffectiveMoney") {
    if (
      queryParams.value.maxEffectiveMoney * 1 >
      queryParams.value.minEffectiveMoney * 1
    )
      queryRef?.value?.validateField("maxEffectiveMoney");
  } else {
    if (
      queryParams.value.maxEffectiveMoney * 1 >
      queryParams.value.minEffectiveMoney * 1
    )
      queryRef?.value?.validateField("minEffectiveMoney");
  }
  // const {value} = event.target;
};

onMounted(async () => {
  await getList();
});

const getList = () => {
  queryInviteDepConfig().then((res) => {
    if (!!res) {
      const {
        depAmountMax,
        depAmountMin,
        domainName,
        inviteAwardAmount,
        inviteBetMultiple,
        status,
        subBetMultiple,
        subAwardAmount,
      } = res;
      queryParams.value = {
        activityTime: status + "",
        inviterFirstDepositAward: inviteAwardAmount,
        turnoverMultiple1: inviteBetMultiple,
        invitedFirstDepositAward: subAwardAmount,
        subBetMultiple: subBetMultiple,
        minEffectiveMoney: depAmountMin,
        maxEffectiveMoney: depAmountMax,
        domain: domainName,
      };
      tableDataClone.value = deepCopy(queryParams.value) || [];
    }
  });
};

const handleReset = (queryRef) => {
  // if (!queryRef) return;
  // queryRef.resetFields();
  recoveryLastData();
};

const saveConfigData = (data) => {
  saveInviteDepConfig(data).then(() => {
    ElMessage.success(
      i18n.global.t("member.save") + i18n.global.t("member.success")
    );
    getList();
  });
};

const onSubmit = (queryRef) => {
  if (!queryRef) return;
  queryRef.validate((valid) => {
    if (valid) {
      console.log("submit!");
      const data = {
        depAmountMax: queryParams.value.maxEffectiveMoney,
        depAmountMin: queryParams.value.minEffectiveMoney,
        domainName: queryParams.value.domain,
        inviteAwardAmount: queryParams.value.inviterFirstDepositAward,
        inviteBetMultiple: queryParams.value.turnoverMultiple1,
        status: queryParams.value.activityTime * 1,
        subBetMultiple: queryParams.value.subBetMultiple * 1,
        subAwardAmount: queryParams.value.invitedFirstDepositAward,
      };
      saveConfigData(data);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const recoveryLastData = () => {
  queryParams.value = deepCopy(tableDataClone.value);
};

// const isComputedSum = computed(() => {
//   return queryParams.tableEfficient < 0 || queryParams.tableEfficients < 0;
// });
// oninput="value=value.toString().match(/^\d+(?:\.\d{0,2})?/)" 两位小数
</script>

<style lang="scss" scoped>
.el-form--inline .el-form-item {
  margin: 10px 0 10px 0;
}

.app-container {
  width: 800px;
  margin: 130px auto 0;
  position: relative;
  :deep(.primary-button) {
    margin: 30px 0 0 142px;
  }
}

.el-form--inline .el-form-item.no-open-activity {
  margin: 0 auto;
  padding-left: 75px;
}
</style>
