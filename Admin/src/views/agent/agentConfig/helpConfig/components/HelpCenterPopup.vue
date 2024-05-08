<template>
  <div>
    <el-form
      :model="queryParams"
      ref="ruleFormRef"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item :label="$t('agent.titleName')" prop="title">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('agent.pleaseInputTitleName')"
          style="width: 300px"
          maxLength="20"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.categoryQuote')" prop="classifyId">
        <el-select
          v-model="queryParams.classifyId"
          clearable
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 300px"
        >
          <el-option
            v-for="item in classifyIdList"
            :key="item.classifyId"
            :label="item.classifyName"
            :value="item.classifyId"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="内容详情 :" prop="content">
        <el-input
          v-model="queryParams.content"
          :rows="4"
          type="textarea"
          placeholder="请输入备注"
          style="width: 300px"
        />
      </el-form-item> -->
      <el-form-item :label="$t('agent.textContent')" prop="content">
        <Editor
          v-model="queryParams.content"
          :minHeight="400"
          :needVideo="null"
        ></Editor>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(ruleFormRef)">{{
          $t("agent.cancel")
        }}</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{
          $t("agent.submit")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { onMounted, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import {
  addedHelpCenterApi,
  editHelpCenterApi,
  questionCategoryApi,
} from "@/api/agent/helpConfig.js";
import { Base64 } from "js-base64";
const queryParams = ref({
  id: "",
  classifyName: "",
  content: "",
  createBy: "",
  tenantId: 0,
  title: "",
});
const emit = defineEmits(["submitBtn"]);
const ruleFormRef = ref();
const props = defineProps({
  opRow: {
    type: Object,
    default: () => {},
  },
});
const rules = ref({
  title: [
    {
      required: true,
      message: i18n.global.t("agent.pleaseInputTitleName"),
      trigger: "blur",
    },
  ],
  classifyId: [
    {
      required: true,
      message: i18n.global.t("agent.pleaseSelectCategory"),
      trigger: "blur",
    },
  ],
  content: [
    {
      required: true,
      message: i18n.global.t("agent.pleaseInputContent"),
      trigger: "blur",
    },
  ],
});
// 传递过来的当前项值
const onComputedOpRow = computed(() => {
  return props.opRow;
});
//新增
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      queryParams.value.content = Base64.encode(queryParams.value.content);
      if (onComputedOpRow.value.id) {
        queryParams.value.createBy = onComputedOpRow.value.createBy;
        editHelpCenterApi(queryParams.value).then((res) => {
          emit("submitBtn", 1);
          ElMessage({
            type: "success",
            message: i18n.global.t("agent.updateSuccessfully"),
          });
        });
      } else {
        if (onComputedOpRow)
          addedHelpCenterApi(queryParams.value)
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
const classifyIdList = ref([]);
const getClassifyIdList = () => {
  questionCategoryApi().then((res) => {
    classifyIdList.value = res;
  });
};
onMounted(() => {
  getClassifyIdList();
  Object.assign(queryParams.value, {
    id: onComputedOpRow.value.id,
    title: onComputedOpRow.value.title,

    content: onComputedOpRow.value.content,
    classifyId: onComputedOpRow.value.classifyId,
  });
});
</script>

<style lang="scss" scoped></style>
