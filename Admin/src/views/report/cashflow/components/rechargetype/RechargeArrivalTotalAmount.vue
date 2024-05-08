<template>
  <div class="recharge-arrival-total-amount">
    <div class="title">
      <span>{{$t('report.rehargeArrivalAmountTotal')}}</span>
      <span>{{ formatNumberThousand(total) }}</span>
    </div>
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('report.date')" prop="day"></el-table-column>
      <el-table-column
        v-for="(channelType, index) in tableData[0]?.channelTypeInfoList"
        :key="index"
        :label="channelType.channelTypeName"
        prop="depAmount"
        align="center"
      >
        <template #default="{ row }">
          {{ formatNumber(row.channelTypeInfoList[index].depAmount) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { formatNumber,formatNumberThousand } from "@/utils/index";
import { watch } from 'vue';

const props = defineProps(["data","total"]);

const tableData = ref([]);

watch(()=>props.data,(val)=>{
  tableData.value = val
})
</script>

<style lang="scss" scoped>
.recharge-arrival-total-amount{
  .title{
    color:#333333;
    font-size:18px;
    font-weight:600;
    margin-bottom:20px;
  }
}
</style>