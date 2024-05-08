<template>
  <div>
    <el-form :model="queryParams" :rules="rules">
      <el-form-item :label="$t('agent.remark')" prop="firstReviewMark" v-if="rowItem.status == 0">
        <el-input
          v-model="queryParams.firstReviewMark"
          :rows="8"
          type="textarea"
          :placeholder="$t('agent.pleaseInput')"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.remark')" prop="secondReviewMark" v-else>
        <el-input
          v-model="queryParams.secondReviewMark"
          :rows="8"
          type="textarea"
          :placeholder="$t('agent.pleaseInput')"
          style="width: 100%"
        />
      </el-form-item>
      <div class="btn-row">
        <el-button class="btn" @click="confirmAndClose">{{ $t('agent.cancel') }}</el-button>
        <el-button type="primary" @click="onClickCheck(val)">{{ $t('agent.submit') }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, getCurrentInstance } from 'vue'
import i18n from '@/i18n'
import useUserStore from '@/store/modules/user'
import {
  getFirstPassOrRejectionApi,
  getSecondPassOrRejectionApi
} from '@/api/agent/agentTransfer.js'

const user = useUserStore()

const queryParams = ref({
  firstReviewMark: '',
  secondReviewMark: ''
})
const props = defineProps(['rowItems', 'passOrReject'])
const emit = defineEmits(['changeStatus', 'closeDialog'])
const { proxy } = getCurrentInstance()

//校验
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
const onClickCheck = () => {
  if (rowItem.value.status == 0) {
    if (!queryParams.value.firstReviewMark) {
      proxy.$modal.msgWarning(i18n.global.t('agent.reviewRemarkCannotBeEmpty'))
      return
    }
    if (props.passOrReject == 1) {
      const params = {
        id: rowItem.value.id,
        passOrRejectionFlag: 1,
        review: user.userInfo.userName,
        firstReviewMark: queryParams.value.firstReviewMark
      }
      getFirstPassOrRejectionApi(params).then(() => {
        proxy.$modal.msgSuccess(i18n.global.t('agent.reviewRefuse'))
        emit('changeStatus', true)
        cancel()
      })
    } else {
      const params = {
        id: rowItem.value.id,
        passOrRejectionFlag: 2,
        review: user.userInfo.userName,
        firstReviewMark: queryParams.value.firstReviewMark
      }
      getFirstPassOrRejectionApi(params).then(() => {
        proxy.$modal.msgSuccess(i18n.global.t('agent.reviewPass'))
        emit('changeStatus', true)
        cancel()
      })
    }
  } else {
    if (props.passOrReject == 1) {
      if (!queryParams.value.secondReviewMark) {
        proxy.$modal.msgWarning(i18n.global.t('agent.reviewRemarkCannotBeEmpty'))
        return
      }
      const params = {
        id: rowItem.value.id,
        passOrRejectionFlag: 3,
        review: user.userInfo.userName,
        secondReviewMark: queryParams.value.secondReviewMark
      }
      getSecondPassOrRejectionApi(params).then(() => {
        proxy.$modal.msgError(i18n.global.t('agent.reviewRefuse'))
        emit('changeStatus', true)
        cancel()
      })
    } else {
      const params = {
        id: rowItem.value.id,
        passOrRejectionFlag: 4,
        review: user.userInfo.userName,
        secondReviewMark: queryParams.value.secondReviewMark
      }
      getSecondPassOrRejectionApi(params).then(() => {
        proxy.$modal.msgSuccess(i18n.global.t('agent.reviewPass'))
        emit('changeStatus', true)
        cancel()
      })
    }
  }
}
const rowItem = computed(() => {
  return props.rowItems
})
//取消
const confirmAndClose = () => {
  emit('closeDialog')
}
</script>

<style lang="scss" scoped>
.btn-row {
  display: flex;
  align-items: end;
  .btn {
    margin-left: auto;
  }
}
</style>
