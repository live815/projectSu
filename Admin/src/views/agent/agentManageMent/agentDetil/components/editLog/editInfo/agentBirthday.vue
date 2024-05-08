<template>
  <div>
    <el-form label-width="90">
      <el-form-item
        :label="$t('agent.birthdayQuot')"
        :rules="[
          {
            required: true,
          },
        ]"
      >
        <el-date-picker
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :placeholder="$t('agent.selectBirthday')"
          v-model="detailDataForm.birthday"
          :size="size"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.remarkQuote')">
        <el-input
          type="textarea"
          v-model="formData.applicantMark"
          :rows="5"
          :maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-button @click="handleClose">{{ $t("agent.cancel") }}</el-button>
      <el-button @click="submit" type="primary">{{
        $t("agent.submit")
      }}</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { deepCopy } from "@/utils";
import { editAgentBaseInfoApi } from "@/api/agent/agentList.js";
import { useRoute } from "vue-router";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();
const route = useRoute();
const props = defineProps({
  detailData: Object,
});
const emit = defineEmits(["closeDetailEdit"]);
const detailDataForm = ref(deepCopy(props.detailData));
const formData = ref({
  adjustAfter: "",
  adjustBefore: "",
  adjustContentType: 0,
  agentId: 0,
  agentName: "",
  applicantMark: "",
});
const submit = () => {
  if (!detailDataForm.value.birthday) {
    proxy.$modal.msgError(i18n.global.t("agent.pleaseEnterDateOfBirth"));
    return;
  }
  formData.value.adjustContentType = 8;
  formData.value.agentId = route.query.id;
  formData.value.agentName = props.detailData.agentUsername;
  formData.value.adjustBefore = props.detailData.birthday || "--";
  formData.value.adjustAfter = detailDataForm.value.birthday;
  editAgentBaseInfoApi(formData.value).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("agent.submittedSuccessfully"));
    handleClose();
  });
};
// 关闭弹窗并重获数据
const handleClose = () => {
  emit("closeDetailEdit");
};
</script>

<style lang="scss" scoped></style>
