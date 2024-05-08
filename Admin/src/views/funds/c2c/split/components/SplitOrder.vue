<template>
  <div class="split-order-setting">
    <el-row>
      <el-col>
        <span class="common-title mr-8">{{ switchTitle }}</span>
        <el-switch
          v-model="withdrawSwitch"
          active-value="0"
          inactive-value="1"
          @change="updateStatus"
        ></el-switch>
      </el-col>
      <el-col class="mt-20">
        <span class="rule-title mr-20">{{ ruleTitle }}</span>
        <el-button type="primary" @click="addOrder">{{ $t("funds.add") }}</el-button>
      </el-col>
    </el-row>
    <el-form :model="queryParams" label-position="top" ref="queryRef" inline-message>
      <el-table :data="queryParams.tableData" class="mt-20" :empty-text="$t('member.noData')">
          <el-table-column :label="$t('funds.withdrawalAmountRange')" align="center">
            <template #default="{ row,$index }">
              <div class="withdraw-amount">
                <el-form-item :prop="'tableData.'+$index+'.wdAmountMin'"
                :rules="getRules('wdAmountMin',$index)">
                  <el-input
                    v-model="row.wdAmountMin"
                    :placeholder="$t('funds.pleaseInput')"
                    clearable
                    :disabled="!row.isEdit"
                    @change="maxChange($event,$index)"
                  ></el-input>
                </el-form-item>
                <span class="ml-8 mr-8 mb-16">-</span>
                <el-form-item :prop="'tableData.'+$index+'.wdAmountMax'"
                :rules="getRules('wdAmountMax',$index)">
                  <el-input
                    v-model="row.wdAmountMax"
                    :placeholder="$t('funds.pleaseInput')"
                    clearable
                    :disabled="!row.isEdit"
                    @change="maxChange($event,$index)"
                  ></el-input>
                </el-form-item>
              </div>
            </template>
          </el-table-column>
        <el-table-column :label="$t('funds.withdrawalSplitOrderMaxTimes')" align="center">
          <template #default="{ row,$index }">
            <el-form-item :prop="'tableData.'+$index+'.splitCount'"
            :rules="rules.splitCount">
              <el-input
                v-model="row.splitCount"
                :placeholder="$t('funds.pleaseInput')"
                clearable
                :disabled="!row.isEdit"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label="$t('funds.splitOrderAmount')" prop="splitAmt" align="center">
          <template #default="{ row,$index }">
            <el-form-item :prop="'tableData.'+$index+'.splitAmt'"
            :rules="rules.splitAmt">
              <el-select
                v-model="row.splitAmt"
                :placeholder="$t('funds.pleaseSelect')"
                multiple
                class="full-width"
                clearable
                :disabled="!row.isEdit"
              >
                <el-option
                  v-for="item in fund_c2c_split_amount"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label="$t('funds.vipLevelNoQuote')" prop="vipLevel" align="center">
          <template #default="{ row,$index }">
            <el-form-item :prop="'tableData.'+$index+'.vipLevel'"
            :rules="rules.vipLevel">
              <el-select
                v-model="row.vipLevel"
                :placeholder="$t('funds.pleaseSelect')"
                multiple
                class="full-width"
                clearable
                :disabled="!row.isEdit"
              >
                <el-option
                  v-for="item in vipLevelList"
                  :key="item.vipLevel"
                  :label="item.vipName"
                  :value="item.vipLevel"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label="$t('funds.handle')" align="center" width="200">
          <template #default="{ row,$index }">
            <el-form-item>
              <el-button
                size="small"
                v-if="row.isEdit"
                @click="cancel(row)"
                >{{ $t('funds.cancel') }}</el-button
              >
              <el-button
                class="edit-save-btn"
                size="small"
                v-if="row.isEdit"
                @click="submit(row,$index)"
                >{{ $t('funds.save') }}</el-button
              >
              <el-button
                class="edit-save-btn"
                size="small"
                @click="editOrder(row)"
                v-if="!row.isEdit"
                >{{ $t('funds.edit') }}</el-button
              >
              <el-button type="danger" size="small" @click="del(row,$index)"
                >{{ $t('funds.delete') }}</el-button
              >
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script setup>
import { getVIPList } from "@/api/funds/config/index";
import { getCurrentInstance, onMounted, proxyRefs } from "vue";
import i18n from "@/i18n";
import { getSplitSwitch,updateSplitSwitch,getSplitRule,updateSplitRule,delSplitRule,addSplitRule } from "@/api/funds/c2c/index";

const { proxy } = getCurrentInstance();
const { fund_c2c_split_amount } = proxy.useDict("fund_c2c_split_amount");
const switchTitle = ref(i18n.global.t("funds.withdrawalSplitOrderSwitch"));
const ruleTitle = ref(i18n.global.t("funds.splitOrderRuleSetting"));
const withdrawSwitch = ref("0");

