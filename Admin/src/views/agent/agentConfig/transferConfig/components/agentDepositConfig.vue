<template>
  <div>
    <div class="title">
      代存配置
      <el-button class="btn" type="primary" @click="updataData">编辑</el-button>
    </div>
    <div class="row">代存限额配置：</div>
    <el-row>
      <el-col :span="9">
        <div class="row">
          信用代存限额：<el-input
            v-model="queryParams.creditDepositStart"
            :placeholder="$t('agent.pleaseInput')"
            @input="handleInput('creditDepositStart')"
            style="width: 150px"
            maxlength="16" />至
          <el-input
            v-model="queryParams.creditDepositEnd"
            :placeholder="$t('agent.pleaseInput')"
            @input="handleInput('creditDepositEnd')"
            style="width: 200px"
            maxlength="16" /></div
      ></el-col>
      <el-col class="el-row" :span="12">
        <div>
          信用代存当日限额：
          <el-input
            v-model="queryParams.creditDepositTodayLimit"
            :placeholder="$t('agent.pleaseInput')"
            @input="handleInput('creditDepositTodayLimit')"
            style="width: 200px"
            maxlength="16" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9">
        <div class="row">
          额度代存限额：<el-input
            v-model="queryParams.quotaDepositStart"
            :placeholder="$t('agent.pleaseInput')"
            @input="handleInput('quotaDepositStart')"
            style="width: 150px"
            maxlength="16" />至
          <el-input
            v-model="queryParams.quotaDepositEnd"
            :placeholder="$t('agent.pleaseInput')"
            @input="handleInput('quotaDepositEnd')"
            style="width: 200px"
            maxlength="16" /></div
      ></el-col>
      <el-col class="el-row" :span="12">
        <div>
          额度代存当日限额：
          <el-input
            v-model="queryParams.quotaDepositTodayLimit"
            :placeholder="$t('agent.pleaseInput')"
            @input="handleInput('quotaDepositTodayLimit')"
            style="width: 200px"
            maxlength="16" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
import { getDepositConfigApi, updateDepositConfigApi } from '@/api/agent/agentConfig.js'

const queryParams = ref({
  creditDepositEnd: 0,
  creditDepositStart: 0,
  creditDepositTodayLimit: 0,
  quotaDepositEnd: 0,
  quotaDepositStart: 0,
  quotaDepositTodayLimit: 0
})
onMounted(() => {
  getData()
})

const getData = () => {
  getDepositConfigApi().then((res) => {
    queryParams.value = res
  })
}

const updataData = () => {
  let { creditDepositEnd, creditDepositStart, quotaDepositStart, quotaDepositEnd } =
    queryParams.value
  if (queryParams.value.creditDepositTodayLimit < queryParams.value.creditDepositStart * 1) {
    proxy.$modal.msgWarning(`${i18n.global.t('agent.depositLimit')}`)
    return
  }
  if (queryParams.value.quotaDepositTodayLimit < queryParams.value.quotaDepositStart * 1) {
    proxy.$modal.msgWarning(`${i18n.global.t('agent.depositLimit')}`)
    return
  }
  if (creditDepositEnd || creditDepositStart) {
    if (queryParams.value.creditDepositEnd * 1 <= queryParams.value.creditDepositStart * 1) {
      proxy.$modal.msgWarning(`${i18n.global.t('agent.withdrawSetingTip1')}`)
      return
    }
    if (!queryParams.value.creditDepositStart) {
      queryParams.value.creditDepositStart = 0
    }
  }
  if (quotaDepositStart || quotaDepositEnd) {
    if (queryParams.value.quotaDepositEnd * 1 <= queryParams.value.quotaDepositStart * 1) {
      proxy.$modal.msgWarning(`${i18n.global.t('agent.withdrawSetingTip2')}`)
      return
    }
    if (!queryParams.value.quotaDepositStart) {
      queryParams.value.quotaDepositStart = 0
    }
  }

  updateDepositConfigApi(queryParams.value).then((res) => {
    proxy.$modal.msgSuccess(`${i18n.global.t('agent.submittedSuccessfully')}`)
    getData()
  })
}

// 拼音输入时实时更新输入值
const handleInput = (field) => {
  queryParams.value[field] = queryParams.value[field].replace(/^(0+)|[^\d]+/g, '')
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: 600;
}
.btn {
  margin-left: 50px;
}
div {
  margin-top: 15px;
}
.row {
  display: flex;
  align-items: center;
  gap: 15px;
}
.el-row {
  margin-top: 15px;
  align-items: center;
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
