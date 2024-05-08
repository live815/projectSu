// 奖励配置
<template>
  <div class="reward">
    <el-form :model="rewardList">
      <el-form-item class="add">
        <el-button type="primary" @click="rewardEdit">{{ $t('operation.tip120') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-table :data="rewardList" style="width: 100%">
          <el-table-column prop="level" type="index" :label="$t('operation.grade')" width="180" />
          <el-table-column
            prop="initialDeposit"
            :label="$t('operation.firstdepositamount')"
            width="180" />
          <el-table-column
            prop="totalBetAmount"
            :label="$t('operation.AccumulatValidbet')"
            width="180" />
          <el-table-column prop="type" :label="$t('operation.tip104')" width="180">
            <template #default="scope">
              <span>{{ rewardTypes(scope.row.type) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="rewardAmount" :label="$t('operation.tip106')" width="180" />
          <el-table-column
            prop="name"
            :label="$t('operation.operate')"
            width="200px"
            align="center"
            fixed="right">
            <template #default="scope">
              <el-button class="ml-2" type="primary" size="small" @click="rewardEdit(scope.row)">
                {{ $t('operation.editInfomation') }}
              </el-button>
              <el-button class="ml-2" type="danger" size="small" @click="rewardDel(scope.$index)">
                {{ $t('operation.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
  <AddGearCom ref="dialogRef" :gearObj="gearObj" :rewardList="rewardList" />
</template>

<script setup>
import { ref } from 'vue'
import AddGearCom from './AddGearCom.vue'
import i18n from '@/i18n'

const dialogRef = ref()
const gearObj = ref({})
const props = defineProps({ rewardList: { type: Array } })
const rewardEdit = (row) => {
  gearObj.value = row
  dialogRef.value.show()
}

const rewardDel = (index) => props.rewardList.splice(index, 1)
const rewardTypes = (type) => {
  switch (type) {
    case 1:
      return i18n.global.t('operation.cash')
    case 2:
      return i18n.global.t('operation.cashcoupons')
    case 3:
      return i18n.global.t('operation.depositcoupon')
    case 4:
      return i18n.global.t('operation.TurnoverCoupons')
    case 5:
      return i18n.global.t('operation.physicalObject')
    default:
      return i18n.global.t('operation.other')
  }
}
</script>

<style scoped>
.reward {
  width: 100%;
}
.add {
  margin-bottom: 10px;
}
</style>
