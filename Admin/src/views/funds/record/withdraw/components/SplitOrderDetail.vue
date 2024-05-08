<template>
  <div class="split-order-detail-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :title="$t('funds.splitOrderDetail')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form :model="queryParams" ref="queryRef">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('funds.motherOrderInformation')" prop="motherOrderInfo">
              <el-table :data="queryParams.motherOrderInfo" border>
                <el-table-column :label="$t('funds.motherOrder')" prop="motherOrder" align="center"></el-table-column>
                <el-table-column :label="$t('funds.splitOrderTotalAmount')" prop="total" align="center">
                  <template #default="{ row }">
                    <span>{{ formatNumber(row.total) }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('funds.childOrderInformation')" prop="childOrderInfo">
              <el-table :data="queryParams.childOrderInfo" border>
                <el-table-column :label="$t('funds.childOrder')" prop="orderNo" align="center"></el-table-column>
                <el-table-column :label="$t('funds.childAmount')" prop="amount" align="center">
                  <template #default="{ row }">
                    <span>{{ formatNumber(row.amount) }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('funds.orderStatusNoQuote')" prop="status" align="center">
                  <template #default="{ row }">
                    <span :class="colorChange(row.status)">{{ filterLabel(dataStatusAll,row.status) }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="cancel">{{ $t('funds.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getSplitOrderInfo } from "@/api/funds/record/index";
import { formatNumber,filterLabel } from "@/utils";
import { dataStatusAll,colorChange } from "../common";

const props = defineProps(["openSplitOrder","cloneRow"]);
const emit = defineEmits(["update:openSplitOrder"]);

const queryRef = ref(null);
const queryParams = ref({
  motherOrderInfo: [],
  childOrderInfo: []
});

const dialogVisible = computed({
  get() {
    return props.openSplitOrder;
  },
  set(val) {
    emit("update:openSplitOrder", val);
  },
});

querySplitOrderInfo();
function querySplitOrderInfo(){
  getSplitOrderInfo(props.cloneRow.orderNo).then(res=>{
    queryParams.value.childOrderInfo = res.subOrderStatusList || [];
    queryParams.value.motherOrderInfo.push({
      motherOrder:res.orderNo,
      total:res.amount
    })
  })
}

function cancel() {
  dialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
.split-order-detail-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      // padding-top:0
    }
  }
  .common-cancel {
    background: #ffffff;
    border: 1px solid rgba(0, 121, 254, 1);
    color: #0079fe;
    font-size: 12px;
    font-weight: 600;
  }
    .el-button{
      width:80px;
      height: 30px;
    }
}
</style>
