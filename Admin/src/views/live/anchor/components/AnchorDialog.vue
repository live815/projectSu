<template>
  <div class="edit-dialog-first">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="title"
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
              :label="$t('live.AnchorAccount')"
              prop="userName"
              class="full-width"
            >
              <el-input
                v-model="queryParams.userName"
                class="full-width"
                :disabled="editShow"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.AnchorNickname')"
              prop="nickName"
              class="full-width"
            >
              <el-input
                v-model="queryParams.nickName"
                class="full-width"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('live.tip1')" v-if="editShow">
              <el-switch v-model="delivery" @change="changStatus" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.tip2')"
              prop="password"
              class="full-width"
              v-if="addShow || inputShow"
            >
              <el-input
                v-model="queryParams.password"
                class="full-width"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('live.AnchorAvatar')"
              prop="avatar"
              class="full-width"
            >
              <el-col>
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/live/image/upload"
                  :data="{}"
                  :show-file-list="false"
                  :on-success="handleUploadSuccessdig"
                  :before-upload="beforeUpload"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.avatar"
                    :src="getImgUrl(queryParams.avatar)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('live.backgroundwall')"
              prop="backgroundWall"
              class="full-width"
            >
              <el-col>
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/live/image/upload"
                  :data="{}"
                  :show-file-list="false"
                  :on-success="handleUploadSuccess"
                  :before-upload="beforeUpload"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.backgroundWall"
                    :src="getImgUrl(queryParams.backgroundWall)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('live.Anchorprofile')"
              prop="summary"
              class="full-width"
              type="textarea"
            >
              <el-input v-model="queryParams.summary" class="full-width" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.birthday')"
              prop="birthday"
              class="full-width"
            >
              <el-input
                v-model="queryParams.birthday"
                class="full-width"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.Placebirth')"
              prop="address"
              class="full-width"
            >
              <el-input
                v-model="queryParams.address"
                class="full-width"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.height')"
              prop="height"
              class="full-width"
            >
              <el-input v-model="queryParams.height" class="full-width">
                <template #append>cm</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.Emotionalstate')"
              prop="emotion"
              class="full-width"
            >
              <el-radio-group v-model="queryParams.emotion" class="ml-4">
                <el-radio label="0" size="large">{{
                  $t("live.private")
                }}</el-radio>
                <el-radio label="1" size="large">{{
                  $t("live.single")
                }}</el-radio>
                <el-radio label="2" size="large">{{
                  $t("live.Married")
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!-- <el-col>
            <el-form-item
              label="id"
              prop="id"
              class="full-width"
              v-if="editShow"
            >
              <el-input v-model="queryParams.id" class="full-width"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col>
            <el-form-item
              :label="$t('live.tip3')"
              prop="imNumber"
              class="full-width"
            >
              <el-input
                v-model="queryParams.imNumber"
                class="full-width"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('live.tip4')" prop="imAppImage">
              <el-col :span="24">
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/live/image/upload"
                  :data="{}"
                  :show-file-list="false"
                  :on-success="handleUploadSuccessBig"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.imAppImage"
                    :src="getImgUrl(queryParams.imAppImage)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('live.tip5')"
              prop="imWebImage"
              class="full-width"
            >
              <el-col :span="24">
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/live/image/upload"
                  :data="{}"
                  :show-file-list="false"
                  :on-success="handleUploadBg"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.imWebImage"
                    :src="getImgUrl(queryParams.imWebImage)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('live.tip6')"
              prop="imJumpUrl"
              class="full-width"
            >
              <el-input
                v-model="queryParams.imJumpUrl"
                class="full-width"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.Numbersubscript')"
              prop="subscriptionNum"
              class="full-width"
            >
              <el-input
                v-model="queryParams.subscriptionNum"
                class="full-width"
              />
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('live.photowall')"
              prop="photoWall"
              class="full-width"
            >
              <el-upload
                v-model:file-list="fileList"
                action="/admin/file/live/image/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleUploadWall"
                :headers="headers"
                :data="{}"
                :before-upload="beforeUpload"
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
          <el-col>
            <el-form-item
              :label="$t('live.status')"
              prop="status"
              class="full-width"
            >
              <el-radio-group v-model="queryParams.status" class="ml-4">
                <el-radio label="0" size="large">{{
                  $t("live.enable")
                }}</el-radio>
                <el-radio label="1" size="large">{{
                  $t("live.disabled")
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t("live.cancel") }}</el-button>
          <el-button type="primary" @click="submit">
            {{ $t("live.sure") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, toRaw } from "vue";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { addAnchorList, editAnchorList } from "@/api/live/anchor.js";
import i18n from "@/i18n";

const { proxy } = getCurrentInstance();
const headers = ref({ Authorization: "Bearer " + getToken() });
const props = defineProps(["open", "row", "addShow", "editShow", "title"]);
const queryParams = props.row;

const dialogVisiblebig = ref(false);
const dialogImageUrl = ref("");
const emit = defineEmits(["update:open", "onrefresh"]);
const datar = ref("");
const queryRef = ref("");
const delivery = ref(false);
const inputShow = ref(false);
// 生日日期的时间表达式
const checkbirthday = (rule, value, callback) => {
  const regbirthday = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if (regbirthday.test(value)) {
    callback();
  } else {
    callback(new Error(i18n.global.t("live.tip7")));
  }
};
// 超管账号校验规则
const checkphotoWall = (rule, value, callback) => {
  if (fileListTwo.value.length < 10) {
    callback();
  } else {
    callback(new Error(i18n.global.t("live.tip8")));
  }
};
// 主播账号校验规则
const checkuserName = (rule, value, callback) => {
  const reguserName = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,12}$/;
  if (reguserName.test(value)) {
    callback();
  } else {
    callback(new Error(i18n.global.t("live.tip9")));
  }
};
// 账号密码校验规则
const checkpassword = (rule, value, callback) => {
  const reguserName = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/;
  if (reguserName.test(value)) {
    callback();
  } else {
    callback(new Error(i18n.global.t("live.tip10")));
  }
};

// 身高校验规则
const checkheight = (rule, value, callback) => {
  const reguserName = /^[0-9]*$/;
  if (reguserName.test(value)) {
    callback();
  } else {
    callback(new Error(i18n.global.t("live.tip11")));
  }
};

const rules = reactive({
  userName: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip12") },
    {
      validator: checkuserName,
      trigger: "blur",
    },
  ],
  password: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip13") },
    {
      validator: checkpassword,
      trigger: "blur",
    },
  ],
  nickName: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip14") },
    {
      min: 2,
      max: 16,
      message: i18n.global.t("live.tip15"),
      trigger: "blur",
    },
  ],
  avatar: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip16") },
  ],
  address: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip17") },
  ],
  backgroundWall: [
    { required: true, trigger: "change", message: i18n.global.t("live.tip18") },
  ],

  birthday: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip19") },
    {
      validator: checkbirthday,
      trigger: "blur",
    },
  ],
  emotion: [
    { required: true, trigger: "change", message: i18n.global.t("live.tip20") },
  ],
  height: [
    { required: true, trigger: "change", message: i18n.global.t("live.tip21") },
    {
      validator: checkheight,
      trigger: "blur",
    },
  ],
  imNumber: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip22") },
  ],
  imAppImage: [
    { required: true, trigger: "change", message: i18n.global.t("live.tip23") },
  ],
  imWebImage: [
    { required: true, trigger: "change", message: i18n.global.t("live.tip24") },
  ],
  imJumpUrl: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip25") },
  ],
  photoWall: [
    { required: true, trigger: "change", message: i18n.global.t("live.tip26") },
    { validator: checkphotoWall, trigger: "blur" },
  ],
  subscriptionNum: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip27") },
    { validator: checkheight, trigger: "blur" },
  ],
  summary: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip28") },
  ],
});