const queryRef = ref([]);
const queryParams = ref({
  tableData: [],
});
const rules = ref({
  splitCount:[{required: true, message: i18n.global.t("funds.pleaseInputSpiltOrderMax"), trigger: "blur"},
    {
      pattern: /^([1-9]|[1-9]\d|100)$/,
      message: i18n.global.t("funds.integerRangeFromOneToOneHundred"),
      trigger: "blur",
    }
],
  splitAmt: [{type:'array', required: true, message: i18n.global.t("funds.pleaseSelectSplitAmount"), trigger: "change" }],
  vipLevel: [{type:'array', required: true, message: i18n.global.t("funds.pleaseVIPlevel"), trigger: "change" }],
});
const vipLevelList = ref([]);
const open = ref(false);
const id = ref(null);
const type = ref(null);
const isFirstLoad = ref(true);

onMounted(async () => {
  await querySplitSwitch();
  await queryVIP();
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
});
//查询VIP层级
function queryVIP() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
function querySplitSwitch(){
  return getSplitSwitch().then(res=>{
    withdrawSwitch.value = res
  })
}
function getList() {
  return getSplitRule().then(res=>{
    queryParams.value.tableData = res.rows || [];
    queryParams.value.tableData.forEach(item=>{
      item.vipLevel = item.vipLevel.split(',').map(item=>Number(item))
      item.splitAmt = item.splitAmt.split(',')
    })
  })
}

function submit(row,index) {
  queryRef.value.validate(valid=>{
    if(valid){
      const cloneRow = JSON.parse(JSON.stringify(row))
      cloneRow.vipLevel = cloneRow.vipLevel.join();
      cloneRow.splitAmt = cloneRow.splitAmt.join();
      if(!row.id){
        addSplitRule(cloneRow).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("funds.addedSuccessfully"));
          getList();
          row.isEdit = false
        })
      }else{
        updateSplitRule(cloneRow).then(res=>{
          proxy.$modal.msgSuccess(i18n.global.t("funds.editSuccessfully"));
          getList();
          row.isEdit = false
        })
      }
    }else{
      return 
    }
  })
  
}
function addOrder() {
  // type.value = "add";
  // open.value = true;
  //未保存数据包括已经新增一条但没保存,或者点了编辑但没保存
  const length = queryParams.value.tableData.filter(item=>!item.id).length
  const isEdit =  queryParams.value.tableData.some(item=>item.isEdit);
  if(isEdit){
    proxy.$modal.msgWarning(i18n.global.t("funds.unprocessedData"));
    return 
  }
  if(length<=0){
      queryParams.value.tableData.push({
        id: null,
        wdAmountMin: null,
        wdAmountMax: null,
        splitCount: null,
        splitAmt: [],
        vipLevel: [],
        isEdit: true,
    })
  }else{
    proxy.$modal.msgWarning(i18n.global.t("funds.unprocessedData"));
    return
  }
}
function editOrder(row) {
  // type.value = "edit";
  // id.value = row.id;
  // open.value = true;
  let isEdit =  queryParams.value.tableData.some(item=>item.isEdit);
  if(isEdit){
    proxy.$modal.msgWarning(i18n.global.t("funds.unprocessedData"));
  }else{
    row.originData = JSON.parse(JSON.stringify(row));
    row.isEdit = true
  }
}
function cancel(row){
if(row.originData){
  for(const key in row.originData){
    row[key] = row.originData[key]
  }
  queryRef.value.clearValidate()
  row.isEdit = false
}else{
    queryRef.value.resetFields()
}
}
function del(row,index) {
  if(!row.id){
    queryParams.value.tableData.splice(index,1)
  }else{
    delSplitRule(row.id).then(res=>{
      proxy.$modal.msgSuccess(i18n.global.t("funds.deleteSuccessfully"));
      getList();
    })
  }
}
function getRules(field,index){
  return [
        { 
          validator: (rule, value, callback) => {
            // 自定义校验逻辑

            const valid = queryParams.value.tableData.findIndex((item,i)=>i===index&&item.wdAmountMin&&item.wdAmountMax&& Number(item.wdAmountMin) >= Number(item.wdAmountMax))
            if (valid > -1) {
              callback(new Error(i18n.global.t("funds.maxMustBeyondMin")));
            } else {
              callback();
            }
          },
          trigger: 'blur',
        },
        { required: true, message: i18n.global.t("funds.pleaseInputWithdrawalAmount"), trigger: "blur" },
        {
          pattern: /^[1-9]\d*$/,
          message: i18n.global.t("funds.positiveInteger"),
          trigger: "blur",
        }
      ];
}
function maxChange(val,index){
  const rowMin = queryParams.value.tableData[index].wdAmountMin
  const rowMax = queryParams.value.tableData[index].wdAmountMax
  if(rowMin&&rowMax&&(rowMax>=rowMin)){
    queryRef.value.clearValidate(`tableData.${index}.wdAmountMin`)
    queryRef.value.clearValidate(`tableData.${index}.wdAmountMax`)
  }
}
function updateStatus(value){
  updateSplitSwitch({
    status:value
  }).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t("funds.updateStatusSuccessfully"));
    querySplitSwitch();
  })
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await querySplitSwitch();
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.split-order-setting {
  .common-title {
    font-size: 13px;
    color: #333333;
  }
  .rule-title {
    font-size: 14px;
    color: #333333;
    font-weight: 600;
  }
  .edit-save-btn {
    background: #004f24;
    color: #fff;
  }
  .withdraw-amount {
    display: flex;
    // align-items: center;
  }
}
</style>
