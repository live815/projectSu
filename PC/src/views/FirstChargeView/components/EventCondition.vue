<template>
  <p class="total-bill">
    {{ $t('FirstChargeView.CumulativeTurnover') }}：{{ thisCurrentBill.toLocaleString() }}
  </p>
  <div class="bill-bar">
    <div class="bar">
      <div
        class="progress-bar"
        :style="{
          width: `${(thisCurrentBill / billPoint[billPoint.length - 1]?.num) * 100}%`
        }"
      >
        <div
          class="end"
          :style="{
            left: `${(thisCurrentBill / billPoint[billPoint.length - 1]?.num) * 100}%`
          }"
        >
          <img src="../img/point.png" />
          <span>{{ thisCurrentBill.toLocaleString() }}</span>
        </div>
      </div>
      <div
        class="point"
        v-for="(item, index) in billPoint"
        :key="index"
        :style="{
          left: `${(item?.num / billPoint[billPoint.length - 1]?.num) * 100}%`,
          width: billPoint.length === index + 1 ? '100px' : ''
        }"
      >
        <div class="lower-text" v-if="index === 0 || billPoint.length === index + 1">
          {{ item.num.toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Big from 'big.js'

const props = defineProps(['conditionData', 'userAcitivtyData', 'currentBill'])

const thisCurrentBill = computed(() => {
  if (!props.currentBill) {
    return 0
  } else {
    return props.currentBill
  }
})
// 判断是累计流水等级
const currentLevel = computed(() => {
  let temp = 0
  if (!props.userAcitivtyData) {
    return 0
  }
  if (Array.isArray(props.conditionData)) {
    props.conditionData.forEach((item) => {
      if (
        thisCurrentBill.value >= item.totalBetAmount &&
        props.userAcitivtyData.amount >= item.initialDeposit
      ) {
        temp++
      }
    })
    return temp
  }
})

// 进度条数据
const billPoint = computed(() => {
  if (props.conditionData) {
    let temp = []
    temp = props.conditionData.map((item) => ({ num: new Big(item.totalBetAmount).toNumber() }))
    temp.unshift({ num: 0 })
    return temp
  } else {
    return []
  }
})
defineExpose({ currentLevel })
</script>

<style lang="scss" scoped>
.bill-bar {
  margin-bottom: 60px;
  margin-top: 50px;
  margin-left: 50px;
  .bar {
    display: flex;
    align-items: center;
    width: 930px;
    height: 13px;
    background: #f56417;
    position: relative;
    border-radius: 20px;

    .point {
      display: flex;
      align-items: center;
      position: absolute;
      transform: translateX(-50%);

      &:last-child .lower-text {
        right: 0;
        transform: translateX(0);
      }

      .lower-text {
        position: absolute;
        transform: translateX(calc(-50%));
        top: 20px;
        text-align: center;
        color: #7b3e02;
        font-size: 20px;
        font-weight: 600;
      }
    }

    .progress-bar {
      height: 11px;
      border-radius: 20px;
      background: linear-gradient(180deg, #dcae6e 0%, #f1ebbe 65.65%);
      box-shadow: 0px -1px 1px 0px rgba(255, 255, 255, 0.24) inset;

      .end {
        position: absolute;
        color: #7b3e02;
        img {
          width: 32px;
          height: 32px;
          margin: 0;
          transform: translateX(-50%) translateY(-11px);
        }

        span {
          position: absolute;
          left: 0;
          transform: translateX(-50%);
          top: -35px;
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
}

.total-bill {
  color: #7b3e02;
  font-size: 22px;
  font-weight: 500;
  line-height: 24px;
}
</style>
