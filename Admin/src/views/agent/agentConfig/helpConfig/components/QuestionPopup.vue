<template>
  <div>
    <el-form
      :model="queryParams"
      :rules="rules"
      ref="ruleFormRef"
      label-width="120px"
    >
      <el-form-item :label="$t('agent.categoryName')" prop="classifyName">
        <el-input
          v-model="queryParams.classifyName"
          :placeholder="$t('agent.pleaseInputTilte')"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.remark')">
        <el-input
          v-model="queryParams.remark"
          :rows="4"
          type="textarea"
          :placeholder="$t('agent.pleaseInputRemark')"
          style="width: 300px"
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
import { ref } from "vue";
import { addNewCategoryApi, editCategoryApi } from "@/api/agent/helpConfig.js";
import { ElMessageBox, ElMessage } from "element-plus";

const queryParams = ref({
  id: "",
  createBy: "",
  classifyName: "",
  remark: "",
  tenantId: 0,
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
  classifyName: [{ required: true, message: i18n.global.t("agent.pleaseInputTilte"), trigger: "blur" }],
});
// 传递过来的当前项值
const onComputedOpRow = computed(() => {
  return props.opRow;
});
//数据回显
onMounted(() => {
  Object.assign(queryParams.value, {
    id: onComputedOpRow.value.id,
    classifyName: onComputedOpRow.value.classifyName,
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
        editCategoryApi(queryParams.value).then((res) => {
          emit("submitBtn", 1);
          ElMessage({
            type: "success",
            message: i18n.global.t("agent.updateSuccessfully"),
          });
        });
      } else {
        if (onComputedOpRow)
          addNewCategoryApi(queryParams.value)
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
