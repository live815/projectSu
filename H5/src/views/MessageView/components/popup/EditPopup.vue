<template>
  <div>
    <van-popup v-model:show="show" position="bottom" round>
      <div class="edit-container">
        <div class="edit-bin" @click="toShowBottemBar">{{ $t('Mletter.editmessage') }}</div>
        <div class="edit-bin" @click="toReadAll">{{ $t('Mletter.Allread') }}</div>
        <div class="edit-bin" @click="toDeleAllRead">{{ $t('Mletter.Deleteread') }}</div>
      </div>
      <div class="footer">
        <div class="cancel-btn" @click="switchShow">{{ $t('Mletter.cancel') }}</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { showConfirmDialog } from 'vant'
import eventBus from '@/utils/eventBus'
import i18n from '@/i18n'
const show = ref(false)
const switchShow = () => {
  show.value = !show.value
}
const toShowBottemBar = () => {
  eventBus.emit('switchShowBottemBar')
  switchShow()
}
// 已读全部
const toReadAll = () => {
  eventBus.emit('toBatchOper', 0)
  switchShow()
}
// 删除全部
const toDeleAllRead = () => {
  showConfirmDialog({
    title: i18n.global.t('Mletter.Kindtips1'),
    message: i18n.global.t('Mletter.Kindtips2'),
    confirmButtonText: i18n.global.t('Mletter.sure'),
    cancelButtonText: i18n.global.t('Mletter.cancel'),
    className: 'message-confirom'
  })
    .then(() => {
      eventBus.emit('toBatchOper', 1)
      switchShow()
    })
    .catch(() => {
      console.log('取消')
    })
}

defineExpose({ switchShow })
</script>

<style lang="scss" scoped>
.edit-container {
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 200px;
  border-radius: 20px 20px 0px 0px;
  background: #fff;
  padding: 20px 16px 0 16px;
  .edit-bin {
    width: 343px;
    height: 48px;
    border-radius: 12px;
    margin-bottom: 8px;
    background: #fff5f0;
    text-align: center;
    color: #000;

    font-size: 16px;
    font-weight: 400;
    line-height: 48px;
  }
}
.footer {
  width: 375px;
  height: 80px;
  padding: 16px;
  border-top: 0.5px solid #eee;
  background: var(--gray-white, #fff);
  .cancel-btn {
    height: 48px;
    border-radius: 6px;
    text-align: center;
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    color: var(--text-icon-font-wh-1100, #fff);

    font-size: 16px;
    font-weight: 600;
    line-height: 48px;
  }
}
</style>

<style lang="scss">
.message-confirom {
  .van-dialog__header {
    color: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));
    text-align: center;

    font-size: 18px;
    font-weight: 600;
    line-height: 26px;
  }
  .van-dialog__message {
    padding: 0px;
    color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));
    text-align: center;

    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    border: none;
  }
  .van-dialog__footer {
    justify-content: center;
    align-items: center;
    gap: 12px;
    height: 88px;
    box-shadow: none !important;
    border: none !important;
    padding: 0 24px 0 24px;
  }
  .van-hairline--top:after {
    border: none;
  }

  .van-button {
    height: 40px;
  }
  .van-dialog__cancel {
    border-radius: 6px;
    background: var(--4, #fff5f0);
    color: var(--2, #ff5000);
    text-align: center;

    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
  .van-dialog__confirm {
    opacity: 1;
    border-radius: 6px;
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    color: var(--text-icon-font-wh-1100, #fff);
    text-align: center;

    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }
}
</style>
