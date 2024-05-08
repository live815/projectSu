<template>
  <div class="strategy-score-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :title="$t('risk.policyScore')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
    <template v-if="ployList && ployList.length">
      <div class="withdrawl" v-for="item in ployList">
        <div class="title">{{ item.classifyTitleName }}</div>
        <div class="content" v-for="child in item.recordList" :key="child.id">
            <span class="flex-item">{{ child.ployClassifyName }}:<span class="ml-8">{{ child.conditionValue }}</span></span>
            <span class="flex-item">{{ $t('risk.score') }}:<span class="ml-8">{{ child.score }}</span></span>
            <span class="flex-item">{{ $t('risk.factValue') }}<span class="ml-8">{{ child.realValue }}</span></span>
            <el-icon v-if="child.status===0"><CircleClose /></el-icon>
            <el-icon color="rgb(149, 242, 4)" v-else ><CircleCheck /></el-icon>
        </div>
      </div>
    </template>
    <el-empty :description="$t('member.noData')" v-else />
      <div class="score">{{ $t('risk.totalScore') }}{{ score }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel" type="primary">{{ $t('risk.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue";
import { memberRelationList } from "@/api/risk/record/index";

const props = defineProps(["open", "memberId","ployId","adjustId"]);
const emit = defineEmits(["update:open"]);

const { proxy } = getCurrentInstance();
const ployList = ref([]);

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});
const score = computed(()=>{
 if(ployList.value.length===0) return 0
  return ployList.value.map(item=>item.recordList).flat().filter(item=>item.status === 1).map(item=>item.score).reduce((prev,next)=>prev+next,0)
})

onMounted(() => {
  getList();
});
function getList() {
  memberRelationList({
    memberId:props.memberId,
    ployId:props.ployId,
    adjustId:props.adjustId
  }).then(res=>{
    ployList.value = res || [];
  })
}
function cancel() {
  dialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
.strategy-score-dialog {
  :deep() {
    .el-dialog__title {
      color: #333333;
      font-weight: bold;
    }
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 0;
      border-top: 1px solid #eee;
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
  .withdrawl {
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
      .flex-item{
        flex:1;
      }
    }
  }
  .score {
      text-align: center;
      // margin-top:20px;
      line-height:40px;
    }
}
</style>
