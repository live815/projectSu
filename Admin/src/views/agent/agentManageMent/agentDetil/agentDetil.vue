<template>
  <div class="app-container">
    <div class="header-row">
      <el-form-item>
        <el-input v-model="agentNameInput">
          <template #prepend>
            <span>{{ $t('agent.agentAccount') }}</span>
          </template>
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="getAgentInfoByName">{{ $t('agent.search') }}</el-button>
    </div>
    <div class="sub-title-row">
      <div>
        {{ $t('agent.agentAccountQuote')
        }}<span class="organe-text">{{ detailData.agentUsername || '-' }}</span>
      </div>
      <div>
        {{ $t('agent.agentLevelQuote')
        }}<span class="organe-text">{{ detailData.agentLevel + 1 || '-' }}</span>
      </div>
      <div>
        {{ $t('agent.immediateSuperiorQuote')
        }}<span class="organe-text">{{ detailData.superiorAgentName || '-' }}</span>
      </div>
      <div>
        {{ $t('agent.developerQuot')
        }}<span class="organe-text">{{ detailData.developer || '-' }}</span>
      </div>
      <div>
        {{ $t('agent.maintainerQuot')
        }}<span class="organe-text">{{ detailData.defender || '-' }}</span>
      </div>
      <div>
        {{ $t('agent.createByQuote')
        }}<span class="organe-text">{{ detailData.createBy || '-' }}</span>
      </div>
      <div>
        {{ $t('agent.creationDateQuote')
        }}<span class="organe-text">{{ detailData.createTime || '-' }}</span>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('agent.basicInformation')" name="1">
        <div class="app-container">
          <baseInfo v-if="activeName == 1" :detailData="detailData" />
        </div>
      </el-tab-pane>

      <el-tab-pane :label="$t('agent.financialInformation')" name="2">
        <div class="app-container"><fundInfo v-if="activeName == 2" /></div>
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.teamInformation')" name="3">
        <div class="app-container">
          <teamInfo v-if="activeName == 3" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.loginInformation')" name="4">
        <div class="app-container">
          <loginInfo v-if="activeName == 4" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { getAgentDetailtApi, getAgentInfoByNameApi } from '@/api/agent/agentList.js'
import baseInfo from './components/baseInfo.vue'
import fundInfo from './components/fundInfo.vue'
import teamInfo from './components/teamInfo.vue'
import loginInfo from './components/loginInfo.vue'
import { useRouter, useRoute } from 'vue-router'
import i18n from '@/i18n'
const router = useRouter()
const route = useRoute()
const { proxy } = getCurrentInstance()

onMounted(() => {
  getDetailData(route.query.id)
})
const getDetailData = (id) => {
  // console.log("获取啊");
  getAgentDetailtApi(id).then((res) => {
    detailData.value = res
  })
}
const activeName = ref('1')
const detailData = ref({})

const agentNameInput = ref('')
const getAgentInfoByName = () => {
  if (!agentNameInput.value) {
    proxy.$modal.msgError(i18n.global.t('agent.agentAccountCannotBeEmpty'))

    return
  }
  let params = { agentUserName: agentNameInput.value }
  getAgentInfoByNameApi(params).then((res) => {
    let id = BigInt(res).toString()
    console.log(id)
    router.push({
      name: 'AgentDetail',
      query: {
        id
      }
    })
  })
}

watch(
  () => route.query.id,
  (newId, oldId) => {
    if (route.path == '/agent/agentManageMent/agentDetail') {
      getDetailData(newId)
    }
  }
)
</script>

<style lang="scss" scoped>
.header-row {
  display: flex;
  padding-top: 28px;
  gap: 20px;
  height: 80px;
  // padding-left: 40px;
}

.sub-title-row {
  display: flex;
  gap: 65px;
  height: 45px;
  // align-items: center;
  font-size: 20px;
  font-weight: 600;

  .organe-text {
    color: rgb(255, 90, 0);
  }
}
</style>
