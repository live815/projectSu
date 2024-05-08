<template>
  <div class="commisson-method-continer">
    <div class="container">
      <el-button
        type="primary"
        v-for="(item, index) in methodList"
        :key="index"
        @click="changeMethod(index)"
        >{{ item.planName }}
      </el-button>
      <el-button type="success" @click="handleOpenDialog({ type: 1 })">{{
        $t('agent.addPlanPlus')
      }}</el-button>
    </div>
    <div class="container">
      <el-form-item :label="$t('agent.planNameQuote')">
        <el-input
          v-if="!loading"
          disabled
          style="width: 200px; margin-right: 10px"
          v-model="currentMethodData.planName" />
        <el-button type="primary" @click="handleOpenDialog({ type: 13 })">{{
          $t('agent.edit')
        }}</el-button>
        <el-button type="danger" @click="deleMethod">{{ $t('agent.delete') }}</el-button>
      </el-form-item>
    </div>
    <!-- 佣金档位 -->
    <div class="container">
      <commissionLevel
        v-if="!loading"
        :currentMethodData="currentMethodData"
        @handleOpenDialog="handleOpenDialog"
        @toEdit="toEdit" />
    </div>
    <!-- {{ currentMethodData || "" }} -->
    <div class="container">
      <commissionCal
        v-if="!loading"
        :currentMethodData="currentMethodData"
        :algorithmList="algorithmList"
        @handleOpenDialog="handleOpenDialog"
        @toEdit="toEdit"
        @getData="getData" />
    </div>

    <!-- 场馆费 -->
    <div class="container">
      <div class="title" style="margin-bottom: 20px">
        {{ $t('agent.lobbyNameFee') }}
        <!-- <el-button type="primary" style="margin-left: 30px" @click="getData(true)">{{
          $t('agent.refresh')
        }}</el-button> -->
      </div>
      <gameFeeRate
        v-if="!loading"
        :currentMethodData="currentMethodData"
        @handleOpenDialog="handleOpenDialog" />
    </div>

    <el-dialog
      v-model="showDialog"
      width="450px"
      :before-close="handleCloseDialog"
      class="commissonConfig-dialog">
      <configDialog
        v-if="showDialog"
        :dialogType="dialogType"
        :currentMethodData="currentMethodData"
        :currentRow="currentRow"
        :methodList="methodList"
        @handleCloseDialog="handleCloseDialog"
        @toEdit="toEdit"
        @toEditVenue="toEditVenue"
        @addMethod="addMethod" />
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
import commissionLevel from './commissionLevel.vue'
import commissionCal from './commissionCal.vue'
import gameFeeRate from './gameFeeRate.vue'
import configDialog from './configDialog.vue'
import {
  getCommissonListApi,
  getCommissonMethodListApi,
  editCommissonMethodApi,
  editVenueRateApi,
  addMethodApi,
  delMethodApi
} from '@/api/agent/agentConfig'
import { deepCopy } from '../../../../../../utils'

// 弹出框
//  dialogType 1=新增方案  2=新增佣金档位 3=修改红利承担比例 4=修改返水承担比例 5=场馆费承担比例
//  6=编辑代存红利承担比例 7=编辑信用代存红利承担比例 8=活跃用户定义  9=存款/取款手续费 10 = 新增新增佣金档位
const showDialog = ref(false)
const dialogType = ref({})
const currentRow = ref({})
const handleOpenDialog = ({ type, index, row }) => {
  showDialog.value = true
  dialogType.value = {
    type,
    index
  }
  currentRow.value = row
}
const handleCloseDialog = () => {
  showDialog.value = false
}

