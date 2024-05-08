<template>
  <div class="recharge-store-arrival">
    <div class="title">
      <span>{{$t('report.rehargeArrivalAmountTotal')}}</span>
      <span>{{ formatNumberThousand(total) }}</span>
    </div>
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('report.date')" prop="day" align="center"></el-table-column>
      <el-table-column :label="$t('report.allChannels')" align="center">
        <el-table-column :label="$t('report.depositCount')" prop="depCount" align="center"></el-table-column>
        <el-table-column :label="$t('report.depositAmount')" prop="depAmount" align="center" >
          <template #default="{ row, $index }">
            {{ formatNumber(row.depAmount) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        v-for="(channelType, index) in tableData[0]?.channelTypeInfoList"
        :key="index"
        :label="channelType.mchName"
        align="center"
      >
        <el-table-column :label="$t('report.depositCount')" :prop="`channelTypeInfoList.${index}.depCount`" align="center">
        
        </el-table-column>
        <el-table-column :label="$t('report.depositCountPercent')" :prop="`channelTypeInfoList.${index}.depCountPer`" align="center">
          <template #default="{ row, $index }">
            {{ formatDataPercent(row.channelTypeInfoList[index]?.depCountPer) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('report.depositAmount')" :prop="`channelTypeInfoList.${index}.depAmount`" align="center">
          <template #default="{ row, $index }">
            {{ formatNumber(row.channelTypeInfoList[index]?.depAmount) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('report.depositAmountPercent')" :prop="`channelTypeInfoList.${index}.depAmountPer`" align="center">
          <template #default="{ row, $index }">
            {{ formatDataPercent(row.channelTypeInfoList[index]?.depAmountPer) }}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { formatDataPercent,formatNumber,formatNumberThousand } from "@/utils/index";
import { watch } from 'vue';

const props = defineProps(["data","total"]);

const tableData = ref([]);

watch(()=>props.data,(val)=>{
  tableData.value = val
})
</script>

<style lang="scss" scoped>
.recharge-store-arrival{
  .title{
    color:#333333;
    font-size:18px;
    font-weight:600;
    margin-bottom:20px;
  }
}
</style>