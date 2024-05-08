<template>
  <div class="profit-recent-behavior">
    <h3 class="h3-title">风控分析</h3>
    <el-table :data="tableDataRiskAnalysis">
      <el-table-column label="行为" prop=""></el-table-column>
      <el-table-column label="内容" prop=""></el-table-column>
      <el-table-column label="风控审核" prop=""></el-table-column>
    </el-table>
    <h3 class="h3-title">近期游戏分析</h3>
    <el-table :data="tableDataRecentAnalysis">
      <el-table-column label="场馆名称" prop=""></el-table-column>
      <el-table-column label="场馆类型" prop=""></el-table-column>
      <el-table-column label="注单数" prop=""></el-table-column>
      <el-table-column label="下注金额" prop=""></el-table-column>
      <el-table-column label="输赢情况" prop=""></el-table-column>
      <el-table-column label="投注占比" prop=""></el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script setup>
const props = defineProps(["activeName","activeProfitInfo","userName"])

const queryParams = ref({
  pageNum:1,
  pageSize:10
})
const tableDataRiskAnalysis = ref([]);
const tableDataRecentAnalysis = ref([]);
const total = ref(0)
function getList(){
  console.log("近期行为",props.userName)
}

watch([()=>props.activeName,()=>props.activeProfitInfo,()=>props.userName],()=>{
  if(props.activeName==='4'&&props.activeProfitInfo==='3'&&props.userName){
    getList()
  }
})
</script>

<style lang="scss" scoped>
.profit-recent-behavior{
  .h3-title{
    font-size:16px;
    font-weight:600;
  }
}
</style>