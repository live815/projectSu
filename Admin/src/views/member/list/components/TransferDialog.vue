<template>
  <div class="transfer-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <template #header>
        <span style="font-weight:600">{{$t('member.transferInFromCenterWallet',{num:cloneRow.lobbyName})}}</span>
      </template>
      <el-form :model="queryParams" :rules="rules" ref="queryRef" label-position="top">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('member.transferInAmount')" prop="transferInAmount">
              <el-input
                v-model="queryParams.transferInAmount"
                :placeholder="$t('member.pleaseInputTransferInAmount')"
                clearable
                :disabled="totalWallet==0"
              ></el-input>
            </el-form-item>
            <span v-if="totalWallet==0" class="tips">{{ $t('member.balanceIsZero') }}</span>
            <span v-else  class="tips">{{ $t('member.cannotBeyondMainAccountBalanceL') }}</span>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel" class="common-cancel">{{ $t('member.cancel') }}</el-button>
          <el-button type="primary" @click="submit" v-if="totalWallet!=0">{{ $t('member.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { transferIn } from "@/api/member/list/index";

const props = defineProps(["openTransfer","cloneRow","totalWallet"]);
const emit = defineEmits(["update:openTransfer","onrefresh"]);
const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  transferInAmount: null,
});
const rules = ref({
  transferInAmount: [
    { required: true, message: i18n.global.t("member.pleaseInputTransferInAmount"), trigger: "blur" },
    {pattern:/^\d+(\.\d{1,2})?$/,message:i18n.global.t("member.pleaseInputMaxTwoNumberDecimal"),trigger:"blur"},
    { required: true, validator: validateMoney, trigger: "blur" }
  ]
});

const dialogVisible = computed({
  get() {
    return props.openTransfer;
  },
  set(val) {
    emit("update:openTransfer", val);
  },
});

function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      transferIn({
        transferInAmount:Number(queryParams.value.transferInAmount),
        lobbyCode:props.cloneRow.lobbyCode,
        userName:props.cloneRow.memberName
      }).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"))
        dialogVisible.value = false;
        emit("onrefresh")
      })
    } else {
      return;
    }
  });
}
function validateMoney(rule, value, callback){
  if (Number(value) > Number(props.totalWallet)) {
    callback(new Error(i18n.global.t("member.transferInAmountCannotBeyondMainAccountBalance")));
  } else {
    callback();
  }
}
</script>

<style lang="scss" scoped>
.transfer-dialog {
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
  .tips{
    color:rgba(217,027,0.65);
    font-size:12px;
  }
}
</style>
