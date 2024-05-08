<template>
  <div class="main-contianer">
    <div class="frist-row" v-if="user.userInfo?.role === 0">
      <div @click="goUserPage('deposit')" class="money-box">
        <img src="../img/charge.png" alt="" />
        <div>{{ $t('Components.Deposit') }}</div>
      </div>
      <div @click="goUserPage('Withdraw')" class="money-box">
        <img src="../img/withdraw.png" alt="" />
        <div>{{ $t('Components.withdraw') }}</div>
      </div>
    </div>
    <div v-if="user.userInfo?.role !== 0" style="padding-top: 20px"></div>
    <div class="opt" v-for="item in selectList" :key="item.id" @click="goUserPage(item.id)">
      <img :src="item.iconUrl" alt="" />
      {{ item.label }}
      <span v-if="item.id == 7 && announcement.totalUnread" class="letter-num">{{
        announcement.totalUnread
      }}</span>
    </div>
    <div class="quit-btn" @click="user.logOutAction()">
      <img src="../img/quit.png" alt="" />
      {{ $t('Components.SignOut') }}
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { toUserPage } from '@/utils/navigate.js'
import eventBus from '@/utils/eventBus'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal.js'
import { useAnnouncementStore } from '@/stores/announcement'
const announcement = useAnnouncementStore()
const mainConfig = useChargeAndWithdrawal()
const user = useUserStore()

function goUserPage(val) {
  if (!user.userInfo.userName) {
    ElMessage(i18n.global.t('Components.Notice_11'))
  } else {
    if (val == 'deposit') {
      // 是否绑定手机号或者银行卡
      mainConfig.currentShow = 1
      const params = {
        isOpen: true,
        current: 1
      }
      eventBus.emit('showCharge', params)
    } else if (val == 'Withdraw') {
      mainConfig.currentShow = 2
      const params = {
        isOpen: true,
        current: 2
      }
      eventBus.emit('showCharge', params)
    } else {
      toUserPage(val)
    }
  }
}
const optionData = ref([
  {
    label: i18n.global.t('Components.BettingRecord'),
    id: 0,
    iconUrl: new URL('../img/bet_record.png', import.meta.url).href
  },
  {
    label: i18n.global.t('Components.FundDetails'),
    id: 1,
    iconUrl: new URL('../img/balance.png', import.meta.url).href
  },
  {
    label: i18n.global.t('Components.InviteFriends'),
    id: 2,
    iconUrl: new URL('../img/invite.png', import.meta.url).href
  },
  {
    label: i18n.global.t('Components.PersonalCenter'),
    id: 3,
    iconUrl: new URL('../img/personal.png', import.meta.url).href
  },
  {
    label: i18n.global.t('Components.VIPCenter'),
    id: 4,
    iconUrl: new URL('../img/VIP.png', import.meta.url).href
  },
  {
    label: i18n.global.t('Components.MessageCenter'),
    id: 7,
    iconUrl: new URL('../img/message.png', import.meta.url).href
  },
  {
    label: i18n.global.t('Components.WelfareCenter'),
    id: 5,
    iconUrl: new URL('../img/welfare.png', import.meta.url).href
  },
  {
    label: i18n.global.t('Components.BusinessCooperation'),
    id: 8,
    iconUrl: new URL('../img/cooperate.png', import.meta.url).href
  }
])
const otherList = ref([
  // {
  //   label: '我要开播',
  //   id: 7,
  //   iconUrl: new URL('../img/message.png', import.meta.url).href
  // },
  {
    label: i18n.global.t('Components.PersonalCenter'),
    id: 3,
    iconUrl: new URL('../img/personal.png', import.meta.url).href
  }
  // {
  //   label: '礼物明细',
  //   id: 7,
  //   iconUrl: new URL('../img/cooperate.png', import.meta.url).href
  // }
])
const selectList = computed(() => {
  if (user.userInfo.userName) {
    if (user.userInfo.role === 0) {
      return optionData.value
    } else {
      return otherList.value
    }
  } else {
    return optionData.value
  }
})
</script>

<style lang="scss" scoped>
.main-contianer {
  color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));

  font-size: 12px;
  font-weight: 400;

  .frist-row {
    display: flex;
    width: 190px;
    height: 80px;
    padding-top: 11px;
    gap: 14px;
    margin: 0px auto 18px;

    .money-box {
      display: flex;
      // padding: 10px 30px;
      width: 86px;
      height: 80px;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      background: #161a30;
      justify-content: center;
      cursor: pointer;
      img {
        width: 26px;
        height: 26px;
        display: block;
        margin-bottom: 5px;
      }
    }
  }

  .opt {
    display: flex;
    width: 220px;
    padding: 14px 16px;
    align-items: center;
    gap: 14px;
    background: #232949;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
    }
  }

  .opt:hover {
    background: #323c6f;
  }

  .quit-btn {
    display: flex;
    width: 188px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 10px auto;
    border-radius: 10px;
    border: 1px solid var(--unnamed, rgba(255, 255, 255, 0.1));
    img {
      width: 30px;
      height: 30px;
    }
  }

  .quit-btn:hover {
    cursor: pointer;
  }
}

.main-contianer::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);

  border-width: 15px;
  border-style: solid;
  border-color: transparent transparent #232949 transparent;
}

.letter-num {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 60px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(-----, #e93d3d);
  color: #fff;
  font-size: 10px;
  padding-right: 1px;
}
</style>
