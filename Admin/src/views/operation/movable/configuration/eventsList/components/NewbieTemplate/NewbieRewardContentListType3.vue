<!-- 活动内容 -->
<template>
  <el-form :model="list" ref="ruleFormRef">
    <el-form-item class="add">
      <el-button type="primary" @click="rewardEdit" v-if="list.length < 1">
        {{ $t('operation.tip83') }}
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-table :data="list" height="200">
        <el-table-column
          type="index"
          prop="number"
          :label="$t('newbie.table.label16')"
          width="140"
        />
        <el-table-column prop="giftType" :label="$t('newbie.table.label19')" width="140">
          <template #default="{ row }">
            <span v-if="row.giftType">{{
              giftType.find((e) => e.value === row.giftType).label
            }}</span>
            <span v-else>{{ row.giftType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="giftAmount" :label="$t('newbie.table.label26')" width="140">
          <template #default="{ row }">
            <span v-if="row.giftAmount">{{ row.giftAmount }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="profitAmount" :label="$t('newbie.table.label25')" width="140">
          <template #default="{ row }">
            <span v-if="row.profitAmount">{{ row.profitAmount }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="profitRate" :label="$t('newbie.table.label24')" width="140">
          <template #default="{ row }">
            <span v-if="row.profitRate">{{ row.profitRate }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" :label="$t('newbie.table.label21')" width="140">
          <template #default="{ row }">
            <span v-if="row.betMultiple">{{ row.betMultiple }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('operation.operate')"
          width="200"
          align="center"
          fixed="right"
        >
          <template #default="scope">
            <el-button class="ml-2" type="primary" size="small" @click="rewardEdit(scope)">{{
              $t('operation.editInfomation')
            }}</el-button>
            <el-button class="ml-2" type="danger" size="small" @click="rewardDel(scope.$index)">{{
              $t('operation.delete')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
  <addInsert ref="dialogRef" :gearObj="gearObj" :editIndex="editIndex" :list="list" />
</template>

<script setup>
import { ref } from 'vue'
import addInsert from './addNewbieRewardInsertType3.vue'
import i18n from '@/i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { giftType } from '../../../../models'

const props = defineProps({ list: { type: Array } })

const dialogRef = ref()
const ruleFormRef = ref()
const editIndex = ref(-1)
const gearObj = ref({})

// 编辑修改
const rewardEdit = (scope) => {
  editIndex.value = scope.$index === undefined ? -1 : scope.$index
  gearObj.value = scope.row
  dialogRef.value.show()
}

//删除
const rewardDel = (index) => {
  ElMessageBox.confirm(i18n.global.t('operation.tip44'))
    .then(() => {
      props.list.splice(index, 1)
      ElMessage({
        type: 'success',
        message: i18n.global.t('operation.deleteSuccess')
      })
    })
    .catch(() => {})
}
</script>

<style scoped>
.add {
  margin-bottom: 10px;
}

.image-display {
  width: 150px;
  height: 150px;
}
</style>
