<template>
  <div>
    <el-form :model="submitData" :rules="rules" label-width="180">
      <el-form-item :label="$t('agent.adjustType')" prop="type">
        <el-select
          v-model="submitData.type"
          :placeholder="$t('agent.pleaseSelect')"
          size="large"
        >
          <el-option :label="$t('agent.plusAmount')" :value="0" />
          <el-option :label="$t('agent.reduceAmount')" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.adjustAmountQuote')" prop="amount">
        <el-input
          v-model="submitData.amount"
          :placeholder="$t('agent.pleaseInputAmount')"
          style="width: 300px"
          @input="handleInput('amount')"
          maxlength="8"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.remark')">
        <el-input
          v-model="submitData.remark"
          style="width: 300px"
          type="textarea"
          :rows="3"
          maxlength="50"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
const props = defineProps({
  tableData: Object,
});
const submitData = ref({
  amount: null,
  commissionRecordId: 0,
  remark: "",
  type: 0,
});

const rules = {
  type: [
    {
      required: true,
      message: i18n.global.t("agent.pleaseSelectType"),
      trigger: "blur",
    },
  ],
  amount: [
    {
      required: true,
      message: i18n.global.t("agent.pleaseInputAmount"),
      trigger: "blur",
    },
  ],
};
// 拼音输入时实时更新输入值
const handleInput = (field) => {
  console.log("???");
  submitData.value[field] = submitData.value[field].replace(
    /^(0+)|[^\d]+/g,
    ""
  );
};
defineExpose({
  submitData,
});
</script>

<style lang="scss" scoped></style>
