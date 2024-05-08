<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="templateId" :label="$t('operation.tip85')" width="500" />
    <el-table-column prop="selectTemplate" :label="$t('operation.tip86')" width="500" />
    <el-table-column prop="operate" :label="$t('operation.operate')">
      <template #default="scope">
        <el-button type="primary" size="small" @click="emit('toModel', scope.row.templateId)">
          {{ $t('operation.add2') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

const emit = defineEmits(['toModel'])
const tableData = [
  { templateId: '1', selectTemplate: i18n.t('operation.Firstdeposittemplate') },
  { templateId: '2', selectTemplate: i18n.t('operation.GameTemplate') },
  { templateId: '3', selectTemplate: i18n.t('operation.tip81') },
  { templateId: '4', selectTemplate: i18n.t('operation.bigturntable') },
  // { templateId: '5', selectTemplate: i18n.t('operation.RedEnvelope') }
  { templateId: '8', selectTemplate: i18n.t('operation.RebateActivity') }
]
</script>

<style></style>
