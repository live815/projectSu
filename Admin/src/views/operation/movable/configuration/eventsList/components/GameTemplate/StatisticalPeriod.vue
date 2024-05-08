<!-- 活动内容 -->
<template>
  <el-select v-model="timeType" style="width: 440px; margin-bottom: 20px">
    <el-option v-for="item in tTypes" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <div style="width: 100%">
    <p style="margin: 0; color: #999">
      {{ $t('gameTemplate.label78') }}
    </p>
    <el-table :data="[list]" height="200">
      <el-table-column prop="deposit" :label="$t('gameTemplate.label7')" width="180">
        <template #default="{ row }">
          <span>{{ row.deposit || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="validBet" :label="$t('gameTemplate.label8')">
        <template #default="{ row }">
          <span>{{ row.validBet || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="relation" :label="$t('gameTemplate.label9')">
        <template #default="{ row }">
          <span>{{ assessment.find((e) => e.value === row.relation)?.label || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rewardValidTime" :label="$t('gameTemplate.label10')">
        <template #default="{ row }">
          <span>{{ row.rewardValidTime || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('operation.operate')" align="center">
        <template #default="scope">
          <el-button class="ml-2" type="primary" size="small" @click="rewardEdit(scope)">
            {{ $t('operation.editInfomation') }}
          </el-button>
          <el-button class="ml-2" type="danger" size="small" @click="rewardDel()">
            {{ $t('operation.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="visible" :title="$t('operation.edit')" width="800px" :center="true">
    <el-form :model="queryParams" ref="queryRef" label-width="130px">
      <el-form-item :label="$t('gameTemplate.label11')" prop="deposit">
        <el-input
          v-model="queryParams.deposit"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px"
        />
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label12')" prop="validBet">
        <el-input
          v-model="queryParams.validBet"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px"
        />
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label13')" prop="relation">
        <el-select
          v-model="queryParams.relation"
          :placeholder="$t('newbie.form.placeholder2')"
          style="width: 440px"
        >
          <el-option
            v-for="item in assessment"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label14')" prop="rewardValidTime">
        <el-input
          v-model="queryParams.rewardValidTime"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px"
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
import { useI18n } from 'vue-i18n'
import cloneDeep from 'lodash/cloneDeep'
import { watch } from 'vue'

const i18n = useI18n()
const props = defineProps({ list: { type: Object } })
const visible = ref(false)
const queryParams = ref()
const queryRef = ref()
const timeType = ref(999)

watch(
  () => timeType.value,
  (val) => (props.list.timeType = val)
)

// 确认
const addGear = async () => {
  await queryRef.value.validate((valid, fields) => {
    if (valid) {
      props.list = Object.assign(props.list, queryParams.value, { timeType: timeType.value })
      visible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 编辑修改
const rewardEdit = (scope) => {
  queryParams.value = { ...cloneDeep(scope.row), relation: scope.row.relation }
  visible.value = true
}

//删除
const rewardDel = () => {
  props.list = Object.assign(props.list, {
    deposit: '',
    relation: '',
    rewardValidTime: '',
    validBet: ''
  })
}

const assessment = [
  { label: i18n.t('gameTemplate.label15'), value: '1' },
  { label: i18n.t('gameTemplate.label16'), value: '0' }
]

const tTypes = [
  { label: i18n.t('gameTemplate.label3'), value: 999 },
  { label: i18n.t('gameTemplate.label17'), value: 0 },
  { label: i18n.t('gameTemplate.label4'), value: 1 },
  { label: i18n.t('gameTemplate.label5'), value: 2 },
  { label: i18n.t('gameTemplate.label6'), value: 3 }
]

watch(
  () => props.list.title,
  (val) => (timeType.value = props.list?.timeType)
)
</script>

<style scoped lang="scss">
:deep() {
  .el-form-item {
    margin-bottom: 18px;
  }
}
</style>
