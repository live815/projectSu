<template>
  <el-form ref="pwdRef" :model="user" :rules="rules" label-width="80px">
    <el-form-item :label="$t('system.oldpassword')" prop="oldPassword">
      <el-input
        v-model="user.oldPassword"
        :placeholder="$t('system.tip90')"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item :label="$t('system.newpassword')" prop="newPassword">
      <el-input
        v-model="user.newPassword"
        :placeholder="$t('system.tip91')"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item :label="$t('system.ConfirmPassword')" prop="confirmPassword">
      <el-input
        v-model="user.confirmPassword"
        :placeholder="$t('system.tip92')"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">{{
        $t("system.save")
      }}</el-button>
      <el-button type="danger" @click="close">{{
        $t("system.close")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { updateUserPwd } from "@/api/system/user";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();

const user = reactive({
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined,
});

const equalToPassword = (rule, value, callback) => {
  if (user.newPassword !== value) {
    callback(new Error(i18n.global.t("system.tip93")));
  } else {
    callback();
  }
};
const rules = ref({
  oldPassword: [
    { required: true, message: i18n.global.t("system.tip94"), trigger: "blur" },
  ],
  newPassword: [
    { required: true, message: i18n.global.t("system.tip95"), trigger: "blur" },
    {
      min: 6,
      max: 20,
      message: i18n.global.t("system.tip96"),
      trigger: "blur",
    },
  ],
  confirmPassword: [
    { required: true, message: i18n.global.t("system.tip97"), trigger: "blur" },
    { required: true, validator: equalToPassword, trigger: "blur" },
  ],
});

/** 提交按钮 */
function submit() {
  proxy.$refs.pwdRef.validate((valid) => {
    if (valid) {
      updateUserPwd(user.oldPassword, user.newPassword).then((response) => {
        proxy.$modal.msgSuccess(i18n.global.t("system.SuccessfulModif"));
      });
    }
  });
}
/** 关闭按钮 */
function close() {
  proxy.$tab.closePage();
}
</script>
