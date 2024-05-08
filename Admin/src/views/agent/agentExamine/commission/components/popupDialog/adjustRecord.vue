<template>
  <div>
    <el-table :data="formData.records">
      <el-table-column prop="type" :label="$t('agent.adjustTypeNoQuote')" width="90">
        <template #default="{ row }">
          <span> {{ row.type == 0 ? $t('agent.plusAmount') : $t('agent.reduceAmount') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" :label="$t('agent.adjustAmount')" />

      <el-table-column prop="remark" :label="$t('agent.remarkNoQuote')">
        <template #default="{ row }">
          <span> {{ row.remark == "" ? "--" : row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" :label="$t('agent.adjuster')" />
      <el-table-column prop="createTime" :label="$t('agent.adjustTime')" />
    </el-table>
    <div class="pag-container">
      <el-pagination
        background
        v-model:current-page="requestData.pageNum"
        :page-size="10"
        layout="total,prev, pager, next, jumper"
        :total="tableData.total"
        @current-change="getCommisssionAdjustList"
      />
    </div>
  </div>
</template>

<script setup>
import { getCommisssionAdjustListApi } from "@/api/agent/commission.js";
import { ref } from "vue";
const props = defineProps({
  tableData: Object,
  commissionRecordId: String,
});
onMounted(() => {
  formData.value = props.tableData;
});
const formData = ref({
  records: [],
});
// const formData = computed(() => {
//   return props.tableData.records;
// });

const requestData = ref({
  pageNum: 1,
  pageSize: 10,
});

const getCommisssionAdjustList = async () => {
  requestData.value.commissionRecordId = props.commissionRecordId;
  try {
    let res = await getCommisssionAdjustListApi(requestData.value);
    formData.value = res;
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped>
.pag-container {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>
