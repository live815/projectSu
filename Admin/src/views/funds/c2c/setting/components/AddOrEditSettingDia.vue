<template>
  <div class="add-or-edit-setting-dialog">
    <!-- 新增/编辑存提款占比 -->
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="type === 'add' ? $t('funds.addDepositRatio') : $t('funds.editDepositRatio')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        label-position="top"
        ref="queryRef"
        :rules="rules"
      >
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('funds.depositAmountRange')" class="full-width">
                  <el-col :span="11">
                    <el-form-item label="" prop="lastDpMin" class="full-width">
                      <el-input
                        v-model="queryParams.lastDpMin"
                        :placeholder="$t('funds.lowerLimit')"
                        clearable
                        @change="maxDpChange"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" style="text-align: center;">~</el-col>
                  <el-col :span="11">
                    <el-form-item label="" prop="lastDpMax" class="full-width">
                      <el-input
                        v-model="queryParams.lastDpMax"
                        :placeholder="$t('funds.higherLimit')"
                        clearable
                        @change="maxDpChange"
                      />
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('funds.withdrawalRatioQuote')" class="full-width">
                  <el-col :span="11">
                    <el-form-item label="" prop="wdRatioMin" class="full-width">
                      <el-input
                        v-model="queryParams.wdRatioMin"
                        :placeholder="$t('funds.pleaseInput')"
                        clearable
                        @change="maxWdChange"
                      >
                      <template #append>
                        <span>%</span>
                      </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" style="text-align: center;">~</el-col>
                  <el-col :span="11">
                    <el-form-item label="" prop="wdRatioMax" class="full-width">
                      <el-input
                        v-model="queryParams.wdRatioMax"
                        :placeholder="$t('funds.pleaseInput')"
                        clearable
                        @change="maxWdChange"
                      >
                      <template #append>
                        <span>%</span>
                      </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('funds.cancel') }}</el-button>
          <el-button type="primary" @click="submit">{{$t('funds.submit')}}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue";
import { addDwRatio,editDwRatio,getDwRatioInfo } from "@/api/funds/c2c/index";
import i18n from "@/i18n";

const props = defineProps(["open", "type","id"]);
const emit = defineEmits(["update:open", "onrefresh"]);

const { proxy } = getCurrentInstance();
const queryParams = ref({
  id: null,
  lastDpMin: null,
  lastDpMax: null,
  wdRatioMin: null,
  wdRatioMax: null
});
const rules = ref({
  lastDpMin:[{required:true,message:i18n.global.t("funds.depositAmountLowerLimit"),trigger:"blur"},
    {validator:validateMinMaxDp,trigger:"blur"},
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("funds.positiveInteger"),
      trigger: "blur",
    }],
  lastDpMax:[{required:true,message:i18n.global.t("funds.depositAmountHigherLimit"),trigger:"blur"},
    {validator:validateMinMaxDp,trigger:"blur"},
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("funds.positiveInteger"),
      trigger: "blur",
    }],
  wdRatioMin:[{required:true,message:i18n.global.t("funds.withdrawalRatioLowerLimit"),trigger:"blur"},
    {validator:validateMinMaxWd,trigger:"blur"},
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("funds.positiveInteger"),
      trigger: "blur",
    }],
  wdRatioMax:[{required:true,message:i18n.global.t("funds.withdrawalRatioHigherLimit"),trigger:"blur"},
    {validator:validateMinMaxWd,trigger:"blur"},  
    {
      pattern: /^[1-9]\d*$/,
      message: i18n.global.t("funds.positiveInteger"),
      trigger: "blur",
    }]
})
const queryRef = ref(null);
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
  getDwRatioInfo(props.id).then(res=>{
    queryParams.value = res || {}
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
        addDwRatio(queryParams.value).then(res=>{
          dialogVisible.value = false;
          
          proxy.$modal.msgSuccess(i18n.global.t("funds.addedSuccessfully"));
          emit("onrefresh")
        })
      }else{
        editDwRatio(queryParams.value).then(res=>{
          dialogVisible.value = false;
          
          proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"));
          emit("onrefresh")
        })
      }
    } else {
      return;
    }
  });
}
function maxDpChange(val){
  const min = queryParams.value.lastDpMin
  const max = queryParams.value.lastDpMax
  if(min&&max&&(max>min)){
    queryRef.value.clearValidate([`lastDpMin`,`lastDpMax`])
  }
}
function validateMinMaxDp(rule,value,callback){
  const min = queryParams.value.lastDpMin
  const max = queryParams.value.lastDpMax
  if (min  && max  && Number(min) >= Number(max)) {
        callback(new Error(i18n.global.t("funds.depositMinMax")));
      } else {
        callback();
      }
}
function maxWdChange(val){
  const min = queryParams.value.wdRatioMin
  const max = queryParams.value.wdRatioMax
  if(min&&max&&(max>min)){
    queryRef.value.clearValidate([`wdRatioMin`,`wdRatioMax`])
  }
}
function validateMinMaxWd(rule,value,callback){
  const min = queryParams.value.wdRatioMin
  const max = queryParams.value.wdRatioMax
  if (min  && max  && Number(min) >= Number(max)) {
        callback(new Error(i18n.global.t("funds.withdrawalMinMax")));
      } else {
        callback();
      }
}
</script>

<style lang="scss" scoped>
.add-or-edit-setting-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__header{
      text-align: center;
    }
    .el-dialog__body {
      padding-top: 0;
    }
  }
}
</style>
