<!-- 表格自定义的小计和总计统计 -->
<template>
  <div class="sub-and-total">
    <el-row class="total-table-row">
      <el-col class="total-table">
        <span>{{ $t('funds.subTotal') }}</span>
        <div class="num" :style="{left:numLeft?`${numLeft}px`:'695px'}">
          <div>
            <span>{{ $t('funds.rechargeAmount') }}:</span>
            <span>{{ formatNumber(subTotalRecord.totalDpAmount) }}</span>
          </div>
          <div>
            <span>{{ $t('funds.usdtNumber') }}</span>
            <span>{{ formatNumber(subTotalRecord.totalUsdtNum) }}</span>
          </div>
        </div>
        <div class="add-bonus" :style="{left:bonusLeft?`${bonusLeft}px`:'1235px'}">
          <span>{{ formatNumber(subTotalRecord.totalDpBonus) }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="total-table-row">
      <el-col class="total-table">
        <span>{{ $t('funds.total') }}</span>
        <div class="num" :style="{left:numLeft?`${numLeft}px`:'695px'}">
          <div>
            <span>{{ $t('funds.rechargeAmount') }}:</span>
            <span>{{ formatNumber(totalRecord.totalDpAmount) }}</span>
          </div>
          <div>
            <span>{{ $t('funds.usdtNumber') }}</span>
            <span>{{ formatNumber(totalRecord.totalUsdtNum) }}</span>
          </div>
        </div>
        <div class="add-bonus" :style="{left:bonusLeft?`${bonusLeft}px`:'1235px'}">
          <span>{{ formatNumber(totalRecord.totalDpBonus) }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { formatNumber } from "@/utils/index";
const props = defineProps(["subTotalRecord","totalRecord","numLeft","bonusLeft"])
</script>

<style lang="scss" scoped>
.sub-and-total {
  .total-table-row {
    border-bottom: 1px solid #eee;
    padding: 16px 0;
    .total-table {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      padding-left: 16px;
      .num {
        position: absolute;
        // left: 695px;
      }
      .add-bonus {
        position: absolute;
        // left: 1235px;
      }
    }
  }
}
</style>
