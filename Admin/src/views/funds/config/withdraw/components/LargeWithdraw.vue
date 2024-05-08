<template>
  <div class="funds-config-large-withdraw">
    <div class="header">
      <div class="left">
        <span class="bar-chart"></span>
        <span class="title">{{ $t('funds.largeWithdrawalSetting') }}</span>
      </div>
      <div class="right">
        <el-button
          size="small"
          type="primary"
          v-if="reserveType === 'info'"
          @click="editTable"
          >{{ $t('funds.edit') }}</el-button
        >
        <el-button
          size="small"
          type="primary"
          v-if="reserveType === 'edit'"
          @click="saveRecharge"
          >{{ $t('funds.save') }}</el-button
        >
        <el-button
          size="small"
          type="primary"
          v-if="reserveType === 'edit'"
          @click="cancelRecharge"
          >{{ $t('funds.cancel') }}</el-button
        >
      </div>
    </div>
    <el-form :model="formData" ref="form" :rules="rules">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('funds.largeWithdrawRatio')" prop="largeWithdrawRatio">
            <el-input v-model="formData.largeWithdrawRatio" 
              clearable
              :placeholder="$t('funds.pleaseInput')"
              :disabled="reserveType==='info'">
              <template #append>%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item :label="$t('funds.sportRunningsGiftsSetting')" required>
            <el-button type="primary" size="small" @click="addSportRecord">{{$t('funds.add')}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-for="(item,index) in formData.sportConfig" :span="14" :key="index" class="flex-input-btn">
          <el-form-item :label="$t('funds.weeklyTotalBetAtLeast')"
          :prop="'sportConfig.' + index + '.weeklyTotalBet'"
          :rules="getSportRules(index)"
          class="full-width">
            <el-input v-model="item.weeklyTotalBet" maxlength="10" clearable :placeholder="$t('funds.pleaseInput')" :disabled="reserveType==='info'">
              <template #append>{{$t('funds.freeTime')}}</template>
            </el-input>
          </el-form-item>
          <el-button type="danger" size="small" style="margin-left:12px;" @click="deleteItemSport(index)">{{ $t('funds.delete') }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item :label="$t('funds.entertainRunningGiftSetting')" required>
            <el-button type="primary" size="small" @click="addEntertainmentRecord">{{$t('funds.add')}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-for="(item,index) in formData.entertainmentConfig" :span="14" :key="index" class="flex-input-btn">
          <el-form-item :label="$t('funds.weeklyTotalBetAtLeast')"
           :prop="'entertainmentConfig.' + index + '.weeklyTotalBet'"
           :rules="getEntertainRules(index)"
            class="full-width input-delete-btn">
            <el-input v-model="item.weeklyTotalBet" clearable :placeholder="$t('funds.pleaseInput')" 
            :disabled="reserveType==='info'"
            maxlength="10"
            >
              <template #append>{{ $t('funds.freeTime') }}</template>
            </el-input>
          </el-form-item>
          <el-button type="danger" size="small" style="margin-left:12px;" @click="deleteItemEntertainment(index)">{{ $t('funds.delete') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getLargewdList,savelargewdList } from "@/api/funds/config/index"

const { proxy } = getCurrentInstance();
const form = ref(null)
const reserveType = ref("info");
const formData = ref({
  tenantId:null,
  largeWithdrawRatio: null,
  sportConfig:[],
  entertainmentConfig:[]
});
const cloneData = ref({})
const rules = ref({
  largeWithdrawRatio:[{required:true,message:i18n.global.t("funds.feeCannotBeEmpty"),trigger:"blur"},
    {
      pattern: /^\d+(\.\d{1})?$/,
      message: i18n.global.t("funds.MaxTwoNumberAndOneDecimal"),
      trigger: 'blur',
    }],
})
const isFirstLoad = ref(true);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
})
function getList(){
  return getLargewdList().then(res=>{
    res&&(formData.value = res)
    formData.value.sportConfig = res.list.filter(item=>item.setType==='0')||[]
    formData.value.entertainmentConfig = res.list.filter(item=>item.setType==='1')||[]
    cloneData.value = JSON.parse(JSON.stringify(formData.value))
  })
}
function addSportRecord(){
  reserveType.value = "edit";
  formData.value.sportConfig.push({
    weeklyTotalBet:null,
    setType:'0'
  })
}
function deleteItemSport(index){
  reserveType.value = "edit";
  formData.value.sportConfig.splice(index,1)
}
function addEntertainmentRecord(){
  reserveType.value = "edit";
  formData.value.entertainmentConfig.push({
    weeklyTotalBet:null,
    setType:'1'
  })
}
function deleteItemEntertainment(index){
  reserveType.value = "edit";
  formData.value.entertainmentConfig.splice(index,1)
}
function editTable() {
  reserveType.value = "edit";
}
function saveRecharge() {
  form.value.validate(valid=>{
    if(valid){
      savelargewdList({
        tenantId:formData.value.tenantId,
        largeWithdrawRatio:formData.value.largeWithdrawRatio,
        list:[...formData.value.sportConfig,...formData.value.entertainmentConfig]
      }).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"));
        getList()
        reserveType.value = "info";
      })
    }else{
      return
    }
  })
}
function cancelRecharge() {
  form.value.resetFields()
  formData.value = JSON.parse(JSON.stringify(cloneData.value))
  reserveType.value = "info";
}
function getSportRules(index){
  return [
        { 
          validator: (rule, value, callback) => {
            // 自定义校验逻辑
            const valid = formData.value.sportConfig.findIndex((item,i)=>index!==0&&i===index&&item.weeklyTotalBet&& Number(formData.value.sportConfig[index].weeklyTotalBet) <= Number(formData.value.sportConfig[index-1].weeklyTotalBet))
            if (valid > -1) {
              callback(new Error(i18n.global.t("funds.weeklyTotalBetMustMoreAndMore")));
            } else {
              callback();
            }
          },
          trigger: 'blur',
        },
        {
          required:true,
          pattern: /^\d{1,10}$/,
          message: i18n.global.t("funds.tenPositiveInteger"),
          trigger: 'blur',
        }
  ]
}
function getEntertainRules(index){
  return [
        { 
          validator: (rule, value, callback) => {
            // 自定义校验逻辑
            const valid = formData.value.entertainmentConfig.findIndex((item,i)=>index!==0&&i===index&&item.weeklyTotalBet&& Number(formData.value.entertainmentConfig[index].weeklyTotalBet) <= Number(formData.value.entertainmentConfig[index-1].weeklyTotalBet))
            if (valid > -1) {
              callback(new Error(i18n.global.t("funds.weeklyTotalBetMustMoreAndMore")));
            } else {
              callback();
            }
          },
          trigger: 'blur',
        },
        {
          required:true,
          pattern: /^\d{1,10}$/,
          message: i18n.global.t("funds.tenPositiveInteger"),
          trigger: 'blur',
        }
  ]
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.funds-config-large-withdraw {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .left {
      display: flex;
      align-items: center;
      .bar-chart {
        display: inline-block;
        width: 15px;
        height: 21px;
        background: #1890ff;
      }
      .title {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
        margin-left: 4px;
      }
    }
  }
  h3{
    font-size:15px;
    color:#333333;
    font-weight: 600;
  }
  .flex-input-btn{
    display:flex;
    align-items: baseline;
  }
}
</style>
