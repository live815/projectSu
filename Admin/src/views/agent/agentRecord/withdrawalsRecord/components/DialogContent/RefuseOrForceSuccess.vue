<!--拒绝出款与强制成功-->
<template>
  <div class="promotion">
    <div class="head-title">
      {{
        props.dialogType == 1
          ? $t("agent.refuseToWithdrawMoney")
          : $t("agent.forceSuccess")
      }}
    </div>
    <el-form :model="queryParams" :rules="rules" label-width="80px">
      <el-form-item label="上传附件 :" v-if="dialogType == 2">
        <div class="client">
          <el-upload
            class="avatar-uploader"
            action="/admin/file/tutorial/image/upload"
            :data="{}"
            :show-file-list="false"
            :on-success="handleUploadSuccessBig"
            :headers="headers"
            :before-upload="beforeUpload"
          >
            <img
              v-if="queryParams.imgUrls.length == 1"
              :src="getImgUrl(queryParams.imgUrls[0])"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon rewrite-icon"
              ><Plus
            /></el-icon>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item :label="$t('agent.remark')" prop="operateApplicantMark">
        <el-input
          v-model="queryParams.operateApplicantMark"
          :rows="6"
          type="textarea"
          placeholder="请输入备注"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import i18n from "@/i18n";
import {
  rejectWithdarwApi,
  forceSuccessApi,
} from "@/api/agent/agentRecord/agentRecord.js";

const props = defineProps(["dialogType", "dialogData"]);

const emit = defineEmits(["toCloseDialog"]);
const headers = ref({ Authorization: "Bearer " + getToken() });

const { proxy } = getCurrentInstance();

const rules = ref({
  operateApplicantMark: [
    { required: true, message: "备注不能为空", trigger: "blur" },
  ],
});
const queryParams = ref({
  imgUrls: [],
  operateApplicantMark: "",
  orderNo: "",
});

// 上传功能
const handleUploadSuccessBig = (res) => {
  if (res.code === 200) {
    if (queryParams.value.imgUrls.length == 0) {
      queryParams.value.imgUrls.push(res.data);
    } else {
      queryParams.value.imgUrls[0] = res.data;
    }
    proxy.$modal.msgSuccess("上传成功");
  }
};

// 校验文件类型
const beforeUpload = (file) => {
  console.log(file);
  const fileType = file.type;
  if (fileType.startsWith("image/")) {
    return true;
  } else {
    proxy.$modal.msgError(`请上传jpg或png格式的图片文件`);
    return false;
  }
};

// 提交功能
const submit = () => {
  console.log(props);
  if (!queryParams.value.operateApplicantMark) {
    proxy.$modal.msgWarning("备注不能为空");
    return;
  }
  queryParams.value.orderNo = props.dialogData.orderNo;

  if (props.dialogType == 1) {
    delete queryParams.value.imgUrls;
    rejectWithdarwApi(queryParams.value).then((res) => {
      proxy.$modal.msgSuccess("审核成功");
      emit("toCloseDialog", true);
    });
  } else {
    forceSuccessApi(queryParams.value).then((res) => {
      proxy.$modal.msgSuccess("审核成功");
      emit("toCloseDialog", true);
    });
  }
};
// 关闭弹窗
const handleClose = () => {
  emit("toCloseDialog", false);
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
.head-title {
  margin-bottom: 30px;
  font-size: 22px;
  font-weight: 600;
}
</style>
