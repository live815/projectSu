<template>
  <div class="message-send-sort-index">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-loading="loading">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item
            :label="$t('message.threeMessageStatus')"
            prop="status"
            class="full-width"
          >
            <el-select
              v-model="queryParams.status"
              :placeholder="$t('risk.pleaseSelect')"
              clearable
              class="full-width"
            >
              <el-option
                v-for="dict in messageStatusList"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="full-width">
            <el-button type="primary" icon="Search" @click="handleQuery">{{
              $t('risk.search')
            }}</el-button>
            <el-button icon="Refresh" @click="resetQuery">{{ $t('risk.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      max-height="350"
      style="margin-top: 20px"
      :empty-text="$t('risk.noData')"
    >
      <el-table-column :label="$t('risk.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.threePartMessage')"
        align="center"
        width="260"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.supplierName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.threeMessageStatus')"
        align="center"
        width="240"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <!-- <span>{{ filterLabel(messageStatusList,row.status) }}</span> -->
          <el-tag type="success" v-if="row.status === 0">{{ filterLabel(messageStatusList,row.status) }}</el-tag>
          <el-tag type="danger" v-else-if="row.status === 1">{{ filterLabel(messageStatusList,row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.sendPrioritySort')"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.priority }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.updateTime')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.updateTime || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.updateBy')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <span>{{ row.updateBy || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center" width="240">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="changeSort(row)">{{ $t('member.edit') }}</el-button>
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
    <ChangeSort 
      v-model:open="open" 
      v-if="open"
      :cloneRow="cloneRow"
      @onrefresh="getList"
      />
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { deepClone } from "@/utils/index";
import ChangeSort from "./ChangeSort.vue";
import { filterLabel } from "@/utils/index";
import { querySupplierList } from "@/api/message/index";

const { proxy } = getCurrentInstance()
const queryRef = ref(null);
const queryParams = ref({
  status: null, // 风控层级
  pageNum: 1,
  pageSize: 10
})
const total = ref(0)
const messageStatusList = ref([
  {
    label:i18n.global.t("message.startButton"),
    value:0
  },
  {
    label:i18n.global.t("message.disableButton"),
    value:1
  }
]);
const tableData = ref([]); 
const loading = ref(false);
const isFirstLoad = ref(true);
const open = ref(false);
const cloneRow = ref(null);

onMounted(async () => {
  if (isFirstLoad.value) {
    await getList()
    isFirstLoad.value = false
  }
})
function getList() {
  loading.value = true
  return querySupplierList(queryParams.value)
    .then((res) => {
      loading.value = false
      tableData.value = res.records || []
      total.value = res.total || 0
    })
    .catch(() => {
      loading.value = false
    })
}
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}
function resetQuery() {
  queryRef.value.resetFields()
}
function changeSort(row){
  open.value = true
  cloneRow.value = deepClone(row)
}
onActivated(async () => {
  if (!isFirstLoad.value) {
    await getList()
  }
})
</script>

<style lang="scss" scoped>
.message-send-sort-index {
}
</style>
