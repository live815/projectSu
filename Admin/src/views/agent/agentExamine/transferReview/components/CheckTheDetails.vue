<!-- 转代{{$t('agent.review')}} {{$t('agent.review')}}与{{$t('agent.check')}}-->
<template>
  <el-form>
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
    <el-row>
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
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('agent.twoReviewers')">
          {{ agentData.finalReview }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('agent.secondReviewTime')">
          {{ agentData.finalReviewTime }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('agent.twoReviewNotes')">
          {{ agentData.finalReviewMark }}
        </el-form-item>
      </el-col>
    </el-row>

    <div class="button-container">
      <el-form-item style="text-align: right">
        <el-button @click="confirmAndClose" type="primary">{{ $t('agent.close') }}</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getTransferReviewDetailsApi } from '@/api/agent/transferReview.js'
import { getImgUrl } from '@/utils'

const props = defineProps(['open', 'rowItems'])
const emit = defineEmits(['update:open', 'changeStatus', 'closeDialog'])
const rowItem = computed(() => {
  return props.rowItems
})
const confirmAndClose = () => {
  emit('closeDialog')
}
// 图片预览
const imgUrl = ref('')
const imgUrlList = ref([])

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
