<template>
  <div class="active-conten Activityview">
    <div>
      <div class="active-box">
        <p class="active-item">{{ $t('Iletter.ActiveObjects') }}</p>
        <span>{{ $t('Iletter.Ilettile4') }}</span>
      </div>
      <div class="active-box">
        <p class="active-item">{{ $t('Iletter.ActivityTime') }}</p>
        <span>{{ $t('Iletter.LongtermActivity') }}</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="table-box">
      <div class="table-ttile">
        <div class="number">01</div>
        <div class="title">{{ $t('Iletter.Ilettile5') }}</div>
      </div>
      <Table :tableData="tableData1.tableData" height="40px" />
    </div>
    <div class="table-box">
      <div class="table-ttile">
        <div class="number">02</div>
        <div class="title">{{ $t('Iletter.Ilettile6') }}</div>
      </div>
      <Table :tableData="refTableData2.tableData2" />
    </div>
    <div class="table-box">
      <div class="table-ttile">
        <div class="number">03</div>
        <div class="title">{{ $t('Iletter.Ilettile7') }}</div>
      </div>
      <Table :tableData="refTableData3.tableData3" height="40px" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Table from '@/components/Table/Table'
import i18n from '@/i18n'
import { queryInviteBetConfig, queryInviteDepConfig, queryInviteVipConfig } from '@/api/user'
import { ERR_OK } from '@/utils/config'
import { getToken } from '@/utils/cache'
import { useMobileEvent } from '@/hooks/useMobileEvent'

const { token } = useMobileEvent()

const isLogin = getToken()

let tableData = [
  {
    columns: [
      { id: 1, label: i18n.global.t('Iletter.Ilettile8') },
      { id: 2, label: i18n.global.t('Iletter.Ilettile9') },
      { id: 3, label: i18n.global.t('Iletter.Ilettile10') }
    ],
    data: [
      {
        referrals: `${i18n.global.t('Iletter.moneySite')}`,
        referralReward: '1%',
        inviteeBonus: '1%'
      }
    ]
  }
]

const tableData2 = [
  {
    columns: [
      { label: i18n.global.t('Iletter.gametype') },
      { label: i18n.global.t('Iletter.BonusPercentage') }
    ],
    data: []
  }
]

const tableData3 = [
  {
    columns: [
      { label: i18n.global.t('Iletter.label1') },
      { label: i18n.global.t('Iletter.label2') }
    ],
    data: []
  }
]

const tableData1 = ref({
  tableData
})
const refTableData2 = ref({
  tableData2
})
const refTableData3 = ref({
  tableData3
})

const getInviteBetConfig = () => {
  if (isLogin || token) {
    queryInviteBetConfig().then((res = []) => {
      if (res?.['code'] === ERR_OK) {
        refTableData2.value.tableData2[0].data =
          res?.['data'] &&
          res?.['data'].length &&
          res?.['data'].map((item) => {
            item.awardPer = item.awardPer + '%'
            return item
          })
      }
    })
  }
}

const getInviteDepConfig = () => {
  if (isLogin || token) {
    queryInviteDepConfig().then((res) => {
      if (res?.['code'] === ERR_OK) {
        tableData1.value.tableData[0].data[0].referrals = `${
          res?.['data']?.['depAmountMin'] || 0
        } - ${res?.['data']['depAmountMax'] || 0} ${i18n.global.t('Iletter.moneySite')}`
        tableData1.value.tableData[0].data[0].referralReward = `${
          res?.['data']?.['inviteAwardAmount'] + '%' || 0
        }`
        tableData1.value.tableData[0].data[0].inviteeBonus = `${
          res?.['data']?.['subAwardAmount'] + '%' || 0
        }`
      }
    })
  }
}

const getInviteVipConfig = () => {
  if (isLogin || token) {
    queryInviteVipConfig().then((res = []) => {
      if (res?.['code'] === ERR_OK) {
        refTableData3.value.tableData3[0].data = res?.['data'] || []
      }
    })
  }
}

onMounted(() => {
  getInviteBetConfig()
  getInviteDepConfig()
  getInviteVipConfig()
})
</script>

<style lang="scss" scoped>
.Activityview {
  @include mobile-padding();
  width: 345px;
  border-radius: 10px 10px 0 0;
  background: #fff;
  box-shadow: 0 4px 6px 0 rgba(172, 139, 96, 0.2);
  margin-top: 15px;
  padding-bottom: 5px;

  .active-box {
    @include center-content(start, left);
    padding-top: 13px;
    .active-item {
      //width: 80px;
      height: 20px;
      border-radius: 4px;
      background: #ffdcad;
      color: #111;
      font-size: 13px;
      font-weight: 400;
      padding-left: 6px;
      line-height: 20px;
      margin-right: 6px;
      word-spacing: 0;
      letter-spacing: 0;
      text-align: center;
    }
    span {
      color: #111;
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
      word-spacing: 0;
      letter-spacing: 0;
      text-align: center;
    }
  }
  .line {
    margin: 20px auto;
    content: '';
    width: 306px;
    height: 1px;
    background: #ffdcad;
    border-bottom: 1.5px dashed #ccc;
  }
  .number {
    color: rgba(255, 144, 0, 0.32);
    font-size: 50px;
    font-weight: 700;
  }
  .title {
    color: #ff5000;

    font-size: 17px;
    font-weight: 600;
    margin: -25px 0 0 21px;
  }
  .table-box {
    margin-bottom: 20px;
    .table-ttile {
      margin-bottom: 20px;
    }
  }
}
</style>
