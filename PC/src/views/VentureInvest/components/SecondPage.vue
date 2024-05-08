<template>
  <div class="second-box flex-column">
    <div class="top-box">
      <img :src="imgHandler" />
    </div>
    <div class="mid-box" :class="appStore.language=='vi'?'vi':''">{{ $t('VentureInvest.tips_2') }}</div>
    <div class="bom-box">
      <div class="beside-box">
        <div class="beside-item">
          <div class="left flex-column">
            <div class="top-text font18-c">{{ $t('VentureInvest.MemberStatistics') }}</div>
            <div class="mid-text">{{ $t('VentureInvest.AccurateMembers') }}</div>
            <div class="img-bom"><img src="../img/image125.png" alt="" /></div>
          </div>
          <VentureInvest></VentureInvest>
        </div>
        <div class="beside-item">
          <div class="left flex-column">
            <div class="top-text font18-c">{{ $t('VentureInvest.MemberDetails') }}</div>
            <div class="mid-text">{{ $t('VentureInvest.RealTimeViewRechargeBetMembers') }}</div>
            <div class="img-bom"><img src="../img/image126.png" alt="" /></div>
          </div>
          <VentureInvestwo></VentureInvestwo>
        </div>
      </div>
      <div class="mid-img" ><img :src="mid" alt="" /></div>
      <div class="beside-box">
        <div class="beside-item">
          <VentureInvesthree></VentureInvesthree>
          <div class="left flex-column">
            <div class="top-text font18-c">{{ $t('VentureInvest.CommissionReport') }}</div>
            <div class="mid-text">{{ $t('VentureInvest.RealTimeCommissionDataSummary') }}</div>
            <div class="img-bom"><img src="../img/image127.png" alt="" /></div>
          </div>
        </div>
        <div class="beside-item">
          <VentureInvestfour style="margin-right: -15px"></VentureInvestfour>
          <div class="left flex-column more">
            <div class="top-text font18-c">{{ $t('VentureInvest.RealTimeData') }}</div>
            <div class="mid-text">{{ $t('VentureInvest.RealTimeTeamDataUpdate') }}</div>
            <div class="img-bom"><img src="../img/image128.png" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import VentureInvest from '@/components/icons/VentureInvest.vue'
import VentureInvestwo from '@/components/icons/VentureInvestwo.vue'
import VentureInvesthree from '@/components/icons/VentureInvesthree.vue'
import VentureInvestfour from '@/components/icons/VentureInvestfour.vue'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'

const appStore = useAppStore()

const imgHandler = computed(() => {
  return new URL(`../img/${appStore.language}/hangye2x.png`, import.meta.url).href
})
const mid = computed(()=>{
  return new URL(`../img/${appStore.language}/mid.png`, import.meta.url).href
})
</script>
<style lang="scss" scoped>
@media screen and (max-width: 1450px) {
  .flex-column {
    zoom: 0.9;
  }
  .top-box {
    margin-top: 100px;
  }
}
.more {
  transform: translateY(8px);
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
img {
  width: 100%;
  height: auto;
}
.font18-c {
  font-size: 18px !important;
  font-weight: 600;
}
.second-box {
  padding: 80px 0 0 0;
  
  .top-box {
    height: 85px;
    max-width: 1440px;
  }
  .mid-box {
    font-size: 26px;
    height: 45px;
    font-weight: 600;
    line-height: 45px;
    margin: 60px 0 8px 0;
  }
  .vi{
    margin: 20px;
  }
  .bom-box {
    display: flex;
    justify-content: space-between;
    .beside-box {
      .beside-item {
        display: flex;
        align-items: center;
        margin-bottom: 98px;
        .left {
          width: 267px;
          height: 216px;
          border-radius: 10px;
          border: 1px solid #985e54;
          background: linear-gradient(180deg, #6a3a32 0%, #341d1f 100%);
          padding: 14px 0 26px 0;
          .top-text {
            height: 18px;
            line-height: 18px;
          }
          .mid-text {
            max-width: 200px;
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            text-align: center;
            color: var(-----60, rgba(255, 255, 255, 0.6));
            margin: 4px 0 17px 0;
          }
          .img-bom {
            width: 110px;
            height: 110px;
          }
        }
      }
    }
    .mid-img {
      width: 632px;
      height: 580px;
      margin-top: 46px;
    }
  }
}
</style>
