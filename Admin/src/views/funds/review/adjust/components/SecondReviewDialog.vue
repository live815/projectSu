<template>
  <div class="second-review-success-fail-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="type==='success'||type==='multi-success'?$t('funds.reviewPass'):$t('funds.reviewReject')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
    <el-form :model="form" ref="queryRef" :rules="rules">
      <el-row>
        <el-col>
          <el-form-item :label="$t('funds.reviewRemark')" prop="remark">
              <el-input 
                type="textarea" 
                v-model="form.remark"
                maxlength="100"
                :placeholder="$t('funds.pleaseInput')"
                show-word-limit
                ></el-input>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="cancel"
            style="border-color: rgb(0, 121, 254); color: #0079fe"
            >{{ $t('funds.cancel') }}</el-button
          >
          <el-button type="primary" @click="submit"> {{ $t('funds.submit') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { updateSingleSecondReview,updateMultipleSecondReview } from "@/api/funds/review/index";
import { getCurrentInstance } from "vue";
import usePermissionStore from "@/store/modules/permission";

const props = defineProps(["open","type","cloneOrderNo","orderNos"]);
const emit = defineEmits(["update:open","onrefresh"]);

const { proxy } = getCurrentInstance()
const queryRef = ref(null)
const form = ref({
  remark:null
})
const rules = ref({
  remark:[{required:true,message:i18n.global.t("funds.pleaseInputRemark"),trigger:"blur"}]
})
const success = ref("0")
const inject = ref("1")


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
  queryRef.value.validate(valid=>{
    if(valid){
      if(props.type==='success' || props.type==='fail'){
        updateSingleSecondReview({
          optionType:props.type==='success'?success.value:inject.value,
          orderNo:props.cloneOrderNo,
          ...form.value
        }).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("funds.reviewPass"))
          usePermissionStore().getFundsUnreview();
          dialogVisible.value = false;
          emit("onrefresh")
        })
      }else{
        updateMultipleSecondReview({
          optionType:props.type==='multi-success'?success.value:inject.value,
          orderNoArr:props.orderNos,
          ...form.value
        }).then(res=>{
          if(res.failReviewList&&res.failReviewList.length===0){
            proxy.$modal.msgSuccess(i18n.global.t("funds.reviewPass"))
          }else if(res.failReviewList&&res.failReviewList.length!==0){
            let msg = res.failReviewList.join(",")
            // proxy.$modal.msgWarning(`订单号${msg}审核未通过`)
            proxy.$modal.msgWarning(i18n.global.t("funds.orderNoReviewReject",{num:msg}))
          }
          usePermissionStore().getFundsUnreview();
          dialogVisible.value = false;
          emit("onrefresh")
        })
      }
    }else{
      return 
    }
  })
}
</script>

<style lang="scss" scoped>
.second-review-success-fail-dialog {
  :deep().el-dialog__title{
    color: #333333;
    font-weight: bold;
  }
  :deep().el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>