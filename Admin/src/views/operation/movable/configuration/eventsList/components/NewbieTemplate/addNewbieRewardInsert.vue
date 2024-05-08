<template>
  <el-dialog v-model="visible" :title="$t('operation.add2')" width="800px" :center="true">
    <el-form :model="queryParams" ref="queryRef" label-width="130px" :rules="rules">
      <el-form-item :label="$t('newbie.form.label19')" prop="giftType">
        <el-select
          v-model="queryParams.giftType"
          class="m-2"
          :placeholder="$t('newbie.form.placeholder2')"
          style="width: 440px"
        >
          <el-option
            v-for="item in giftType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label20')" prop="giftAmount">
        <el-input
          v-model="queryParams.giftAmount"
          :placeholder="$t('newbie.form.placeholder1')"
          type="number"
          style="width: 440px"
          min="0"
        />
      </el-form-item>
      <el-form-item :label="$t('newbie.form.label21')" prop="betMultiple">
        <el-input
          v-model="queryParams.betMultiple"
          :placeholder="$t('newbie.form.placeholder1')"
          type="number"
          style="width: 440px"
          min="0"
        />
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
import cloneDeep from 'lodash/cloneDeep'
import i18n from '@/i18n'
import { giftType } from '../../../../models'

const visible = ref(false)
defineExpose({ show: () => (visible.value = true) })

const queryParams = ref()
const queryRef = ref()
const props = defineProps({
  gearObj: { type: Object },
  list: { type: Array },
  editIndex: { type: Number }
})

// 确认
const addGear = async () => {
  await queryRef.value.validate((valid, fields) => {
    if (valid) {
      if (props.editIndex < 0) {
        props.list.push(queryParams.value)
      } else {
        props.list[props.editIndex] = queryParams.value
      }
      visible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

watchEffect(() => {
  queryParams.value = props.gearObj
    ? cloneDeep(props.gearObj)
    : {
        betMultiple: null, //流水倍数
        depositAmount: 0, //存款金额，签到礼包所需
        giftAmount: null, //奖励金额
        giftType: 1, //奖品类型：1现金，2现金券，3存送券，4流水券，5实物
        profitAmount: 0, //负盈利金额，复活礼包所需
        profitRate: 0, //负盈利比例，百分比，复活礼包所需
        validBet: 0 //有效投注，签到礼包所需
      }
})

const rules = {
  giftType: [
    {
      required: true,
      message: i18n.global.t('newbie.form.message6'),
      trigger: 'blur'
    }
  ],
  giftAmount: [
    {
      required: true,
      message: i18n.global.t('newbie.form.message7'),
      trigger: 'blur'
    }
  ],
  betMultiple: [
    {
      required: true,
      message: i18n.global.t('newbie.form.message8'),
      trigger: 'blur'
    }
  ]
}
</script>

<style lang="scss" scoped>
.rewrite-icon {
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 100px;
  border: 1px dashed #eee;
}

.bottom {
  margin-bottom: 10px;
}
.left {
  margin-left: 110px;
}

:deep() {
  .el-form-item {
    margin-bottom: 18px;
  }
}
</style>
