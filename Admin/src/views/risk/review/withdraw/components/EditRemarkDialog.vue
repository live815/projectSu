<template>
  <div class="edit-remark-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('risk.editRemark')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
    <!-- 风控审核领取 -->
      <el-form
        :model="queryParams"
        label-position="top"
        ref="queryRef"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('risk.remark')" prop="remark">
              <el-input 
                type="textarea" 
                v-model="queryParams.remark"
                maxlength="200"
                :placeholder="$t('funds.pleaseInput')"
                show-word-limit
                :rows="5"
                ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('risk.cancel') }}</el-button>
          <el-button type="primary" @click="submit">{{ $t('risk.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { updateMemberRemark } from "@/api/risk/review/index";

const props = defineProps(["open", "cloneRow",]);
const emit = defineEmits(["update:open", "onrefresh"]);

const { proxy } = getCurrentInstance();
const queryParams = ref({
  remark:props.cloneRow.remark
});
const rules = ref({
  remark: [{ required: true, message: i18n.global.t("risk.pleaseInputRemark"), trigger: "change" }],
});
const queryRef = ref(null);

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
  console.log(queryParams.value,props.orderNo,props.orderNos)
  queryRef.value.validate((valid) => {
    if (valid) {
      updateMemberRemark({
        ...queryParams.value,
        id:props.cloneRow.userId
      }).then((res) => {
        dialogVisible.value = false;

        proxy.$modal.msgSuccess(i18n.global.t("risk.operateSuccessfully"));
        emit("onrefresh");
      });
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.edit-remark-dialog {
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
