<template>
  <div class="promotion">
    <el-form
      :model="queryParams"
      label-width="120px"
      :rules="rules"
      ref="ruleFormRef"
    >
      <el-form-item :label="$t('agent.imageCaption')" prop="pictureName">
        <el-input
          v-model="queryParams.pictureName"
          :placeholder="$t('agent.pleaseInputTilte')"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.pictureType')" prop="pictureType">
        <el-select
          v-model="queryParams.pictureType"
          clearable
          :placeholder="$t('agent.pleaseEnterTheType')"
          style="width: 400px"
        >
          <el-option
            v-for="item in pictureTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.uploadImage')" prop="pictureUrl">
        <div class="client">
          <el-upload
            class="avatar-uploader"
            action="/admin/file/tutorial/image/upload"
            :data="{}"
            :show-file-list="false"
            :on-success="handleUploadSuccessBig"
            :before-upload="beforeUpload"
            :headers="headers"
          >
            <img
              v-if="queryParams.pictureUrl"
              :src="getImgUrl(queryParams.pictureUrl)"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon rewrite-icon"
              ><Plus
            /></el-icon>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item :label="$t('agent.sizeOfThePicture')" prop="pictureSize">
        <el-input
          v-model="queryParams.pictureSize"
          :placeholder="$t('agent.pleaseEnterSize')"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.remark')" prop="remark">
        <el-input
          v-model="queryParams.remark"
          :rows="10"
          maxlength="50"
          :placeholder="$t('agent.pleaseFillInTheRemarks')"
          show-word-limit
          type="textarea"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(ruleFormRef)">{{
          $t("agent.cancel")
        }}</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{
          $t("agent.ensure")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import {
  newMaterialApi,
  editMaterialApi,
} from "@/api/agent/promotionConfig/promotionConfig.js";
import i18n from "@/i18n";

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
  createBy: "",
  pictureName: "",
  pictureSize: "",
  pictureType: null,
  pictureUrl: "",
  remark: "",
  status: 1,
  tenantId: 0,
});
const handleUploadSuccessBig = (res) => {
  queryParams.value.pictureUrl = res.data;
  proxy.$modal.msgSuccess(i18n.global.t("agent.uploadSuccessfully"));
};
//校验
const rules = ref({
  pictureName: [
    {
      required: true,
      message: i18n.global.t("agent.pleaseEnterAPictureTitle"),
      trigger: "blur",
    },
  ],
  pictureType: [
    {
      required: true,
      message: i18n.global.t("agent.pleaseSelectImageType"),
      trigger: "blur",
    },
  ],
  pictureUrl: [
    {
      required: true,
      message: i18n.global.t("agent.pleaseUploadPictures"),
      trigger: "blur",
    },
  ],
  pictureSize: [
    {
      required: true,
      message: i18n.global.t("agent.pleaseSelectImageSize"),
      trigger: "blur",
    },
  ],
});

// 校验文件类型
const beforeUpload = (file) => {
  const fileType = file.type;
  if (fileType.startsWith("image/")) {
    return true;
  } else {
    proxy.$modal.msgError(`请上传jpg或png格式的图片文件`);
    return false;
  }
};

// 传递过来的当前项值
const onComputedOpRow = computed(() => {
  return props.opRow;
});
//数据回显
onMounted(() => {
  Object.assign(queryParams.value, {
    id: onComputedOpRow.value.id,
    pictureName: onComputedOpRow.value.pictureName,
    pictureType: onComputedOpRow.value.pictureType,
    pictureUrl: onComputedOpRow.value.pictureUrl,
    pictureSize: onComputedOpRow.value.pictureSize,
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
        editMaterialApi(queryParams.value).then((res) => {
          emit("submitBtn", 1);
          ElMessage({
            type: "success",
            message: i18n.global.t("agent.updateSuccessfully"),
          });
        });
      } else {
        if (onComputedOpRow)
          newMaterialApi(queryParams.value)
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
const pictureTypeList = ref([
  {
    value: 1,
    label: i18n.global.t("agent.eventPromotion"),
  },
  {
    value: 2,
    label: i18n.global.t("agent.comprehensivePromotion"),
  },
  {
    value: 3,
    label: i18n.global.t("agent.appPromotion"),
  },
  {
    value: 4,
    label: i18n.global.t("agent.sponsorshipPromotion"),
  },
  {
    value: 5,
    label: i18n.global.t("agent.freePromotion"),
  },
  {
    value: 6,
    label: i18n.global.t("agent.promotionActivities"),
  },
  {
    value: 7,
    label: i18n.global.t("agent.virtualCurrencyPromotion"),
  },
  {
    value: 8,
    label: i18n.global.t("agent.agencyPromotion"),
  },
  {
    value: 9,
    label: i18n.global.t("agent.livePromotion"),
  },
]);
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
