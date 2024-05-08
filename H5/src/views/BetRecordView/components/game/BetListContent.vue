<template>
  <div class="game-list-content">
    <div class="item" v-for="item in betList" :key="item.id">
      <div class="item-header">
        <div class="header">
          <span class="game-type">{{ item.gameName }}</span>
          <div class="check-type" :class="getClassName(item.betResult)">
            {{ getStatusText(item.betResult) }}
          </div>
        </div>
        <div class="bottom">
          <div class="bet-size">
            <p class="bet-size-title">{{ $t('BetrecordView.BetAmount') }}</p>
            <p class="bet-size-money"><CurrencyUnit />{{ item.orderAmount || 0 }}</p>
          </div>
          <div class="line"></div>
          <div class="win-size">
            <p class="win-size-title">{{ $t('BetrecordView.WinLose') }}</p>
            <p :class="getProfitClass(item.profitAmount)" class="win-size-money">
              <CurrencyUnit />{{ item.profitAmount || 0 }}
            </p>
          </div>
        </div>
        <div class="bottom">
          <div class="bet-size">
            <p class="bet-size-title">{{ $t('BetrecordView.EffectiveFlow') }}</p>
            <p class="bet-size-money"><CurrencyUnit />{{ item.validBet || 0 }}</p>
          </div>
          <div class="win-size">
            <p class="win-size-title">{{ $t('BetrecordView.BetTime') }}</p>
            <p :class="getProfitClass(item.profitAmount)" >{{ item.betTime }}</p>
          </div>
        </div>
        <div class="bottom">
          <div class="bet-size">
            <p class="bet-size-title">{{ $t('BetrecordView.BettingSlipNumber') }}</p>
            <p class="BettingSlipNumber">
              <span class="content-size">{{ item.orderNo }}</span>
              <span class="copy" v-clipboard="item.orderNo">{{$t('BetrecordView.Copy')}}</span>
            </p>
          </div>
          
        </div>
      </div>
      <template  v-if="item.betContentList">
        <div  class="item-detail" v-for="(it,index) in item.betContentList" :key="index">
          <div class="bottom-title" >
            <p>{{ it.tournamentName }}</p>
            <p>{{ it.hostVsGuest }}</p>
            <p>{{ it.matchTime }}</p>
            <p>{{it.playName}} {{ it.optionName }}
              <span style="margin-left: 3px;">{{ it.oddsFormat }}</span> 
              <span style="color: #f35f1b;" v-if="it.betOdds">@{{ it.betOdds }}</span> 
              <span v-if="it.matchScore">({{ it.matchScore.includes("S:") ?it.matchScore.replace("S:", ""):it.matchScore }})</span>
            </p>
          </div>
        </div>
      </template>
      <!-- <template v-else>
        <div class="item-bottom" >
          <div class="bottom-title">
            <span class="title-size">{{ $t('BetrecordView.EffectiveFlow') }}</span
            ><span class="content-size">{{ item.validBet || 0 }}</span>
          </div>
          <div class="bottom-title">
            <span class="title-size">{{ $t('BetrecordView.BetTime') }}</span
            ><span class="content-size">{{ item.betTime }}</span>
          </div>
          <div class="bottom-title">
            <span class="title-size">{{ $t('BetrecordView.BettingSlipNumber') }}</span
            ><span
              ><span class="content-size">{{ item.orderNo }}</span
              ><span class="copy" v-clipboard="item.orderNo">{{
                $t('BetrecordView.Copy')
              }}</span></span
            >
          </div>
        </div>
      </template> -->
    </div>
  </div>
</template>

<script setup>
import vClipboard from '@/directives/clipboard'
import i18n from '@/i18n'

defineProps(['betList'])

