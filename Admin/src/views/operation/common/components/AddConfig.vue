<template>
  <el-form>
    <el-form-item :label="$t('operation.Pagename')">
      <el-input v-model="form.tabName" style="width: 200px" />
    </el-form-item>
    <el-form-item :label="$t('operation.weightsort')">
      <el-input
        v-model="form.sortNum"
        style="width: 200px"
        oninput="value=value.replace(/[^\d]/g,'')"
      />
      <span style="margin-left: 8px">{{ $t("operation.tip22") }}</span>
    </el-form-item>
    <el-form-item :label="$t('operation.Pagelabelpicture')">
      <el-upload
        class="avatar-uploader"
        action="/admin/file/tutorial/image/upload"
        list-type="picture-card"
        :headers="requestHeader"
        :show-file-list="false"
        :on-success="handleSuccessIcon"
      >
        <img v-if="form.icon" :src="getImgUrl(form.icon)" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon rewrite-icon"
          ><Plus
        /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item :label="$t('operation.Videomaterial')">
      <div>
        <el-upload
          :file-list="fileList"
          action="/admin/file/tutorial/image/upload"
          :limit="3"
          multiple
          :headers="requestHeader"
          :on-success="handleSuccessVideo"
          :on-exceed="handlExceed"
          :on-preview="handlePreview"
          accept=".mp4"
        >
          <el-button type="primary">{{
            $t("operation.Videoupload")
          }}</el-button>
        </el-upload>
        <div class="tip">{{ $t("operation.tip23") }}</div>
      </div>
    </el-form-item>
    <el-form-item :label="$t('operation.textcontent')">
      <Editor v-model="editorContent" :minHeight="200"></Editor>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleClose()">{{ $t("operation.cancel") }}</el-button>
      <el-button @click="toSave()" type="primary">{{
        $t("operation.save")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
import { getToken } from "@/utils/auth";
import { addConfigApi, editConfigApi } from "@/api/operation/tutorial.js";
import { Base64 } from "js-base64";
import { getImgUrl } from "@/utils";
import { copyTextToClipboard } from "@/directive/common/copyText";
import i18n from "@/i18n";
const props = defineProps({
  currentConfig: {
    type: Object,
    default: null,
  },
  currentTutorialId: {
    default: null,
  },
});
const emit = defineEmits(["showAddConfig"]);
let isEdit = false;
const editorContent = ref("");
const fileList = ref([]);
onMounted(() => {
  if (Object.keys(props.currentConfig).length === 0) {
    // 新增
    isEdit = false;
  } else {
    // 编辑
    isEdit = true;
    form.value = props.currentConfig;
    editorContent.value = props.currentConfig.tabContent;
    // 处理视频素材
    try {
      fileList.value = JSON.parse(props.currentConfig.video);
    } catch (e) {}
  }
});

// 配置上传
let requestHeader = {
  Authorization: getToken(),
};
const handlExceed = () => {
  ElMessage({
    type: "warning",
    message: i18n.global.t("operation.tip24"),
  });
};
function handlePreview(file) {
  // 复制视频链接
  let url = file.url || file.response?.data;
  copyTextToClipboard(getImgUrl(url));
}
// 获取图片url  页签图片
const handleSuccessIcon = (res) => {
  form.value.icon = res.data;
};
// 视频上传成功;
const handleSuccessVideo = (res, file) => {
  fileList.value.push({
    name: file.name,
    url: res.data,
  });
};
// 保存或修改
const toSave = () => {
  // 处理视频素材
  form.value.video = JSON.stringify(fileList.value);
  const reqData = Object.assign({}, form.value, {
    tabContent: Base64.encode(editorContent.value),
  });

  if (isEdit) {
    editConfigApi(reqData)
      .then((res) => {
        handleClose();
      })
      .catch((rej) => {
        console.log(rej);
        return;
      });
  } else {
    reqData.tuId = props.currentTutorialId.toString();
    addConfigApi(reqData)
      .then((res) => {
        handleClose();
      })
      .catch((rej) => {
        console.log(rej);
        return;
      });
  }
};
// 退出弹窗，判断是否重新拉取数据
const handleClose = () => {
  emit("handleClose", false);
};

const form = ref({
  icon: "",
  material: "",
  sortNum: 0,
  tabContent: "",
  tabName: "",
  tuId: null,
  video: "",
});
</script>

<style lang="scss" scoped>
.tip {
  font-size: 12px;
  color: red;
  opacity: 0.8;
}
</style>
<style scoped>
.avatar-uploader .avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
