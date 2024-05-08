<template>
  <div class="phone-manage-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="type === 'add' ? $t('member.addCountryAreaNumber') : $t('member.editCountryAreaNumber')"
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
            <el-form-item :label="$t('member.countryName')" prop="countryCn" class="full-width">
              <el-input
                v-model="queryParams.countryCn"
                class="full-width"
                clearable
                :placeholder="$t('member.pleaseInput')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('member.countryCode')"
              prop="countryCode"
              class="full-width"
            >
              <el-input
                v-model="queryParams.countryCode"
                class="full-width"
                clearable
                :placeholder="$t('member.pleaseInput')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('member.countryLang')"
              prop="countryLang"
              class="full-width"
            >
              <el-input
                v-model="queryParams.countryLang"
                class="full-width"
                clearable
                :placeholder="$t('member.pleaseInput')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('member.currencyCode')"
              prop="currencyCode"
              class="full-width"
            >
              <el-input
                v-model="queryParams.currencyCode"
                class="full-width"
                clearable
                :placeholder="$t('member.pleaseInput')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('member.phoneAreaNumber')" prop="phoneCode" class="full-width">
              <el-input
                v-model="queryParams.phoneCode"
                class="full-width"
                clearable
                :placeholder="$t('member.pleaseInput')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('member.status')" prop="status" class="full-width">
              <el-switch
                v-model="queryParams.status"
                active-value="0"
                inactive-value="1"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('member.uploadAttachment')" prop="iconName">
              <el-upload
                multiple
                :file-list="queryParams.iconName"
                action="/admin/file/fund/upload"
                list-type="picture-card"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="handleUploadSuccessBig"
                :on-error="handleUploadError"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :headers="headers"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
              <el-dialog v-model="dialogImg" :title="$t('member.preview')" width="400px">
                <img
                  w-full
                  :src="getImgUrl(dialogImageUrl)"
                  alt="Preview Image"
                  class="phone-manage-img"
                />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('member.cancel') }}</el-button>
          <el-button type="primary" @click="submit"> {{ $t('member.submit') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, onMounted, proxyRefs } from "vue";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import {
  getInfo,
  addCountrycode,
  editCountrycode,
} from "@/api/member/phone/index";

const props = defineProps(["open", "type", "id"]);
const emit = defineEmits(["update:open", "onrefresh"]);
const headers = ref({ Authorization: "Bearer " + getToken() });
const { proxy } = getCurrentInstance();

const queryRef = ref(null);
const queryParams = ref({
  id: null,
  countryCn: null, //国家中文名称,示例值(中国)
  countryCode: null, //国家编码两位码(中国CN 越南VN),示例值(CN)
  countryLang: null, //国家语言,示例值(zh-cn)
  currencyCode: null, //货币三位码(如：CNY 人民币 USD 美元),示例值(CNY)
  icon: null, //图标地址
  iconName: [],
  phoneCode: null, //手机区号(中国86 越南84),示例值(86)
  status: "0",
});
const dialogImg = ref(false);
const dialogImageUrl = ref("");
const rules = ref({
  countryCn: [{ required: true, message: i18n.global.t("member.pleaseInputCountryName"), trigger: "blur" }],
  countryCode: [{ required: true, message: i18n.global.t("member.pleaseInputCountryCode"), trigger: "blur" }],
  countryLang: [{ required: true, message: i18n.global.t("member.pleaseInputCountryLang"), trigger: "blur" }],
  currencyCode: [{ required: true, message: i18n.global.t("member.pleaseInputCurrencyCode"), trigger: "blur" }],
  phoneCode: [{ required: true, message: i18n.global.t("member.pleaseInputPhoneAreaNumber"), trigger: "blur" }]
});

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

props.type === "edit" && queryInfo();
//根据ID查询详情
function queryInfo() {
  getInfo(props.id).then((res) => {
    queryParams.value = res;
    queryParams.value.iconName = res.icon
      ? res.icon.split().map((item) => {
          return {
            url: getImgUrl(item),
          };
        })
      : [];
  });
}
const cancel = () => {
  dialogVisible.value = false;
};
const submit = () => {
  queryRef.value.validate((valid) => {
    if (valid) {
      queryParams.value.icon = queryParams.value.iconName.every(
        (item) => typeof item === "object" && item !== null
      )
        ? queryParams.value.iconName.map((item) => item.url).join()
        : queryParams.value.iconName.join();
      if (props.type === "add") {
        addCountrycode(queryParams.value).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("member.addSuccessfully"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      } else {
        editCountrycode(queryParams.value).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("member.editSuccessfully"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      }
    } else {
      return;
    }
  });
};
const handleUploadSuccessBig = (res) => {
  res.data && queryParams.value.iconName.push(res.data);
  proxy.$modal.msgSuccess(i18n.global.t("member.uploadSuccessfully"));
};
function handleExceed() {
  proxy.$modal.msgError(i18n.global.t("member.onlyOnePictureCanBeUpload"));
}
function handleUploadError(err) {
  console.log(err, "错误");
}
function handlePictureCardPreview(uploadFile) {
  dialogImageUrl.value = uploadFile.url;
  dialogImg.value = true;
}
function handleRemove(uploadFile, uploadFiles) {
  //删除的那列列和剩下长度
  console.log(uploadFile, uploadFiles);
}
</script>

<style lang="scss" scoped>
.phone-manage-dialog {
  :deep().el-dialog__title {
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
  .phone-manage-img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
  // :deep(){
  //   .el-upload--picture-card{
  //     display: none;
  //   }
  // }
}
</style>
