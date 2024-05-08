<template>
  <div>
    <div class="container">
      <el-form :model="form" label-width="120px">
        <el-form-item :label="$t('operation.type')">
          <el-radio-group v-model="form.annType">
            <el-radio label="0">{{
              $t("operation.GeneralAnnouncem")
            }}</el-radio>
            <el-radio label="1">{{ $t("operation.tip31") }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('operation.logo')">
          <el-radio-group v-model="form.logo">
            <el-radio label="0">{{ $t("operation.unimport") }}</el-radio>
            <el-radio label="1">{{ $t("operation.important") }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('operation.tip32')"
          prop="shelvesTime"
          :rules="[
            {
              required: true,
              message: $t('operation.pleaseChoseTime'),
              trigger: 'blur',
            },
          ]"
        >
          <el-date-picker
            v-model="form.shelvesTime"
            type="datetime"
            :placeholder="$t('operation.pleaseChoseTime')"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item
          :label="$t('operation.tip33')"
          prop="downTime"
          :rules="[
            {
              required: true,
              message: $t('operation.pleaseChoseTime'),
              trigger: 'blur',
            },
          ]"
        >
          <el-date-picker
            v-model="form.downTime"
            type="datetime"
            :placeholder="$t('operation.pleaseChoseTime')"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item :label="$t('operation.accounttype')">
          <el-select
            v-model="form.accountType"
            :placeholder="$t('operation.tip4')"
          >
            <el-option :label="$t('operation.Allmembers')" value="0" />
            <el-option :label="$t('operation.designatmember')" value="1" />
            <el-option :label="$t('operation.Fullagentline')" value="2" />
            <el-option :label="$t('operation.tip4')" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="form.accountType == 1 || form.accountType == 3">
          <el-input
            v-model="form.accounts"
            type="textarea"
            :placeholder="$t('operation.tip34')"
          />
          <div>
            {{ $t("operation.tip35", { num: accountNum }) }}

            <span
              ><el-button
                size="small"
                type="primary"
                @click="toDeduplication"
                >{{ $t("operation.Removeduplicat") }}</el-button
              ></span
            >
          </div>
        </el-form-item>
        <el-form-item :label="$t('operation.status')">
          <el-radio-group v-model="form.status">
            <el-radio label="0">{{ $t("operation.turnOn") }}</el-radio>
            <el-radio label="1">{{ $t("operation.Disable") }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('operation.weightsort')">
          <el-input v-model="form.sortNum" type="Number" />
          <span>{{ $t("operation.tip22") }}</span>
        </el-form-item>
        <el-form-item
          :label="$t('operation.Announcemtitle')"
          prop="title"
          :rules="[
            {
              required: true,
              message: $t('operation.Announcemtitles'),
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item :label="$t('operation.AnnouncemContent')">
          <!-- <el-input v-model="form.content" type="textarea" /> -->
          <Editor v-model="editorContent" :minHeight="200"></Editor>
        </el-form-item>
        <el-form-item>
          <el-button @click="closeDialog">{{
            $t("operation.cancel")
          }}</el-button>
          <el-button type="primary" @click="toSubmit">{{
            $t("operation.sure")
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import {
  addAnnouncementApi,
  getAnnouncementApi,
  editAnnouncementApi,
} from "@/api/operation/announcement.js";
import useUserStore from "@/store/modules/user";
import { Base64, decode } from "js-base64";
import i18n from "@/i18n";

const user = useUserStore();
const props = defineProps({
  editId: {
    default: null,
  },
});
const editorContent = ref();
const form = ref({
  accountType: "0",
  accounts: "",
  content: "",
  createBy: "",
  downTime: "",
  logo: "0",
  shelvesTime: "",
  sortNum: "",
  status: "0",
  title: "",
  annType: "0",
});
// 报错提示
const errorTip = (text) => {
  ElMessage({
    type: "error",
    message: text,
  });
};
// 验证提交
const formCheck = () => {
  if (!form.value.annType) {
    errorTip(i18n.global.t("operation.tip36"));
    return false;
  }
  if (!form.value.logo) {
    errorTip(i18n.global.t("operation.tip37"));
    return false;
  }
  if (!form.value.shelvesTime) {
    errorTip(i18n.global.t("operation.tip38"));
    return false;
  }
  if (!form.value.downTime) {
    errorTip(i18n.global.t("operation.tip39"));
    return false;
  }
  if (!form.value.accountType) {
    errorTip(i18n.global.t("operation.tip40"));
    return false;
  }
  if (
    !form.value.accounts &&
    (form.value.accountType == 1 || form.value.accountType == 3)
  ) {
    errorTip(i18n.global.t("operation.tip41"));
    return false;
  }
  if (!form.value.status) {
    errorTip(i18n.global.t("operation.pleaseChoseStatus"));
    return false;
  }
  if (
    !form.value.sortNum ||
    form.value.sortNum < 0 ||
    form.value.sortNum > 255
  ) {
    errorTip(i18n.global.t("operation.tip42"));
    return false;
  }
  if (!form.value.title) {
    errorTip(i18n.global.t("operation.tip8"));
    return false;
  }
  if (!editorContent.value) {
    errorTip(i18n.global.t("operation.tip43"));
    return false;
  }
};
// 获取公告内容
const getAnnouncement = async () => {
  getAnnouncementApi(props.editId).then((res) => {
    form.value = res;
    editorContent.value = Base64.decode(form.value.content);
  });
};
// 是否编辑
onMounted(async () => {
  if (typeof props.editId === "string") {
    getAnnouncement();
  }
});
// 弹窗开关及初始化
const emit = defineEmits(["refreshList", true]);

// 提交或编辑表单
const toSubmit = async () => {
  form.value.createBy = user.name;
  if (formCheck() == false) {
    return;
  }
  console.log(Base64.encode(editorContent.value));
  form.value.content = Base64.encode(editorContent.value);
  console.log(form.value);
  if (typeof props.editId === "string") {
    editAnnouncementApi(form.value).then((res) => {
      emit("refreshList", true);
    });
  } else {
    addAnnouncementApi(form.value).then((res) => {
      emit("refreshList", true);
    });
  }
};
// 关闭弹窗不重新获取数据
const closeDialog = () => {
  emit("refreshList", false);
};

// 计算用户数量及
const accountNum = computed(() => {
  let num = 0;
  if (form.value.accounts) {
    let temp = form.value.accounts.split(/[\r\n,]+/);
    temp.forEach((item) => {
      if (item) {
        num++;
      }
    });
    return num;
  } else {
    return 0;
  }
});
// 账户去重功能
const toDeduplication = () => {
  let arr = form.value.accounts.split(/[\r\n,]+/);
  form.value.accounts = Array.from(new Set(arr)).join(",");
};
//计算vip等级
</script>
<style scoped>
.container {
  width: 900px;
  /* height: 900px; */
}
</style>
