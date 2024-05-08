<template>
  <div class="adjust-running-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <template #header>
        <div class="header-title">{{ $t('member.adjustRunning') }}</div>
      </template>
      <el-form :model="queryParams" ref="queryRef" :rules="rules" label-position="top">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item
              :label="$t('member.positivePlusNegativeNumberReduce')"
              prop="auditAmount"
              class="full-width"
            >
              <el-input
                v-model="queryParams.auditAmount"
                :placeholder="$t('member.pleaseInput')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('member.remarkNoQuote')" prop="remark">
              <el-input
                v-model="queryParams.remark"
                :rows="5"
                type="textarea"
                :placeholder="$t('member.pleaseInput')"
                maxlength="300"
                show-word-limit
                resize="none"
              />
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
import { computed, getCurrentInstance, onMounted } from "vue";
import { getApplyAudit } from "@/api/member/runningdetail/index";

const props = defineProps(["open", "userName"]);
const emit = defineEmits(["update:open","onrefresh"]);
const { proxy } = getCurrentInstance()
const queryRef = ref(null)
const queryParams = ref({
  auditAmount:null,
  userName:props.userName,
});
const rules = ref({
  auditAmount: [
    {
      required: true,
      message: i18n.global.t("member.pleaseSelectCardStatus"),
      trigger: "blur",
    },
    { pattern: /^-?(?!0\d)\d+(\.\d+)?$/, message: i18n.global.t("member.pleaseInputPosivieOrUnderZeroNum"), trigger: 'blur' }
  ],
  remark: [
    { required: true, message: i18n.global.t("member.pleaseInputRemark"), trigger: "blur" },
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
const submit = () => {
  queryRef.value.validate(valid=>{
    if(valid){
      getApplyAudit(queryParams.value).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"))
        dialogVisible.value = false;
      })
    }else{
      return 
    }
  })
};
</script>

<style lang="scss" scoped>
.adjust-running-dialog {
  .header-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
}
</style>
