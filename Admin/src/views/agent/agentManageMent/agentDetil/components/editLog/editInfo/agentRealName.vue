<template>
  <div>
    <el-form label-width="90" :model="detailDataForm" ref="formRef">
      <el-form-item
        :label="$t('agent.name')"
        :rules="[
          {
            required: true,
            message: $t('agent.plsEnterName'),
            trigger: 'blur',
          },
          {
            pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
            message: $t('agent.nameOnly'),
            trigger: 'blur',
          },
        ]"
        prop="realName"
      >
        <el-input
          v-model="detailDataForm.realName"
          style="width: 230px"
          :maxlength="20"
        >
        </el-input>
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
const formRef = ref(null);
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
  console.log(formRef.value);
  formRef.value.validate((valid) => {
    if (valid) {
      formData.value.adjustContentType = 6;
      formData.value.agentId = route.query.id;
      formData.value.agentName = props.detailData.agentUsername;
      formData.value.adjustBefore = props.detailData.realName || "--";
      formData.value.adjustAfter = detailDataForm.value.realName;

      editAgentBaseInfoApi(formData.value).then(() => {
        proxy.$modal.msgSuccess(i18n.global.t("agent.submittedSuccessfully"));
        handleClose();
      });
    } else {
      return;
    }
  });
};
// 关闭弹窗并重获数据
const handleClose = () => {
  emit("closeDetailEdit");
};
</script>

<style lang="scss" scoped></style>
