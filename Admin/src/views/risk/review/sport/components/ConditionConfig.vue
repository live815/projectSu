<template>
  <div>
    <!-- 条件设置 -->
    <CommonTitle :title="$t('risk.similarBetOrderConfig')" isBold="true" />
    <el-row :gutter="24" class="mt-20 mb-20">
      <el-col :span="6">
        <el-input v-model="amountCount" clearable :placeholder="$t('risk.pleaseInput')">
          <template #prepend>
            <span>{{ titleLabelAmount }}</span>
          </template>
          <template #append>
            {{ score }}
          </template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="timeCount" clearable :placeholder="$t('risk.pleaseInput')">
          <template #prepend>
            <span>{{ titleLabelTime }}</span>
          </template>
          <template #append>
            {{ score }}
          </template>
        </el-input>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button type="primary" size="small" @click="submit">{{ $t('risk.save') }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import CommonTitle from "@/components/CommonTitle/index.vue";
import { getSportsSimilarBettingList,updategetSport } from "@/api/risk/review/index";
import { getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance();
const titleLabelAmount = ref(i18n.global.t("risk.betAmountDeviation"));
const titleLabelTime = ref(i18n.global.t("risk.betTimeDeviation"));
const score = ref(i18n.global.t("risk.minutes"));
const amountCount = ref(null);
const timeCount = ref(null);

onMounted(async()=>{
  getList();
})
function getList(){
  return getSportsSimilarBettingList().then(res=>{
    amountCount.value = res.amountCount || 0;
    timeCount.value = res.timeCount || 0;
  })
}
function submit(){
  updategetSport({
    amountCount:amountCount.value,
    timeCount:timeCount.value
  }).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"))
  })
}
</script>

<style lang="scss" scoped></style>
