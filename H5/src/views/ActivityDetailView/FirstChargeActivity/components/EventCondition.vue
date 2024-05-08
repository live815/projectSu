<template>
  <p>{{ $t('Fletter.FletterTip3') }}{{ thisCurrentBill.toLocaleString() }}</p>
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
          <span class="upper-box">{{ thisCurrentBill.toLocaleString() }}</span>
        </div>
      </div>
      <div
        class="point"
        v-for="(item, index) in billPoint"
        :key="index"
        :style="{
          left: `${(item?.num / billPoint[billPoint.length - 1]?.num) * 100}%`,
          width: billPoint.length === index + 1 ? '10vw' : ''
        }"
      >
        <div v-if="index === 0 || billPoint.length === index + 1" class="lower-box">
          {{ item.num.toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Big from 'big.js'

const props = defineProps({
  conditionData: {
    type: Array,
    default: () => []
  },
  userAcitivtyData: {
    type: Object,
    default: () => ({})
  },
  currentBill: {
    type: Number,
    default: 0
  }
})
const thisCurrentBill = computed(() => {
  if (!props.currentBill) {
    return 0
  } else {
    return props.currentBill
  }
})

// 判断领取等级
const currentLevel = computed(() => {
  let temp = 0
  if (props.conditionData && props.currentBill && props.userAcitivtyData) {
    props.conditionData.forEach((item) => {
      if (
        props.userAcitivtyData.amount >= item.initialDeposit &&
        props.currentBill >= item.totalBetAmount
      ) {
        temp++
      }
    })
  }
  return temp
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
p {
  color: #7b3e02;
}
.bill-bar {
  margin: 40px 20px;
}
.bar {
  position: relative;
  display: flex;
  align-items: center;
  height: 3px;
  background: #f56417;
  .point {
    position: absolute;
    display: flex;
    transform: translateX(-50%);
    flex-direction: column;
    &:last-child .lower-box {
      right: 0;
      transform: translateX(0);
      &::before {
        left: calc(100% - 20px);
      }
    }

    .lower-box {
      position: absolute;
      top: 15px;
      min-width: 40px;
      height: 16px;
      border-radius: 4px;
      background: #7b3e02;
      &::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        border: 4px solid transparent;
        border-bottom: 4px solid #7b3e02;
      }
    }
  }
  .progress-bar {
    height: 2px;
    border-radius: 0 200px 200px 0;
    background: linear-gradient(180deg, #dcae6e 0%, #f1ebbe 65.65%);
    box-shadow: 0px -1px 1px 0px rgba(255, 255, 255, 0.24) inset;

    .end {
      position: absolute;

      img {
        width: 15px;
        height: 15px;
        margin: 0;
        transform: translateX(-50%) translateY(-7px);
      }
    }
  }
}

.upper-box,
.lower-box {
  padding: 0 4px;
  transform: translateX(calc(-50%));
  text-align: center;
  color: #f4e8c3;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
}

.upper-box {
  position: absolute;
  top: -30px;
  min-width: 40px;
  height: 16px;
  border-radius: 4px;
  background: #7b3e02;
  left: 0;
}

.upper-box::before {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top: 4px solid #7b3e02;
}

.fill {
  position: relative;
  width: 13px;
  height: 20px;
  // background-color: pink;
}

.first-fill {
  width: 10px;
}
</style>
