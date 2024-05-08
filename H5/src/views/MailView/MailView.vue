<template>
  <div class="email-content">
    <NavBar :title="$t('Mletter.bindemail')" />
    <div class="title">{{ $t('Mletter.email') }}</div>
    <div class="email-input">
      <CustomInputBorder
        hasErrorTip
        :placeholder="$t('Mletter.enteremail')"
        isEmail
        v-model="emailInfo.email"
        :rule="{
          reg: Reg.emailReg,
          errorMessage: ''
        }"
      />
    </div>
    <div class="title">{{ $t('Mletter.verificaemailcode') }}</div>
    <div class="email-input">
      <CustomInputBorder
        :maxlength="6"
        :placeholder="$t('Mletter.enteremailcode')"
        v-model="emailInfo.emailCode"
      />
      <SendCode @sendCode="onSendCode" v-model="availableSendCode" />
    </div>
    <div class="email-footer-btn">
      <DedicatedButton :color="isColor" @click="onClickAdd">{{
        $t('Mletter.bind')
      }}</DedicatedButton>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { getBindEmail } from '@/api/bindInfo'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import Reg from '@/utils/reg'
import i18n from '@/i18n'
import { useSendCode } from '@/hooks/useSendCode'
import { useUserStore } from '@/stores/user'
const { availableSendCode, sendEmailCode } = useSendCode()
const user = useUserStore()
const router = useRouter()
const emailInfo = reactive({
  email: '',
  emailCode: ''
})
const isValided = computed(() => {
  return Reg.emailReg.test(emailInfo.email)
})

const isloading = ref(false)

const isColor = computed(() => {
  if (emailInfo.email && emailInfo.emailCode) {
    return 'primary'
  } else {
    return ''
  }
})

// 获取验证码
const onSendCode = () => {
  if (!emailInfo.email) {
    return showToast(i18n.global.t('Mletter.enteremail'))
  }
  if (!Reg.emailReg.test(emailInfo.email)) {
    return showToast(i18n.global.t('Mletter.incorrectformat'))
  }
  sendEmailCode(emailInfo.email, 1, user.userInfo.userName)
}

// 添加
const onClickAdd = () => {
  if (isloading.value) return

  if (isValided.value) {
    const params = {
      email: emailInfo.email,
      emailCode: emailInfo.emailCode
    }
    isloading.value = true

    getBindEmail(params)
      .then((res) => {
        if (res.data) {
          showToast(i18n.global.t('Mletter.bindsuccess'))
          isloading.value = false
          router.back()
        }
      })
      .catch(() => {
        isloading.value = false
      })
  }
}
</script>
<style lang="scss" scoped>
.email-content {
  background: #fff;
  padding: 0 25px;
  .title {
    color: #111;

    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    margin-top: 40px;
  }
  .title:last-child {
    margin-top: 21px;
  }
  .email-input {
    position: relative;
    width: 325px;
    height: 50px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0);
    color: #111;

    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    margin-top: 7px;

    .input {
      width: 100%;
      height: 100%;
    }
    .send-code {
      position: absolute;
      right: 20px;
      bottom: 15px;
    }
    :deep().input-group-item .label {
      margin-bottom: 0;
    }
    :deep().input-group-item .label {
      margin-bottom: 0;
    }
    :deep().input-group-item {
      margin-bottom: 0;
    }
  }
  .email-footer-btn {
    margin-top: 200px;
  }
}
</style>
