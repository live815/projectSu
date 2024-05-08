<!-- 活动内容 -->
<template>
  <div style="display: flex">
    <el-select v-model="assessment" style="width: 440px; margin-bottom: 20px" :disabled="disabled">
      <el-option v-for="item in aType" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button type="primary" @click="rewardEdit" style="margin-left: 20px">
      {{ $t('operation.tip83') }}
    </el-button>
  </div>
  <el-table :data="list" height="200" v-if="assessment !== ''">
    <el-table-column prop="vip" :label="$t('gameTemplate.label58')" width="180">
      <template #default="{ row }">
        <span>{{ VipList.find((e) => e.id === row.vip)?.label || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="businessValue" :label="$t('gameTemplate.label20')" width="180">
      <template #default="{ row }">
        <span>{{ row.businessValue || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="giftType" :label="$t('gameTemplate.label21')">
      <template #default="{ row }">
        <span>{{ giftType.find((e) => e.value === row.giftType).label || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="rewardAmount" :label="$t('gameTemplate.label22')">
      <template #default="{ row }">
        <span>{{ row.rewardAmount || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="multiple" :label="$t('gameTemplate.label23')">
      <template #default="{ row }">
        <span>{{ row.multiple || '-' }}</span>
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
      <el-form-item :label="$t('gameTemplate.label81')" prop="vip">
        <el-radio-group v-model="queryParams.vip">
          <el-radio v-for="item in VipList" :key="item.id" :label="item.id">
            {{ item.label }}
          </el-radio>
          <el-button type="primary" @click="cancelVIP">取消选取</el-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label24')" prop="businessValue">
        <el-input
          v-model="queryParams.businessValue"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px"
        />
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label25')" prop="giftType">
        <el-select
          v-model="queryParams.giftType"
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
      <el-form-item :label="$t('gameTemplate.label26')" prop="rewardAmount">
        <el-input
          v-model="queryParams.rewardAmount"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 440px"
        />
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label27')" prop="multiple">
        <el-input
          v-model="queryParams.multiple"
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
import { giftType } from '../../../../models'
import { VipList } from '@/utils/config.js'

const i18n = useI18n()
const props = defineProps({ list: { type: Array } })
const editIndex = ref(-1)
const visible = ref(false)
const queryParams = ref()
const queryRef = ref()
const assessment = ref('')

const rules = {
  giftType: [
    {
      required: true,
      message: i18n.t('newbie.form.message6'),
      trigger: 'blur'
    }
  ],
  businessValue: [
    {
      required: true,
      message: i18n.t('gameTemplate.label83'),
      trigger: 'blur'
    }
  ],
  rewardAmount: [
    {
      required: true,
      message: i18n.t('gameTemplate.label84'),
      trigger: 'blur'
    }
  ],
  multiple: [
    {
      required: true,
      message: i18n.t('gameTemplate.label85'),
      trigger: 'blur'
    }
  ]
}

// 确认
const addGear = async () => {
  await queryRef.value.validate((valid, fields) => {
    if (valid) {
      if (editIndex.value < 0) {
        props.list.push({ ...queryParams.value, businessType: assessment.value })
      } else {
        props.list[editIndex.value] = { ...queryParams.value, businessType: assessment.value }
      }
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
      vip: '',
      businessValue: '',
      giftType: 1,
      multiple: '',
      rewardAmount: ''
    }
  } else {
    editIndex.value = scope.$index
    queryParams.value = cloneDeep(scope.row)
  }

  visible.value = true
}

//删除
const rewardDel = (index) => props.list.splice(index, 1)

const aType = [
  { label: i18n.t('gameTemplate.label18'), value: 1 },
  { label: i18n.t('gameTemplate.label19'), value: 2 }
]

const disabled = ref(false)
watch(
  () => props.list,
  (val) => {
    assessment.value = val[0]?.businessType

    if (val.length) disabled.value = true
  }
)

const cancelVIP = () => {
  queryParams.value.vip = ''
}
</script>

<style scoped>
:deep() {
  .el-form-item {
    margin-bottom: 18px;
  }
}
</style>
