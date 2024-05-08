<template>
  <div class="agent-line-details">
    <el-form :model="formInline" :inline="true">
      <el-form-item :label="$t('operation.Agentaccount1')">
        <el-input
          v-model="formInline.searchKeyword"
          class="w-50 m-2"
          :placeholder="$t('operation.pleaseEnter')"
          :suffix-icon="Search"
          style="width: 300px" />
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" type="primary" @click="onSubmit">{{
          $t('operation.search')
        }}</el-button>
        <!-- <el-button icon="Refresh" @click="resetQuery">重置</el-button> -->
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableDataList" style="width: 100%">
      <el-table-column prop="id" :label="$t('operation.Number')" width="380" align="center" />
      <el-table-column
        prop="value"
        :label="$t('operation.Agentaccount')"
        width="380"
        align="center" />
    </el-table>
    <pagination
      v-show="queryParams.total > 0"
      :total="queryParams.total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="loadData"
      class="pagination" />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getConfigurationDetailsApi } from '@/api/operation/activeConfiguration'
const props = defineProps({
  rowItems: {
    type: Object
  }
})
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const formInline = reactive({
  searchKeyword: ''
})
const loading = ref(false)

onMounted(() => {
  getTableDataList()
})
// 完整页数据
const fullData = ref([])
// 当前页数据
const tableDataList = ref([])
//查询
const onSubmit = () => {
  queryParams.pageNum = 1
  getTableDataList()
}
// 根据字段查询
const loadData = () => {
  const startIdx = (queryParams.pageNum - 1) * queryParams.pageSize
  const endIdx = startIdx + queryParams.pageSize
  tableDataList.value = fullData.value
    .filter((item) => item.value.includes(formInline.searchKeyword))
    .slice(startIdx, endIdx)
  if (formInline.searchKeyword) {
    queryParams.total = tableDataList.value.length
  } else {
    queryParams.total = fullData.value.length
  }
  // console.log(startIdx, endIdx);
  // console.log(fullData.value);
  // console.log(tableDataList.value, 1111);
}
//列表
const getTableDataList = async () => {
  try {
    const res = await getConfigurationDetailsApi(props.rowItems.id)
    const data = res
    fullData.value = data.map((item, index) => {
      return {
        id: index + 1, // 为每行数据添加一个唯一的ID或索引
        value: item
      }
    })

    loadData()
    queryParams.total = fullData.value.length
  } catch (error) {
    // 处理错误
    console.error(error)
  }
}
/** 重置按钮操作 */
// function resetQuery() {
//   formInline.value.searchKeyword = "";
//   getTableDataList();
// }
</script>

<style lang="scss" scoped>
:deep() {
  .pagination-container .el-pagination {
    position: absolute;
    right: 24px;
  }
}
</style>
