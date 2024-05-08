<template>
  <div class="review-config">
    <!-- 审核设置 -->
    <div class="header">
      <CommonComp :title="$t('risk.reviewSetting')" isBold="true">
        <template v-slot:right>
          <el-button
            type="primary"
            size="small"
            v-if="!isEditConfig"
            @click="isEditConfig = !isEditConfig"
            >{{ $t('risk.edit') }}</el-button
          >
          <el-button
            size="small"
            v-if="isEditConfig"
            @click="cancel"
            >{{ $t('risk.cancel') }}</el-button
          >
          <el-button type="primary" size="small" v-if="isEditConfig"
            @click="saveConfigData">{{ $t('risk.save') }}</el-button
          >
        </template>
      </CommonComp>
      <el-row>
        <el-col v-for="item in configData" :key="item.id"
          :span="spanSwitch(item)">
          <span class="mr-12">{{ item.configName }}:</span>
          <template v-if="item.configName===$t('risk.autoDispatchOrder')">
            <el-switch
              v-model="item.configValue"
              active-value="1"
              inactive-value="0"
              :disabled="!isEditConfig"
              @change="changeDistribute($event,item)"
            ></el-switch>
          </template>
          <template v-if="item.configName===$t('risk.maxDispatchOrderNum')">
            <el-input
              v-model="item.configValue"
              :placeholder="$t('risk.pleaseInput')"
              clearable
              :disabled="!isEditConfig"
              style="width: calc(100% - 113px)"
              @blur="blurValid(item.configValue)"
            ></el-input>
            <span style="color:#F56C6C;font-size:12px;margin-left:110px;" v-if="showRule">请输入正整数</span>
          </template>
          <template v-if="item.configName===$t('risk.autoReview')">
            <el-switch
              v-model="item.configValue"
              active-value="1"
              inactive-value="0"
              :disabled="!isEditConfig"
              @change="changeReview($event,item)"
            ></el-switch>
          </template>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <CommonComp :title="$t('risk.autoReviewRule')" isBold="true"></CommonComp>
      <el-row>
        <el-col :span="2" class="review-text">{{ startRule }}</el-col>
        <el-col :span="22" class="review-text">{{ startRuleContent }}</el-col>
        <el-col :span="2" class="review-text">{{ banRule }}</el-col>
        <el-col :span="22" class="review-text">{{ banRuleContent }}</el-col>
      </el-row>
    </div>
    <div class="footer">
      <CommonComp :title="$t('risk.dispatchOrderRule')" isBold="true">
        <template v-slot:right>
          <el-button type="primary" size="small" @click="addData"
            >{{ $t('risk.addRecieveOrderPerson') }}</el-button
          >
        </template>
      </CommonComp>
      <el-table :data="tableData" :empty-text="$t('member.noData')">
        <el-table-column :label="$t('member.handle')" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="editData(row)"
              >{{ $t('risk.edit') }}</el-button
            >
            <el-button type="danger" size="small" @click="delData(row)"
              >{{ $t('risk.delete') }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('risk.account')"
          prop="userName"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('risk.departmentNoQuote')"
          prop="department"
          align="center"
        >
        <template #default="{row}">
          <span>{{ row.department || "-" }}</span>
        </template>
      </el-table-column>
        <el-table-column
          :label="$t('risk.position')"
          prop="post"
          align="center"
        >
        <template #default="{row}">
          <span>{{ row.post || "-" }}</span>
        </template>
      </el-table-column>
        <el-table-column
          :label="$t('risk.nowDispatchOrderNum')"
          prop="assignNum"
          align="center"
        >
        <template #default="{row}">
          <span>{{ row.assignNum ||row.assignNum===0?row.assignNum: "-" }}</span>
        </template>
      </el-table-column>
        <el-table-column :label="$t('risk.onlineStatus')" prop="status" align="center">
          <template #default="{ row }">
            <span v-if="row.status === 1" style="color: #1890ff">{{ $t('risk.online') }}</span>
            <span v-if="row.status === 0">{{ $t('risk.offline') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('risk.dispatchOrderRule')"
          prop="assignRule"
          align="center"
        >
        <template #default="{row}">
          <template v-if="row.assignRuleNameItem && row.assignRuleNameItem.length">
            <!-- <span v-for="item in row.assignRuleNameItem">{{ item }}</span> -->
            <span>{{ row.assignRuleNameItem.join() }}</span>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <AddOrEditOrderTaker
      v-model:open="open"
      :type="type"
      :id="id"
      v-if="open"
      @onrefresh="getList"
    />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { deepCopy } from "@/utils";
import { getConfigList,eidtConfigList,getReviewPersonList,deleteReviewPerson,getBasicRules } from "@/api/risk/config/index";
import CommonComp from "./CommonComp.vue";
import AddOrEditOrderTaker from "./AddOrEditOrderTaker.vue";

const { proxy } = getCurrentInstance();

const isEditConfig = ref(false);
const startRule = ref(i18n.global.t("risk.startRules"));
const startRuleContent = ref(null);
const banRule = ref(i18n.global.t("risk.disableRules"));
const banRuleContent = ref(null);
const configData = ref([]);
const cloneData = ref([]);
const tableData = ref([]);
const type = ref(null);
const open = ref(false);
const id = ref(null);

const spanSwitch = computed(()=>{
  return (item)=>{
    if(item.configName === i18n.global.t("risk.autoDispatchOrder")){
      return 4
    }else if(item.configName === i18n.global.t("risk.maxDispatchOrderNum")){
      return 8
    }else if(item.configName === i18n.global.t("risk.autoReview")){
      return 24
    }
  }
})
const isFirstLoad = ref(true)

onMounted(async ()=>{
  await getConfigData();
  await queryBasicRules();
  if(isFirstLoad.value){
    await getList()
    isFirstLoad.value = false
  }
})
function getConfigData(){
  return getConfigList({
    configType:1
  }).then(res=>{
    configData.value = res || [];
    cloneData.value = deepCopy(res);
  })
}
function queryBasicRules(){
  return getBasicRules().then(res=>{
    startRuleContent.value = res.enableList?.join(",");
    banRuleContent.value = res.disableList?.join(",");
  })
}
function getList(){
  return getReviewPersonList({
    status:null,
    userName:null
  }).then(res=>{
    tableData.value = res || []
  })
}
function changeDistribute(val,item) {
  proxy.$modal
    .confirms(i18n.global.t("risk.sureToChangeDispathOrderStatus"), i18n.global.t("risk.tips"))
    .then(() => {
      // updateStatus(row);
    })
    .catch(() => {
      item.configValue = val === "0" ? "1" : "0";
    });
}
function changeReview(val,item) {
  proxy.$modal
    .confirms(i18n.global.t("risk.sureToChangeAutoReviewStatus"), i18n.global.t("risk.tips"))
    .then(() => {
      // updateStatus(row);
    })
    .catch(() => {
      item.configValue = val === "0" ? "1" : "0";
    });
}
function addData() {
  type.value = "add";
  open.value = true;
}
function editData(row) {
  type.value = "edit";
  open.value = true;
  id.value = row.id
}
function delData(row) {
  proxy.$modal
    .confirms(i18n.global.t("risk.sureToDelete"), i18n.global.t("risk.tips"))
    .then(() => {
      deleteReviewPerson(row.id).then(res=>{
        proxy.$modal.msgSuccess(i18n.global.t("risk.deleteSuccessfully"));
        getList();
      })
    })
    .catch(() => {});
}
function cancel(){
  configData.value = deepCopy(cloneData.value)
  showRule.value = false
  isEditConfig.value = false
}
function saveConfigData(){
  if(showRule.value) return 
  eidtConfigList(configData.value).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t("risk.editSuccessfully"));
    getConfigData();
    isEditConfig.value =  false
  })
}
const showRule = ref(false);
function blurValid(val){
  const reg = /^\d*$/
  if(reg.test(val)){
    showRule.value = false
  }else{
    showRule.value = true
  }
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getConfigData();
    await queryBasicRules();
    await getList();
  }
})
</script>

<style lang="scss" scoped>
.review-config {
  .content {
    margin-top: 20px;
    .review-text {
      line-height: 30px;
      display: flex;
      align-items: center;
      // justify-content: center;
      height:81px;
      border: 1px solid #eee;
      padding-left: 20px;
      font-size: 14px;
      &:first-child {
        color: #1890ff;
      }
    }
  }
  .footer {
    margin: 20px 0;
  }
}
</style>
