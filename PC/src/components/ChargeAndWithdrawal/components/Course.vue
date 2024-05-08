<template>
  <div class="course-content">
    <div class="course-content-top">
      <img class="img" src="../img/icon_Back.png" @click="onClickGoBack" />
      <div>{{ $t('DepositWithdraw.title10') }}</div>
    </div>
    <div class="line"></div>
    <div class="title">
      {{ $t('DepositWithdraw.tip36') }}
    </div>
    <div class="title-box">
      <div class="title-box-left"></div>
      <div class="title-box-right">{{ $t('DepositWithdraw.title11') }}</div>
    </div>
    <div class="title-box-one">
      {{ $t('DepositWithdraw.tip37') }}
    </div>
    <div class="title-box">
      <div class="title-box-left"></div>
      <div class="title-box-right">{{ $t('DepositWithdraw.title12') }}</div>
    </div>
    <div class="title-box-two">
      <div class="title-box-two-title">{{ $t('DepositWithdraw.stablevalue') }}</div>
      <div class="title-box-two-test">
        {{ $t('DepositWithdraw.tip49') }}
      </div>
    </div>
    <div class="title-box-two">
      <div class="title-box-two-title">{{ $t('DepositWithdraw.Safeanonymous') }}</div>
      <div class="title-box-two-test">
        {{ $t('DepositWithdraw.tip50') }}
      </div>
    </div>
    <div class="title-box-two">
      <div class="title-box-two-title">{{ $t('DepositWithdraw.Fastcirculat') }}</div>
      <div class="title-box-two-test">
        {{ $t('DepositWithdraw.tip51') }}
      </div>
    </div>
    <div class="title-box-twos">
      <div class="title-box-twos-text">
        {{ $t('DepositWithdraw.tip52') }}
      </div>
    </div>
    <div class="title-box">
      <div class="title-box-left"></div>
      <div class="title-box-right">{{ $t('DepositWithdraw.tip53') }}</div>
    </div>
    <div class="virtualBanner-table">
      <div class="virtualBanner-table-thead">
        <div class="virtualBanner-table-thead-th">{{ $t('DepositWithdraw.protocol') }}</div>
        <div class="virtualBanner-table-thead-th">ERC20</div>
        <div class="virtualBanner-table-thead-th">TRC</div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.Addresstyle') }}</div>
        <div class="virtualBanner-table-tr-td">
          <div>{{ $t('DepositWithdraw.tip41') }}</div>
          <div class="table-margin-text">0x1231...</div>
        </div>
        <div class="virtualBanner-table-tr-td">
          <div>{{ $t('DepositWithdraw.tip42') }}</div>
          <div class="table-margin-text">T×2900...</div>
        </div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.Recommendat') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.Mediumamount') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.Smallvaluetransfer') }}</div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.safety') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.height') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.lowerthanformer') }}</div>
      </div>
      <div class="virtualBanner-table-tr table-height">
        <div class="virtualBanner-table-tr-td">
          <div>{{ $t('DepositWithdraw.handlfee') }}</div>
          <div>({{ $t('DepositWithdraw.tradplatform') }})</div>
        </div>
        <div class="virtualBanner-table-tr-td">
          <div class="table-margin"><span v-html="$t('DepositWithdraw.tip43')"></span></div>
          <div class="table-margin-texts"><span v-html="$t('DepositWithdraw.tip44')"></span></div>
        </div>
        <div class="virtualBanner-table-tr-td">
          <div class="table-margin"><span v-html="$t('DepositWithdraw.tip45')"></span></div>
          <div class="table-margin-texts"><span v-html="$t('DepositWithdraw.tip46')"></span></div>
        </div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.tip47') }}</div>
        <div class="virtualBanner-table-tr-td">
          <div>{{ $t('DepositWithdraw.medium') }}</div>
          <div>({{ $t('DepositWithdraw.tip48') }})</div>
        </div>
        <div class="virtualBanner-table-tr-td">
          <span v-html="$t('DepositWithdraw.quick')"></span>
        </div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.usenetwork') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.Ethereum') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.wavefield') }}</div>
      </div>
      <div class="virtualBanner-table-tr">
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.networkcongest') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.oftencongest') }}</div>
        <div class="virtualBanner-table-tr-td">{{ $t('DepositWithdraw.Basenocongest') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal'

const mainConfig = useChargeAndWithdrawal()
// 关闭教程
const onClickGoBack = () => {
  mainConfig.isCourse = false
}
</script>
<style lang='scss' scoped>
.course-content {
  .course-content-top {
    display: flex;
    align-items: center;
    height: 60px;
    color: #fff;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    .img {
      width: 24px;
      height: 24px;
      margin-left: 30px;
      margin-right: 246px;
    }
  }
  .line {
    width: 720px;
    height: 4px;
    background: #1d223e;
  }
  .title {
    color: var(-----100, #fff);
    
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    margin: 24px 0 45px 30px;
  }
  .title-box {
    display: flex;
    align-items: center;
    margin-left: 30px;
    .title-box-left {
      width: 4px;
      height: 12px;
      border-radius: 0px 8px 8px 0px;
      background: #ff5000;
      margin-right: 8px;
    }
    .title-box-right {
      color: var(-----100, #fff);
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
    }
  }
  .title-box-one {
    width: 660px;
    min-height: 52px;
    margin: 14px 0 24px 30px;
    color: var(-----80, rgba(255, 255, 255, 0.8));
    text-align: justify;
    font-size: 15px;
    font-weight: 400;
    line-height: 26px;
  }
  .title-box-two {
    width: 660px;
    min-height: 76px;
    margin: 14px 0 14px 30px;
    border-radius: 6px;
    padding: 16px 23px 16px 16px;
    background: var(-----, #1d223c);
    .title-box-two-title {
      color: var(-----, #f35f1b);
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 10px;
    }
    .title-box-two-text {
      color: var(-----80, rgba(255, 255, 255, 0.8));
      width: 621px;
      height: 40px;
      text-align: justify;
      font-size: 14px;
      font-style: normal;
      line-height: 28px;
    }
  }
  .title-box-twos {
    width: 660px;
    min-height: 80px;
    padding: 16px;
    margin-left: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background: var(-----, #1d223c);
    margin-bottom: 24px;
    .title-box-twos-text {
      width: 628px;
      flex-shrink: 0;
      color: var(-----, #e93d3d);
      text-align: justify;
      line-height: 24px;
    }
  }
  .virtualBanner-table {
    border-radius: 8px;
    font-size: 14px;
    width: 660px;
    margin: 16px 0 50px 30px;
    box-sizing: border-box;
    border: 1px solid #4f546d;
    color: #fff;
    .virtualBanner-table-thead {
      display: flex;
      justify-content: space-around;
      height: 32px;
      line-height: 32px;
      color: #fff;
      font-weight: 500;
      border-radius: 7px 7px 0 0;
      border: 1px solid #4f546d;
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
      border: 1px solid #4f546d;
      height: 48px;
      color: #fff;
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
    .table-height {
      height: 96px;
    }
    .table-margin {
      color: #fff;
      margin-bottom: 10px;
      line-height: 16px;
      span {
        font-weight: 700;
      }
    }
    .table-margin-texts {
      color: #fff;
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