<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item :label="$t('operation.VenueType')" v-if="letterType == 2">
        <el-radio-group v-model="form.gameType">
          <el-radio label="0">{{ $t("operation.Csports") }}</el-radio>
          <el-radio label="1">{{ $t("operation.FBsports") }}</el-radio>
          <el-radio label="2">{{ $t("operation.DBsports") }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('operation.sendTime')">
        <el-date-picker
          v-model="form.sendTime"
          type="datetime"
          :placeholder="$t('operation.pleaseChoseTime')"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item :label="$t('operation.tip28')">
        <el-checkbox
          v-for="(item, index) in vipOpt"
          :key="index"
          :label="item.label"
          v-model="item.value"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkAllVipLevel">{{
          $t("operation.pick_all_vip")
        }}</el-button>
      </el-form-item>
      <el-form-item :label="$t('operation.accounttype')">
        <el-radio-group v-model="form.accountType">
          <el-radio label="0">{{ $t("operation.Allmembers") }}</el-radio>
          <el-radio label="1">{{ $t("operation.designatmember") }}</el-radio>
          <el-radio label="2">{{ $t("operation.tip3") }}</el-radio>
          <el-radio label="3">{{ $t("operation.tip4") }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="form.accountType == 1 || form.accountType == 3">
        <!-- 输入账户-->
        <el-input
          :rows="5"
          v-model="form.accounts"
          type="textarea"
          :placeholder="$t('operation.tip45')"
        />
        <div>
          {{ $t("operation.tip35", { num: accountNum }) }}

          <span
            ><el-button size="small" type="primary" @click="toDeduplication">{{
              $t("operation.Removeduplicat")
            }}</el-button></span
          >
        </div>
      </el-form-item>
      <el-form-item :label="$t('operation.title')">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item :label="$t('operation.content')">
        <Editor v-model="editorContent" :minHeight="200"></Editor>
      </el-form-item>
      <el-form-item>
        <el-button @click="refreshList">{{ $t("operation.cancel") }}</el-button>
        <el-button type="primary" @click="toSubmit">{{
          $t("operation.sure")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { addLetterListApi } from "@/api/operation/announcement.js";
import useUserStore from "@/store/modules/user";
import { Base64 } from "js-base64";
import i18n from "@/i18n";

const user = useUserStore();
const props = defineProps({
  letterType: {
    type: Number,
    default: false,
  },
});
const editorContent = ref();
const emit = defineEmits(["refreshList"]);
const form = ref({
  accountType: "0",
  accounts: "",
  content: "",
  gameType: "",
  letType: "",
  level: "",
  sendTime: "",
  title: "",
});

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
const level = computed(() => {
  let temp = [];
  vipOpt.value.forEach((item) => {
    if (item.value) {
      temp.push(item.label);
    }
  });
  return temp.join(",");
});
const vipOpt = ref([
  {
    label: "VIP0",
    value: false,
  },
  {
    label: "VIP1",
    value: false,
  },
  {
    label: "VIP2",
    value: false,
  },
  {
    label: "VIP3",
    value: false,
  },
  {
    label: "VIP4",
    value: false,
  },
  {
    label: "VIP5",
    value: false,
  },
  {
    label: "VIP6",
    value: false,
  },
  {
    label: "VIP7",
    value: false,
  },
  {
    label: "VIP8",
    value: false,
  },
  {
    label: "VIP9",
    value: false,
  },
  {
    label: "VIP10",
    value: false,
  },
  {
    label: "VIP11",
    value: false,
  },
]);
// 全选vip
const checkAllVipLevel = () => {
  vipOpt.value.forEach((item) => {
    item.value = true;
  });
};
// 报错提示
const errorTip = (text) => {
  ElMessage({
    type: "error",
    message: text,
  });
};
// 提交校验
const formCheck = () => {
  if (!form.value.sendTime) {
    errorTip(i18n.global.t("operation.tip46"));
    return false;
  }
  if (!form.value.level) {
    errorTip(i18n.global.t("operation.tip47"));
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
  if (!form.value.title) {
    errorTip(i18n.global.t("operation.tip8"));
    return false;
  }
  if (!form.value.content) {
    errorTip(i18n.global.t("operation.tip48"));
    return false;
  }
};
// 提交
const toSubmit = async () => {
  form.value.level = level;
  form.value.letType = props.letterType;
  form.value.createBy = user.name;
  form.value.content = Base64.encode(editorContent.value);
  if (formCheck() == false) {
    console.log("没过");
    return;
  }
  let arr = form.value.accounts.split(/[\r\n,]+/);
  if (new Set(arr).size !== arr.length) {
    ElMessage({
      type: "error",
      message: i18n.global.t("operation.tip49"),
    });
    return;
  }
  await addLetterListApi(form.value)
    .then((res) => {
      refreshList();
    })
    .catch((rej) => {
      console.log(rej);
      return;
    });
};

// 关闭弹窗重新获取数据
const refreshList = () => {
  emit("refreshList");
};
</script>

<style lang="scss" scoped></style>
