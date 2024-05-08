<template>
  <div class="add-or-edit-level-dialog">
    <!-- 新增/编辑层级 -->
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="type === 'add' ? $t('risk.addLevel') : $t('risk.editLevel')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="top"
        ref="queryRef"
        :rules="rules"
      >
        <el-tabs v-model="activeName">
          <el-tab-pane :label="$t('risk.basicSettings')" name="1">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item :label="$t('risk.levelNameQuote')" prop="layerName">
                  <el-input
                    v-model="queryParams.layerName"
                    :placeholder="$t('risk.pleaseInput')"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('risk.levelTypeQuote')" prop="layerType">
                  <el-radio-group v-model="queryParams.layerType" :disabled="type==='edit'">
                    <el-radio :label="1">{{ $t('risk.financial') }}</el-radio>
                    <el-radio :label="2">{{ $t('risk.riskControl') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('risk.remark')" prop="remark">
                  <el-input
                    type="textarea"
                    v-model="queryParams.remark"
                    maxlength="50"
                    :placeholder="$t('risk.pleaseInput')"
                    show-word-limit
                    :rows="5"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('risk.riskControlSettings')" name="2">
            <el-row class="risk-setup">
              <el-col :span="24" class="mb-24">
                <el-form-item label="" prop="riskSetupList" class="full-width">
                  <el-checkbox-group v-model="queryParams.riskSetupList" class="full-width">
                    <el-form-item :label="$t('risk.loginQuote')" class="full-width"></el-form-item>
                    <el-col>
                      <el-checkbox :label="1">{{$t('risk.loginLock')}}</el-checkbox>
                    </el-col>
                    <el-form-item :label="$t('risk.rechargeWithdraw')" class="full-width"></el-form-item>
                    <el-col>
                      <el-checkbox :label="2">{{$t('risk.rechargeWithdrawLock')}}</el-checkbox>
                      <el-checkbox :label="3">{{$t('risk.withdrawLock')}}</el-checkbox>
                    </el-col>
                    <el-form-item :label="$t('risk.game')" class="full-width"></el-form-item>
                    <el-col>
                      <el-checkbox :label="6">{{$t('risk.gameLock')}}</el-checkbox>
                    </el-col>
                    <el-form-item :label="$t('risk.eventDiscounts')" class="full-width"></el-form-item>
                    <el-col>
                      <el-checkbox :label="4">{{$t('risk.discountsLock')}}</el-checkbox>
                      <el-checkbox :label="5">{{$t('risk.rebateLock')}}</el-checkbox>
                    </el-col>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{$t('risk.cancel')}}</el-button>
          <el-button type="primary" @click="submit">{{$t('risk.submit')}}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getRiskHierarchyInfo,addRiskHierarchy,editRiskHierarchy } from "@/api/risk/level/index";
import { deepCopy } from "@/utils/index";
const props = defineProps(["open", "type","id"]);
const emit = defineEmits(["update:open", "onrefresh"]);

const { proxy } = getCurrentInstance();
const activeName = ref("1");
const queryParams = ref({
  id: null,
  layerName: null,
  layerType: null,
  remark: null,
  riskSetupList:[]
});
const layerNameClone = ref(null);
const queryRef = ref(null);
const rules = ref({
  layerType: [{ required: true, message: i18n.global.t("risk.pleaseSelectLevelType"), trigger: "change" }],
  layerName: [{ required: true, message: i18n.global.t("risk.pleaseInputLevelName"), trigger: "blur" }],
});
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

onMounted(()=>{
  props.type==='edit' && queryDetail()
})

function queryDetail(){
  getRiskHierarchyInfo(props.id).then(res=>{
    queryParams.value = res || {}
    if(queryParams.value.riskSetupList===''||queryParams.value.riskSetupList===null){
      queryParams.value.riskSetupList = []
    }
    layerNameClone.value = deepCopy(res.layerName);
  })
}
function cancel() {
  dialogVisible.value = false;
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      console.log(queryParams.value);
      if(props.type==='add'){
        addRiskHierarchy(queryParams.value).then(res=>{
          dialogVisible.value = false;
          
          proxy.$modal.msgSuccess(i18n.global.t("risk.addSuccessfully"));
          emit("onrefresh")
        })
      }else{
        layerNameClone.value === queryParams.value.layerName && delete queryParams.value.layerName
        editRiskHierarchy(queryParams.value).then(res=>{
          dialogVisible.value = false;
          
          proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"));
          emit("onrefresh")
        })
      }
    } else {
      activeName.value = "1"
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
.add-or-edit-level-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .risk-setup .el-form-item__label{
      color:#555555;
      font-size:14px;
      font-weight:400;
    }
    .risk-setup .el-checkbox{
      margin-bottom:12px;
    }
  }
}
</style>
