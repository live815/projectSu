<template>
  <div class="tagDetail-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="agentUserName"
        :label="$t('agent.agentAccount')"
        align="center"
      />
    </el-table>

    <pagination
      class="pag"
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getData"
      style="height: 40px"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { queryTagUsersApi } from "@/api/agent/tagConfig.js";
const props = defineProps({
  previewContent: {
    default: null,
  },
});
const queryParams = ref({
  id: "",
  pageNum: 1,
  pageSize: 10,
});
onMounted(() => {
  getData();
});
const getData = () => {
  queryParams.value.id = props.previewContent.id;
  queryTagUsersApi(queryParams.value).then((res) => {
    tableData.value = res.records;
    total.value = res.total;
  });
};

const total = ref(0);
const tableData = ref([]);
</script>

<style lang="scss" scoped>
.tagDetail-container {
  padding: 20px;
}
.pag {
  position: relative;
}
</style>
