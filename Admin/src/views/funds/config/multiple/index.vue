<template>
  <div class="funds-config-multiple">
    <!-- 充值流水倍率设置 -->
    <CommonTitle :title="$t('funds.rechargeMultipleBateSetting')" isBold="true">
      <template v-slot:right>
        <el-button
          type="primary"
          size="small"
          v-if="!isEditConfig"
          @click="isEditConfig = !isEditConfig"
          >{{ $t('funds.edit') }}</el-button
        >
        <el-button size="small" v-if="isEditConfig" @click="cancel"
          >{{ $t('funds.cancel') }}</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="isEditConfig"
          @click="submit"
          >{{ $t('funds.save') }}</el-button
        >
      </template>
    </CommonTitle>
    <el-form :model="queryParams" ref="queryRef" :inline="true" :rules="rules">
      <el-row>
        <el-col :span="8">
          <el-form-item
            :label="$t('funds.rechargeMultipleBateSetting')"
            prop="multiple"
            class="full-width"
          >
            <el-input
              v-model="queryParams.multiple"
              :placeholder="$t('funds.pleaseInput')"
              clearable
              :disabled="!isEditConfig"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup name="Recharge-running-multiple">
import i18n from "@/i18n";
import CommonTitle from "@/components/CommonTitle/index.vue";
import { getDepositMultiple , editDepositMultiple } from "@/api/funds/config/index";
import { deepCopy } from "@/utils";

const { proxy } = getCurrentInstance();
const queryRef = ref(null);
const queryParams = ref({
  multiple:null
})
const cloneData = ref(null);
const rules = ref({
multiple:[{pattern:/^(100|\d{1,2}|0)$/,message:i18n.global.t("funds.integerRangeFromZeroToOneHundred"),trigger:"blur"}]
})
const isEditConfig = ref(false);
const isFirstLoad = ref(true);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
function getList(){
  return getDepositMultiple().then(res=>{
    queryParams.value.multiple = res 
    cloneData.value = deepCopy(res)
  })
}
function cancel(){
  queryParams.value.multiple = deepCopy(cloneData.value);
  queryRef.value.clearValidate();
  isEditConfig.value = !isEditConfig.value;
}
function submit(){
  queryRef.value.validate(valid=>{
    if(valid){
      editDepositMultiple(queryParams.value).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"));
        isEditConfig.value = false
        getList()
      })
    }else{
      return 
    }
  })
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-config-multiple {
  padding: 20px;
}
</style>
