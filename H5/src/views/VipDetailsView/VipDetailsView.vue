<template>
  <div class="vip-details">
    <NavBar :title="$t('Vletter.vipdetail')" :isShowRight="false" />
    <div class="vip-details-item">
      <div class="vip-details-item-top">
        <div class="vip-details-item-top-left"></div>
        <div class="vip-details-item-top-min">{{ $t('Vletter.tip') }}</div>
        <div class="vip-details-item-right"></div>
      </div>
      <Table :headers="headers" :rows="12" :columns="4" :columnData="memberLevelList" />
    </div>
    <!-- <div class="vip-details-item">
      <div class="vip-details-item-top">
        <div class="vip-details-item-top-left"></div>
        <div class="vip-details-item-top-min">{{ $t('Vletter.Weeklygiftmoney') }}</div>
        <div class="vip-details-item-right"></div>
      </div>
      <Table :headers="weeklyGift" :rows="12" :columns="4" :columnData="memberWeekBetList" />
    </div>
    <div class="vip-details-item">
      <div class="vip-details-item-top">
        <div class="vip-details-item-top-left"></div>
        <div class="vip-details-item-top-min">{{ $t('Vletter.monthlygiftmoney') }}</div>
        <div class="vip-details-item-right"></div>
      </div>
      <Table :headers="lunarGift" :rows="12" :columns="4" :columnData="memberMonthBetList" />
    </div>
    <div class="vip-details-item">
      <div class="vip-details-item-top">
        <div class="vip-details-item-top-left"></div>
        <div class="vip-details-item-top-min">{{ $t('Vletter.VIPrebateratio') }}</div>
        <div class="vip-details-item-right"></div>
      </div>
      <Table :headers="backwater" :rows="12" :columns="7" :columnData="memberRebateList" />
    </div> -->
    <div class="vip-details-item">
      <div class="vip-details-item-top">
        <div class="vip-details-item-top-left"></div>
        <div class="vip-details-item-top-min">{{ $t('Vletter.VipRights') }}</div>
        <div class="vip-details-item-right"></div>
      </div>
      <Table :headers="rightList" :rows="12" :columns="4" :columnData="memberRightList" />
    </div>
    <!-- <div class="vip-details-text">
      {{ $t('Vletter.tip1') }}<span @click="openCustomerServiceLink">{{ $t('Vletter.tip2') }}</span>
    </div> -->
    <div class="vip-details-item">
      <div class="vip-details-item-top">
        <div class="vip-details-item-top-left"></div>
        <div class="vip-details-item-top-min">{{ $t('Vletter.tip3') }}</div>
        <div class="vip-details-item-right"></div>
      </div>
    </div>
    <div class="vip-details-footer">
      <p>1.{{ $t('Vletter.title1') }}</p>
      {{ $t('Vletter.p1') }}
      <p>2.{{ $t('Vletter.title2') }}</p>

      {{ $t('Vletter.p2') }}
      <p>3.{{ $t('Vletter.title3') }}</p>
      {{ $t('Vletter.p3') }}
      <p>4.{{ $t('Vletter.title4') }}</p>
      {{ $t('Vletter.p4') }}
      <p>5.{{ $t('Vletter.title5') }}</p>
      {{ $t('Vletter.p5') }}
      <p>6.{{ $t('Vletter.title6') }}</p>
      {{ $t('Vletter.p6') }}
      <p>7.{{ $t('Vletter.title7') }}</p>
      {{ $t('Vletter.p7') }}
      <!-- <p>{{ $t('Vletter.title8') }}</p>
      {{ $t('Vletter.p8') }} -->
      <p>8.{{ $t('Vletter.title9') }}</p>
      {{ $t('Vletter.p9') }}
      <p>{{ $t('Vletter.p10') }}</p>
    </div>
  </div>
</template>

<script setup>
import Table from './components/Table.vue'
import { useRouter } from 'vue-router'
import { getQueryMemberVipDetail } from '@/api/vip'
import { onMounted } from 'vue'
import { openCustomerServiceLink } from '@/utils/customerService'
import i18n from '@/i18n'

const router = useRouter()
const headers = ref([
  i18n.global.t('Vletter.tip4'),
  i18n.global.t('Vletter.tip5'),
  i18n.global.t('Vletter.Effectiveflow'),
  i18n.global.t('Vletter.Relegaturnover')
])
// vip等级条件
const memberLevelList = ref([])
const weeklyGift = ref([
  i18n.global.t('Vletter.tip4'),
  i18n.global.t('Vletter.tip9'),
  i18n.global.t('Vletter.tip10'),
  i18n.global.t('Vletter.tip11')
])
// 周礼金
const memberWeekBetList = ref([])

const lunarGift = ref([
  i18n.global.t('Vletter.tip4'),
  i18n.global.t('Vletter.tip12'),
  i18n.global.t('Vletter.tip10'),
  i18n.global.t('Vletter.tip11')
])
// 月礼金
const memberMonthBetList = ref([])

const backwater = ref([
  i18n.global.t('Vletter.tip4'),
  i18n.global.t('Vletter.tip13'),
  i18n.global.t('Vletter.tip14'),
  i18n.global.t('Vletter.tip15'),
  i18n.global.t('Vletter.tip16'),
  i18n.global.t('Vletter.tip17'),
  i18n.global.t('Vletter.tip18')
])

// vip返水比例
const memberRebateList = ref([])

// vip权益
const memberRightList = ref([])
const rightList = ref([
  i18n.global.t('Vletter.tip4'),
  i18n.global.t('Vletter.title6666'),
  i18n.global.t('Vletter.title7777'),
  i18n.global.t('Vletter.relegationBonus')
])

onMounted(() => {
  getList()
})
const getList = () => {
  getQueryMemberVipDetail().then((res) => {
    memberLevelList.value = fun(res.data.memberLevelList)
    // memberWeekBetList.value = fun(res.data.memberWeekBetList)
    // memberMonthBetList.value = fun(res.data.memberMonthBetList)
    // memberRebateList.value = fun(res.data.memberRebateList)
    memberRightList.value = fun(res.data.memberRightList)
  })
}

const fun = (data) => {
  data.forEach((vipObject) => {
    delete vipObject.vipName
  })
  return data.map((obj) => Object.values(obj))
}
</script>
<style lang="scss" scoped>
.vip-details {
  background: #fff;
  padding: 0 10px;
  .vip-details-item {
    .vip-details-item-top {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0 15px 0;
      .vip-details-item-top-left {
        max-width: 80px;
        min-width: 50px;
        height: 1px;
        background: linear-gradient(270deg, #ff5000 6.57%, rgba(255, 80, 0, 0) 95.96%);
      }
      .vip-details-item-top-min {
        color: #111;

        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        margin: 0 10px;
      }
      .vip-details-item-right {
        max-width: 80px;
        min-width: 50px;
        height: 1px;
        background: linear-gradient(270deg, rgba(255, 80, 0, 0) 6.57%, #ff5000 95.96%);
      }
    }
  }
  .vip-details-text {
    width: 345px;
    min-height: 46px;
    margin: 14px auto 0;
    color: #999;

    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    span {
      color: var(--1, #f53f3f);
      font-size: 13px;
      line-height: 20px;
      text-decoration-line: underline;
    }
  }
  .vip-details-footer {
    width: 345px;
    color: #111;
    margin-bottom: 15px;

    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    p {
      margin-top: 15px;
    }
  }
}
</style>