function getStatusText(statusCode) {
  switch (Number(statusCode)) {
    case 1004001:
      return i18n.global.t('BetrecordView.EarlySettle')
    case 1004002:
      return i18n.global.t('BetrecordView.Win')
    case 1004003:
      return i18n.global.t('BetrecordView.WinHalf')
    case 1004004:
      return i18n.global.t('BetrecordView.LoseHalf')

    case 1004005:
      return i18n.global.t('BetrecordView.Lose')
    case 1004006:
      return i18n.global.t('BetrecordView.Tie')
    case 1004007:
      return i18n.global.t('BetrecordView.ReturnPrincipal')
    case 1004008:
      return i18n.global.t('BetrecordView.InvalidOrder')
    case 1004009:
      return i18n.global.t('BetrecordView.Confirming')
    case 1004010:
      return i18n.global.t('BetrecordView.BetSuccess')
    default:
      return i18n.global.t('BetrecordView.Confirming')
  }
}
// 获取输赢值class
function getProfitClass(profitAmount) {
  if (profitAmount > 0) {
    return 'red'
  }
  if (profitAmount < 0) {
    return 'green'
  }
}
function getClassName(statusCode) {
  statusCode = Number(statusCode)
  // 确认中或者赢了
  if ([1004002, 1004003].includes(statusCode)) {
    return 'red'
  }
  if ([1004004, 1004005].includes(statusCode)) {
    return 'green'
  }
  if ([1004006, 1004010].includes(statusCode)) {
    return 'orange'
  }
  if ([1004001, 1004007].includes(statusCode)) {
    return 'blue'
  }
  if ([1004008].includes(statusCode)) {
    return 'gray'
  }
  return 'red'
}
</script>

<style lang="scss" scoped>
.game-list-content {
  margin: 0 15px;
  border-radius: 4px;
  box-shadow: 0px 1px 0px 0px #ffdcad inset;
  .item {
    margin-bottom: 15px;
  }
  .item-header {
    background: #fff;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .game-type {
        padding: 4px 14px 4px 11px;
        border-radius: 4px 40px 40px 0px;
        background: linear-gradient(93deg, #ff9000 0%, #ff5000 100%);
        color: #fff;

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        // flex:1;
        margin-right: 5px;
      }
      .check-type {
        padding: 2px 15px;
        border-radius: 40px;
        text-align: right;

        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
        height: 20px;
        flex: 0 0 auto;
        &.red {
          background: #fff5f0;
          color: var(--color-danger);
        }
        &.orange {
          background: #fff7e8;
          color: var(--color-primary);
        }
        &.green {
          background: #e8ffea;
          color: var(--color-green);
        }
        &.blue {
          background: #ecf5ff;
          color: var(--color-blue);
        }
        &.gray {
          background: #eee;
        }
      }
      .colororange {
        color: var(--color-orange);
        background: #fff7e8;
      }
      .checkcolor {
        color: #00b42a;
        background: #e8ffea;
      }
    }
    .bottom {
      padding: 15px 15px 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      .bet-size {
        .bet-size-title {
          color: #666;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
          height: 16px;
          margin-bottom: 2px;
          .BettingSlipNumber{
            display:flex;
            align-items: center;
          }
        }
        .bet-size-money {
          color: #111;
          font-family: 'DIN Alternate';
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 16px;
          height: 16px;
          
        }
        .copy {
            color: #486bb2;
            text-align: right;
            cursor: pointer;
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
            margin-left: 4px;
          }
      }
      .line {
        width: 1px;
        height: 24px;
        background: #eee;
      }
      .win-size {
        .win-size-title {
          color: #666;

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
          text-align: right;
          margin-bottom: 2px;
        }
        .win-size-money {
          font-family: 'DIN Alternate';
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 16px;
          text-align: right;
          height: 16px;
          &.red {
            color: var(--color-danger);
          }
          &.green {
            color: var(--color-green);
          }
        }
      }
    }
  }
  .item-bottom {
    padding: 15px;
    background: #fff;
    .bottom-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
      .title-size {
        color: #666;

        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
      }
      .content-size {
        color: #111;
        text-align: right;

        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
      }
      .copy {
        color: #486bb2;
        text-align: right;

        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        margin-left: 4px;
      }
    }
  }
  .item-detail{
    padding: 15px;
    background: #fff;
    border-bottom: 1px solid #eee;
    .bottom-title{
      p{
        font-size: 14px;
        line-height: 25px;
      }
    }
  }
}
</style>
