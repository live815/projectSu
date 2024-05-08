<template>
  <div>
    <van-popup
      v-model:show="show"
      position="right"
      :style="{ width: '100%', height: '100%', background: '#F7F7F7' }"
    >
      <NavBar :title="$t('Iletter.InviteFriend')" @onClickLeft="closePopup" :isBack="false" v-if="!token" />
      <div class="top">
        <p>
          {{ $t('Iletter.Ilettile13') }}<span>{{ totalAllAward }}</span>
        </p>
        <p>{{ $t('Iletter.invitotalnumber') }}{{ totalMember }}</p>
      </div>
      <div class="content">
        <van-tabs v-model="active">
          <van-tab :title="$t('Iletter.Ilettile14')">
            <van-button
              :class="`invite-but ${butstatus === 'today' ? 'selected-but' : ''}`"
              @click="invite('all')"
            >
              {{ $t('Iletter.todayinvit') }}
            </van-button>
            <van-button
              :class="`invite-but ${butstatus === 'all' ? 'selected-but' : ''}`"
              @click="invite('today')"
            >
              {{ $t('Iletter.Inviteall') }}
            </van-button>
            <div class="title">
              <span
                >{{ butstatus === 'today' ? $t('Iletter.today') : $t('Iletter.all')
                }}{{ $t('Iletter.firstdeposit') }}{{ inviteData || 0 }}</span
              >
            </div>
            <Table :tableData="tableData" />
          </van-tab>
          <van-tab :title="$t('Iletter.Ilettile15')">
            <Table :tableData="tableData2" style="margin-top: 10px" />
          </van-tab>
        </van-tabs>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, defineExpose, onMounted, nextTick } from 'vue'
import Table from '@/components/Table/Table'
import i18n from '@/i18n'
import { queryInviteBetAwardList, queryInviteDepAward, queryInviteInfoTotalAward } from '@/api/user'
import { ERR_OK } from '@/utils/config'
import { useMobileEvent } from '@/hooks/useMobileEvent'

const { token } = useMobileEvent()

const totalAllAward = ref(0)
const totalMember = ref(0)
const active = ref(0)
const inviteData = ref('')
const butstatus = ref('today')

const tableData = ref([
  {
    columns: [
      { id: 1, label: i18n.global.t('Iletter.registratime') },
      { id: 2, label: i18n.global.t('Iletter.firstdepositime') },
      { id: 3, label: i18n.global.t('Iletter.firstdepositamount') },
      { id: 4, label: i18n.global.t('Iletter.rewardamount') }
    ],
    data: [
      {
        registrationTime: '-',
        firstDepositTime: '-',
        firstDepositAmount: '-',
        awardAmount: '-'
      }
    ]
  }
])
const tableData2 = ref([
  {
    columns: [
      { id: 1, label: i18n.global.t('Iletter.registratime') },
      { id: 2, label: i18n.global.t('Iletter.totaldistributshare') },
      { id: 3, label: i18n.global.t('Iletter.lastshare') },
      { id: 4, label: i18n.global.t('Iletter.dividintoshare') }
    ],
    data: [
      {
        registrationTime: '-',
        firstDepositTime: '-',
        firstDepositAmount: '-',
        awardAmount: '-'
      }
    ]
  }
])
const invite = (status) => {
  if (status === 'today') {
    butstatus.value = 'all'
    getInviteDepAward(0)
  } else if (status === 'all') {
    butstatus.value = 'today'
    getInviteDepAward(1)
  }
}
const show = ref(false)

const showPopup = () => {
  show.value = true
}

const closePopup = () => {
  show.value = false
}

const getInviteBetAwardList = () => {
  queryInviteBetAwardList().then((res) => {
    if (res?.['code'] === ERR_OK) {
      tableData2.value[0].data = res?.['data']?.['betAwardDataList'] || []
    }
  })
}

const getInviteDepAward = (type) => {
  queryInviteDepAward({ type }).then((res) => {
    if (res?.['code'] === ERR_OK) {
      inviteData.value = res?.['data']?.['depAwards']
      tableData.value[0].data = res?.['data']?.['depAwardDataList'] || []
    }
  })
}

const getInviteInfoTotalAward = () => {
  queryInviteInfoTotalAward().then((res) => {
    if (res?.['code'] === ERR_OK) {
      totalAllAward.value = res?.['data']?.['totalAllAward'] * 1
      totalMember.value = res?.['data']?.['totalMember'] * 1
    }
  })
}

onMounted(() => {
  nextTick(() => {
    getInviteBetAwardList()
    getInviteDepAward(1)
    getInviteInfoTotalAward()
  })
})

defineExpose({ showPopup })
</script>

<style lang="scss" scoped>
.top {
  @include mobile-padding();
  @include center-content(space-between, center);
  width: 375px;
  height: 55px;
  border-top: 1px solid #f7f7f7;
  border-radius: 0 0 20px 20px;
  background: #fff;
  color: #111;

  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
  span {
    color: var(--2, #ff5000);
  }
}
.van-tabs__line {
  width: 30px;
  height: 6px;
  border-radius: 60px;
  background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
}
.content {
  @include mobile-padding();
  width: 375px;
  height: 235px;
  border-radius: 20px;
  background: #fff;
  :deep() {
    .van-tab {
      flex: none;

      margin-right: 15px;
      .van-tab__text {
        font-weight: 600;
      }
    }
    .van-tab--active {
      color: #111;
      font-size: 15px;
    }
    .van-tabs__line {
      bottom: 26px;
      width: 30px;
      height: 5px;
      border-radius: 60px;
      background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
      z-index: 0;
    }
  }
  .invite-but {
    color: #666;
    font-size: 13px;
    font-weight: 400;
    width: 96px;
    height: 34px;
    border-radius: 90px;
    margin: 5px 20px 0 0;
    background: #f7f7f7;
  }
  .selected-but {
    color: var(--2, #ff5000);
    border: 0.5px solid #ff5000;
    border-radius: 90px;
    background: #fff5f0;
  }
  .title {
    color: #111;
    font-size: 14px;
    font-weight: 400;
    margin: 15px 0 15px 0;
  }
}
</style>
