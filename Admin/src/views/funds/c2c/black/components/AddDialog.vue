<template>
  <div class="add-recharge-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="type === 'add' ? $t('funds.add') : $t('funds.edit')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="top"
        ref="queryRef"
        :rules="rules"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('funds.userName')" prop="userName" class="full-width">
              <el-input
                v-model="queryParams.userName"
                type="textarea"
                :placeholder="$t('funds.userNameConcatWithQuote')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('funds.remarkQuote')" prop="remark" class="full-width">
              <el-input
                v-model="queryParams.remark"
                type="textarea"
                :placeholder="$t('funds.pleaseInput')"
                show-word-limit
                maxlength="100"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel" class="cancel-btn">{{ $t("funds.cancel") }}</el-button>
          <el-button type="primary" @click="submit" class="submit-btn">{{ $t("funds.submit") }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { addBlackList } from "@/api/funds/c2c/index";
const props = defineProps(["open", "type", "id","blackType"]);
const emit = defineEmits(["update:open", "onrefresh"]);

const { proxy } = getCurrentInstance();
const queryParams = ref({
  blackType: props.blackType,
  userName: null,
  remark: null,
});
const queryRef = ref(null);
const rules = ref({
  userName: [{ required: true, message: i18n.global.t("funds.placeholderUserName"), trigger: "blur" }],
  remark: [{ required: true, message: i18n.global.t("funds.pleaseInputRemark"), trigger: "blur" }],
});
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      console.log(queryParams.value);
      if (props.type === "add") {
        addBlackList(queryParams.value).then((res) => {
          dialogVisible.value = false;

          proxy.$modal.msgSuccess(i18n.global.t("funds.addedSuccessfully"));
          emit("onrefresh");
        });
      }
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.add-recharge-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
  }
}
</style>
