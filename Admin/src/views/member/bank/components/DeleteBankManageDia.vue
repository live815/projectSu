<template>
  <div class="delete-bank-manage-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <template #header>
        <span class="header-title">{{ $t('member.unbind') }}</span>
      </template>
      <el-form :model="queryParams" ref="queryRef" :rules="rules">
        <el-form-item :label="$t('member.remark')" prop="remark">
          <el-input
            v-model="queryParams.remark"
            :rows="3"
            type="textarea"
            :placeholder="$t('member.pleaseInput')"
            maxlength="50"
            show-word-limit
            resize="none"
          />
          <!-- <span>卡片状态变更为禁用后，将解除银行卡与会员的绑定关系</span> -->
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('member.cancel') }}</el-button>
          <el-button type="primary" @click="submit">
            {{ $t('member.submit') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, getCurrentInstance } from 'vue';
import { delBankcard } from "@/api/member/bankcard/index";

const props = defineProps(['openDelete','delId'])
const emit = defineEmits(['update:openDelete','onfreshdelete'])

const { proxy } = getCurrentInstance();
const queryRef = ref(null)
const queryParams = ref({
  id:props.delId,
  remark:null
})
const rules = ref({
  remark:[
  { min: 2, max: 50, message: i18n.global.t("member.pleaseInputTwoToFiftyCharacter"), trigger: 'blur' },
  { required: true, message: i18n.global.t("member.pleaseInputRemark"), trigger: 'blur' }
  ]
})

const dialogVisible = computed({
  get(){
    return props.openDelete
  },
  set(val){
    emit('update:openDelete',val)
  }
})

const cancel = ()=>{
  dialogVisible.value = false
}
const submit = ()=>{
  queryRef.value.validate(valid=>{
    if(valid){
      delBankcard(queryParams.value).then(res=>{
        dialogVisible.value = false

        proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
        emit("onfreshdelete")
      })
    }else{
      
    }
  })
}
</script>

<style lang="scss" scoped>
.delete-bank-manage-dialog {
  .header-title{
    font-size: 16px;
    font-weight: 600;
    color: rgba(0,0,0, 0.85);
  }
  .dialog-footer{
    display: flex;
    justify-content: center;
  }
}
</style>