const loading = ref(true)
onMounted(async () => {
  getData()
})
// 获取数据
const getData = async (val) => {
  try {
    const [commissonlist, algorithms] = await Promise.all([
      getCommissonListApi(),
      getCommissonMethodListApi()
    ])
    methodList.value = commissonlist
    algorithmList.value = algorithms
    methodList.value.forEach((item) => {
      for (let key in item) {
        // console.log(key)
        if (
          typeof item[key] == 'number' &&
          !keyList.some((item) => {
            return key == item
          })
        ) {
          item[key] = parseFloat((item[key] * 100).toFixed(2))
        }
        if (key == 'activeUserRechargeAmount' || key == 'activeUserValidAmount') {
          item[key] = item[key].split('.')[0]
        }
      }
      item.venueRateConfigList.forEach((subItem) => {
        subItem.cost = parseFloat((subItem.cost * 100).toFixed(2))
        subItem.ratio = parseFloat((subItem.ratio * 100).toFixed(2))
      })
      if (Array.isArray(item.commissionGearList)) {
        item.commissionGearList.forEach((subItem) => {
          subItem.ratio = parseFloat((subItem.ratio * 100).toFixed(2))
        })
      }
    })
  } finally {
    loading.value = false
    if (val === true) {
      proxy.$modal.msgSuccess(i18n.global.t('system.RefreshSuccess'))
    }
  }
}
// 删除选中方案
const deleMethod = async () => {
  if (methodList.value.length == 1) {
    proxy.$modal.msgError(i18n.global.t('agent.cannotDeleteMustLeftOnePlan'))
    return
  }
  await delMethodApi(currentMethodData.value.id)
  currentMethod.value = 0
  await getData()
  proxy.$modal.msgSuccess(i18n.global.t('agent.deleteSuccessfully'))
}
// 提交数据
const toEdit = async (val, ratio) => {
  if (ratio) {
    // 点击单选框时的逻辑
    const temp = deepCopy(currentMethodData.value)
    Object.keys(val).forEach((key) => {
      if (temp.hasOwnProperty(key)) {
        temp[key] = val[key]
      }
    })
    delete temp.venueRateConfigList
    for (let key in temp) {
      if (
        typeof temp[key] == 'number' &&
        !keyList.some((item) => {
          return key == item
        })
      ) {
        temp[key] /= 100
      }
    }
    if (Array.isArray(temp.commissionGearList)) {
      temp.commissionGearList.forEach((item) => {
        item.ratio = item.ratio / 100
      })
    }
    try {
      handleCloseDialog()
      await editCommissonMethodApi(temp)
      await getData()
      proxy.$modal.msgSuccess(i18n.global.t('agent.editSuccessfully'))
    } catch (err) {
      console.log(err, 'Object.keys(val).forEach((key)')
    }
  } else if (val && typeof val == 'object') {
    // 弹窗提交逻辑
    for (let key in val) {
      if (
        !keyList.some((item) => {
          return key == item
        })
      ) {
        val[key] = (val[key] / 100).toFixed(4)
      }
    }
    if (Array.isArray(val.commissionGearList))
      val.commissionGearList.forEach((item) => {
        item.ratio = item.ratio / 100
      })
    try {
      handleCloseDialog()
      await editCommissonMethodApi(val)
      await getData()
      proxy.$modal.msgSuccess(i18n.global.t('agent.editSuccessfully'))
    } catch (err) {
      console.log(err, '提交')
    }
  }
}
const toEditVenue = async (val) => {
  val.ratio = val.ratio / 100
  try {
    await editVenueRateApi(val)
    await getData()
    handleCloseDialog()
    proxy.$modal.msgSuccess(i18n.global.t('agent.editSuccessfully'))
  } catch (err) {
    console.log(err, '提交')
  }
}
const addMethod = async (val) => {
  try {
    await addMethodApi(val)
    await getData()
    handleCloseDialog()
    proxy.$modal.msgSuccess(i18n.global.t('agent.addSuccessfully'))
  } catch (err) {
    console.log(err, '新增方案')
  }
}

// 方案列表
const methodList = ref([])
const changeMethod = (index) => {
  currentMethod.value = index
}
// 当前选中的方案
const currentMethod = ref(0)
const currentMethodData = computed(() => {
  if (methodList.value && methodList.value[currentMethod.value]) {
    let temp = methodList.value[currentMethod.value]
    return temp
  }
})

// 算法列表
const algorithmList = ref([])
// 不做百分比处理的key
const keyList = [
  'id',
  'algorithmId',
  'activeUserRechargeAmount',
  'activeUserValidAmount',
  'activeUserType',
  'venueType',
  'algorithmDirections',
  'algorithmDirections',
  'tenantId',
  'type',
  'activeUserBetNums',
  'algorithmContent',
  'accumulate',
  'planName',
  'commissionGearList'
]
</script>

<style lang="scss" scoped>
.commisson-method-continer {
  padding: 10px;
}
.container {
  margin-left: 20px;
  margin-bottom: 30px;
  width: 900px;
}
.title {
  font-size: 24px;
  font-weight: 600;
}
:deep() {
  .el-dialog__header {
    display: none;
  }
}
</style>
