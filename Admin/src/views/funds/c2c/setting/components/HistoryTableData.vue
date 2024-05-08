<template>
  <div class="history-table-data">
    <h3 class="title">{{ title }}</h3>
    <el-table :data="tableData" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('funds.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.operator')"
        prop="operator"
        align="center"
        :show-overflow-tooltip="true"
      >
      <template #default="{row}">
        <span>{{ row.operator }}</span>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.operContent')"
        prop="operContent"
        align="center"
        :show-overflow-tooltip="true"
      >
      <template #default="{row}">
        <span>{{ row.operContent }}</span>
      </template>
      </el-table-column>
      <el-table-column
        :label="$t('funds.operTime')"
        prop="operTime"
        align="center"
        :show-overflow-tooltip="true"
      >
      <template #default="{row}">
        <span>{{ row.operTime }}</span>
      </template>
      </el-table-column>
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
import { onMounted } from 'vue';
import { getConfigLogList } from "@/api/funds/c2c/index";
import i18n from "@/i18n";

const title = ref(i18n.global.t("funds.historyRecord"));
const queryParams = ref({
  pageNum:1,
  pageSize:10
});
const total = ref(0);
const tableData = ref([]);

onMounted(async()=>{
  await getList();
})
function getList(){
  return getConfigLogList(queryParams.value).then(res=>{
    tableData.value = res.rows || [] ;
    total.value = res.total || 0;
  })
}
defineExpose({
  getList
})
</script>

<style lang="scss" scoped>
.history-table-data{
  margin-top:40px;
  .title{
    font-size: 14px;
    color:#333333;
    font-weight: 600;
  }
}
</style>