<template>
  <div class="main-box">
    <div class="title">{{ $t('GeneralUserCenter.InvitationMethod') }}</div>
    <div class="invite-way">
      <div class="invite-link">
        <div class="link-box">{{ inviteLink }}</div>
        <span v-clipboard="inviteLink" v-if="inviteLink">{{
          $t('GeneralUserCenter.CopyLink')
        }}</span>
        <span v-else @click="">{{ $t('GeneralUserCenter.CopyLink') }}</span>
      </div>
      <div class="invite-qr">
        <QrCode v-model="downloadURl" size="134" :link="inviteLink" v-if="inviteLink" />
        <span class="qr-btn" @click="downloadPic">{{
          $t('GeneralUserCenter.DownloadPictures')
        }}</span>
      </div>
    </div>
    <div class="activity">
      <div class="activity-title">
        <span class="big-text">{{ $t('GeneralUserCenter.Activities') }}</span>
        <span class="middle-text"
          >{{ $t('GeneralUserCenter.ActiveObject') }}：{{ $t('friends.AboveLevel0') }}</span
        >
        &nbsp;&nbsp;&nbsp;
        <span
          >{{ $t('GeneralUserCenter.ActivityTime') }}：{{
            $t('GeneralUserCenter.LongtermActivities')
          }}</span
        >
      </div>
      <div class="first-table-row">
        <div class="first-table-container">
          <div class="table-title">
            <img src="../img/bg_01.png" />{{ $t('GeneralUserCenter.InviteTitle_1') }}
          </div>
          <Table :tableData="tableData1.tableData"></Table>
        </div>
        <div class="first-table-container">
          <div class="table-title">
            <img src="../img/bg_02.png" />{{ $t('GeneralUserCenter.InviteTitle_2') }}
          </div>
          <Table :tableData="refTableData2.tableData2"></Table>
        </div>
      </div>
      <div class="second-table-row">
        <div class="table-title">
          <img src="../img/bg_03.png" />{{ $t('GeneralUserCenter.InviteTitle_3') }}
        </div>
        <Table :tableData="refTableData3.tableData3"></Table>
      </div>
    </div>
    <div class="activty-describe">
      <div class="describe-title">{{ $t('GeneralUserCenter.EventDetails') }}</div>
      <div class="describe-text">
        <p>
          ①
          {{ $t('GeneralUserCenter.InviteTips_1') }}
        </p>
        <p>
          ②
          {{ $t('GeneralUserCenter.InviteTips_2') }}
        </p>
        <p>
          ③
          {{ $t('GeneralUserCenter.InviteTips_3') }}
        </p>
        <p>
          ④
          {{ $t('GeneralUserCenter.InviteTips_4') }}
        </p>
        <p>
          ⑤
          {{ $t('GeneralUserCenter.InviteTips_5') }}
        </p>
        <p>⑥ {{ $t('GeneralUserCenter.InviteTips_6') }}</p>
        <p>
          ⑦
          {{ $t('GeneralUserCenter.InviteTips_7') }}
        </p>
        <p>⑧ {{ $t('GeneralUserCenter.InviteTips_8') }}</p>
        <p>
          ⑨
          {{ $t('GeneralUserCenter.InviteTips_9') }}
        </p>
        <p>⑩ {{ $t('GeneralUserCenter.InviteTips_10') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from 'vue'
import QrCode from '@/components/QrCode/QrCode.vue'
import { ERR_OK } from '@/utils/config'
import i18n from '@/i18n'
import vClipboard from '@/directives/clipboard'
import { generateReferralCode, queryInviteBetConfig, queryInviteVipConfig } from '@/api/user'
import Table from '@/components/Table/Table.vue'
import { ElMessage } from 'element-plus'
const props = defineProps(['inviteData'])
// const emit = defineEmits(['handleReceiveInviteStatus'])
const inviteLink = ref('')
const downloadURl = ref('')
const site = import.meta.env.VITE_SITE

let tableData = [
  {
    columns: [
      { id: 1, label: i18n.global.t('GeneralUserCenter.Title_1') },
      { id: 2, label: i18n.global.t('GeneralUserCenter.Title_2') },
      { id: 3, label: i18n.global.t('GeneralUserCenter.Title_3') }
    ],
    data: [
      {
        referrals: `-`,
        referralReward: '-',
        inviteeBonus: '-'
      }
    ]
  }
]

const tableData2 = [
  {
    columns: [
      { label: i18n.global.t('GeneralUserCenter.GameType') },
      {
        label: i18n.global.t('friends.BonusPercentage')
      }
    ],
    data: []
  }
]

const tableData3 = [
  {
    columns: [
      { label: i18n.global.t('GeneralUserCenter.Title_4') },
      { label: i18n.global.t('GeneralUserCenter.Title_5') }
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

const getInviteLink = () => {
  generateReferralCode().then((res) => {
    if (res?.['code'] === ERR_OK) {
      inviteLink.value =
        res?.['data']?.['domainName'] + '/?referCode=' + res?.['data']?.['referCode']
    } else {
      ElMessage.error(res['msg'])
    }
  })
}

const downloadPic = () => {
  if (!!inviteLink.value && !!downloadURl.value) {
    const aLink = document.createElement('a')
    aLink.download = '好友邀请'
    aLink.href = downloadURl.value
    aLink.dispatchEvent(new MouseEvent('click', {}))
  }
}

// watch(
//   () => props.inviteLinkUrl,
//   (newVal, oldVal) => {
//     !!newVal && getInviteLink(newVal)
//   },
//   { immediate: true }
// )

watch(
  () => props.inviteData,
  (newVal, oldVal) => {
    if (newVal) {
      tableData1.value.tableData[0].data[0].referrals = `${
        newVal.inviteData['depAmountMin'] || 0
      } - ${newVal.inviteData['depAmountMax'] || 0} ${i18n.global.t('GeneralUserCenter.Currency')}`
      tableData1.value.tableData[0].data[0].referralReward = `${
        newVal.inviteData['inviteAwardAmount'] + '%' || 0
      }`
      tableData1.value.tableData[0].data[0].inviteeBonus = `${
        newVal.inviteData['subAwardAmount'] + '%' || 0
      }`
    }
  },
  { immediate: true, deep: true }
)

const getInviteBetConfig = () => {
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

const getInviteVipConfig = () => {
  queryInviteVipConfig().then((res = []) => {
    if (res?.['code'] === ERR_OK) {
      refTableData3.value.tableData3[0].data = res?.['data'] || []
    }
  })
}

onMounted(() => {
  // getInviteDepConfig()
  getInviteBetConfig()
  getInviteVipConfig()
  getInviteLink()
})
</script>

<style lang="scss" scoped>
.main-box {
  margin-top: 56px;
  .title {
    color: var(--100, #fff);

    font-size: 20px;
    font-weight: 500;
  }
  .invite-way {
    display: flex;
    height: 220px;
    margin-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    .invite-link {
      display: flex;
      position: relative;
      top: 79px;
      color: var(--100, #fff);

      font-size: 14px;
      font-weight: 400;
      line-height: 28px;
      width: 399px;
      height: 35px;
      padding-left: 12px;
      border-radius: 200px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      span {
        position: absolute;
        right: 0;
        top: -1px;
        display: flex;
        // width: 104px;
        width: auto;
        height: 36px;
        margin-left: 123px;
        padding: 10px;
        justify-content: center;
        align-items: center;
        border-radius: 200px;
        background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      }
    }
    .invite-qr {
      display: flex;
      margin: 30px 0 0 280px;
      .qr-btn {
        display: flex;
        width: 104px;
        height: 36px;
        padding: 10px;
        margin: 49px 0 0 20px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        border-radius: 200px;
        background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
        color: #fff;

        font-size: 14px;
        font-weight: 400;
        line-height: 28px;
        cursor: pointer;
      }
    }
  }
  .activity {
    position: relative;
    min-height: 325px;
    .activity-title {
      height: 28px;
      margin-top: 56px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.1));
      span {
        color: var(--60, rgba(255, 255, 255, 0.6));

        font-size: 16px;
        font-weight: 400;
      }
      .big-text {
        margin-right: 20px;
        color: var(--100, #fff);
        font-size: 20px;
        font-weight: 500;
      }
    }
    .table-title {
      position: relative;
      padding-left: 16px;
      color: var(--100, #fff);
      font-size: 14px;
      font-weight: 500;
      line-height: 28px;
      img {
        position: absolute;
        top: -12px;
        left: 0;
        width: 35px;
      }
    }
    .first-table-row {
      display: flex;
      gap: 48px;
      margin-top: 30px;

      .first-table-container {
        flex: 1 0 calc(50% - 24px);
      }
    }
    .second-table-row {
      width: 500px;
      position: absolute;
      top: 210px;
    }
    .second-table-row::after {
      display: table;
      content: '';
      clear: both;
    }
  }
  .activty-describe {
    margin-top: 56px;
    .describe-title {
      color: var(--100, #fff);

      font-size: 20px;
      font-weight: 500;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .describe-text {
      margin-top: 30px;
      color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
      text-align: justify;

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
    }
  }
}
</style>
