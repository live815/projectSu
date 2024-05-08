<!-- 代理转账 -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="formRef" label-width="auto" :inline="true" :rules="rules">
      <el-form-item label="转出代理账号 :" prop="transferOutAgentName">
        <el-input
          v-model="queryParams.transferOutAgentName"
          placeholder="请输入转出代理账号"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item
        :label="$t('agent.limitType') + ' :'"
        :placeholder="$t('agent.pleaseSelect')"
        prop="walletType"
        :rules="[
          {
            required: true,
            message: $t('agent.pleaseSelectWalletType'),
            trigger: 'blur'
          }
        ]"
      >
        <el-select
          v-model="queryParams.walletType"
          clearable
          :placeholder="$t('agent.pleaseSelectWalletType')"
          style="width: 300px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="可用额度 :" prop="agentWallet">
        <el-input
          v-model="agentWallet"
          :placeholder="CurUnit + $t('agent.enterTheQuotaBalance')"
          disabled
          style="width: 300px"
        />
        <el-button type="primary" @click="getWallet" style="margin-left: 10px">查询</el-button>
      </el-form-item>
      <el-form-item label="转入代理 :" prop="transferInAgentName">
        <el-input
          v-model="queryParams.transferInAgentName"
          placeholder="请输入转入代理账号"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item label="转账金额 :" prop="transferMoney">
        <el-input
          v-model="queryParams.transferMoney"
          placeholder="请输入转账金额"
          style="width: 300px"
          maxlength="16"
        />
      </el-form-item>
      <el-form-item label="申请信息 :">
        <el-input
          v-model="queryParams.applicantMark"
          :rows="4"
          maxlength="500"
          show-word-limit
          type="textarea"
          placeholder="请输入申请信息"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item style="margin: 30px 0px 0px 240px">
        <el-button style="width: 80px" @click="resetFrom">取消</el-button>
        <el-button style="width: 80px" type="primary" @click="submit">{{
          $t('agent.ensure')
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAgentTransferSaveApi } from '@/api/agent/agentTransfer'
import { getWalletBalance } from '@/api/agent/agentList'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
const queryParams = ref({
  applicantMark: '',
  transferInAgentName: '',
  transferMoney: null,
  walletType: null,
  transferOutAgentName: ''
})

// 获取代理余额
const agentWallet = ref(null)
const getWallet = () => {
  if (!queryParams.value.transferOutAgentName) {
    proxy.$modal.msgWarning('请输入转出代理')
    return
  }
  getWalletBalance({
    agentName: queryParams.value.transferOutAgentName,
    walletType: queryParams.value.walletType
  }).then((res) => {
    agentWallet.value = res
  })
}
const options = [
  {
    value: 0,
    label: i18n.global.t('agent.quotaWallet')
  },
  {
    value: 1,
    label: i18n.global.t('agent.creditWallet')
  }
]
const CurUnit = computed(() => {
  let site = import.meta.env.VITE_SITE
  switch (site) {
    case 'cn':
      return '￥'
    case 'vietnam':
      return '₫'
    case 'en':
      return '￥'
    default:
      return '￥'
  }
})
// 表单验证
const formRef = ref(null)
const rules = ref({
  transferOutAgentName: [{ required: true, message: '转出代理不能为空', trigger: 'blur' }],
  transferInAgentName: [
    { required: true, message: '转入代理不能为空', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (queryParams.value.transferInAgentName === queryParams.value.transferOutAgentName) {
          callback(new Error('转出和转入代理账号不能相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  transferMoney: [
    { required: true, message: '转账金额不能为空', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        const regex = /^\d+(\.\d{1,2})?$/
        if (!value.match(regex) || queryParams.value.transferMoney < 1) {
          callback(new Error('转账金额须为大于1的合法数字，最多支持小数点后两位'))
        } else if (!agentWallet.value) {
          callback(new Error('请先查询代理可用额度'))
        } else if (parseFloat(queryParams.value.transferMoney) > parseFloat(agentWallet.value)) {
          callback(new Error('转账金额超限，请重新输入！'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const submit = () => {
  formRef.value.validate((vali) => {
    if (vali) {
      getAgentTransferSaveApi(queryParams.value).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t('agent.applicatSuccess'))
        resetFrom()
      })
    }
  })
}
// 重置表单
const resetFrom = () => {
  formRef.value.resetFields()
  queryParams.value = {
    applicantMark: '',
    transferInAgentName: '',
    transferMoney: null,
    transferOutAgentName: ''
  }
  agentWallet.value = null
}
</script>

<style lang="scss" scoped>
.app-container {
  border: 1px solid #f2f2f2;
  width: 683px;
  margin: 0 auto;
  padding-left: 130px;
}
</style>
