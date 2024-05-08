<template>
  <div class="OrderStatusviews">
    <div class="OrderStatus-wrap">
      <!-- 注单类型 -->
      <div class="OrderStatus-header" v-if="confirmBetList.length>0 ">
        <div class="status" :class="getStatusClass">
          <template v-if="betCartStore.orderConfirmStatus">
            <div class="suc">
              <p style="color:#ff9000">{{ $t('SportsView.tips_2') }}</p>
              <el-icon color="#ff9000" class="is-loading"><Loading /></el-icon>
            </div>
          </template>
          <template v-else-if="betCartStore.orderSuccessStatus">
            <div class="suc">
              <p style="color:#00b42a">{{ $t('SportsView.BetSuccessful') }}</p>
              <el-icon color="#00b42a"><CircleCheck /></el-icon>
            </div>
          </template>
          <template v-else-if="betCartStore.orderFailStatus">
            <div class="suc fal">
              <p>{{ $t('SportsView.BetFailed') }}</p>
              <el-icon><CircleClose /></el-icon>
            </div>
          </template>
          <template v-else>
            <div class="suc">
              <p  style="color:#ff9000">{{ $t('SportsView.tips_2') }}</p>
              <el-icon color="#ff9000" class="is-loading"><Loading /></el-icon>
            </div>
          </template>
        </div>
      </div>
      <!-- 注单列表 -->
      <div class="OrderStatus-con" v-if="confirmBetList.length>0">
        <!-- 投注的每种串关玩法的投注额与可赢额 -->
        <div
          class="multi-markets"
          v-if="betCartStore.isSelectSeries && betCartStore.canSubmitMultiBetMarkets.length"
        >
          <div class="item" v-for="(market, idx) in betCartStore.canSubmitMultiBetMarkets" :key="idx">
            <!-- left -->
            <div class="market">
              <p class="ty-odd">
                <span class="ty">{{ market.multiMarketText }}</span>
                <span class="odd">@{{ market.sodd }}</span>
              </p>
              <p class="single-can-win">
                <span>{{ $t('SportsView.MaximumWinnable') }} </span
                ><span class="amount"><CurrencyUnit />{{ market.shouldWin}}</span>
              </p>
            </div>
            <!-- right -->
            <div class="bet">
              <span>{{ $t('SportsView.BetAmount') }} {{ market.unitStake }}</span>
            </div>
          </div>
        </div>
        <!-- 单关 -->
        <div class="multi-markets amount-wrapper" v-for="item in confirmBetList" :key="item.id" v-else>
          <div class="win-amount">
            <span>{{$t('SportsView.MaximumWinnable')}} </span>
            <span class="red">
              {{ shouldWin(item).toFixed(2) }}
            </span>
          </div>
          <div class="bet-amount">
            <span>{{$t('SportsView.BetAmounts')}} </span>
            <span style="color: var(--unnamed, #FF9000);">
              {{ Number(item.unitStake).toFixed(2) }}
            </span>
          </div>
        </div>
        <!-- 注单列表 -->
        <div class="cartCard" v-for="item in confirmBetList" :key="item.id">
          <div class="cartCard-title">
            <p class="tit" :title="item.visible.title" v-if="item.visible.title">{{ item.visible.title }}</p>
            <p class="tit" :title="item.visible.lgName" v-else>{{ item.visible.lgName }}</p>
            <!-- <div @click="deleteBetItem(item)" class="delete"><img :src="trashbin" alt=""></div> -->
          </div>
          <p class="lgName">{{ item.visible.lgName}}</p>
          <div class="bg-wrap">
            <div class="market-name">
              <span v-if="item.ip==1">{{ $t('SportsView.RollingBall') }}-</span>
              {{ item.visible.marketTitle }} 
              <span class="re" style="margin: 0 3px;" v-if="item.re">({{ item.re }})</span>
              [{{ getOddFormatText(fbStore.settings.oddsFormat) }}]
            </div>
            <div class="match-option-name">
              <!-- <p class="teamName" :title="item.visible.teamName" v-if="item.visible.teamName">{{ item.visible.teamName }} </p>
              <p class="teamName" :title="item.visible.lgName" v-else>{{ item.visible.betOpTitle }} </p> -->
              <p v-if="item.nm">{{ item.nm }}</p>
              <span class="rate">@{{ getOddFormat(item.betMatchMarket.odds, fbStore.settings.oddsFormat) }}</span>
            </div>
          </div>

          <!-- 金额 -->
          <!-- <div class="amount-wrapper" v-if="!betCartStore.isSelectSeries">
            <div class="win-amount">
              <span>{{$t('SportsView.MaximumWinnable')}} </span>
              <span class="red">
                {{ shouldWin(item).toFixed(2) }}
              </span>
            </div>
            <div class="bet-amount">
              <span>{{$t('SportsView.BetAmounts')}} </span>
              <span>
                {{ Number(item.unitStake).toFixed(2) }}
              </span>
            </div>
          </div> -->
        </div>
        <div class="btn-wrapper">
          <div class="close" @click="close">{{$t('SportsView.Sure')}}</div>
          <div  @click="saveBetList" class="confirm">{{$t('SportsView.ReserveBets')}}</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {  ref } from 'vue'
