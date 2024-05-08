<template>
  <div class="similar-bet-member">
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      :title="$t('risk.similarBetMember')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
    <el-table :data="tableData" :empty-text="$t('risk.noData')">
      <el-table-column
        :label="$t('risk.orderNo')"
        align="center"
        width="260"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.orderNo || row.id">
            <div>
              <span>{{ $t('risk.betNo') }}:</span>
              <span>{{ row.id ? row.id : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('risk.thirdPartyOrderNumber') }}:</span>
              <span>{{ row.orderNo ? row.orderNo : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.userNameInformation')"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <template v-if="row.userName || row.vipLevel">
            <div>
              <span>{{ $t('risk.userName') }}</span>
              <span>{{ row.userName ? row.userName : "-" }}</span>
            </div>
            <div>
              <span>{{ $t('risk.vipLevel') }}</span>
              <span>{{ !isNaN(row.vipLevel) ? row.vipLevel : "-" }}</span>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.betAmount')"
        prop="orderAmount"
        align="center"
        width="110"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ formatNumber(row.orderAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.coinType')"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.currencyCode||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('risk.gameIdNoQuote')" align="center">
        <template #default="{row}">
          <span>{{ row.matchName||"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('risk.betTimeNoQuote')"
        align="center"
        width="240"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.betTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="cancel"
            type="primary"
            >{{ $t('risk.submit') }}</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue";
import { formatNumber } from "@/utils/index";
import { getSimilarUserOrderList } from "@/api/risk/review/index";

const props = defineProps(["open","id"]);
const emit = defineEmits(["update:open"]);

const { proxy } = getCurrentInstance()
const tableData = ref([]);

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

onMounted(()=>{
  getList()
})
function getList(){
  getSimilarUserOrderList({
    id:props.id
  }).then(res=>{
    tableData.value = res || []
  })
}
function cancel() {
  dialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
.similar-bet-member {
  :deep(){
    .el-dialog__title{
      color: #333333;
      font-weight: bold;
    }
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 0;
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>