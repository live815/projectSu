<template>
  <div class="warn-condition-setting">
    <el-row :gutter="20">
      <el-col :span="12">
        <CommonTitle :title="$t('risk.conditionSetting')" isBold="true">
          <template v-slot:right>
            <el-button
              type="primary"
              size="small"
              v-if="!isEditConfig"
              @click="isEditConfig = !isEditConfig"
              >{{ $t('risk.edit') }}</el-button
            >
            <el-button size="small" v-if="isEditConfig" @click="cancel"
              >{{ $t('risk.cancel') }}</el-button
            >
            <el-button
              type="primary"
              size="small"
              v-if="isEditConfig"
              @click="submit"
              >{{ $t('risk.save') }}</el-button
            >
          </template>
        </CommonTitle>
        <el-form :model="formDataCondition" ref="formCondition" :rules="rules">
          <el-table :data="formDataCondition.tableDataCondition" border>
            <el-table-column :label="$t('risk.enoughCondition')" prop="configType" align="center">
              <template #default="{row}">
                <span>{{ configChange(row.configType) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('risk.repeatUserCount')"
              prop="repeatUserCount"
              align="center"
            >
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`tableDataCondition.${$index}.repeatUserCount`"
                  :rules="rules.repeatUserCount"
                  class="error-message-tip"
                >
                  <el-input
                    v-model="row.repeatUserCount"
                    :placeholder="$t('risk.pleaseInput')"
                    clearable
                    :disabled="!isEditConfig"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('risk.riskScore')"
              prop="riskScore"
              align="center"
            >
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`tableDataCondition.${$index}.riskScore`"
                  :rules="rules.riskScore"
                  class="error-message-tip"
                >
                  <el-input
                    v-model="row.riskScore"
                    :placeholder="$t('risk.pleaseInput')"
                    clearable
                    :disabled="!isEditConfig"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getConfigInfoList,editConfigInfoUpdate } from "@/api/risk/record/index";
import CommonTitle from "@/components/CommonTitle/index.vue";
import { getCurrentInstance, onMounted } from "vue";
import { deepCopy } from "@/utils";

const { proxy } = getCurrentInstance();
const formCondition = ref(null);
const isEditConfig = ref(false); //条件配置按钮能否编辑
const formDataCondition = ref({
  tableDataCondition: [],
});
const cloneData = ref([]);
const rules = ref({
  repeatUserCount: [{ required: true, message: i18n.global.t("risk.pleaseInputRepeatUserCount"), trigger: "blur" },
  { pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }],
  riskScore: [{ required: true, message: i18n.global.t("risk.pleaseInputRepeatUserCount"), trigger: "blur" },
  { pattern:  /^\d*$/, message: i18n.global.t("risk.pleaseInputPositiveNumber"), trigger: 'blur' }]
});
const isFirstLoad = ref(true);

onMounted(async()=>{
  if(isFirstLoad.value){
    await queryConfigInfoList();
    isFirstLoad.value = false
  }
})
function queryConfigInfoList(){
  return getConfigInfoList().then(res=>{
    formDataCondition.value.tableDataCondition = res || [];
    cloneData.value = deepCopy(res);
  })
}
function cancel() {
  isEditConfig.value = !isEditConfig.value;
  formDataCondition.value.tableDataCondition = deepCopy(cloneData.value);
}
function submit() {
  formCondition.value.validate(valid=>{
    if(valid){
      console.log(formDataCondition.value.tableDataCondition)
      editConfigInfoUpdate(formDataCondition.value.tableDataCondition).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"));
        queryConfigInfoList();

        isEditConfig.value = false
      })
    }else{
      return 
    }
  })
}
function configChange(type){
  switch (type) {
        case 1:
          return i18n.global.t("risk.registerDeviceNoBeyond"); 
        case 2:
          return i18n.global.t("risk.registerIPBeyond"); 
        case 3:
          return i18n.global.t("risk.lastLoginIPBeyond"); 
        case 4:
          return i18n.global.t("risk.realNameBeyond"); 
        case 5:
          return i18n.global.t("risk.parentNameBeyond"); 
        case 6:
          return i18n.global.t("risk.lastLoginDeviceNo"); 
        default:
          return '-'; // 默认情况下，展示"-"
      }
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await queryConfigInfoList();
  }
})
</script>

<style lang="scss" scoped>
.warn-condition-setting {
  :deep() {
    .error-message-tip{
      padding-top: 16px;
    }
  }
}
</style>
