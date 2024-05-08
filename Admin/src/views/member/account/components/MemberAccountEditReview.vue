<template>
  <div class="label-edit-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="50%"
      :title="
        type === 'info'
          ? $t('member.memberAccountUpdateCheck')
          : $t('member.memberAccountUpdateReview')
      "
      :before-close="cancel"
      :close-on-click-modal="false">
      <!-- 会员账号修改审核 -->
      <el-form :model="queryParams" ref="queryRef">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('member.accountType')" prop="type">
              <span class="type" v-if="queryParams.type === '0'">{{ $t('member.normal') }}</span>
              <span class="type" v-else-if="queryParams.type === '1'">{{
                $t('member.excellent')
              }}</span>
              <span class="type" v-else-if="queryParams.type === '2'">{{
                $t('member.follow')
              }}</span>
              <span class="type" v-else>-</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.userName')" prop="userName">
              <span>{{ queryParams.userName || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.applier')" prop="createBy">
              <span>{{ queryParams.createBy || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.applyTime')" prop="createTime">
              <span>{{ queryParams.createTime || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.appliReason')" prop="createRemake">
              <span>{{ queryParams.createRemake || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.reviewApplyType')" prop="optType">
              <span>{{ queryParams.optType || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.operateBefore')" prop="optFrom">
              <span>{{ queryParams.optFrom || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('member.operateAfter')" prop="optTo">
              <span>{{ queryParams.optTo || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8"  v-if="type !== 'first'">
            <el-form-item :label="$t('member.firstReviewer')" prop="reviewer">
              <span>{{ queryParams.reviewer || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8"  v-if="type !== 'first'">
            <el-form-item :label="$t('member.firstReviewCompleteTime')" prop="reviewTime">
              <span>{{ queryParams.reviewTime || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8"  v-if="type !== 'first'">
            <el-form-item :label="$t('member.reviewStatus')" prop="status">
              <!-- <span v-if="queryParams.status === 0">{{ $t('member.unhandle') }}</span>
              <span v-else-if="queryParams.status === 1">{{
                $t('member.waitForFirstReview')
              }}</span>
              <span style="color: #52c41a" v-else-if="queryParams.status === 2">{{
                $t('member.secondReviewPass')
              }}</span>
              <span style="color: #f5222d" v-else-if="queryParams.status === 3">{{
                $t('member.firstReviewReject')
              }}</span>
              <span v-else-if="queryParams.status === 4">{{
                $t('member.waitForSecondReview')
              }}</span>
              <span v-else-if="queryParams.status === 5">{{
                $t('member.secondReviewReject')
              }}</span> -->
              <span style="color: #f5222d" v-if="queryParams.status === 3">{{
                $t('member.firstReviewReject')
              }}</span>
              <span v-else style="color: #52c41a">{{ $t('member.irstReviewPass') }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24"  v-if="type !== 'first'">
            <el-form-item prop="reviewRemake">
              <template #label>
                <span>{{ $t('member.firstReviewRemark') }}:</span>
              </template>
              <span>{{ queryParams.reviewRemake || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="queryParams.status !== 3 && type === 'info'">
            <el-form-item :label="$t('member.secondReviewer')" prop="finalReview">
              <template #label>
                <span>{{ $t('member.secondReviewer') }}:</span>
              </template>
              <span>{{ queryParams.finalReview || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8"  v-if="queryParams.status !== 3 && type === 'info'">
            <el-form-item :label="$t('member.secondReviewTime')" prop="finalReviewTime">
              <template #label>
                <span>{{ $t('member.secondReviewTime') }}:</span>
              </template>
              <span>{{ queryParams.finalReviewTime || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8"  v-if="queryParams.status !== 3 && type === 'info'">
            <el-form-item :label="$t('member.reviewStatus')" prop="status">
              <span v-if="queryParams.status === 0">{{ $t('member.unhandle') }}</span>
              <span v-else-if="queryParams.status === 1">{{
                $t('member.waitForFirstReview')
              }}</span>
              <span style="color: #52c41a" v-else-if="queryParams.status === 2">{{
                $t('member.secondReviewPass')
              }}</span>
              <span style="color: #f5222d" v-else-if="queryParams.status === 3">{{
                $t('member.firstReviewReject')
              }}</span>
              <span v-else-if="queryParams.status === 4">{{
                $t('member.waitForSecondReview')
              }}</span>
              <span v-else-if="queryParams.status === 5" style="color: rgb(245,34,45)">{{
                $t('member.secondReviewReject')
              }}</span>
              <span v-else>-</span>
            </el-form-item>
          </el-col>
          <el-col :span="24"  v-if="queryParams.status !== 3 && type === 'info'">
            <el-form-item prop="finalReviewRemake">
              <template #label>
                <span>{{ $t('member.secondReviewRemark') }}:</span>
              </template>
              <span>{{ queryParams.finalReviewRemake || '-' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :model="form" ref="formRef" :rules="formRule">
        <el-row>
          <el-col v-if="type === 'first'">
            <el-form-item :label="$t('member.firstReviewRemark')" prop="reviewRemake" class="full-width">
              <el-input
                v-model="form.reviewRemake"
                type="textarea"
                maxlength="300"
                :rows="5"
                :placeholder="$t('member.pleaseInput')"
                show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="type === 'second'">
            <el-form-item :label="$t('member.secondReviewRemark')" prop="finalReviewRemake" class="full-width">
              <el-input
                v-model="form.finalReviewRemake"
                type="textarea"
                maxlength="300"
                :rows="5"
                :placeholder="$t('member.pleaseInput')"
                show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('member.close') }}</el-button>
          <el-button type="success" @click="submit(success)" v-if="type === 'first'">{{
            $t('member.irstReviewPass')
          }}</el-button>
          <el-button type="danger" @click="submit(inject)" v-if="type === 'first'">{{
            $t('member.firstReviewReject')
          }}</el-button>
          <el-button type="success" @click="submit(successSecond)" v-if="type === 'second'">{{
            $t('member.secondReviewPass')
          }}</el-button>
          <el-button type="danger" @click="submit(injectSecond)" v-if="type === 'second'">{{
            $t('member.secondReviewReject')
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { getCurrentInstance, onMounted } from 'vue'
import { editState, getInfo, editStateSecond } from '@/api/member/account/index'

const props = defineProps(['open', 'type', 'id'])
const emit = defineEmits(['update:open', 'freshlist'])
console.log(props.type, props.id)
const { proxy } = getCurrentInstance()
const queryParams = ref({})
const queryRef = ref(null)
const success = ref(4)
const inject = ref(3)
const successSecond = ref(2)
const injectSecond = ref(5)

const form = ref({
  reviewRemake: null,
  finalReviewRemake: null
})
const formRef = ref(null)
const formRule = ref({
  reviewRemake:[{required:true,message:i18n.global.t('member.pleaseInputFirstRemark'),trigger:'blur'}],
  finalReviewRemake:[{required:true,message:i18n.global.t('member.pleaseInputSecondRemark'),trigger:'blur'}],
})

const dialogVisible = computed({
  get() {
    return props.open
  },
  set(val) {
    emit('update:open', val)
  }
})

onMounted(() => {
  queryInfo()
})
function queryInfo() {
  getInfo(props.id).then((res) => {
    queryParams.value = res || []
  })
}
function cancel() {
  dialogVisible.value = false
}
function submit(status) {
  formRef.value.validate((valid) => {
    if (valid) {
      if (props.type === 'first') {
        editState({
          id: queryParams.value.id,
          status: status,
          reviewRemake:form.value.reviewRemake
        }).then((res) => {
          dialogVisible.value = false

          proxy.$modal.msgSuccess(i18n.global.t('risk.operateSuccessfully'))
          emit('freshlist')
        })
      } else if (props.type === 'second') {
        editStateSecond({
          id: queryParams.value.id,
          status: status,
          finalReviewRemake:form.value.finalReviewRemake
        }).then((res) => {
          dialogVisible.value = false

          proxy.$modal.msgSuccess(i18n.global.t('risk.operateSuccessfully'))
          emit('freshlist')
        })
      }
    } else {
      return
    }
  })
}
</script>

<style lang="scss" scoped>
.label-edit-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
  }
}
</style>
