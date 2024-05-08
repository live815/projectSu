<template>
  <div class="promotion">
    <el-form
      :model="queryParams"
      label-width="120px"
      :rules="rules"
      ref="ruleFormRef"
    >
      <el-form-item :label="$t('agent.bankName')" prop="bankName">
        <el-input
          v-model="queryParams.bankName"
          :placeholder="$t('agent.pleaseInputBankname')"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.uploadAttachment')" prop="icon">
        <div class="client">
          <el-upload
            class="avatar-uploader"
            action="/admin/file/tutorial/image/upload"
            :data="{}"
            :show-file-list="false"
            :on-success="handleUploadSuccessBig"
            :headers="headers"
          >
            <img
              v-if="queryParams.icon"
              :src="getImgUrl(queryParams.icon)"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon rewrite-icon"
              ><Plus
            /></el-icon>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item :label="$t('agent.remark')" prop="remark">
        <el-input
          v-model="queryParams.remark"
          :rows="10"
          maxlength="50"
          :placeholder="$t('agent.pleaseInputRemark')"
          show-word-limit
          type="textarea"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(ruleFormRef)">{{ $t('agent.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >{{ $t('agent.ensure') }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { ref, getCurrentInstance } from "vue";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { ElMessage } from "element-plus";
import {
  addBankManagementApi,
  editBankManagementApi,
} from "@/api/agent/bankManagement.js";

const headers = ref({ Authorization: "Bearer " + getToken() });
const { proxy } = getCurrentInstance();
const emit = defineEmits(["submitBtn"]);
const ruleFormRef = ref();
const props = defineProps({
  opRow: {
    type: Object,
    default: () => {},
  },
});

const queryParams = ref({
  id: "",
  bankName: "",
  createBy: "",
  icon: "",
  remark: "",
  status: "",
  tenantId: 0,
});

const handleUploadSuccessBig = (res) => {
  queryParams.value.icon = res.data;
  proxy.$modal.msgSuccess(i18n.global.t("agent.uploadSuccessfully"));
};

//校验
const rules = ref({
  bankName: [{ required: true, message: i18n.global.t("agent.pleaseInputBankname"), trigger: "blur" }],
  icon: [{ required: true, message: i18n.global.t("agent.pleaseUploadAttachment"), trigger: "blur" }],
  remark: [{ required: true, message: i18n.global.t("agent.pleaseInputRemark"), trigger: "blur" }],
});
// 传递过来的当前项值
const onComputedOpRow = computed(() => {
  return props.opRow;
});
//数据回显
onMounted(() => {
  Object.assign(queryParams.value, {
    id: onComputedOpRow.value.id,
    bankName: onComputedOpRow.value.bankName,
    icon: onComputedOpRow.value.icon,
    remark: onComputedOpRow.value.remark,
  });
});
//新增
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (onComputedOpRow.value.id) {
        editBankManagementApi(queryParams.value).then((res) => {
          emit("submitBtn", 1);
          ElMessage({
            type: "success",
            message: i18n.global.t("agent.updateSuccessfully"),
          });
        });
      } else {
        if (onComputedOpRow)
          addBankManagementApi(queryParams.value)
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

<style lang="scss" scoped>
.promotion {
  width: 600px;
  margin: 0 auto;
  .avatar {
    width: 130px;
    height: 130px;
  }
  .rewrite-icon {
    width: 130px;
    height: 130px;
    text-align: center;
    line-height: 100px;
    border: 1px dashed #eee;
  }
}
</style>
