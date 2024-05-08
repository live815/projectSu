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
              :label="$t('live.giftname')"
              prop="giftName"
              class="full-width"
            >
              <el-input
                v-model="queryParams.giftName"
                class="full-width"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.giftvalue')"
              prop="payAmount"
              class="full-width"
            >
              <el-input
                v-model="queryParams.payAmount"
                class="full-width"
                @blur="payAmountChange(queryParams.payAmount)"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('live.giftSVGA')"
              prop="giftBigImage"
              class="full-width"
            >
              <el-col>
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/live/image/upload"
                  :data="{}"
                  :show-file-list="false"
                  :on-success="handleUploadSuccessdig"
                  :headers="headers"
                >
                  <PlaySvga
                    v-if="queryParams.giftBigImage"
                    :svgaUrl="getImgUrl(queryParams.giftBigImage)"
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
              :label="$t('live.giftpicture')"
              prop="giftSmallImage"
              class="full-width"
            >
              <el-col>
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/live/image/upload"
                  :show-file-list="false"
                  :on-success="handleUploadSuccessmall"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.giftSmallImage"
                    :src="getImgUrl(queryParams.giftSmallImage)"
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
              :label="$t('live.Alternateimage')"
              prop="giftFullScreen"
            >
              <el-col>
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/game/upload"
                  :show-file-list="false"
                  :on-success="handleUploadSuccess"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.giftFullScreen"
                    :src="getImgUrl(queryParams.giftFullScreen)"
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
              :label="$t('live.remake')"
              prop="remark"
              class="full-width"
              type="textarea"
            >
              <el-input v-model="queryParams.remark" class="full-width" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.status')"
              prop="status"
              class="full-width"
              v-if="showedit"
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
            {{ $t("live.makesure") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import PlaySvga from "@/components/PlaySvga";
import { computed, reactive, toRaw } from "vue";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { addGiftList, editGiftList } from "@/api/live/gift.js";
import i18n from "@/i18n";
import { deepCopy } from "@/utils/index";

const { proxy } = getCurrentInstance();
const headers = ref({ Authorization: "Bearer " + getToken() });
const props = defineProps(["open", "row", "title", "showadd", "showedit"]);
const queryParams = props.row;
const emit = defineEmits(["update:open", "onrefresh"]);
const queryRef = ref("");
const isSameName = deepCopy(props.row.giftName)

// 身高校验规则
const checknumber = (rule, value, callback) => {
  const reguserName = /^[0-9]*$/;
  if (reguserName.test(value)) {
    callback();
  } else {
    callback(new Error(i18n.global.t("live.tip147")));
  }
};

const rules = reactive({
  giftName: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip147") },
    // {
    //   validator: checkuserName,
    //   trigger: "blur",
    // },
  ],
  payAmount: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip148") },
    {
      validator: checknumber,
      trigger: "blur",
    },
  ],

  giftBigImage: [
    {
      required: true,
      trigger: "change",
      message: i18n.global.t("live.tip149"),
    },
  ],
  giftSmallImage: [
    {
      required: true,
      trigger: "change",
      message: i18n.global.t("live.tip150"),
    },
  ],
  giftFullScreen: [
    {
      required: true,
      trigger: "change",
      message: i18n.global.t("live.tip151"),
    },
  ],
  remark: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip152") },
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

//根据ID查询详情
const cancel = () => {
  dialogVisible.value = false;
};
const payAmountChange = (val) => {
  // queryParams.payAmount = Number(val);
  // console.log(queryParams.payAmount);
};
// 确定事件
const submit = () => {
  queryRef.value.validate((valid) => {
    if (valid) {
      queryParams.payAmount = Number(queryParams.payAmount);
      queryParams.status = Number(queryParams.status);
      if (props.showadd) {
        addGiftList(queryParams).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("live.tip153"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      } else if (!props.showadd) {
        if(isSameName === queryParams.giftName){
          delete queryParams.giftName
        }
        editGiftList(queryParams).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("live.tip154"));
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
  queryParams.giftFullScreen = res.data;
};

const handleUploadSuccessdig = (res) => {
  queryParams.giftBigImage = res.data;
};
const handleUploadSuccessmall = (res) => {
  queryParams.giftSmallImage = res.data;
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
