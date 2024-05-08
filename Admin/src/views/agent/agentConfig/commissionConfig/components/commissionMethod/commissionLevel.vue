<template>
  <div>
    <div class="title">
      {{ $t('agent.commissionLevel') }}
      <el-button type="warning" @click.stop="openDialog({ type: 10 })">{{
        $t('agent.addGear')
      }}</el-button>
    </div>
    <el-table
      :data="currentMethodData.commissionGearList"
      v-if="currentMethodData"
      style="width: 100%"
    >
      <el-table-column prop="seq" :label="$t('agent.gear')" width="180" />
      <el-table-column prop="activeNumber" :label="$t('agent.activeUser')" width="180">
        <template #default="{ row }">
          <span>≥ {{ row.activeNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="winLose" :label="$t('agent.companyWinLose')" width="180">
        <template #default="{ row }">
          <span>≥ {{ row.winLose }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ratio" :label="$t('agent.commissionRate')" width="180">
        <template #default="{ row }">
          <span>{{ row.ratio }}%</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('agent.handle')" width="180">
        <template #default="{ $index }">
          <span class="btn-text" @click.stop="openDialog({ type: 2, index: $index })">{{
            $t('agent.edit')
          }}</span>
          <span
            :class="currentMethodData.commissionGearList.length == 1 ? 'btn-text grey' : 'btn-text'"
            @click.stop="deleLevel($index)"
            >{{ $t('agent.delete') }}</span
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { editCommissonMethodApi } from '@/api/agent/agentConfig'
import { deepCopy } from '@/utils'
const { proxy } = getCurrentInstance()
const props = defineProps({
  currentMethodData: {
    type: Object,
    default: {}
  }
})
const emit = defineEmits(['handleOpenDialog', 'toEdit'])
const openDialog = (val) => {
  emit('handleOpenDialog', val)
}

const deleLevel = (index) => {
  let params = deepCopy(props.currentMethodData)
  if (params.commissionGearList.length == 1) {
    proxy.$modal.msgError(i18n.global.t('agent.cannotDeleteMustLeftOneGear'))
    return
  }
  params.commissionGearList.splice(index, 1)
  delete params.venueRateConfigList
  emit('toEdit', params)

  // editCommissonMethodApi(params)
  //   .then(() => {
  //     proxy.$modal.msgSuccess(`删除成功`);
  //     emit("getData");
  //   })
  //   .catch(() => {
  //     proxy.$modal.msgError(`操作失败，请稍后再试`);
  //   });
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  gap: 40px;
  font-size: 24px;
  font-weight: 600;
}
.btn-text {
  color: rgb(64, 158, 255);
  margin-left: 10px;
  cursor: pointer;
}
.grey {
  color: #d7d7d7;
  cursor: default !important;
}
</style>