import con from './img/confirm.png'
import fai from './img/failure.png'
import trashbin from './img/trashbin.png'
import {Loading,CircleCheck,CircleClose} from '@element-plus/icons-vue'
import { getOddFormatText, getOddFormat } from '@/hooks/useSportDict'
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

// const failure = ref(false)

const props = defineProps({
  success:Boolean,
  failure:Boolean,
})
const getStatusClass = computed(() => {
  let res = ''
  if (betCartStore.orderSuccessStatus) return 'success'
  if (betCartStore.orderFailStatus) return 'fail'
  return res
})
const confirmBetList = computed(() => {
  return betCartStore.isSelectSeries ? betCartStore.canMultiBetsList : betCartStore.submitBetList
})

// 单个玩法可赢
function shouldWin(item) {
  // console.log(item,'item')
  if(item.unitStake){
    return Number(item.unitStake) * (item.betMatchMarket.odds - 1) || 0
  }
  if(item.uniStake){
    return Number(item.uniStake) * (item.betMatchMarket.odds - 1) || 0
  }
}

// 保留选项
function saveBetList() {
  // betCartStore.closeConfirmDialog()
  eventBus.emit('quickbet',true)
}
function close() {
  // betCartStore.closeConfirmDialog()
  betCartStore.removeAllBets()
  eventBus.emit('quickbet',true)
  betCartStore.isOpenBetCart = false
  fbStore.isClickBetLayer = false
  fbStore.hotMenuStatus = true
}

</script>

