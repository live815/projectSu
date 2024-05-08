<template>
  <div class="password-content">
    <NavBar :title="$t('Pletter.changepassword')" />
    <template v-if="user.userInfo.passwordFlag">
      <div class="title">{{ $t('Pletter.oldpassword') }}</div>
      <div class="password-input">
        <CustomInputBorder
          types="password"
          :placeholder="$t('Pletter.placeholder_1')"
          clearable
          isPwd
          hasErrorTip
          v-model="passwordInfo.oldPassword"
          :rule="{
            reg: Reg.passwordReg,
            errorMessage: $t('Pletter.Plettertip1')
          }"
        />
      </div>
    </template>
    <div class="title">{{ $t('Pletter.newpassword') }}</div>
    <div class="password-input">
      <CustomInputBorder
        types="password"
        :placeholder="$t('Pletter.placeholder_2')"
        clearable
        isPwd
        hasErrorTip
        v-model="passwordInfo.newPassword"
        :rule="{
          reg: Reg.passwordReg,
          errorMessage: $t('Pletter.Plettertip1')
        }"
      />
    </div>
    <div class="password-footer-btn">
      <DedicatedButton :color="isColor" @click="onClickAdd">{{
        $t('Pletter.sure')
      }}</DedicatedButton>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { getUpdatePassword } from '@/api/bindInfo'
import { showToast } from 'vant'
import { useUserStore } from '@/stores/user'
import i18n from '@/i18n'
import Reg from '@/utils/reg'
const user = useUserStore()
const isValided = computed(() => {
  if (user.userInfo.passwordFlag) {
    return (
      Reg.passwordReg.test(passwordInfo.oldPassword) &&
      Reg.passwordReg.test(passwordInfo.newPassword)
    )
  } else {
    return Reg.passwordReg.test(passwordInfo.newPassword)
  }
})
const passwordInfo = reactive({
  oldPassword: '',
  newPassword: ''
})
const isloading = ref(false)

const isColor = computed(() => {
  if (user.userInfo.passwordFlag) {
    if (passwordInfo.oldPassword && passwordInfo.newPassword) {
      return 'primary'
    } else {
      return ''
    }
  } else {
    if (passwordInfo.newPassword) {
      return 'primary'
    }
    return ''
  }
})

const onClickAdd = () => {
  if (isloading.value) return
  if (isValided.value) {
    const params = {
      oldPassword: passwordInfo.oldPassword,
      newPassword: passwordInfo.newPassword
    }
    isloading.value = true
    getUpdatePassword(params).then((res) => {
      if (res.data) {
        showToast(i18n.global.t('Mletter.SuccessPwd'))
        isloading.value = false
        user.logOutAction(true)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.password-content {
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
  .password-input {
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
    :deep().input-group-item .input-wrapper .icon-wrapper {
      top: 35%;
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

  .password-footer-btn {
    margin-top: 200px;
  }
}
</style>
