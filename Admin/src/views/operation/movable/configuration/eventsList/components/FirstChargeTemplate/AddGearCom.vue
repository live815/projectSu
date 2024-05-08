<template>
  <el-dialog v-model="visible" :title="$t('operation.tip121')" width="500px" :center="true">
    <el-form :model="queryParams" ref="queryRef" label-width="120px" :rules="rules">
      <el-form-item
        :label="$t('operation.Firstdepositamount')"
        prop="initialDeposit"
        class="bottom">
        <el-input
          v-model="queryParams.initialDeposit"
          :placeholder="$t('operation.pleaseEnter')"
          style="width: 330px" />
      </el-form-item>
      <el-form-item :label="$t('operation.tip103')" prop="totalBetAmount" class="bottom">
        <el-input
          v-model="queryParams.totalBetAmount"
          :placeholder="$t('operation.pleaseEnter')"
          style="width: 330px" />
      </el-form-item>
      <el-form-item :label="$t('operation.tip104')" prop="type" class="bottom">
        <el-select
          v-model="queryParams.type"
          clearable
          :placeholder="$t('operation.tip105')"
          style="width: 330px">
          <el-option
            v-for="item in rewardTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.tip106')" prop="rewardAmount" class="bottom">
        <el-input
          v-model="queryParams.rewardAmount"
          :placeholder="$t('operation.pleaseEnter')"
          style="width: 330px" />
      </el-form-item>
      <el-form-item class="bottom addGear">
        <el-button type="primary" @click="addGear()">
          {{ $t('operation.sure1') }}
        </el-button>
        <el-button @click="visible = false">
          {{ $t('operation.close') }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import i18n from '@/i18n'
import cloneDeep from 'lodash/cloneDeep'

const visible = ref(false)
const props = defineProps({
  gearObj: { type: Object },
  rewardList: { type: Array }
})
defineExpose({ show: () => (visible.value = true) })

const queryParams = ref()
const queryRef = ref()
const rewardTypes = [
  {
    value: 1,
    label: i18n.global.t('operation.cash')
  },
  {
    value: 2,
    label: i18n.global.t('operation.cashcoupons')
  },
  {
    value: 3,
    label: i18n.global.t('operation.depositcoupon')
  },
  {
    value: 4,
    label: i18n.global.t('operation.TurnoverCoupons')
  },
  {
    value: 5,
    label: i18n.global.t('operation.physicalObject')
  }
]

const rules = ref({
  initialDeposit: [
    {
      required: true,
      message: i18n.global.t('operation.tip107'),
      trigger: 'blur'
    }
  ],
  totalBetAmount: [
    {
      required: true,
      message: i18n.global.t('operation.tip108'),
      trigger: 'blur'
    }
  ],
  type: [
    {
      required: true,
      message: i18n.global.t('operation.tip109'),
      trigger: 'blur'
    }
  ],
  rewardAmount: [
    {
      required: true,
      message: i18n.global.t('operation.tip110'),
      trigger: 'blur'
    }
  ],
  type: [
    {
      required: true,
      message: i18n.global.t('operation.tip109'),
      trigger: 'blur'
    }
  ],
  rewardAmount: [
    {
      required: true,
      message: i18n.global.t('operation.tip110'),
      trigger: 'blur'
    }
  ]
})

const addGear = async () => {
  await queryRef.value.validate((valid, fields) => {
    if (valid) {
      if (queryParams.value.level) {
        const ind = props.rewardList.findIndex((e) => e.level === queryParams.value.level)
        props.rewardList.splice(ind, 1, queryParams.value)
      } else {
        queryParams.value.level = props.rewardList.length + 1
        props.rewardList.push(queryParams.value)
      }
    } else {
      console.log('error submit!', fields)
    }
    visible.value = false
  })
}

watchEffect(() => {
  queryParams.value = props.gearObj
    ? cloneDeep(props.gearObj)
    : {
        initialDeposit: null,
        rewardAmount: null,
        totalBetAmount: null,
        type: ''
      }
})
</script>

<style lang="scss" scoped>
.bottom {
  margin-bottom: 20px;
}
.addGear {
  margin-left: 110px;
}
</style>
