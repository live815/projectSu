<template>
  <div class="editNickname-content">
    <NavBar :title="$t('Eletter.EditNicKName')" />
    <div class="editNickname-content-min">
      <div class="editNickname-content-min-item">
        <div class="editNickname-content-min-item-title">
          {{ $t('Eletter.NickName') }} <span v-if="!!nickNameStatus" class="nike-name-status">{{ $t('friends.inReview') }}</span>
        </div>
        <div class="editNickname-content-min-item-input">
          <CustomInputBorder :placeholder="$t('Eletter.InputNicKName')" v-model="nickNames" />
        </div>
        <div class="editNickname-content-min-item-text" v-if="nickNames.trim().length < 4">
          <span
            ><van-icon style="font-size: 16px !important" name="warning" color="#F53F3F"
          /></span>
          {{ $t('Eletter.NameNote') }}
        </div>
      </div>
    </div>
    <div class="ditNickname-content-footer">
      <DedicatedButton :color="isColor" @click="onClickSava">
        {{ $t('Eletter.Save') }}</DedicatedButton
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user.js'
import DedicatedButton from '@/components/VButton/DedicatedButton'
import { getUpdateNickname } from '@/api/bindInfo'
import { showLoadingToast, closeToast, showToast } from 'vant'
import router from '@/router'
import i18n from '@/i18n'

const user = useUserStore()
const nickNames = ref('')
const nickNameStatus = ref(false)

nickNames.value = user.userInfo.nickName
nickNameStatus.value = user.userInfo['nickNameStatus']

const isColor = computed(() => {
  if (nickNames.value && nickNames.value.trim().length >= 4) {
    return 'primary'
  } else {
    return ''
  }
})
// 保存按钮
const onClickSava = () => {
  if (isColor.value) {
    showLoadingToast({
      message: i18n.global.t('common.loading'),
      forbidClick: true,
      duration: 0
    })
    const params = {
      nickName: nickNames.value
    }

    getUpdateNickname(params)
      .then(() => {
        user.getUserInfoAction()

        router.back()
        closeToast()
      })
      .catch(() => {
        closeToast()
      })
  } else {
    showToast(i18n.global.t('Eletter.EletterTip1'))
  }
}
</script>
<style lang="scss" scoped>
.editNickname-content {
  background: #fff !important;
  overflow: hidden;
  .editNickname-content-min {
    width: 325px;
    margin: 0 auto;
    .editNickname-content-min-item {
      color: #111;
      font-size: 15px;
      margin-top: 20px;
      margin-bottom: 20px;
      .editNickname-content-min-item-title {
        font-weight: 600;
        margin-bottom: 7px;
      }
      .editNickname-content-min-item-input {
        width: 325px;
        height: 50px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0);
        color: #111;
        font-weight: 500;
        .border-cell {
          display: flex;
          align-items: center;
          height: 100%;
          border-radius: 8px;
          border: 1px solid #eee;
          background: rgba(255, 255, 255, 0);

          font-size: 15px;
        }
      }
      .editNickname-content-min-item-text {
        color: var(--1, #f53f3f);

        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        margin: 10px 0 0 13px;
      }
    }
  }
  .ditNickname-content-footer {
    width: 325px;
    margin: 35px auto;
  }
}
.nike-name-status {
  display: inline-block;
  margin-left: 5px;
  color: #e5a369;
  font-size: 14px;
  line-height: 19px;
  font-weight: 400;
}
</style>
