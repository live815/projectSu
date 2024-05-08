<template>
  <div class="edit-dialog-first" v-loading="loading">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('live.addNewnews')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        ref="queryRef"
        :inline="true"
        label-position="top"
        :rules="rules"
      >
        <el-row>
          <el-col>
            <el-form-item
              :label="$t('live.AnchorName')"
              prop="nickName"
              class="full-width"
            >
              <el-select
                v-model="value"
                value-key="id"
                :placeholder="$t('live.pleaseChose')"
                clearable
                class="full-width"
                @change="handleChange"
              >
                <el-option
                  v-for="dict in statusList"
                  :key="dict.id"
                  :label="dict.nickName"
                  :value="dict"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.dynamicContent')"
              prop="content"
              class="full-width"
            >
              <el-input
                v-model="queryParams.content"
                class="full-width"
                type="textarea"
                show-word-limit
                maxlength="200"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.photowall')"
              prop="imageUrl"
              class="full-width"
            >
              <el-upload
                :file-list="fileListTwo"
                action="/admin/file/live/image/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleUploadWall"
                :headers="headers"
                :data="{}"
                :class="[fileListTwo.length == 9 ? 'hideBox' : '']"
              >
                <el-icon><Plus /></el-icon>
                <template #tip="scope" v-if="fileListTwo.length == 9">
                  <div class="tipBox">{{ $t("live.tip7") }}</div></template
                >
              </el-upload>
              <el-dialog v-model="dialogVisiblebig" width="40%">
                <div class="bigbox">
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </div>
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t("live.cancel") }}</el-button>
          <el-button type="primary" @click="submit">
            {{ $t("live.makesure") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive, toRaw } from "vue";
import { addAnchornewList } from "@/api/live/anchornew.js";
import { getAnchorList } from "@/api/live/anchor.js";
import { getToken } from "@/utils/auth";
import i18n from "@/i18n";

const { proxy } = getCurrentInstance();
const headers = ref({ Authorization: "Bearer " + getToken() });
const props = defineProps(["open"]);
const datar = ref("");
const fileListTwo = ref([]);
const dialogVisiblebig = ref(false);
const loading = ref(false);
const queryRef = ref("");
const emit = defineEmits(["update:open", "onrefresh"]);
const value = ref({});
const data = reactive({
  queryParams: { likeNum: 0 },
  form: { pageNum: 1, pageSize: 10 },
});
const { queryParams, form } = toRefs(data);
// 超管账号校验规则
const checkphotoWall = (rule, value, callback) => {
  if (fileListTwo.value.length < 10) {
    callback();
  } else {
    callback(new Error(i18n.global.t("live.tip8")));
  }
};

const rules = reactive({
  nickName: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip66") },
    {
      min: 2,
      max: 16,
      message: i18n.global.t("live.tip67"),
      trigger: "blur",
    },
  ],
  content: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip68") },
  ],
  imageUrl: [
    // { required: true, trigger: "change", message: "请上传相片墙" },

    { validator: checkphotoWall, trigger: "blur" },
  ],
});

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
const statusList = ref([]);

getList();
function getList() {
  loading.value = true;
  getAnchorList(form.value)
    .then((res) => {
      loading.value = false;
      statusList.value = res.rows || [];
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
      loading.value = false;
    });
}
function handleChange() {
  queryParams.value.nickName = value.value.nickName;
  queryParams.value.avatar = value.value.avatar;
  queryParams.value.presenterId = value.value.id;
}

const cancel = () => {
  dialogVisible.value = false;
};
// 确定
const submit = () => {
  queryRef.value.validate((valid) => {
    if (valid) {
      addAnchornewList(queryParams.value).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("live.tip69"));
        dialogVisible.value = false;
        emit("onrefresh");
      });
    } else {
      return;
    }
  });
};
// 照片移走
const handleRemove = (res) => {
  datar.value = toRaw(res).response.data;

  const index = fileListTwo.value.indexOf(datar.value);
  fileListTwo.value.splice(index, 1);

  queryParams.value.imageUrl = toRaw(fileListTwo.value).toString();
};
// 照片预览
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisiblebig.value = true;
};
// 相片墙上传图片成功处理数据
const handleUploadWall = (res) => {
  fileListTwo.value.push(res.data);
  queryParams.value.imageUrl = toRaw(fileListTwo.value).toString();
};
</script>

<style lang="scss" scoped>
.edit-dialog-first {
  .header-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
  img {
    width: 80px;
    height: 80px;
  }
  .rewrite-icon {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px dashed #eee;
  }
}
.hideBox {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}
.tipBox {
  color: #f56c6c;
  font-size: 12px;
}
</style>
