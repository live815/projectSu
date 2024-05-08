<!-- 好友VIP奖励 -->
<template>
  <el-table :data="tableData" style="width: 100%" :empty-text="$t('member.noData')">
    <el-table-column
      prop="vipName"
      :label="$t('member.vipLevelNoQuote')"
      width="150px"
      align="center"
    />
    <el-table-column :label="Currency" align="center">
      <el-table-column prop="name" :label="$t('member.awardType')" align="center">
        <template #default="{ row, $index }">
          <!--          <el-cascader-->
          <!--              v-model="row.type"-->
          <!--              :options="options"-->
          <!--              @change="handleChange($event,row,$index)"-->
          <!--          />-->
          <span>{{ $t('member.cash') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Address" :label="$t('member.prizeSetting')" align="center">
        <template #default="scope">
          <el-input
            v-model="scope.row['amount']"
            oninput="value=value.replace(/\D/g,'')"
            maxlength="10"
            :placeholder="$t('member.pleaseInputAmount')"
            style="width: 200px; margin-right: 20px"
          ></el-input>
          <el-input
            v-model="scope.row['drawMultiple']"
            oninput="value=value.replace(/\D/g,'')"
            maxlength="10"
            :placeholder="$t('member.pleaseInputWithdrawMultiple')"
            style="width: 200px"
          ></el-input>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
  <el-row class="vip-invite">
    <div class="button-container">
      <el-button type="primary" @click="saveConfig">{{ $t('member.save') }}</el-button>
      <el-button @click="recoveryLastData">{{ $t('member.recoverLastSetting') }}</el-button>
    </div>
  </el-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import i18n from '@/i18n'
import { queryInviteVipConfig, saveInviteVipConfig } from '@/api/member/invite/index'
import { deepCopy } from '@/utils/index'
import { ElMessage } from 'element-plus'
import useCurrency from '@/hooks/useCurrency'
const { Currency } = useCurrency()

const loading = ref(false)
const tableData = ref([])
const tableDataClone = ref([])

const handleChange = (val, row, index) => {
  console.log('val', val)
  console.log('row', row)
  console.log('index', index)
}

const options = [
  {
    value: 0,
    label: i18n.global.t('member.cash')
  },
  {
    value: 1,
    label: i18n.global.t('member.cashCoupons')
  },
  {
    value: 2,
    label: i18n.global.t('member.depositCoupons')
  },
  {
    value: 3,
    label: i18n.global.t('member.turnoverCoupons')
  }
]
const isFirstLoad = ref(true);

onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value =  false;
  }
})

const getList = () => {
  loading.value = true
  return queryInviteVipConfig().then((res = []) => {
    loading.value = false
    tableData.value = res || []
    tableDataClone.value = res ? deepCopy(res) : []
  })
}

const recoveryLastData = () => {
  tableData.value = deepCopy(tableDataClone.value)
}

const saveConfig = () => {
  saveInviteVipConfig(tableData.value).then(() => {
    ElMessage.success(i18n.global.t('member.save') + i18n.global.t('member.success'))
    getList()
  })
}
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style scoped>
.vip-invite {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: flex-end; /* 垂直底部对齐 */
  height: 20vh;
}
:deep(.el-table__header-wrapper) {
  background-color: var(--el-fill-color-light) !important;
}
</style>
