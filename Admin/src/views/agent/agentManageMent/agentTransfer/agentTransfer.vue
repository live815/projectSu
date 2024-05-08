<!-- 转代申请 -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :rules="rules" label-width="auto" ref="formRef">
      <el-form-item :label="$t('agent.transferMember')" prop="memberName">
        <el-input
          v-model="queryParams.memberName"
          :placeholder="$t('agent.plsenterTransferMember')"
          clearable
          style="width: 300px">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.currentSuperior')" prop="superiorAgentName">
        <el-input
          v-model="queryParams.superiorAgentName"
          placeholder=""
          disabled
          style="width: 300px">
        </el-input>

        <el-button
          type="primary"
          style="margin-left: 10px"
          @click="queryCurrentSuperior"
          :disabled="!queryParams.memberName"
          >{{ $t('agent.search') }}</el-button
        >
      </el-form-item>
      <el-form-item :label="$t('agent.transferAgent')" prop="newSuperiorAgentName">
        <el-input
          v-model="queryParams.newSuperiorAgentName"
          :placeholder="$t('agent.pleaseEnterAgentAccount')"
          clearable
          style="width: 300px">
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('agent.memberId')" prop="identityCode">
        <el-input
          v-model="queryParams.identityCode"
          :placeholder="$t('agent.pleaseEnterMemberId')"
          clearable
          style="width: 300px"
          maxlength="8"
          @input="handleInput('identityCode')">
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('agent.uploadAttachment')">
        <div class="client-img">
          <div class="client">
            <el-upload
              class="avatar-uploader"
              action="/admin/file/tutorial/image/upload"
              :data="{}"
              :show-file-list="false"
              :on-success="handleUploadSuccessBig"
              :headers="headers">
              <img
                v-if="queryParams.attachments"
                :src="getImgUrl(queryParams.attachments)"
                class="avatar" />
              <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
            </el-upload>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('agent.applyInformationQuot')" prop="applicantMark">
        <el-input
          v-model="queryParams.applicantMark"
          :rows="6"
          maxlength="500"
          :placeholder="$t('agent.pleaseEnterApplicationInformation')"
          show-word-limit
          type="textarea"
          style="width: 300px" />
      </el-form-item>
      <el-form-item style="margin: 30px 0px 0px 350px">
        <!-- <el-button style="width: 80px" @click="cancel">{{
          $t("agent.cancel")
        }}</el-button> -->
        <el-button style="width: 80px" type="primary" @click="submit">{{
          $t('agent.ensure')
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getTransferReviewApi, getAgentSuperiorApi } from '@/api/agent/transferReview.js'
import { ref } from 'vue'
import { getToken } from '@/utils/auth'
import { getImgUrl } from '@/utils'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
const queryParams = ref({
  applicantMark: '',
  attachments: '',
  memberName: '',
  newSuperiorAgentName: '',
  superiorAgentName: '',
  identityCode: ''
})
const headers = ref({ Authorization: 'Bearer ' + getToken() })
const handleUploadSuccessBig = (res) => {
  queryParams.value.attachments = res.data
  proxy.$modal.msgSuccess(i18n.global.t('agent.uploadSuccessfully'))
}
// 获取上级

const queryCurrentSuperior = async () => {
  const query = { memberName: queryParams.value.memberName }
  getAgentSuperiorApi(query).then((res) => {
    console.log(res == '')
    if (res == '') {
      proxy.$modal.msgWarning(i18n.global.t('agent.accountNotExist'))
      queryParams.value.superiorAgentName = ''
    } else {
      queryParams.value.superiorAgentName = res
    }
  })
}

const formRef = ref(null)
const submit = async () => {
  formRef.value.validate((isValid) => {
    if (isValid) {
      if (queryParams.value.newSuperiorAgentName == queryParams.value.superiorAgentName) {
        proxy.$modal.msgWarning(i18n.global.t('agent.cantTranToSameAgent'))
        return
      }
      getTransferReviewApi(queryParams.value).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t('agent.applicatSuccess'))
        queryParams.value = {
          applicantMark: '',
          attachments: '',
          memberName: '',
          newSuperiorAgentName: '',
          superiorAgentName: '',
          identityCode: ''
        }
      })
    } else {
      return
    }
  })
}

//

// 验证
const rules = {
  memberName: [
    {
      required: true,
      message: i18n.global.t('agent.plsenterTransferMember'),
      trigger: 'blur'
    }
  ],
  superiorAgentName: [
    {
      required: true,
      message: i18n.global.t('agent.plsGetSupAgent'),
      trigger: 'blur'
    }
  ],
  newSuperiorAgentName: [
    {
      required: true,
      message: i18n.global.t('agent.plsEnterTranAgent'),
      trigger: 'blur'
    }
  ],
  applicantMark: [
    {
      required: true,
      message: i18n.global.t('agent.pleaseEnterApplicationInformation'),
      trigger: 'blur'
    }
  ],
  identityCode: [
    {
      required: true,
      message: i18n.global.t('agent.memberIdCannotBeEmpty'),
      trigger: 'blur'
    }
  ]
}

// 拼音输入时实时更新输入值
const handleInput = (field) => {
  queryParams.value[field] = queryParams.value[field].replace(/[^\d]+/g, '')
}
</script>

<style lang="scss" scoped>
.app-container {
  border: 1px solid #f2f2f2;
  width: 683px;
  margin: 0 auto;
  padding-left: 130px;
}
.rewrite-icon {
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 100px;
  border: 1px dashed #eee;
}
.client-img {
  display: flex;
  .client {
    margin-right: 50px;

    .port {
      margin: 0 auto;
    }
  }
}
.avatar {
  width: 150px;
  height: 150px;
}
</style>
