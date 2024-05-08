<template>
  <div>
    <el-table :data="currentMethodData.venueRateConfigList" v-if="currentMethodData">
      <el-table-column prop="lobbyName" :label="$t('agent.lobbyName')" width="300" align="center" />

      <!-- <el-table-column prop="cost" :label="$t('agent.lobbyNameCost')" width="240">
        <template #default="{ row }"> {{ row.cost }}% </template>
      </el-table-column> -->
      <el-table-column prop="ratio" :label="$t('agent.chargeRate')" width="300" align="center">
        <template #default="{ row }">
          {{ row.ratio }}%<el-icon size="20" color="#409EFF" @click="openDialog({ type: 11, row })"
            ><Edit
          /></el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {} from '@/utils'
const props = defineProps({
  currentMethodData: {
    type: Object,
    default: {}
  }
})
const emit = defineEmits(['handleOpenDialog'])
const openDialog = (val) => {
  emit('handleOpenDialog', val)
}
</script>

<style lang="scss" scoped>
:deep() {
  .el-icon {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
