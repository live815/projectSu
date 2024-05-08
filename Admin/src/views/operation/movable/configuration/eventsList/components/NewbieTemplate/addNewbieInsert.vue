<template>
  <div>
    <el-form :model="queryParams" ref="queryRef" label-width="130px">
      <el-form-item :label="$t('newbie.form.label12')">
        <el-radio-group v-model="queryParams.type">
          <el-radio :label="1" size="large">{{
            $t("operation.text")
          }}</el-radio>
          <el-radio :label="2" size="large">{{
            $t("operation.upImg")
          }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="queryParams.type == 1">
        <el-form-item
          :label="$t('newbie.form.label13')"
          prop="content"
          class="bottom"
          :rules="[
            { required: true, message: '文本不能为空', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="queryParams.content"
            :placeholder="$t('operation.pleaseEnter')"
            style="width: 400px"
          />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item
          :label="$t('newbie.form.label14')"
          prop="appImg"
          class="bottom"
        >
          <el-upload
            class="avatar-uploader"
            action="/admin/file/tutorial/image/upload"
            :data="{}"
            :show-file-list="false"
            :on-success="handleUploadSuccessBigApp"
            :headers="headers"
            accept=".bmp,.gif,.jpg,.jpge,.png"
          >
            <img
              v-if="queryParams.appImg"
              :src="getImgUrl(queryParams.appImg)"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon rewrite-icon"
              ><Plus
            /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label="$t('newbie.form.label15')"
          prop="webImg"
          class="bottom"
        >
          <el-upload
            class="avatar-uploader"
            action="/admin/file/tutorial/image/upload"
            :data="{}"
            :show-file-list="false"
            :on-success="handleUploadSuccessBigWeb"
            :headers="headers"
            accept=".bmp,.gif,.jpg,.jpge,.png"
          >
            <img
              v-if="queryParams.webImg"
              :src="getImgUrl(queryParams.webImg)"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon rewrite-icon"
              ><Plus
            /></el-icon>
          </el-upload>
        </el-form-item>
      </template>

      <el-form-item class="bottom">
        <div class="left">
          {{ $t("operation.tip114") }}
        </div>
      </el-form-item>
      <el-form-item class="bottom left">
        <el-button type="primary" @click="addGear(queryRef)">{{
          $t("operation.sure1")
        }}</el-button>
        <el-button @click="resetForm(queryRef)">{{
          $t("operation.close")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";

const headers = ref({ Authorization: "Bearer " + getToken() });
const queryRef = ref();
const emit = defineEmits(["submitRewardAll"]);
const props = defineProps({
  gearObj: {
    type: Object,
  },
});
const queryParams = ref({
  content: "",
  appImg: "",
  webImg: "",
  type: 0,
});
//上传
const handleUploadSuccessBigApp = (res) => {
  console.log("1111", res);
  queryParams.value.appImg = res.data;
};
const handleUploadSuccessBigWeb = (res) => {
  queryParams.value.webImg = res.data;
};
// 关闭
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
  emit("submitRewardAll");
};
// 确认
const addGear = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit("submitRewardAll", queryParams.value);
    } else {
      console.log("error submit!", fields);
    }
  });
};
onMounted(() => {
  if (props.gearObj) {
    queryParams.value = props.gearObj;
  }
});
</script>

<style lang="scss" scoped>
.rewrite-icon {
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 100px;
  border: 1px dashed #eee;
}
.avatar {
  width: 150px;
  height: 150px;
}
.bottom {
  margin-bottom: 10px;
}
.left {
  margin-left: 110px;
}
</style>
