<!-- 活动内容 -->
<template>
  <div style="display: flex">
    <el-button type="primary" @click="rewardEdit" style="margin-bottom: 20px">
      {{ $t('operation.tip83') }}
    </el-button>
  </div>
  <el-table :data="list" height="200">
    <el-table-column prop="operatorType" :label="$t('rebateTemplate.label2')" width="180">
      <template #default="{ row }">
        <span>{{ operatorType.find((e) => e.value === row.operatorType)?.label || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="validBetAmount" :label="$t('report.validBetAmountNoYuan')">
      <template #default="{ row }">
        <span>{{ row.validBetAmount || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="cashbackVal" :label="$t('rebateTemplate.label3')">
      <template #default="{ row }">
        <span>{{ row.cashbackVal || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" :label="$t('operation.operate')" align="center">
      <template #default="scope">
        <el-button class="ml-2" type="primary" size="small" @click="rewardEdit(scope)">
          {{ $t('operation.editInfomation') }}
        </el-button>
        <el-button class="ml-2" type="danger" size="small" @click="rewardDel(scope.$index)">
          {{ $t('operation.delete') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="visible" :title="$t('operation.edit')" width="800px" :center="true">
    <el-form :model="queryParams" ref="queryRef" label-width="130px" :rules="rules">
      <el-form-item :label="$t('rebateTemplate.label2')" prop="operatorType">
        <el-select
          v-model="queryParams.operatorType"
          :placeholder="$t('newbie.form.placeholder2')"
          style="width: 440px">
          <el-option
            v-for="item in operatorType"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('report.validBetAmountNoYuan')" prop="validBetAmount">
        <el-input
          v-model="queryParams.validBetAmount"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px"
          type="number" />
      </el-form-item>
      <el-form-item :label="$t('rebateTemplate.label3')" prop="cashbackVal">
        <el-input
          v-model="queryParams.cashbackVal"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px"
          type="number" />
      </el-form-item>
      <el-form-item class="bottom left">
        <el-button type="primary" @click="addGear()">{{ $t('operation.sure1') }}</el-button>
        <el-button @click="visible = false">{{ $t('operation.close') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import cloneDeep from 'lodash/cloneDeep'
import useAppStore from '@/store/modules/app'

const i18n = useI18n()
const props = defineProps({ list: { type: Array } })
const editIndex = ref(-1)
const visible = ref(false)
const queryParams = ref()
const queryRef = ref()
const appStore = useAppStore()

const operatorType = [
  { label: '小于', value: 10000001 },
  { label: '大于等于', value: 10000005 }
]

const rules = {
  operatorType: [
    {
      required: true,
      message: i18n.t('rebateTemplate.label12'),
      trigger: 'blur'
    }
  ],
  validBetAmount: [
    {
      required: true,
      message: i18n.t('rebateTemplate.label13'),
      trigger: 'blur'
    }
  ],
  cashbackVal: [
    {
      required: true,
      message: i18n.t('rebateTemplate.label14'),
      trigger: 'blur'
    }
  ]
}

// 确认
const addGear = async () => {
  await queryRef.value.validate((valid, fields) => {
    if (valid) {
      if (editIndex.value < 0) {
        props.list.push({ ...queryParams.value })
      } else {
        props.list[editIndex.value] = { ...queryParams.value }
      }

      console.log(props.list)
      visible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 编辑修改
const rewardEdit = (scope) => {
  if (scope.$index === undefined) {
    editIndex.value = -1
    queryParams.value = {
      cashBackUnit: '%',
      validBetAmountUnit: appStore.language === 'zh-cn' ? 'CNY' : 'VND'
    }
  } else {
    editIndex.value = scope.$index
    queryParams.value = cloneDeep(scope.row)
  }

  visible.value = true
}

//删除
const rewardDel = (index) => props.list.splice(index, 1)
</script>

<style scoped>
:deep() {
  .el-form-item {
    margin-bottom: 18px;
  }
}
</style>
