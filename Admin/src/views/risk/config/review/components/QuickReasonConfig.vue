<template>
  <div class="quick-reason-config">
    <!-- 快捷理由设置 -->
    <CommonComp :title="$t('risk.rejectWithdrawSetQuickReason')" isBold="true">
      <template v-slot:add>
        <span @click="addData">{{ $t('risk.increase') }}</span>
      </template>
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
    </CommonComp>
    <el-form
      v-for="(formData, index) in formList"
      :key="index"
      :model="formData"
      ref="form"
      :rules="rules"
      class="form-data"
    >
      <el-row>
        <el-col>
          <el-form-item label="" prop="configValue" class="full-width">
            <el-input
              v-model="formData.configValue"
              :placeholder="$t('risk.pleaseInput')"
              cleearable
              style="width: 20%"
              :disabled="!isEditConfig"
              @input="formData.configName = formData.configValue"
            ></el-input>
            <span
              style="color: #1890ff; cursor: pointer; margin-left: 12px"
              @click="delData(index)"
              >{{ $t('risk.delete') }}</span
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getConfigList,eidtConfigList,addQuickReason,deleteConfigList } from "@/api/risk/config/index";
import CommonComp from "./CommonComp.vue";

const { proxy } = getCurrentInstance();
const isEditConfig = ref(false);
const form = ref([]);
const formList = ref([]);
const rules = ref({
  configValue: [{ required: true, message: i18n.global.t("risk.pleaseInputQuickReason"), trigger: "blur" }
,{validator:isSameValue,trigger:"blur"}],
});
const isFirstLoad = ref(true);

onMounted(async()=>{
  if (isFirstLoad.value) {
    await getList();
    isFirstLoad.value = false;
  }
})
function getList() {
  return getConfigList({
    configType:2
  }).then(res=>{
    formList.value = res || [];
  })
}
function addData() {
  isEditConfig.value = true;
  const lastIndex = formList.value.length - 1;
  if (lastIndex >= 0) {
    form.value[lastIndex].validate((valid) => {
      if (!valid) {
        console.log("上一个表单数据未填写完毕，不允许新增");
        return; // 上一个表单数据未填写完毕，不允许新增
      }
      if (!formList.value[lastIndex].id) {
        console.log("请先保存上一条");
        return;
      }
      // 上一个表单数据已填写完毕，可以新增
      formList.value.push({
        configValue: null,
        configName:null,
        configType:2
      });
    });
  } else {
    // 第一个表单数据
    formList.value.push({
      configValue: null,
      configName:null,
      configType:2  
    });
  }
}
function delData(index) {
  proxy.$modal
    .confirms(i18n.global.t("risk.sureToDelete"),i18n.global.t("risk.tips"))
    .then(() => {
      if (formList.value[index].id) {
        deleteConfigList(formList.value[index].id).then(()=>{
          proxy.$modal.msgSuccess(i18n.global.t("risk.deleteSuccessfully"))
          getList()
        })
      } else {
        //没有保存之前的删除，即本地删除
        // form.value[index].clearValidate();
        formList.value.splice(index, 1);
      }
    })
    .catch(() => {});
}
function cancel() {
  isEditConfig.value = !isEditConfig.value;
  form.value.forEach((ref) => {
    ref.clearValidate();
    // ref.resetFields()
  });
}
function submit() {
  let count = 0;
  form.value.forEach((ref, index) => {
    ref.validate((valid) => {
      count++
      if (valid) {
          (count===formList.value.length)&&eidtConfigList(formList.value).then(res=>{
            proxy.$modal.msgSuccess("保存成功");
            getList();
            isEditConfig.value =  false
          })
      } else {
        console.log(`表单 ${index} 未通过校验`);
        return;
      }
    });
  });
}
function isSameValue(rule,value,callback){
  let newArr = formList.value.map(item=>item.configValue);
  let set = new Set(newArr);
   if(set.size !== formList.value.length){
    callback(new Error(i18n.global.t("risk.existRepeatQuickReason")));
   }else{
    callback()
   }
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.quick-reason-config {
}
</style>
