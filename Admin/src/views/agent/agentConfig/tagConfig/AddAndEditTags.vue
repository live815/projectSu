<template>
  <div>
    <el-form
      :model="queryParams"
      label-width="120px"
      :rules="rules"
      ref="ruleFormRef"
    >
      <el-form-item :label="$t('agent.labelName')" prop="tagName">
        <el-input v-model="queryParams.tagName" :placeholder="$t('agent.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('agent.department')" prop="department">
        <el-radio-group v-model="queryParams.department">
          <el-radio :label="0">{{ $t('agent.finance') }}</el-radio>
          <el-radio :label="1">{{ $t('agent.riskControl') }}</el-radio>
          <el-radio :label="2">{{ $t('agent.operations') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('agent.remark')" prop="remark">
        <el-input
          v-model="queryParams.remark"
          :rows="6"
          maxlength="50"
          :placeholder="$t('agent.pleaseInputRemark')"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(ruleFormRef)">{{ $t('agent.cancel') }}</el-button>

        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >{{ $t('agent.submit') }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { ref, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { addNewTagApi, editTagApi } from "@/api/agent/tagConfig.js";
const queryParams = ref({
  id: "",
  department: null,
  remark: "",
  tagName: "",
});
const emit = defineEmits(["submitBtn"]);
const ruleFormRef = ref();
const props = defineProps({
  opRow: {
    type: Object,
    default: () => {},
  },
});
//校验
const rules = ref({
  tagName: [{ required: true, message: i18n.global.t("agent.pleaseInputLabelNames"), trigger: "blur" }],
  department: [{ required: true, message: i18n.global.t("agent.pleaseSelectDepartment"), trigger: "blur" }],
});
// 传递过来的当前项值
const onComputedOpRow = computed(() => {
  return props.opRow;
});
//数据回显
onMounted(() => {
  Object.assign(queryParams.value, {
    id: onComputedOpRow.value.id,
    tagName: onComputedOpRow.value.tagName,
    department: onComputedOpRow.value.department,
    remark: onComputedOpRow.value.remark,
  });
});
//新增
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (onComputedOpRow.value.id) {
        queryParams.value.createBy = onComputedOpRow.value.createBy;
        editTagApi(queryParams.value).then((res) => {
          emit("submitBtn", 1);
          ElMessage({
            type: "success",
            message: i18n.global.t("agent.updateSuccessfully"),
          });
        });
      } else {
        if (onComputedOpRow)
          addNewTagApi(queryParams.value)
            .then(() => {
              emit("submitBtn", 1);
              ElMessage({
                type: "success",
                message: i18n.global.t("agent.addSuccessfully"),
              });
            })
            .catch((err) => {
              console.log(err);
            });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
// {{$t('agent.reset')}}表单
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
  ruleFormRef.value.resetFields();
  emit("submitBtn", 2);
};
</script>

<style lang="scss" scoped></style>
