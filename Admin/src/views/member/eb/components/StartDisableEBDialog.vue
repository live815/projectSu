<template>
  <div class="start-disable-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <template #header>
        <span class="header-title">{{ $t('member.statusUpdate') }}</span>
      </template>
      <el-form :model="queryParams" ref="queryRef" :rules="rules">
        <el-form-item :label="$t('member.cardStatus')" prop="status">
          <el-select
              v-model="queryParams.status"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="item in cardStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
        </el-form-item>
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
import { computed } from 'vue';
import { updateEBStatus } from "@/api/member/bankcard/index";

const props = defineProps(['openDia','status','cardId'])
const emit = defineEmits(['update:openDia','onfreshstatus'])

const { proxy } = getCurrentInstance();
const queryRef = ref(null)
const queryParams = ref({
  id:props.cardId,
  status:props.status === 0 ? 1:0,
  remark:null
})
const cardStatusList = ref([
  {label:i18n.global.t("member.starting"),value:0},
  {label:i18n.global.t("member.disabled"),value:1}
])
const rules = ref({
  status:[
    {
      required: true,
      message: i18n.global.t("member.pleaseSelectCardStatus"),
      trigger: 'change',
    }
  ],
  remark:[
  { min: 2, max: 50, message: i18n.global.t("member.pleaseInputTwoToFiftyCharacter"), trigger: 'blur' },
  { required: true, message: i18n.global.t("member.pleaseInputRemark"), trigger: 'blur' }
  ]
})

const dialogVisible = computed({
  get(){
    return props.openDia
  },
  set(val){
    emit('update:openDia',val)
  }
})

const cancel = ()=>{
  dialogVisible.value = false
}
const submit = ()=>{
  queryRef.value.validate(valid=>{
    if(valid){
      updateEBStatus(queryParams.value).then(res=>{
        dialogVisible.value = false

        proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
        emit("onfreshstatus")
      })
    }else{
      
    }
  })
}
</script>

<style lang="scss" scoped>
.start-disable-dialog {
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
