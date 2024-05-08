<!-- 转代{{$t('agent.review')}} {{$t('agent.review')}}与{{$t('agent.check')}}-->
<template>
  <el-form :model="queryParams" :rules="rules">
    <div class="title">{{ $t('agent.transferMemberInformation') }}</div>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="$t('agent.memberAccount')">
          {{ agentData.memberName }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.vipLevel')"> VIP {{ agentData.vipLevel }} </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.riskControlLevel')">
          {{ agentData.riskControlTierName }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.financialHierarchyQuot')">
          {{ agentData.financeTierName }}
        </el-form-item>
      </el-col>
    </el-row>
    <div class="title">{{ $t('agent.agentInformation') }}</div>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="$t('agent.agentAccountQuote')">
          {{ agentData.superiorAgentName }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.agentLevelQuote')">
          {{ agentData.superiorAgentLevel + 1 }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.superiorAgent')">
          {{ agentData.superiorAgentSuperiorProxy }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.agentType')">
          {{ agentData.superiorAgentType }}
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="6">
        <el-form-item :label="$t('agent.riskControlLevel')">
          {{ agentData.riskControlTierName }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.financialHierarchyQuot')">
          {{ agentData.financeTierName }}
        </el-form-item>
      </el-col>
    </el-row> -->
    <div class="title">{{ $t('agent.transferAgentInformation') }}</div>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="$t('agent.agentAccountQuote')">
          {{ agentData.newSuperiorAgentName }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.agentLevelQuote')">
          {{ agentData.newSuperiorAgentLevel + 1 }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.superiorAgent')">
          {{ agentData.newSuperiorAgentSuperiorProxy }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.agentType')">
          {{ agentData.newSuperiorAgentType }}
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="6">
        <el-form-item :label="$t('agent.riskControlLevel')">
          {{ agentData.riskControlTierName }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.financialHierarchyQuot')">
          {{ agentData.financeTierName }}
        </el-form-item>
      </el-col>
    </el-row> -->
    <div class="border"></div>
    <div class="title">{{ $t('agent.applyDetail') }}</div>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="$t('agent.applier')">
          {{ agentData.applicant }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.applyTime')">
          {{ agentData.applicantTime }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('agent.applyRemark')">
          {{ agentData.applicantMark }}
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item>
          <div class="img-one">
            <el-image
              style="width: 100px; height: 100px"
              :src="imgUrl"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="imgUrlList"
              :initial-index="1"
              fit="cover"
              :hide-on-click-modal="true"
            />
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item
      :label="$t('agent.reviewRemark')"
      prop="firstReviewMark"
      v-if="agentData.status == 0"
    >
      <el-input
        v-model="queryParams.firstReviewMark"
        :rows="8"
        type="textarea"
        :placeholder="$t('agent.pleaseInput')"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item :label="$t('agent.reviewRemark')" prop="secondReviewMark" v-else>
      <el-input
        v-model="queryParams.secondReviewMark"
        :rows="8"
        type="textarea"
        :placeholder="$t('agent.pleaseInput')"
        style="width: 100%"
      />
    </el-form-item>
    <el-row v-if="agentData.status == 2">
      <el-col :span="8">
        <el-form-item :label="$t('agent.firstReviewer')">
          {{ agentData.firstReview }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('agent.firstReviewTime')">
          {{ agentData.firstReviewTime }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('agent.firstReviewRemark')">
          {{ agentData.firstReviewMark }}
        </el-form-item>
      </el-col>
    </el-row>

    <div class="button-container">
      <el-form-item style="text-align: right">
        <el-button @click="confirmAndClose">{{ $t('agent.cancel') }}</el-button>
        <el-button type="danger" @click="onClickCheck(1)">{{ $t('agent.reviewRefuse') }}</el-button>
        <el-button type="success" @click="onClickCheck(2)">{{ $t('agent.reviewPass') }}</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup>
import { computed, onMounted, getCurrentInstance, ref } from 'vue'
import {
  getTransferReviewDetailsApi,
  getPassOrRejectInFirstInstanceApi,
  getPassOrRejectTheSecondInstanceApi
} from '@/api/agent/transferReview.js'
import useUserStore from '@/store/modules/user'
import { getImgUrl } from '@/utils'
import i18n from '@/i18n'

const user = useUserStore()
const props = defineProps(['open', 'rowItems'])
const emit = defineEmits(['update:open', 'changeStatus', 'closeDialog'])
const { proxy } = getCurrentInstance()

// 图片预览
const imgUrl = ref('')
const imgUrlList = ref([])

const rowItem = computed(() => {
  return props.rowItems
})
const confirmAndClose = () => {
  emit('closeDialog')
}

const agentData = ref({})
onMounted(() => {
  getTransferReviewDetailsApi(rowItem.value.id)
    .then((res) => {
      agentData.value = res
      imgUrl.value = getImgUrl(agentData.value.attachments)
      imgUrlList.value.push(getImgUrl(agentData.value.attachments))
    })
    .catch((error) => {
      console.error('Error fetching agent details:', error)
    })
})
const queryParams = ref({
  id: null,
  passOrRejectionFlag: null,
  firstReviewMark: '',
  secondReviewMark: ''
})
// 验证
const rules = ref({
  firstReviewMark: [
    {
      required: true,
      message: i18n.global.t('agent.reviewRemarkCannotBeEmpty'),
      trigger: 'blur'
    }
  ],
  secondReviewMark: [
    {
      required: true,
      message: i18n.global.t('agent.reviewRemarkCannotBeEmpty'),
      trigger: 'blur'
    }
  ]
})
// 审核
const onClickCheck = (val) => {
  if (rowItem.value.status == 0) {
    if (val == 2) {
      const params = {
        id: rowItem.value.id,
        passOrRejectionFlag: 2,
        review: user.userInfo.userName,
        firstReviewMark: queryParams.value.firstReviewMark
      }
      getPassOrRejectInFirstInstanceApi(params).then(() => {
        proxy.$modal.msgSuccess(i18n.global.t('agent.reviewPass'))
        emit('changeStatus', true)
        cancel()
      })
    } else {
      const params = {
        id: rowItem.value.id,
        passOrRejectionFlag: 1,
        review: user.userInfo.userName,
        firstReviewMark: queryParams.value.firstReviewMark
      }
      getPassOrRejectInFirstInstanceApi(params).then(() => {
        proxy.$modal.msgError(i18n.global.t('agent.reviewRefuse'))
        emit('changeStatus', true)
        cancel()
      })
    }
  } else if (rowItem.value.status == 2) {
    if (val == 2) {
      const params = {
        id: rowItem.value.id,
        passOrRejectionFlag: 4,
        review: user.userInfo.userName,
        secondReviewMark: queryParams.value.secondReviewMark
      }
      getPassOrRejectTheSecondInstanceApi(params).then(() => {
        proxy.$modal.msgSuccess(i18n.global.t('agent.secondReviewPass'))
        emit('changeStatus', true)
        cancel()
      })
    } else {
      const params = {
        id: rowItem.value.id,
        passOrRejectionFlag: 3,
        review: user.userInfo.userName,
        secondReviewMark: queryParams.value.secondReviewMark
      }
      getPassOrRejectTheSecondInstanceApi(params).then(() => {
        proxy.$modal.msgError(i18n.global.t('agent.secondReviewRefuse'))
        emit('changeStatus', true)
        cancel()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  justify-content: flex-end;
}
.border {
  height: 1px;
  background-color: #e9e9e9;
  margin-bottom: 10px;
}
.title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}
.img-one {
  width: 92px;
  height: 102px;
  text-align: center;
  border: 1px solid #e9e9e9;
}
</style>
