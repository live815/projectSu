<template>
  <div class="risk-score-detaildialog">
    <el-dialog
      v-model="dialogVisible"
      width="25%"
      :title="$t('risk.policyScore')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <p class="risk-label-title">{{ $t('risk.conditionScore') }}</p>
      <div class="condition-score" v-for="item in ployList">
        <div class="content">
          <span class="score-value">{{ filterTitle(item.configType) }}<span class="ml-8">{{ item.repeatUserCount }}</span></span>
          <span class="mr-20 score-value">{{ $t('risk.score') }}:<span class="ml-8">{{ item.riskScore }}</span></span>
          <el-icon v-if="item.status===0"><CircleClose /></el-icon>
          <el-icon color="rgb(149, 242, 4)" v-else ><CircleCheck /></el-icon>
        </div>
        <div>
          <span>{{ $t('risk.factValue') }}<span class="ml-8">{{ item.userCount }}</span></span>
        </div>
      </div>
      <div class="score">{{ $t('risk.totalScore') }}{{ cloneRow.riskScore }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel" type="primary">{{ $t('risk.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance, onMounted } from "vue";
import { getScoreDetail } from "@/api/risk/record/index";
import { memberRelationList } from "@/api/risk/record/index";

const props = defineProps(["open", "cloneRow"]);
const emit = defineEmits(["update:open"]);

const { proxy } = getCurrentInstance();
const ployList = ref([]);
const labelList = ref([]);

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

onMounted(async() => {
  await getList();
  await queryMemberRelationList();
});
function getList() {
  return getScoreDetail(props.cloneRow.userId).then(res=>{
    ployList.value = res || [];
  })
}
function queryMemberRelationList(){
  return memberRelationList({
    memberId:props.cloneRow.userId
  }).then(res=>{
    labelList.value = res || [];
  })
}
function cancel() {
  dialogVisible.value = false;
}
function filterTitle(type){
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
  }
}
</script>

<style lang="scss" scoped>
.risk-score-detaildialog {
  :deep() {
    .el-dialog__title {
      color: #333333;
      font-weight: bold;
    }
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 0;
      border-top: 1px solid #eee;
      overflow: auto;
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
  .condition-score {
    padding: 16px 20px 12px;
    border-top: 1px solid #eee;
    &:first-child{
      border-top: none;
    }
    .title {
      font-weight: 600;
      color: #333333;
    }
    .content {
      display: flex;
      margin: 12px 0;
      align-items: center;
      justify-content: space-between;
      .score-value{
        flex:1;
      }
    }
  }
  .withdrawl {
    padding: 16px 0 12px;
    margin:0 20px;
    border-top: 1px solid #eee;
    &:first-child{
      border-top: none;
    }
    .title {
      font-weight: 600;
      color: #333333;
    }
    .content {
      display: flex;
      margin: 12px 0;
      align-items: center;
      justify-content: space-between;
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .score {
      text-align: center;
      // margin-top:20px;
      line-height:40px;
    }
  .risk-label-title{
    font-size:16px;
    color:#333333;
    padding-left:20px;
    margin-bottom: 12px;
    font-weight: 600;
  }
}
</style>
