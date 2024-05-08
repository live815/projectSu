<template>
  <div class="virtualBanner">
    <NavBar v-if="!appFlag" :title="$t('Vletter.title10')" :isShowRight="false" />
    <div class="virtualBanner-text">
      {{ $t('Vletter.tip36') }}
    </div>
    <HeadlineTitle :leftTitle="$t('Vletter.title11')" :isShowIcon="true"></HeadlineTitle>
    <div class="virtualBanner-text">
      {{ $t('Vletter.tip37') }}
    </div>
    <HeadlineTitle :leftTitle="$t('Vletter.title12')" :isShowIcon="true"></HeadlineTitle>
    <div class="virtualBanner-list">
      <div class="virtualBanner-item" v-for="item in textList" :key="item.id">
        <div class="virtualBanner-item-left">
          <div class="virtualBanner-item-title">{{ item.title }}</div>
          <div class="virtualBanner-item-text">{{ item.text }}</div>
        </div>
        <img class="virtualBanner-item-right" :src="item.icon" />
      </div>
    </div>
    <HeadlineTitle leftTitle="USDT的常见协议" :isShowIcon="true"></HeadlineTitle>
    <div class="virtualBanner-box">
      <div class="virtualBanner-box-title">{{ $t('Vletter.Pleasenote') }}</div>
      <div class="virtualBanner-box-text">{{ $t('Vletter.tip38') }}</div>
      <div class="virtualBanner-box-text">{{ $t('Vletter.tip39') }}</div>
      <div class="virtualBanner-box-text">
        <span v-html="$t('Vletter.tip40')"></span>
      </div>
    </div>
    <div class="virtualBanner-table">
      <div class="virtualBanner-table-thead">
        <div class="virtualBanner-table-thead-th">{{ $t('Vletter.protocol') }}</div>
        <div class="virtualBanner-table-thead-th">ERC20</div>
        <div class="virtualBanner-table-thead-th">TRC</div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.Addresstyle') }}</div>
        <div class="virtualBanner-table-tr-td">
          <div>{{ $t('Vletter.tip41') }}</div>
          <div class="table-margin-text">0x1231...</div>
        </div>
        <div class="virtualBanner-table-tr-td">
          <div>{{ $t('Vletter.tip42') }}</div>
          <div class="table-margin-text">T×2900...</div>
        </div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.Recommendat') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.Mediumamount') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.Smallvaluetransfer') }}</div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.safety') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.height') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.lowerthanformer') }}</div>
      </div>
      <div class="virtualBanner-table-tr table-height">
        <div class="virtualBanner-table-tr-td">
          <div>{{ $t('Vletter.handlfee') }}</div>
          <div>({{ $t('Vletter.tradplatform') }})</div>
        </div>
        <div class="virtualBanner-table-tr-td">
          <div class="table-margin"><span v-html="$t('Vletter.tip43')"></span></div>
          <div class="table-margin-texts"><span v-html="$t('Vletter.tip44')"></span></div>
        </div>
        <div class="virtualBanner-table-tr-td">
          <div class="table-margin"><span v-html="$t('Vletter.tip45')"></span></div>
          <div class="table-margin-texts"><span v-html="$t('Vletter.tip46')"></span></div>
        </div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.tip47') }}</div>
        <div class="virtualBanner-table-tr-td">
          <div>{{ $t('Vletter.medium') }}</div>
          <div>({{ $t('Vletter.tip48') }})</div>
        </div>
        <div class="virtualBanner-table-tr-td">
          <span v-html="$t('Vletter.quick')"></span>
        </div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.usenetwork') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.Ethereum') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.wavefield') }}</div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.networkcongest') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.oftencongest') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('Vletter.Basenocongest') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import i18n from '@/i18n'
import NavBar from '@/components/NavBar/NavBar'

const textList = reactive([
  {
    id: 1,
    title: i18n.global.t('Vletter.stablevalue'),
    text: i18n.global.t('Vletter.tip49'),
    icon: new URL('./img/banner1.png', import.meta.url).href
  },
  {
    id: 2,
    title: i18n.global.t('Vletter.Safeanonymous'),
    text: i18n.global.t('Vletter.tip50'),
    icon: new URL('./img/banner2.png', import.meta.url).href
  },
  {
    id: 3,
    title: i18n.global.t('Vletter.Fastcirculat'),
    text: i18n.global.t('Vletter.tip51'),
    icon: new URL('./img/banner3.png', import.meta.url).href
  }
])
const appFlag = computed(() => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('app') === 'true';
});
</script>
<style lang="scss" scoped>
.virtualBanner {
  position: relative;
  padding: 15px;
  .virtualBanner-text {
    color: #111;

    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 160% */
  }
  .virtualBanner-list {
    .virtualBanner-item {
      position: relative;
      width: 343px;
      height: 100px;
      padding-left: 16px;
      margin: 8px 0;
      border-radius: 10px;
      background: var(--4, #fff5f0);
      .virtualBanner-item-left {
        width: 256px;
        overflow: hidden;
        .virtualBanner-item-title {
          font-size: 16px;
          font-weight: 600;
          margin: 16px 0 12px 0;
          background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .virtualBanner-item-text {
          color: #111;
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }
    .virtualBanner-item-right {
      position: absolute;
      right: -3px;
      bottom: 10px;
      width: 80px;
      height: 70px;
    }
  }
  .virtualBanner-box {
    display: flex;
    width: 343px;
    padding: 16px;
    margin-bottom: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 10px;
    background: var(--4, #fff5f0);
    .virtualBanner-box-title {
      color: #111;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .virtualBanner-box-text {
      color: #111;
      text-align: justify;

      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      span {
        color: var(--1, #f53f3f);
        font-weight: 600;
      }
    }
  }
  .virtualBanner-table {
    border-radius: 8px;
    border: 1px solid #ff5000;
    font-size: 12px;
    width: 343px;
    box-sizing: border-box;
    .virtualBanner-table-thead {
      display: flex;
      height: 32px;
      line-height: 32px;
      color: #fff;
      font-weight: 500;
      border-radius: 7px 7px 0 0;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      .virtualBanner-table-thead-th:first-child {
        width: 80px;
        margin-left: 10px;
      }
      .virtualBanner-table-thead-th:last-child {
        width: 131px;
      }
      .virtualBanner-table-thead-th:nth-child(2) {
        width: 132px;
      }
    }
    .virtualBanner-table-tr {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 48px;
      color: #111;
      font-size: 12px;

      .virtualBanner-table-tr-td:first-child {
        width: 80px;
        margin-left: 10px;
      }
      .virtualBanner-table-tr-td:last-child {
        width: 131px;
      }
      .virtualBanner-table-tr-td:nth-child(2) {
        width: 132px;
      }
    }
    .virtualBanner-table-tr:nth-child(2n-1) {
      background: var(--4, #fff5f0);
    }
    .table-height {
      height: 96px;
    }
    .table-margin {
      margin-bottom: 10px;
      line-height: 16px;
      span {
        font-weight: 700;
      }
    }
    .table-margin-texts {
      span {
        font-weight: 700;
      }
    }
    .table-margin-text {
      margin-top: 5px;
      color: #f53f3f;
    }
  }
}
</style>
