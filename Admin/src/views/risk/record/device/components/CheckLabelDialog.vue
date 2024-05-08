<template>
  <div class="check-label-detail-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      :title="$t('risk.labelDetail')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-table :data="tableData" :empty-text="$t('member.noData')">
        <el-table-column
          :label="$t('member.labelNameNoQuote')"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template #default="{ row }">
            <span>{{ row.orderRelno ? row.orderRelno : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('agent.addTimeNoQuote')"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template #default="{ row }">
            <span>{{ row.arrivalTime ? row.arrivalTime : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('agent.addAPersonNoQuote')"
          prop="amount"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template #default="{ row }">
            <span>{{
              !isNaN(row.amount) && (row.amount || row.amount !== 0)
                ? row.amount.toFixed(2)
                : "-"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('member.remarkNoQuote')"
          align="center"
        >
          <template #default="{ row }">
            <span>{{ row.orderRelno ? row.orderRelno : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('funds.labelNoQuote')"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template #default="{ row }">
            <span>{{ row.gameId }}</span>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel" type="primary">{{ $t('member.cancel') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue";
const props = defineProps(["open", "id"]);
const emit = defineEmits(["update:open"]);

const { proxy } = getCurrentInstance();
const tableData = ref([]);

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

onMounted(() => {
  getList();
});
function getList() {}
function cancel() {
  dialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
.check-label-detail-dialog {
  :deep() {
    .el-dialog__title {
      color: #333333;
      font-weight: bold;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .el-dialog__footer{
      text-align: center;
    }
  }
}
</style>
