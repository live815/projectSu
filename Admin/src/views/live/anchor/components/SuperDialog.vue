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
              :label="$t('live.Supermanagedaccount')"
              prop="userName"
              class="full-width"
            >
              <el-input
                v-model="queryParams.userName"
                class="full-width"
                maxlength="16"
                show-word-limit
                :disabled="!addShow"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.tip38')"
              prop="nickName"
              class="full-width"
            >
              <el-input
                v-model="queryParams.nickName"
                class="full-width"
                maxlength="16"
                show-word-limit
                type="text"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('live.tip39')" v-if="!addShow">
              <el-switch v-model="delivery" @change="changStatus" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.tip40')"
              prop="password"
              class="full-width"
              v-if="addShow || inputShow"
            >
              <el-input
                v-model="queryParams.password"
                class="full-width"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('live.remake')"
              prop="remark"
              class="full-width"
            >
              <el-input
                v-model="queryParams.remark"
                class="full-width"
              ></el-input>
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

          <!-- <el-form-item label="id" prop="id" class="full-width">
            <el-input v-model="queryParams.id" class="full-width"></el-input>
          </el-form-item> -->
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
import { addAdminList, editAdminList } from "@/api/live/anchor.js";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();
const props = defineProps(["open", "row", "addShow", "title"]);
const queryParams = props.row;
const queryRef = ref("");
const emit = defineEmits(["update:open", "onrefresh"]);
const delivery = ref(false);
const inputShow = ref(false);

// 超管账号校验规则
const checkuserName = (rule, value, callback) => {
  const reguserName = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;
  if (reguserName.test(value)) {
    callback();
  } else {
    callback(new Error(i18n.global.t("live.tip41")));
  }
};

// 超管密码校验规则
const checkpassword = (rule, value, callback) => {
  const reguserName = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/;
  if (reguserName.test(value)) {
    callback();
  } else {
    callback(new Error(i18n.global.t("live.tip42")));
  }
};
const rules = reactive({
  nickName: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip43") },
    {
      min: 2,
      max: 16,
      message: i18n.global.t("live.tip44"),
      trigger: "blur",
    },
  ],
  userName: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip45") },
    {
      validator: checkuserName,
      trigger: "blur",
    },
  ],
  password: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip46") },
    {
      validator: checkpassword,
      trigger: "blur",
    },
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

const cancel = () => {
  dialogVisible.value = false;
};
// 确定
const submit = () => {
  queryRef.value.validate((valid) => {
    if (valid) {
      if (props.addShow) {
        addAdminList(queryParams).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("live.tip47"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      } else if (!props.addShow) {
        editAdminList(queryParams).then((res) => {
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
</style>
