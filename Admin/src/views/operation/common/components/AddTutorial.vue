<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item :label="$t('operation.tip25')">
        <el-input v-model="form.title" style="width: 200px" />
      </el-form-item>
      <el-form-item :label="$t('operation.picture')" v-if="typeId == 1">
        <el-upload
          v-model:file-list="iconList"
          :class="{ hide: iconHideUpload }"
          action="/admin/file/tutorial/image/upload"
          list-type="picture-card"
          :limit="limit"
          :headers="requestHeader"
          :auto-upload="true"
          accept=".bmp,.gif,.jpg,.jpge,.png"
          :on-success="handleSuccess"
          :on-exceed="handlExceed"
        >
          <img
            :src="getImgUrl(form.icon)"
            alt=""
            width="147"
            height="147"
            v-if="form.icon"
          />
          <el-icon class="icon" v-else><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleClose">{{ $t("operation.cancel") }}</el-button>
        <el-button type="primary" @click="toSaveTutorial">{{
          $t("operation.save")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getToken } from "@/utils/auth";
import { ElMessage, formProps } from "element-plus";
import { addTutorialApi, editTutorialApi } from "@/api/operation/common.js";
import { getImgUrl } from "@/utils";
import i18n from "@/i18n";
// 隐藏上传
const iconList = ref([]);
const iconHideUpload = computed(() => {
  return iconList.value.length >= 1;
});
const props = defineProps({
  currentTutorial: {
    type: Object,
    default: {},
  },
  typeId: {
    type: String,
    default: 1,
  },
});
const emit = defineEmits(["handleClose"]);
// 判断是否编辑
onMounted(() => {
  if (props.currentTutorial) {
    form.value = { ...props.currentTutorial };
    isEdit.value = true;
    console.log(form.value);
  }
});
const isEdit = ref(false);
const form = ref({
  id: "",
  icon: "",
  title: "",
  configType: "",
});
// 保存数据
const toSaveTutorial = () => {
  if (isEdit.value) {
    editTutorialApi(form.value).then(() => {
      handleClose();
    });
  } else {
    form.value.configType = props.typeId;
    addTutorialApi(form.value).then((res) => {
      handleClose();
    });
  }
};

// 关闭弹窗
const handleClose = () => {
  emit("handleClose", false);
};

// 配置上传
let limit = 1;
let requestHeader = {
  Authorization: getToken(),
};
// 获取上传图片URL
const handleSuccess = (file) => {
  form.value.icon = file.data;
  console.log(form.value.icon);
};

// 超过上传数量上线
const handlExceed = () => {
  ElMessage({
    type: "warning",
    message: i18n.global.t("operation.tip26"),
  });
};
</script>

<style lang="scss" scoped>
.hide :deep() {
  .el-upload--picture-card {
    display: none;
  }
}
</style>