// const originalImageUrl = 'http://154.204.55.205:9000/sports-game/pm_board_1.png'
const fileList = ref([]);
const fileListTwo = ref([]);
// 处理相片墙数据

onMounted(() => {
  fileList.value = [];
  if (queryParams.photoWall !== "" && queryParams.photoWall !== undefined) {
    fileListTwo.value = queryParams.photoWall.split(",");
    // console.log(fileListTwo.value, "111");
    fileListTwo.value.map((item) => {
      const obj = {};
      obj.url = getImgUrl(item);
      fileList.value.push(obj);
    });
  }
});
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

//根据ID查询详情
const cancel = () => {
  dialogVisible.value = false;
};
// 确定事件
const submit = () => {
  queryRef.value.validate((valid) => {
    if (valid) {
      if (props.addShow) {
        addAnchorList(queryParams).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("live.tip29"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      } else if (!props.addShow) {
        console.log(queryParams, "222");
        editAnchorList(queryParams).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("live.tip30"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      }
    } else {
      return;
    }
  });
};
const handleUploadSuccess = (res) => {
  // queryParams.value.appLobbyIconDark = res.url;
  queryParams.backgroundWall = res.data;
};

const handleUploadSuccessdig = (res) => {
  // queryParams.value.appLobbyIconDark = res.url;
  queryParams.avatar = res.data;
};
const handleUploadSuccessBig = (res) => {
  queryParams.imAppImage = res.data;
};
const handleUploadBg = (res) => {
  console.log(res);
  queryParams.imWebImage = res.data;
};
const handleRemove = (res) => {
  datar.value = toRaw(res).response.data;

  const index = fileListTwo.value.indexOf(datar.value);
  fileListTwo.value.splice(index, 1);
  queryParams.photoWall = toRaw(fileListTwo.value).toString();
};
// 相片墙上传图片成功处理数据
const handleUploadWall = (res) => {
  fileListTwo.value.push(res.data);
  queryParams.photoWall = toRaw(fileListTwo.value).toString();
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisiblebig.value = true;
};
const beforeUpload = (file) => {
  // console.log(file, "22");
  // const isJPG = file.type === "image/jpeg";
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isJPG) {
  //   ElMessage.error("上传头像图片只能是 JPG 格式!");
  // }
  // if (!isLt2M) {
  //   ElMessage.error("上传头像图片大小不能超过 2MB!");
  // }
  // return isJPG && isLt2M;
};
// 改变switch开关
const changStatus = (res) => {
  inputShow.value = res;
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
    justify-content: center;
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
.bigbox {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
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
