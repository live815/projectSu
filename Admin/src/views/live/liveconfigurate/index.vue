<template>
  <div class="app-container">
    <el-form :model="queryParams" :rules="rules" label-width="" ref="queryRef">
      <el-form-item label="" prop="platName" class="full-width">
        <el-radio-group
          v-model="queryParams.platName"
          class="ml-4"
          @change="handleChange"
        >
          <el-radio :label="$t('live.TencentCloud')" size="large">{{
            $t("live.TencentCloud")
          }}</el-radio>
          <el-radio :label="$t('live.AliCloud')" size="large">{{
            $t("live.AliCloud")
          }}</el-radio>
          <el-radio :label="$t('live.HuaweiCloud')" size="large">{{
            $t("live.HuaweiCloud")
          }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="$t('live.tip156')"
        prop="pushDomain"
        class="full-width"
      >
        <el-input
          v-model="queryParams.pushDomain"
          :placeholder="$t('live.pleaseEnter')"
          style="width: 480px"
        />
      </el-form-item>

      <el-form-item
        :label="$t('live.tip157')"
        prop="pullDomain"
        class="full-width"
      >
        <el-input
          v-model="queryParams.pullDomain"
          :placeholder="$t('live.pleaseEnter')"
          style="width: 480px"
        />
      </el-form-item>
      <el-form-item
        :label="$t('live.tip158')"
        prop="securityEnable"
        class="full-width"
      >
        <el-radio-group
          v-model="queryParams.securityEnable"
          class="ml-4"
          @change="handleChangeTwo"
        >
          <el-radio label="1" size="large">{{ $t("live.yes") }}</el-radio>
          <el-radio label="2" size="large">{{ $t("live.no") }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="$t('live.tip159')"
        prop="pushAuthKey"
        class="full-width"
      >
        <el-input
          v-model="queryParams.pushAuthKey"
          :placeholder="$t('live.pleaseEnter')"
          style="width: 480px"
        />
      </el-form-item>
      <el-form-item
        :label="$t('live.tip160')"
        prop="pullAuthKey"
        class="full-width"
      >
        <el-input
          v-model="queryParams.pullAuthKey"
          :placeholder="$t('live.pleaseEnter')"
          style="width: 480px"
        />
      </el-form-item>
      <el-form-item
        :label="$t('live.tip161')"
        prop="pushValidPeriod"
        class="full-width"
      >
        <el-input
          v-model="queryParams.pushValidPeriod"
          :placeholder="$t('live.pleaseEnter')"
          style="width: 480px"
        />
      </el-form-item>
    </el-form>

    <div class="btn-box">
      <el-button
        type="primary"
        size="large"
        @click="submit"
        v-hasPermi="['live:domain:add']"
      >
        {{ $t("live.makesure") }}
      </el-button>
    </div>
  </div>
</template>
<script setup name="Liveconfigurate">
import { setLiveConfigurate } from "@/api/live/liveconfigurate.js";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();
const queryRef = ref("");
const data = reactive({
  queryParams: {
    platName: i18n.global.t("live.TencentCloud"),
    securityEnable: "1",
    platCode: 1001,
  },

  rules: {
    pushDomain: [
      {
        required: true,
        message: i18n.global.t("live.tip162"),
        trigger: "blur",
      },
    ],
    pullDomain: [
      {
        required: true,
        message: i18n.global.t("live.tip163"),
        trigger: "blur",
      },
    ],
    pushAuthKey: [
      {
        required: true,
        message: i18n.global.t("live.tip164"),
        trigger: "blur",
      },
    ],
    pullAuthKey: [
      {
        required: true,
        message: i18n.global.t("live.tip165"),
        trigger: "blur",
      },
    ],
    pushValidPeriod: [
      {
        required: true,
        message: i18n.global.t("live.tip166"),
        trigger: "blur",
      },
    ],
  },
});
const { queryParams, rules } = toRefs(data);

function handleChange(val) {
  if (val == i18n.global.t("live.TencentCloud")) {
    queryParams.value.platName = i18n.global.t("live.TencentCloud");
    queryParams.value.platCode = 1001;
  } else if (val == i18n.global.t("live.AliCloud")) {
    queryParams.value.platName = i18n.global.t("live.AliCloud");
    queryParams.value.platCode = 1002;
  } else if (val == i18n.global.t("live.HuaweiCloud")) {
    queryParams.value.platName = i18n.global.t("live.HuaweiCloud");
    queryParams.value.platCode = 1003;
  }
}

function handleChangeTwo(val) {
  queryParams.value.securityEnable = val;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      console.log(queryParams.value);
      setLiveConfigurate(queryParams.value).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("live.tip167"));
        resetForm();
      });
    } else {
      return;
    }
  });
}
function resetForm() {
  proxy.resetForm("queryRef");
}
</script>
<style lang="scss" scoped>
.item-title {
  margin-bottom: 16px;
  font-weight: 600;
}
.bantimebox {
  display: flex;
  height: 20px;
}
.bantime-title {
  white-space: nowrap;
  margin-right: 15px;
}
.bantime-end {
  white-space: nowrap;
  margin-left: 15px;
}
.mg-20 {
  margin-right: 25px;
}
.flex {
  display: flex;
  align-items: center;
}
.bantime-right {
  margin-top: 35px;
}
.btn-box {
  margin-top: 66px;
  margin-left: 35%;
}
</style>
