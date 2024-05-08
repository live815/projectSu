<template>
  <div class="baseInfo-container">
    <!-- 头部 -->
    <div class="baseInfo-header-row">
      <div class="left-box">
        <div class="black-box">{{ $t('agent.basicInformation') }}</div>
        <el-button type="primary" :icon="Refresh" @click="refresh">{{
          $t('agent.refresh')
        }}</el-button>
      </div>
      <div class="right-box">
        <div class="tag-add-btn" @click="openEditTag">
          <div>
            <el-icon>
              <Edit style="transform: scale(1.5)" />
            </el-icon>
          </div>
          <div>{{ $t('agent.labelEditing') }}</div>
        </div>
        <div class="tag-row">
          <el-tag class="tag" v-for="item in tagList" :key="item.id">{{ item.tagName }}</el-tag>
        </div>
      </div>
    </div>
    <!-- 概要消息 -->
    <div class="main-info-container">
      <div class="header">{{ $t('agent.summaryMessage') }}</div>
      <div class="main-info-row">
        <div class="info-box">
          {{ $t('agent.agentAccountQuote') }}{{ detailData.agentUsername }}
        </div>
        <div class="info-box">
          {{ $t('agent.agentLevelQuote') }}{{ detailData.agentLevel + 1 || '-' }}
        </div>
        <div class="info-box">
          {{ $t('agent.immediateSuperiorQuote') }}{{ detailData.superiorAgentName || '-' }}
        </div>
        <div class="info-box">
          {{ $t('agent.agentType')
          }}{{ detailData.agentType ? $t('agent.outerAgent') : $t('agent.innerAgent') }}
          <span class="edit-text" @click="openBaseEdit(13)">{{ $t('agent.revise') }}</span>
        </div>
      </div>
      <div class="main-info-row">
        <div class="info-box">
          {{ $t('agent.accountStatus') }}{{ selectMap[detailData?.status] || '-'
          }}<span class="edit-text" @click="openBaseEdit(0)">{{ $t('agent.revise') }}</span>
        </div>
        <div class="info-box">
          {{ $t('agent.agentModel')
          }}{{ detailData.agentMode ? $t('agent.dispatchMode') : $t('agent.commissionMode')
          }}<span class="edit-text" @click="openBaseEdit(1)">{{ $t('agent.revise') }}</span>
        </div>
        <div class="info-box">
          {{ $t('agent.commisionPlan') }}{{ detailData.commissionRebateConfigName
          }}<span class="edit-text" @click="openBaseEdit(2)">{{ $t('agent.revise') }}</span>
        </div>
        <div class="info-box">
          {{ $t('agent.commissionCycle')
          }}{{ detailData.commissionPeriod ? $t('agent.naturalMonth') : $t('agent.naturalMonth') }}
        </div>
      </div>
      <div class="main-info-row">
        <div class="info-box">
          {{ $t('agent.commissionMethod') }}:{{
            detailData.grantCommissionWay
              ? $t('agent.releaseAllAgents')
              : $t('agent.issueFirstLevelAgents')
          }}
        </div>
        <div class="info-box">
          {{ $t('agent.developerQuot') }}{{ detailData.developer || '-'
          }}<span class="edit-text" @click="openBaseEdit(3)">{{ $t('agent.revise') }}</span>
        </div>
        <div class="info-box">
          {{ $t('agent.maintainerQuot') }}{{ detailData.defender || '-'
          }}<span class="edit-text" @click="openBaseEdit(4)">{{ $t('agent.revise') }}</span>
        </div>
        <div class="info-box">
          {{ $t('agent.creditWalletQuot') }}
          <span v-if="detailData.creditWalletStatus === 0">{{ $t('agent.enable') }}</span>
          <span v-if="detailData.creditWalletStatus === 1">{{ $t('agent.disable') }}</span>

          <span class="edit-text" @click="openBaseEdit(5)">{{ $t('agent.revise') }}</span>
        </div>
      </div>
      <div class="single-row">
        {{ $t('agent.jointVentureCode') }}{{ detailData.jointVentureCode }}
      </div>
      <div class="single-row">
        <div>{{ $t('agent.createTimeQuote') }}{{ detailData.createTime }}</div>
        <div>{{ $t('agent.lastLoginTime') }}{{ detailData.lastLoginTime }}</div>
        <div>{{ $t('agent.offlineDays') }}{{ detailData.offlineDays }}</div>
      </div>
    </div>
    <!-- 个人资料 -->
    <div class="personal-info-container">
      <div class="header">{{ $t('agent.personalInformation') }}</div>
      <el-form label-width="auto" label-position="left">
        <el-row style="width: 1500px">
          <el-col :span="6">
            <el-form-item :label="$t('agent.nameQuote')" disabled size="large">
              <el-input
                style="width: 230px"
                disabled
                v-model="detailData.realName"
                :placeholder="$t('agent.noData')"
              />
              <span class="edit-text" @click="openBaseEdit(6)">{{ $t('agent.revise') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6"
            ><el-form-item :label="$t('agent.genderQuote')" size="large">
              <el-input
                style="width: 230px"
                v-model="agentSex"
                :placeholder="$t('agent.noData')"
                disabled
              />
              <span class="edit-text" @click="openBaseEdit(7)">{{ $t('agent.revise') }}</span>
            </el-form-item></el-col
          >
          <el-col :span="6"
            ><el-form-item :label="$t('agent.birthday')" size="large">
              <el-input
                style="width: 230px"
                v-model="detailData.birthday"
                :placeholder="$t('agent.noData')"
                disabled
              />
              <span class="edit-text" @click="openBaseEdit(8)">{{
                $t('agent.revise')
              }}</span></el-form-item
            ></el-col
          >
          <el-col :span="6"
            ><el-form-item :label="$t('agent.phoneNumber')" size="large">
              <el-input
                style="width: 230px"
                v-model="detailData.mobile"
                :placeholder="$t('agent.noData')"
                disabled
              />
              <span class="edit-text" @click="openBaseEdit(9)">{{ $t('agent.revise') }}</span>
            </el-form-item></el-col
          >
        </el-row>
        <el-row style="width: 1500px">
          <el-col :span="6"
            ><el-form-item :label="$t('agent.email')" size="large">
              <el-input
                style="width: 230px"
                v-model="detailData.email"
                :placeholder="$t('agent.noData')"
                disabled
              />
              <span class="edit-text" @click="openBaseEdit(10)">{{ $t('agent.revise') }}</span>
            </el-form-item></el-col
          >
          <el-col :span="6"
            ><el-form-item :label="$t('agent.wechat')" size="large">
              <el-input
                style="width: 230px"
                v-model="detailData.wx"
                :placeholder="$t('agent.noData')"
                disabled
              />
              <span class="edit-text" @click="openBaseEdit(11)">{{ $t('agent.revise') }}</span>
            </el-form-item></el-col
          >
          <el-col :span="6"
            ><el-form-item :label="$t('agent.qq')" size="large">
              <el-input
                style="width: 230px"
                v-model="detailData.qq"
                :placeholder="$t('agent.noData')"
                disabled
              />
              <span class="edit-text" @click="openBaseEdit(12)">{{ $t('agent.revise') }}</span>
            </el-form-item></el-col
          >
          <el-col :span="6"
            ><el-form-item :label="$t('agent.paymentPassword')" size="large">
              <el-input
                style="width: 230px"
                v-model="paymentPassword"
                :placeholder="$t('agent.noData')"
                disabled
              />
              <span class="edit-text" @click="changePayword">{{ $t('agent.reset') }}</span>
            </el-form-item></el-col
          >
        </el-row>
      </el-form>
    </div>
    <!-- 备注信息 -->
    <div class="remark-info-container">
      <div class="header">
        {{ $t('agent.remarks') }}
        <el-button type="primary" @click="openAddRemark({ type: 1 })">{{
          $t('agent.add')
        }}</el-button>
      </div>
      <el-table :data="remarkData.records" border style="width: 100%">
        <el-table-column :label="$t('agent.serialNumber')" width="90">
          <template #default="{ $index }">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('agent.updateTime')" />
        <el-table-column prop="remark" :label="$t('agent.noteContent')" width="800px" />
        <el-table-column prop="createBy" :label="$t('agent.noteAccountNumber')" />
      </el-table>
      <div class="pagination-box">
        <el-pagination
          background
          :page-sizes="[5, 10, 20]"
          layout="total,sizes, prev, pager, next"
          :total="remarkData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 备注/标签 编辑弹窗 -->
    <el-dialog
      v-model="showAddRemark"
      width="800px"
      :before-close="closeAddRemark"
      class="commissonConfig-dialog"
      :title="editCode == 1 ? $t('agent.addANote') : $t('agent.addNewTag')"
      align="center"
    >
      <remarkAdd
        v-if="showAddRemark"
        :agentId="route.query.id"
        :editCode="editCode"
        @closeAddRemark="closeAddRemark"
      />
    </el-dialog>
    <!-- 标签{{$t('agent.check')}}弹窗 -->
    <el-dialog
      v-model="showEditTag"
      width="1200px"
      :before-close="closeEditTag"
      class="commissonConfig-dialog"
      :title="$t('agent.labelEditing')"
      :center="true"
      @getTagList="getTagList"
    >
      <editTag
        v-if="showEditTag"
        :tagList="tagList"
        @getTagList="getTagList"
        @closeEditTag="closeEditTag"
      />
    </el-dialog>
    <!-- 基本信息编辑弹窗 -->
    <el-dialog
      v-model="showBaseEdit"
      width="1200px"
      :before-close="closeBaseEdit"
      class="commissonConfig-dialog"
      :title="dialogTitleMap[baseInfoType]"
      :center="true"
    >
      <editBaseInfo
        :detailData="detailData"
        :baseInfoType="baseInfoType"
        @closeBaseEdit="closeBaseEdit"
        v-if="showBaseEdit"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import {
  getAgentTagApi,
  getActiveAgentRemarkListApi,
  getAgentDetailtApi,
  resetAgentPaywordApi
} from '@/api/agent/agentList.js'
import { useRoute } from 'vue-router'
import { deepCopy } from '@/utils'
import remarkAdd from './editLog/remarkAdd.vue'
import editTag from './editLog/editTag.vue'
import editBaseInfo from './editLog/editBaseInfo.vue'
import i18n from '@/i18n'
import { ElMessageBox, ElMessage } from 'element-plus'

const route = useRoute()
const paymentPassword = ref('**********')
const { proxy } = getCurrentInstance()
const props = defineProps(['detailData'])
const refresh = () => {
  getAllData()
  getAgentDetailtApi(route.query.id).then((res) => {
    detailData.value = res
    proxy.$modal.msgSuccess(i18n.global.t('system.RefreshSuccess'))
  })
}
onMounted(() => {
  getAllData()
})

const getAllData = () => {
  getTagList()
  getRemarkList()
  getAgentDetailtApi(route.query.id).then((res) => {
    detailData.value = res
  })
}

const detailData = ref({})

const getDetailData = () => {
  detailData.value = deepCopy(props.detailData)
}

watch(
  props,
  (val) => {
    getDetailData()
  },
  { deep: true }
)

// 重置密码功能
const changePayword = () => {
  ElMessageBox.confirm(i18n.global.t('agent.paywordTip'))
    .then(() => {
      resetAgentPaywordApi(route.query.id).then((res) => {
        ElMessage({
          type: 'success',
          // message: i18n.global.t('operation.deleteSuccess'),
          message: res.msg
        })
      })
    })
    .catch(() => {})
}

// {{$t('agent.revise')}}信息弹窗
// 调整内容类型（0：账号状态 1：代理模式 2：佣金方案 3：发展人 4：维护人 5：信用钱包状态
// 6：姓名 7：性别 8：出生日期 9：手机号码 10：邮箱 11：微信 12：QQ）
const showBaseEdit = ref(false)
const baseInfoType = ref(123)
const openBaseEdit = (type) => {
  baseInfoType.value = type
  showBaseEdit.value = true
}
const closeBaseEdit = () => {
  showBaseEdit.value = false
  getDetailData()
}

// 代理标签
const tagList = ref()
const getTagList = async () => {
  getAgentTagApi(route.query.id).then((res) => {
    tagList.value = res
  })
}
const showEditTag = ref(false)
const openEditTag = () => {
  showEditTag.value = true
}
const closeEditTag = (isAdd) => {
  showEditTag.value = false
  if (isAdd === 1) {
    openAddRemark({ type: 2 })
  }
}
// 代理备注
const showAddRemark = ref(false)
const remarkData = ref({
  total: 0
})

// 弹框状态码 1=添加备注 2=添加标签
const editCode = ref(0)
const dialogData = ref()
const openAddRemark = ({ type, vlaue }) => {
  editCode.value = type
  dialogData.value = vlaue
  showAddRemark.value = true
}
const closeAddRemark = async () => {
  showAddRemark.value = false
  await getTagList()
  getRemarkList()
}

const getRemarkList = () => {
  remarkRequestData.value.agentId = route.query.id
  getActiveAgentRemarkListApi(remarkRequestData.value).then((res) => {
    remarkData.value = res
  })
}
const handleSizeChange = (num) => {
  remarkRequestData.value.pageSize = num
  getRemarkList()
}
const handleCurrentChange = (num) => {
  remarkRequestData.value.pageNum = num
  getRemarkList()
}

const remarkRequestData = ref({
  agentId: 0,
  pageNum: 1,
  pageSize: 10
})

watch(
  () => route.query.id,
  (newId, oldId) => {
    if (route.path == '/agent/agentManageMent/agentDetail') {
      getAllData()
    }
  }
)

// 性别
const agentSex = computed(() => {
  return sexMap[detailData.value.sex]
})

const sexMap = {
  0: i18n.global.t('agent.male'),
  1: i18n.global.t('agent.female'),
  2: i18n.global.t('agent.unknown')
}
// 弹窗标题
// 调整内容类型（0：账号状态 1：代理模式 2：佣金方案 3：发展人 4：维护人 5：信用钱包状态
// 6：姓名 7：性别 8：出生日期 9：手机号码 10：邮箱 11：微信 12：QQ 13：代理类型）
const dialogTitleMap = {
  0: i18n.global.t('agent.modifyAccountStatus'),
  1: i18n.global.t('agent.modifyProxyMode'),
  2: i18n.global.t('agent.modifyCommissionPlan'),
  3: i18n.global.t('agent.modifyDeveloper'),
  4: i18n.global.t('agent.modifyMaintainer'),
  5: i18n.global.t('agent.modifyCreditWalletStatus'),
  6: i18n.global.t('agent.modifyName'),
  7: i18n.global.t('agent.modifyGender'),
  8: i18n.global.t('agent.modifyDateOfBirth'),
  9: i18n.global.t('agent.modifyMobilePhoneNumber'),
  10: i18n.global.t('agent.modifyEmail'),
  11: i18n.global.t('agent.modifyWeChat'),
  12: i18n.global.t('agent.modifyQq'),
  13: i18n.global.t('agent.modifyProxyType')
}

const selectMap = {
  0: i18n.global.t('agent.nomral'),
  1: i18n.global.t('agent.loginLockQuote'),
  2: i18n.global.t('agent.withdrawLock')
}
</script>

<style lang="scss" scoped>
* {
  font-size: 17px;
}

.tag-add-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.baseInfo-container {
  padding: 15px;
}

.baseInfo-header-row {
  display: flex;
  align-items: center;
  height: 60px;
}

.left-box {
  display: flex;
  align-items: center;
  gap: 30px;
  height: 50px;
  width: 350px;
  border-right: 1px solid rgb(203, 203, 203);

  .black-box {
    text-align: center;
    width: 200px;
    height: 45px;
    background-color: black;
    color: white;
    line-height: 45px;
  }
}

.right-box {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.header {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
}

.main-info-row {
  display: flex;
  width: 1300px;
  height: 40px;
}

.info-box {
  font-size: 17px;
  display: flex;
  align-items: center;
  flex: 1;

  .edit-text {
    margin-left: auto;
    margin-right: 20px;
    color: rgb(24, 144, 255);
    cursor: pointer;
  }
}

.single-row {
  display: flex;
  align-items: center;
  gap: 60px;
  height: 40px;
}

.personal-info-container {
  width: 1300px;
}

.remark-info-container {
  width: 1300px;
}

.pagination-box {
  display: flex;
  justify-content: end;
  padding: 20px;
}

.tag {
  margin-left: 25px;
  line-height: 40px;
}

.edit-text {
  font-size: 15px;
  color: rgb(24, 144, 255);
  margin-left: 25px;
  cursor: pointer;
}
.tag-row {
  position: relative;
  top: 5px;
  margin-left: 10px;
  width: 55vw;
  height: 40px;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