<style lang="scss" scoped>
.OrderStatusviews{
  background: #0D0F1C;
  
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  .OrderStatus-wrap{
    .OrderStatus-title{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      height: 40px;
      color: var(--100, #FFF);
      
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      border-bottom: 1px solid rgba(255, 255, 255, 0.10);
      background: #171A2F;
      .back{
        cursor: pointer;
      }
      .num{
        span{
          display: flex;
          width: 28px;
          height: 20px;
          line-height: 20px;
          align-items: center;
          border-radius: 2px;
          background: #303862;
          justify-content: center;
          font-size: 12px;
        }
      }
    }
    .OrderStatus-header{
      display: flex;
      height: 45px;
      align-items: center;
      position: relative;
      // padding: 0 10px;
      .orders{
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        // margin: 13px auto;
        // padding: 0 10px;
        justify-content: space-evenly;
        .item{
          width: 69px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          background: #0D0F1C;
          color: var(--60, rgba(255, 255, 255, 0.60));
          cursor: pointer;
        }
        .active{
          color: var(--100, #FFF);
          background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
        }
      }
      .status{
        width: 100%;
        height: 100%;
        position: relative;
        border-bottom: 1px solid rgba(255, 255, 255, 0.10);
        // padding-bottom: 10px;
        background: #151525;
        img{
          width: 14px;
          height: 14px;
          margin-right: 5px;
        }
        span{
          width: 16px;
          height: 16px;
          font-size: 21px;
          position: absolute;
          left: 10px;
          cursor: pointer;
        }
        .suc{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          p{
            margin-right: 5px;
          }
          
        }
        .fal{
          p,.el-icon{
            color:red;
          }
          
        }
      }
    }
    :deep(){
      .el-tabs__nav-wrap::after{
        display: none;
      }
      .el-tabs__active-bar{
        display: none; 
      }
      .el-tabs__content{
        display: none;
      }
      .el-tabs__item {
        width: 69px;
        height: 32px;
        color: var(--60, rgba(255, 255, 255, 0.60));
        text-align: center;
        
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        border-radius: 4px;
        background: #0D0F1C;
        padding: 0;
      }
      .el-tabs__item.is-active{
        color: #FFF;
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
        text-align: center;
      }
      .el-tabs__nav{

      }
    }
    .OrderStatus-con{
      // padding: 20px 10px;
      height: auto;
      overflow: scroll;
      scrollbar-width: none;//火狐浏览器 隐藏滚动条
      position: relative;
      // padding-bottom: 40px;
      .multi-markets{
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        .item {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin: 10px;
          line-height: 20px;
          .market {
            text-align: left;
            .ty-odd {
              font-size: 15px;
            }
            .ty {
              color: #fff;
              margin-right: 10px;
              font-weight: 400;
            }
            .odd {
              font-weight: 600;
              color: var(--color-orange);
            }
            .single-can-win {
              margin-top: 2px;
              span {
                font-size: 12px;
                color: var(--60, rgba(255, 255, 255, 0.6));
              }
              .amount {
                color: var(--color-danger);
                font-size: 12px;
                font-weight: 600;
              }
            }
          }
          .bet {
            color: var(--60, rgba(255, 255, 255, 0.6));
            font-size: 12px;
          }
        }
      }
      .amount-wrapper{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 30px;
          margin: 10px auto;
          padding: 0 12px;
          font-size: 12px;
          background: #151525;
          .red{
            color: #E93D3D;
            margin-left: 3px;
          }
        }
      .cartCard{
        margin-bottom: 10px;
        background: #171A2F;
        // border-bottom: 1px solid rgba(255, 255, 255, 0.10);
        .cartCard-title{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          height: 30px;
          color: var(--100, #FFF);
          
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 16px;
          position: relative;
          padding: 0 10px;
          margin-top: 10px;
          &::before{
            content: "";
            position: absolute;
            width: 4px;
            height: 15px;
            background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
            border-radius: 0px 100px  100px 0;
            left: 0;
          }
          .tit{
              width: 82%;
              overflow: hidden;
              flex-wrap: nowrap;
              display: -webkit-box;
              white-space: normal !important;
              text-overflow: ellipsis;
              word-wrap: break-word;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              text-align: left;
              height: 30px;
              line-height: 30px;
          }
          .delete{
            cursor: pointer;
          }
        }
        .lgName{
          color: var(--60, rgba(255, 255, 255, 0.60));
          
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px; 
          text-align: left;
          padding: 0 10px;
        }
        .bg-wrap{
          display: flex;
          width: 224px;
          min-height: 62px;
          line-height: 24px;
          flex-direction: column;
          border-radius: 2px;
          background: #232949;
          padding: 8px 10px;
          margin: 10px auto;
          align-items: flex-start;
          div{
            
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
          }
          .market-name{
            color: var(--100, #FFF);
          }
          .match-option-name{
            color: var(--60, rgba(255, 255, 255, 0.60));
            display: flex;
            justify-content: space-between;
            width: 100%;
            .teamName{
              width: 82%;
              overflow: hidden;
              flex-wrap: nowrap;
              display: -webkit-box;
              white-space: normal !important;
              text-overflow: ellipsis;
              word-wrap: break-word;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              text-align: left;
              height: 30px;
              line-height: 30px;
            }
            p{
              text-align: left;
            }
            .rate{
              color: var(--unnamed, #FF9000);
              font-size: 14px;
              font-style: normal;
              font-weight: 700;
              margin-left: 5px;
              width: 40%;
              text-align: right;
            }
          }
        }
        .amount-wrapper{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 30px;
          margin: 10px auto;
          padding: 0 12px;
          font-size: 12px;
          .red{
            color: #E93D3D;
            margin-left: 3px;
          }
        }
      }
      .btn-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #171A2F;
        div{
          width: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .close{
          border-radius: 4px;
          background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
          color: #FFF;
          margin-top: 10px;
        }
        .confirm{
          border-radius: 4px;
          border: 1px solid var(--unnamed, #F35F1B);
          color: var(--unnamed, #F35F1B);
        }
      }
    }
  }
}

</style>