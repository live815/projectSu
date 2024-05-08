<!-- 会员额度调整（单用户调整） -->
<template>
  <div class="app-container">
    <el-form
      :label-position="labelPosition"
      :model="queryParams"
      ref="queryRef"
      :inline="true"
    >
      <el-form-item
        :label="$t('funds.userName')"
        :placeholder="$t('funds.pleaseInput')"
        prop="userName"
        :rules="[
          {
            required: true,
            message: $t('funds.placeholderUserName'),
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('funds.pleaseInput')"
          clearable
          style="width: 300px"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        :label="$t('funds.accountBalancce')"
        :placeholder="$t('funds.pleaseInput')"
        :rules="[
          {
            required: true,
            trigger: 'change',
            message: $t('funds.pleaseCheckBalanceFirst'),
          },
        ]"
        prop="balancetNum"
      >
        <el-input
          v-model="queryParams.balancetNum"
          :placeholder="$t('funds.pleaseInput')"
          disabled
          style="width: 300px"
        >
        </el-input>
        <el-button type="primary" style="margin-left: 10px" @click="checkMemberWallet" :disabled="!queryParams.userName">查询</el-button>
      </el-form-item>
      <el-form-item
        :label="$t('funds.adjustType')"
        prop="adjustType"
        :rules="[
          {
            required: true,
            message: $t('funds.pleaseSelectAdjustType'),
            trigger: 'change',
          },
        ]"
      >
        <el-select 
          v-model="queryParams.adjustType" 
          :placeholder="$t('funds.pleaseSelect')"
          clearable
          @change="adjustTypeChange"
          style="width: 300px">
          <el-option
            v-for="dict in fund_adjust_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('funds.adjustReason')"
        prop="adjustReason"
        :rules="[
          {
            required: true,
            message: $t('funds.pleaseSelectAdjustReason'),
            trigger: 'change',
          },
        ]"
      >
        <el-select
          v-model="queryParams.adjustReason"
          :placeholder="$t('funds.pleaseSelect')"
          clearable
          style="width: 300px"
        >
          <el-option
            v-for="dict in adjustReasonList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('funds.adjustAmount')"
        :placeholder="$t('funds.pleaseInput')"
        prop="amount"
        :rules="[
          {
            required: true,
            message: $t('funds.inputAmount'),
            trigger: 'blur',
          },
          {
            pattern: /^\d+(\.\d{1,2})?$/,
            message: $t('member.pleaseInputMaxTwoNumberDecimal'),
            trigger: 'blur',
          },
          {
            validator:validReduce,trigger:'blur'
          }
        ]"
      >
        <el-input
          v-model="queryParams.amount"
          :placeholder="$t('funds.pleaseInput')"
          clearable
          style="width: 300px"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        :label="$t('funds.multiple')"
        :placeholder="$t('funds.pleaseInput')"
        prop="multiple"
        v-if="queryParams.adjustType==='0'"
        :rules="[
          {
            required: true,
            message: $t('funds.inputMultiple'),
            trigger: 'blur',
          },
          {
            pattern: /^[0-9]\d*$/,
            message: $t('funds.positiveInteger'),
            trigger: 'blur',
          }
        ]"
      >
        <el-input
          v-model="queryParams.multiple"
          :placeholder="$t('funds.pleaseInput')"
          clearable
          style="width: 300px"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        :label="$t('funds.applyReason')"
        :placeholder="$t('funds.pleaseInput')"
        prop="remark"
        :rules="[
          {
            required: true,
            message: $t('funds.inputApplyReason'),
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model="queryParams.remark"
          :rows="6"
          maxlength="500"
          :placeholder="$t('funds.pleaseInput')"
          show-word-limit
          type="textarea"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item style="margin: 30px 0px 0px 350px">
        <el-button style="width: 80px" @click="cancel">{{ $t('funds.cancel') }}</el-button>
        <el-button style="width: 80px" type="primary" @click="onSubmit"
          >{{ $t('funds.submit') }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, getCurrentInstance } from "vue";
import { addAdjustment } from "@/api/funds/adjustment/index";
import { getFundWallet } from "@/api/member/list/index";
import i18n from "@/i18n";
import usePermissionStore from "@/store/modules/permission";

const { proxy } = getCurrentInstance()
const {  fund_adjust_type } = proxy.useDict("fund_adjust_type");//资金调整类型
const { fund_adjust_add_reason } = proxy.useDict("fund_adjust_add_reason");//加额原因下拉
const { fund_adjust_reduce_reason } = proxy.useDict("fund_adjust_reduce_reason");//减额原因下拉
const queryRef = ref(null);
const queryParams = ref({
  userName: null,
  balancetNum: null,
  amount: null,
  adjustType: null,
  multiple: null,
  adjustReason: null,
  remark: null
});

const labelPosition = ref("right");

const adjustReasonList = ref([]);//调整原因下拉框

function adjustTypeChange(val){
if(val==="0"){
  adjustReasonList.value = fund_adjust_add_reason.value
}else if(val==="1"){
  adjustReasonList.value = fund_adjust_reduce_reason.value
}else{
  adjustReasonList.value = []
}
queryParams.value.adjustReason = null
queryParams.value.multiple = null
}
function checkMemberWallet(){
  getFundWallet(queryParams.value.userName).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t('funds.queryBalance'));
    queryParams.value.balancetNum = res?.memberWallet || 0
  })
}
function cancel(){
  queryRef.value.resetFields()
  queryParams.value.balancetNum = null
  adjustReasonList.value = []
}
// 提交用户调整
function onSubmit () {
  queryRef.value.validate(valid=>{
    if(valid){
      queryParams.value.multiple = queryParams.value.multiple || 0
      addAdjustment(queryParams.value).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t('funds.addedSuccessfully'));
        //单用户调整操作成功之后去刷新资金调整审核未读数
        usePermissionStore().getFundsUnreview();
        cancel()
      })
    }else{
      return 
    }
  })
};
function validReduce(rule,value,callback){
  const balance = queryParams.value.balancetNum
  const adjustAmount = queryParams.value.amount
  if((balance||balance===0) && (adjustAmount||adjustAmount===0) && (queryParams.value.adjustType === '1') && adjustAmount>balance){
    callback(new Error(i18n.global.t('funds.adjustAmountMustBelowBalance')))
  }else{
    callback()
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  border: 1px solid #f2f2f2;
  width: 683px;
  margin: 0 auto;
  padding-left: 130px;
}
</style>
