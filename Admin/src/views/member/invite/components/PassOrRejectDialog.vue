<template>
  <div class="refuse-pass-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="titleChange"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form :model="queryParams" :rules="rules" ref="queryRef">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('funds.remarkQuote')" prop="reviewRemark">
              <el-input
                type="textarea"
                v-model="queryParams.reviewRemark"
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
import { unbindStatusFirst,unbindStatusFinal } from "@/api/member/invite/index";

const props = defineProps(["openRefuse","operateType","cloneRow"]);
const emit = defineEmits(["update:openRefuse","refresh"]);

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  reviewRemark: null,
});
const rules = ref({
  reviewRemark: [{ required: true, message: i18n.global.t("funds.pleaseInputRemark"), trigger: "blur" }],
});

const dialogVisible = computed({
  get() {
    return props.openRefuse;
  },
  set(val) {
    emit("update:openRefuse", val);
  },
});
const titleChange = computed(()=>{
  switch (props.operateType) {
    case "first-success":
      return "审核通过"
    case "second-success":
      return "审核通过"
    case "first-fail":
      return "审核拒绝"
    case "second-fail":
      return "审核拒绝"
    default:
      return "审核"
  }
})

function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      console.log(props.operateType,666,props.cloneRow)
      if(props.operateType === 'first-success'||props.operateType === 'first-fail'){
        unbindStatusFirst({
          ...queryParams.value,
          inviteName:props.cloneRow.inviteName,
          subName:props.cloneRow.subName,
          unbindStatus:props.operateType === 'first-success'?3:2
        }).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("funds.operateSuccessfully"))
          dialogVisible.value = false;
          emit("refresh");
        })
      }else if (props.operateType === 'second-success'||props.operateType === 'second-fail'){
        unbindStatusFinal({
          ...queryParams.value,
          inviteName:props.cloneRow.inviteName,
          subName:props.cloneRow.subName,
          unbindStatus:props.operateType === 'second-success'?5:4
        }).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("funds.operateSuccessfully"))
          dialogVisible.value = false;
          emit("refresh");
        })
      }
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.refuse-pass-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
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
