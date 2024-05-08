<!-- 手动发放申请 -->
<template>
  <div class="app-container">
    <div class="text-field">
      <el-form :model="queryParams" ref="queryRef" label-width="140px">
        <el-form-item :label="$t('operation.Accounttype1')" prop="deliveryType">
          <el-radio-group v-model="queryParams.deliveryType">
            <el-radio label="1" size="large">{{ $t('operation.Ordinaryaccount') }}</el-radio>
            <el-radio label="2" size="large">{{ $t('operation.Agentaccount') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="queryParams.deliveryType == 1">
          <el-form-item
            :label="$t('operation.memberaccount1')"
            prop="deliveryAccount"
            :rules="[
              {
                required: true,
                message: $t('operation.InputAccount'),
                trigger: 'blur'
              }
            ]"
          >
            <el-input
              v-model="queryParams.deliveryAccount"
              :rows="6"
              type="textarea"
              :placeholder="$t('operation.tip142')"
              style="width: 500px"
              @input="inputTextarea"
            />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item
            :label="$t('operation.Agentaccount')"
            prop="deliveryAccount"
            :rules="[
              {
                required: true,
                message: $t('operation.Agentaccount2'),
                trigger: 'blur'
              }
            ]"
          >
            <el-input
              v-model="queryParams.deliveryAccount"
              :rows="6"
              type="textarea"
              :placeholder="$t('operation.tips142')"
              style="width: 500px"
              @input="inputTextarea"
            />
          </el-form-item>
        </template>
        <el-form-item :label="$t('operation.Bonustype')" prop="defineType">
          <el-radio-group v-model="queryParams.defineType">
            <el-radio label="7" size="large">{{ $t('operation.customize') }}</el-radio>
            <el-radio label="2" size="large">{{ $t('operation.Relatactivit') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="queryParams.defineType == 1">
          <el-form-item :label="$t('operation.title1')" prop="title">
            <el-input
              v-model="queryParams.title"
              :placeholder="$t('operation.pleaseEnter')"
              style="width: 500px"
            />
          </el-form-item>
        </template>
        <template v-if="queryParams.defineType == 2">
          <el-form-item
            :label="$t('operation.title1')"
            prop="jumpActive"
            :rules="[
              {
                required: true,
                message: $t('operation.tip51'),
                trigger: 'blur'
              }
            ]"
          >
            <el-select
              v-model="queryParams.jumpActive"
              :placeholder="$t('operation.tip51')"
              style="width: 500px"
            >
              <el-option
                v-for="item in dataList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item
          :label="$t('operation.tip143')"
          prop="type"
          :rules="[
            {
              required: true,
              message: $t('operation.paleaseChose'),
              trigger: 'blur'
            }
          ]"
        >
          <el-select
            v-model="queryParams.type"
            clearable
            :placeholder="$t('operation.paleaseChose')"
            style="width: 500px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('operation.issuebonus1')"
          prop="amount"
          :rules="[
            {
              required: true,
              message: $t('operation.tip144'),
              trigger: 'blur'
            }
          ]"
        >
          <el-input
            v-model="queryParams.amount"
            type="number"
            :placeholder="$t('operation.pleaseEnter')"
            style="width: 500px"
          />
        </el-form-item>
        <el-form-item :label="$t('operation.remark')" prop="remark">
          <el-input
            v-model="queryParams.remark"
            :placeholder="$t('operation.pleaseEnter')"
            style="width: 500px"
          />
        </el-form-item>
        <template
          v-if="
            queryParams.type == 0 ||
            queryParams.type == 1 ||
            queryParams.type == 2 ||
            queryParams.type == 3
          "
        >
          <el-form-item
            :label="$t('operation.TurnoverMultiple1')"
            prop="multiple"
            :rules="[
              {
                required: true,
                message: $t('operation.tip145'),
                trigger: 'blur'
              }
            ]"
          >
            <el-input
              v-model="queryParams.multiple"
              type="number"
              :placeholder="$t('operation.pleaseEnter')"
              style="width: 500px"
            />
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" style="width: 130px" @click="submitForm(queryRef)">{{
            $t('operation.submit')
          }}</el-button>
          <el-button style="width: 130px" @click="resetQuery(queryRef)">{{
            $t('operation.reset')
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { addWelfareApi } from '@/api/operation/welfare'
import { getAdvertisingntListTitleApi } from '@/api/operation/carousel'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()

const queryRef = ref()
const queryParams = ref({
  activityId: '', // 活动id
  activityName: '', // 活动名称
  deliveryType: '1', // 账号类型
  deliveryAccount: '', // 会员账号字符串
  deliveryAccountList: [], // 会员账号数组
  defineType: '7', // 红利类型
  title: '', // 标题
  type: '', // 存入类型
  amount: '', // 发放红利
  remark: '', // 备注
  multiple: '', // 流水倍数
  jumpActive: '' // 关联活动
})

const options = [
  {
    value: '0',
    label: i18n.global.t('operation.tip146')
  },
  {
    value: '1',
    label: i18n.global.t('operation.cash')
  },
  {
    value: '2',
    label: i18n.global.t('operation.cashcoupons')
  },

  {
    value: '3',
    label: i18n.global.t('operation.depositcoupon')
  },

  {
    value: '4',
    label: i18n.global.t('operation.TurnoverCoupons')
  },
  {
    value: '5',
    label: i18n.global.t('operation.physicalObject')
  }
]

// 活动标题数组
const dataList = ref([])
onMounted(() => {
  getAdvertisingntListTitleApi().then((res) => {
    dataList.value = res
  })
})

// 重置
const resetQuery = (formEl) => {
  formEl.resetFields()
  queryParams.value.deliveryAccount = ''
  queryParams.value.title = ''
  queryParams.value.jumpActive = ''
}

// 选择器改变
watch(
  () => queryParams.value.deliveryType,
  (newVal, oldVal) => {
    if (newVal) {
      queryParams.value.deliveryAccount = ''
    }
  }
)

// 监听输入逗号
const inputTextarea = () => {
  queryParams.value.deliveryAccount = queryParams.value.deliveryAccount.replace(/，/g, ',')
}

// 提交
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (queryParams.value.deliveryAccount) {
        const deliveryAccountArr = queryParams.value.deliveryAccount
          .split(',')
          .map((item) => item.trim())
        queryParams.value.deliveryAccountList = [...new Set(deliveryAccountArr)].filter(
          (item) => item !== null && item !== undefined && item !== ''
        )
      }
      // 根据数组匹配对应的值 渲染typeId
      if (queryParams.value.defineType == '2') {
        const activeType = dataList.value.find((item) => item.id == queryParams.value.jumpActive)
        queryParams.value.activityId = activeType.id
        queryParams.value.activityName = activeType.name
        queryParams.value.defineType = activeType.type
      } else {
        queryParams.value.title = ''
        queryParams.value.activityName = ''
        queryParams.value.activityId = ''
      }
      if (queryParams.value.jumpActive) {
        queryParams.value.title = queryParams.value.activityName
      }
      queryParams.value.labelName = options.find(
        (item) => item.value === queryParams.value.type
      ).label
      addWelfareApi(queryParams.value)
        .then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t('operation.addsuccessful'))
          formEl.resetFields()
        })
        .catch((res) => {})

      // cole.log(ruleForm.value,"ruleForm")
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.text-field {
  width: 650px;
  margin: 0 auto;
}
</style>
