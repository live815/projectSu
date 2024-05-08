<template>
  <div>
    <div class="title">
      提现方式配置
      <el-button class="btn" type="primary" @click="updateConfig">编辑</el-button>
    </div>

    <div>提现方式开关：</div>
    <div class="row">
      银行卡提现：
      <el-switch v-model="queryParams.bankCardWithdraw" size="large" />
    </div>
    <div class="row">
      USDT提现：
      <el-switch v-model="queryParams.usdtWithdraw" size="large" />
    </div>
    <div class="gap">提现限额设置：</div>
    <el-form :model="queryParams" :rules="rules" ref="formRef">
      <div class="row">
        银行卡提现限额：
        <el-form-item prop="bankCardWithdrawStart">
          <el-input
            v-model="queryParams.bankCardWithdrawStart"
            @input="handleInput('bankCardWithdrawStart')"
            style="width: 200px"
            maxlength="16"
            :placeholder="$t('agent.pleaseInput')" />
        </el-form-item>

        至
        <el-form-item prop="bankCardWithdrawEnd">
          <el-input
            v-model="queryParams.bankCardWithdrawEnd"
            @input="handleInput('bankCardWithdrawEnd')"
            style="width: 200px"
            maxlength="16"
            :placeholder="$t('agent.pleaseInput')" />
        </el-form-item>
      </div>
      <div class="row">
        USDT提现限额：
        <el-form-item prop="usdtWithdrawStart">
          <el-input
            v-model="queryParams.usdtWithdrawStart"
            @input="handleInput('usdtWithdrawStart')"
            style="width: 200px"
            maxlength="16"
            :placeholder="$t('agent.pleaseInput')"
        /></el-form-item>

        至
        <el-form-item prop="usdtWithdrawEnd">
          <el-input
            v-model="queryParams.usdtWithdrawEnd"
            @input="handleInput('usdtWithdrawEnd')"
            style="width: 200px"
            maxlength="16"
            :placeholder="$t('agent.pleaseInput')" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { getWithdrawWayApi, updateWithdrawWayApi } from '@/api/agent/agentConfig.js'
const { proxy } = getCurrentInstance()
const formRef = ref(null)
onMounted(() => {
  getData()
})
const getData = () => {
  getWithdrawWayApi().then((res) => {
    queryParams.value = res
  })
}
const updateConfig = () => {
  formRef.value.validate((vali) => {
    if (vali) {
      updateWithdrawWayApi(queryParams.value).then((res) => {
        proxy.$modal.msgSuccess(`${i18n.global.t('agent.submittedSuccessfully')}`)
        getData()
      })
    } else {
      return
    }
  })
}
const queryParams = ref({
  bankCardWithdraw: true,
  bankCardWithdrawEnd: null,
  bankCardWithdrawStart: null,
  usdtWithdraw: true,
  usdtWithdrawEnd: null,
  usdtWithdrawStart: null
})

// 校验
const bankValid = (rule, value, callback) => {
  const start = queryParams.value.bankCardWithdrawStart
  const end = queryParams.value.bankCardWithdrawEnd
  if (!start && !end) {
    callback()
  } else {
    console.log(queryParams.value, '11111111111')
    if (!start || !end || end * 1 <= start * 1) {
      callback(new Error(`${i18n.global.t('agent.withdrawSetingTip')}`))
    } else {
      callback()
    }
  }
}

const usdtValid = (rule, value, callback) => {
  const start = queryParams.value.usdtWithdrawStart
  const end = queryParams.value.usdtWithdrawEnd
  if (!start && !end) {
    callback()
  } else {
    console.log()
    if (!start || !end * 1 || end <= start * 1) {
      callback(new Error(`${i18n.global.t('agent.withdrawSetingTip')}`))
    } else {
      callback()
    }
  }
}

const rules = {
  bankCardWithdrawStart: [{ validator: bankValid, trigger: [] }],
  bankCardWithdrawEnd: [{ validator: bankValid, trigger: [] }],
  usdtWithdrawStart: [{ validator: usdtValid, trigger: [] }],
  usdtWithdrawEnd: [{ validator: usdtValid, trigger: [] }]
}

// 拼音输入时实时更新输入值
const handleInput = (field) => {
  queryParams.value[field] = queryParams.value[field].replace(/^(0+)|[^\d]+/g, '')
}
</script>

<style lang="scss" scoped>
div {
  margin-top: 15px;
  margin-top: 15px;
}
.title {
  font-size: 24px;
  font-weight: 600;
}
.btn {
  margin-left: 50px;
}
.row {
  display: flex;
  align-items: center;
  gap: 15px;
}
.gap {
  margin-top: 30px;
}
:deep() {
  .el-switch {
    margin: 0;
  }
  .el-input {
    margin: 0;
  }
}
</style>
