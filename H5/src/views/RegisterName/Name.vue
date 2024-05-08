<template>
  <div class="wrapper register">
    <VHead />
    <h3 class="tit">{{ $t('Rletter.Createaccount') }}</h3>
    <div class="container">
      <div class="auto-create">
        <p class="title">{{ $t('Lletter.autoCreate') }}</p>
        <div class="input-box">
          <div class="randomAccount" :class="!!editAccount || !!error ? 'disabled' : ''">
            {{ randomAccount }}
            <span @click="handleRefresh"></span>
          </div>
        </div>
      </div>
      <div class="edit-create">
        <p class="title">{{ $t('Lletter.editCreateAccount') }}</p>
        <div class="input-box">
          <CustomInput
            ref="editAccountBox"
            v-model="editAccount"
            v-model:has-error-tip="error"
            @handleRegReplace="editAccount=editAccount.replace(/[^\w\.\/]/ig ,'')"
            clearable
            hasErrorTip
            :maxLength="16"
            :placeholder="$t('Lletter.Llettertip22')"
            :rule="{
              reg: Reg.usernameReg,
              errorMessage: $t('Lletter.Llettertip22')
            }"
          />
        </div>
      </div>
    </div>
    <!-- 去注册 -->

    <VButton class="btn-class" @click="handleRegister">
      <span v-if="!loading">{{ $t('Rletter.registerFinish') }}</span>
      <van-loading v-else color="#fff"></van-loading>
    </VButton>
    <div class="register">
      {{ $t('Lletter.tips') }}
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import VHead from '@/views/LoginView/components/VHead.vue'
import CustomInput from '@/components/CustomInput/CustomInput.vue'
import { registerCreatName } from '@/api/user'
// import { throttle } from '@/utils/plugin'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Reg from '@/utils/reg'

const router = useRouter()
const user = useUserStore()
const randomAccount = ref('')
const editAccount = ref('')
const focus = ref(false)
const error = ref(false)
const loading = ref(false)
const editAccountBox = ref(null)

const isValided = computed(() => {
  return Reg.usernameReg.test(editAccount.value)
})

onMounted(() => {
  getRandomAccount()
})

const getRandomAccount = () => {
  registerCreatName().then((res) => {
    if (res?.code === 200) {
      randomAccount.value = res.data
    }
  })
}

const handleRefresh = () => {
  setTimeout(() => {
    getRandomAccount()
  }, 1000)
}

const handleRegister = async () => {
  let userName, rpt, data
  loading.value = true
  const obj = router.options?.history?.state?.data
  const { code, countryCode, phone } = JSON.parse(obj)
  // 验证通过 发送请求
  if (!!editAccount.value || !!error.value) {
    userName = editAccount.value
    if (isValided.value) {
      data = { phone, code, countryCode, userName }
      rpt = phone && code && countryCode && userName && (await user.phoneRegisterAction(data))
    }
  } else {
    userName = randomAccount.value
    data = { phone, code, countryCode, userName }
    rpt = phone && code && countryCode && userName && (await user.phoneRegisterAction(data))
  }
  console.log('data', data)
  loading.value = false
  if (!rpt) return
  await user.getUserInfoAction()
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px 25px 0;
  // background: #fefdfc;
  background: url('@/assets/img/login-bg.png') center no-repeat;
  background-size: 100% 100%;
  min-height: var(--app-height);
  .tit {
    font-size: 25px;
    font-weight: 600;
    color: #111;
    margin-top: 14px;
    margin-bottom: 20px;
  }
  .container {
    margin-top: 45px;
    .title {
      color: #111111;

      font-size: 15px;
      font-weight: 400;
    }
    .input-box {
      margin-top: 10px;
      .randomAccount {
        position: relative;
        height: 36px;
        line-height: 36px;
        border-bottom: 1px solid #eee;
        color: #111111;
        font-size: 16px;
        & > span {
          display: block;
          content: '';
          background: url('@/assets/img/refrensh.png') center no-repeat;
          background-size: 100% 100%;
          position: absolute;
          width: 16px;
          height: 18px;
          right: 5px;
          top: 10px;
        }
      }
      .disabled.randomAccount {
        color: #cccf;
      }
    }
    .edit-create {
      margin-top: 25px;
    }
  }
  .btn-class {
    margin-top: 45px;
  }
  .register {
    text-align: center;
    margin-top: 17px;
    line-height: 22px;
    color: #888;
  }
}
</style>
