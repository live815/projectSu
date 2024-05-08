<template>
  <div class="refuse-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('funds.refuseOutMoney')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form :model="queryParams" :rules="rules" ref="queryRef">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('funds.remarkQuote')" prop="operApplicantMark">
              <el-input
                type="textarea"
                v-model="queryParams.operApplicantMark"
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
          <el-button @click="cancel" class="common-cancel">{{ $t('funds.cancel') }}</el-button>
          <el-button type="primary" @click="submit">{{ $t('funds.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { paymentReject } from "@/api/funds/record/index";

const props = defineProps(["openRefuse","cloneRow"]);
const emit = defineEmits(["update:openRefuse","paymentRejectRefresh"]);

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  operApplicantMark: null,
});
const rules = ref({
  operApplicantMark: [{ required: true, message: i18n.global.t("funds.pleaseInputRemark"), trigger: "blur" }],
});

const dialogVisible = computed({
  get() {
    return props.openRefuse;
  },
  set(val) {
    emit("update:openRefuse", val);
  },
});

function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      paymentReject({
        ...queryParams.value,
        orderNo:props.cloneRow.orderNo
      }).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("funds.operateSuccessfully"))
        dialogVisible.value = false;
        emit("paymentRejectRefresh");
      })
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.refuse-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      // padding-top:0
    }
  }
  .common-cancel {
    background: #ffffff;
    border: 1px solid rgba(0, 121, 254, 1);
    color: #0079fe;
    font-size: 12px;
    font-weight: 600;
  }
    .el-button{
      width:80px;
      height: 30px;
    }
}
</style>
