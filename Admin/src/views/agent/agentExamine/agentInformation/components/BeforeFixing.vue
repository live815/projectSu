<!-- 代理信息调整{{$t('agent.review')}} 调整后-->
<template>
  <div class="center-content">
    <!-- {{ queryParams }} -->
    <el-form :model="queryParams">
      <el-form-item :label="$t('agent.agentModel')">
        <el-select
          v-model="queryParams.agentMode"
          class="m-2"
          disabled
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 376px"
        >
          <el-option
            v-for="item in proxyModeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item :label="$t('agent.commisionPlan')">
        <el-select
          v-model="queryParams.commissionPlan"
          class="m-2"
          disabled
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 376px"
        >
          <el-option
            v-for="item in commissionPlanList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->
      <div v-if="queryParams.agentMode == 0">
        <el-row :gutter="20">
          <el-col :span="3">
            <el-form-item :label="$t('agent.commissionSetting')"></el-form-item>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          v-for="(item, index) in queryParams.takeCommissionSet"
        >
          <el-col :span="8">
            <el-form-item
              :label="
                getChineseNum(index + 1) +
                $t('agent.levelOfAgent') +
                item.agentName
              "
            ></el-form-item>
          </el-col>
          <el-col :span="9"
            ><el-form-item :label="$t('agent.commisionRatio')">
              <el-input v-model="item.percent" disabled style="width: 200px">
                <template #append>%</template>
              </el-input>
            </el-form-item></el-col
          >
        </el-row>
      </div>
      <div v-if="queryParams.agentMode == 1">
        <el-row :gutter="20">
          <el-col :span="3">
            <el-form-item
              :label="$t('agent.dividedIntoSettingQuote')"
            ></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$t('agent.totalCommissionRatio')"
            ></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input
                v-model="queryParams.shareSetDto.totalProportion"
                disabled
                style="width: 100px"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          v-for="(item, index) in queryParams.shareSetDto.shareProportionSet"
          :key="index"
        >
          <el-col :span="3">
            <el-form-item></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="
                getChineseNum(index + 1) +
                $t('agent.levelOfAgent') +
                item.agentName
              "
            ></el-form-item>
          </el-col>
          <el-col :span="9"
            ><el-form-item :label="$t('agent.commisionRatio')">
              <el-input v-model="item.proportion" disabled style="width: 100px">
                <template #append>%</template>
              </el-input>
            </el-form-item></el-col
          >
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { ref } from "vue";
const props = defineProps(["rowItem"]);
const queryParams = ref({
  proxyMode: "",
  commissionPlan: "",
});

onMounted(() => {
  queryParams.value = JSON.parse(props.rowItem.adjustBefore);
});

const proxyModeList = ref([
  {
    value: 0,
    label: i18n.global.t("agent.commissionMode"),
  },
  {
    value: 1,
    label: i18n.global.t("agent.dispatchMode"),
  },
]);
const commissionPlanList = ref([
  {
    value: 1,
    label: i18n.global.t("agent.basicPlan"),
  },
  {
    value: 2,
    label: i18n.global.t("agent.otherConfigPlanName"),
  },
]);

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
.center-content {
}
</style>
