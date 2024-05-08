<template>
  <div class="app-container">
    <!-- 表格内容 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        :label="$t('operation.Pushevents')"
        prop="date"
        width="350"
      />
      <el-table-column
        prop="name"
        :label="$t('operation.Notificattitle')"
        width="350"
      />
      <el-table-column
        prop="name"
        :label="$t('operation.Notificatcontent')"
        width="350"
      />
      <el-table-column
        prop="name"
        :label="$t('operation.pushstatus')"
        sortable
        width="350"
      />
      <el-table-column
        prop="name"
        :label="$t('operation.operate')"
        width="350"
      />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
});
const total = ref(5);
const getList = () => {};

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  // proxy.resetForm("queryRef");
  // resetQuery();
}

const tableData = [];
</script>

<style scoped></style>
