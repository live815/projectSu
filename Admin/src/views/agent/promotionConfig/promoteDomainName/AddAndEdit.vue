<template>
  <div>
    <el-form :model="queryParams" label-width="120px" ref="ruleFormRef" :rules="rules">
      <el-form-item :label="$t('agent.agentAccount')" prop="agentName">
        <el-input
          v-model="queryParams.agentName"
          :placeholder="$t('agent.pleaseEnterAgentAccount')"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.domainNameType')" prop="domainType">
        <el-select
          v-model="queryParams.domainType"
          clearable
          :placeholder="$t('agent.pleaseEnterDomainNameType')"
          style="width: 400px"
        >
          <el-option
            v-for="item in domainTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-for="(domainName, index) in domains"
        :key="index"
        :label="$t('agent.domainName') + (index + 1) + ' :'"
      >
        <el-input
          v-model="domainName.value"
          :placeholder="$t('agent.pleaseEnterDomainName')"
          style="width: 400px"
        >
        </el-input>
        <div class="right">
          <div class="bottom" @click="addNewDomainInput">+</div>
          <div class="bottom" @click="removeDomainInput(index)" v-if="domains.length > 1">-</div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('agent.appDownloadAddressQuot')" prop="appDownloadUrl">
        <el-input
          v-model="queryParams.appDownloadUrl"
          :placeholder="$t('agent.pleaseEnterTheDownloadAddress')"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.remark')" prop="remark">
        <el-input
          v-model="queryParams.remark"
          :rows="4"
          maxlength="50"
          :placeholder="$t('agent.pleaseFillInTheRemarks')"
          show-word-limit
          type="textarea"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(ruleFormRef)">{{ $t('agent.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{
          $t('agent.ensure')
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  addProxyDomainNameApi,
  editProxyDomainNameApi
} from '@/api/agent/promotionConfig/promotionConfig.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import i18n from '@/i18n'

const emit = defineEmits(['submitBtn'])
const ruleFormRef = ref()
const props = defineProps({
  opRow: {
    type: Object,
    default: null
  }
})
const queryParams = ref({
  id: '',
  agentName: '',
  appDownloadUrl: '',
  createBy: '',
  domainName: '',
  domainType: '',
  remark: '',
  status: '',
  tenantId: ''
})
//校验
const rules = ref({
  domainType: [
    {
      required: true,
      message: i18n.global.t('agent.pleaseSelectDomainNameType'),
      trigger: 'blur'
    }
  ],
  domainName: [
    {
      required: true,
      message: i18n.global.t('agent.pleaseEnterDomainName'),
      trigger: 'blur'
    }
  ],
  agentName: [
    {
      validator: (rule, value, callback) => {
        console.log(value)
        if (queryParams.value.domainType == 3) {
          value ? callback() : callback(new Error('请输入代理账号'))
        } else {
          callback()
        }
      }
    }
  ]
})
//新增域名按钮
const domains = ref([{ value: '' }])
const addNewDomainInput = () => {
  domains.value.push({ value: '' })
}
const removeDomainInput = (index) => {
  domains.value.splice(index, 1)
}

// 添加http://
// const addHttps = (val) => {
//   const regex = /^https:/i;
//   let isGood = regex.test(val);
//   if (!isGood) {
//     val = "https://" + val;
//     return val;
//   } else {
//     return val;
//   }
// };
const domainTypeList = ref([
  {
    value: '',
    label: i18n.global.t('agent.pleaseSelect')
  },
  {
    value: 0,
    label: i18n.global.t('agent.pcLandingPage')
  },
  {
    value: 1,
    label: i18n.global.t('agent.h5LandingPage')
  },
  {
    value: 2,
    label: i18n.global.t('agent.commonDomainName')
  },
  {
    value: 3,
    label: i18n.global.t('agent.exclusiveDomainName')
  },
  {
    value: 4,
    label: i18n.global.t('agent.h5PromotionDomainName')
  },
  {
    value: 5,
    label: i18n.global.t('agent.alternateDomainName')
  },
  {
    value: 6,
    label: i18n.global.t('agent.pcProxyLink')
  },
  {
    value: 7,
    label: i18n.global.t('agent.h5ProxyLink')
  },
  {
    value: 8,
    label: i18n.global.t('agent.fullSiteAppAgentLink')
  },
  {
    value: 9,
    label: i18n.global.t('agent.sportsAppAgentLink')
  }
])
// 传递过来的当前项值
const onComputedOpRow = computed(() => {
  return props.opRow
})
//数据回显
onMounted(() => {
  if (props.opRow.id) {
    Object.assign(queryParams.value, {
      id: onComputedOpRow.value.id,
      agentName: onComputedOpRow.value.agentName,
      domainType: onComputedOpRow.value.domainType,
      domainName: onComputedOpRow.value.domainName,
      appDownloadUrl: onComputedOpRow.value.appDownloadUrl,
      remark: onComputedOpRow.value.remark
    })
    domains.value = onComputedOpRow.value.domainName.split(',').map((value) => ({ value }))
  }
})
//新增
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (onComputedOpRow.value.id) {
        queryParams.value.domainName = domains.value.map((item) => item.value).join(',')
        editProxyDomainNameApi(queryParams.value).then((res) => {
          emit('submitBtn', 1)
          ElMessage({
            type: 'success',
            message: i18n.global.t('agent.updateSuccessfully')
          })
        })
      } else {
        if (onComputedOpRow)
          queryParams.value.domainName = domains.value.map((item) => item.value).join(',')
        addProxyDomainNameApi(queryParams.value)
          .then(() => {
            emit('submitBtn', 1)
            ElMessage({
              type: 'success',
              message: i18n.global.t('agent.addSuccessfully')
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 重置表单
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  ruleFormRef.value.resetFields()
  emit('submitBtn', 2)
}
</script>

<style lang="scss" scoped>
.right {
  display: flex;
  gap: 5px;
  .bottom {
    text-align: center;
    border: 1px solid #aaaaaa;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
