<template>
  <!-- 计算器 -->
  <div class="calc-wrapper">
    <div class="tit">
      <slot name="label" />
      <div class="amount-input-wrapper">
        <van-field
          :disabled="disabled"
          readonly
          :placeholder="`${min}-${max}`"
          :class="{ warning: isOverMax, hasValue: number }"
          v-model="number"
          type="number"
          class="vant-input"
          @touchstart.stop="onClick"
        >
          <template #left-icon>
            <div class="left-icon">
              <span class="reserve-icon"><CurrencyUnit /></span>
              <span class="line"></span>
            </div>
          </template>
        </van-field>
      </div>
      <!-- 预约 -->
      <div class="book-wrapper" v-if="hasBookFunc">
        <!-- 添加预约 -->
        <div @click="addBook" class="add-book" v-if="!isBooking">
          <span class="sys">+</span>
          <span class="text">{{ $t('Sportsview.reserve') }}</span>
        </div>
        <!-- 预约赔率调控器 -->
        <div v-else class="odds-ctrl">
          <span class="odds-sys">@</span>
          <div class="steppers">
            <van-stepper
              v-model="selfOdds"
              :min="getOddFormat(bet.betMatchMarket.odds, fbStore.settings.oddsFormat)"
              step="0.01"
              :decimal-length="2"
              :input-width="44"
              :button-size="24"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 超过金额范围提示 -->
    <div v-if="isOverMax" class="tip" :class="{ alignRight }">
      {{ $t('Sportsview.Amountrange') }}{{ min }}-{{ max }}，{{ $t('Sportsview.tip6') }}
    </div>

    <!-- 预约按钮组 -->
    <div class="book-btn-group" v-if="hasBookFunc && isBooking">
      <div class="cancel-book" @click="cancelBook">{{ $t('Sportsview.cancelappoint') }}</div>
      <v-button @click="bookBet" :disabled="disabledBetBtn" :disabled-has-color="disabledBetBtn">
        <template v-if="!loading">
          <span>{{ $t('Sportsview.reserve') }} </span>
          <span class="can-win" v-if="totalWin"
            >({{ $t('Sportsview.winnable') }} <CurrencyUnit style="font-size: 1em" />
            {{ totalWin.toFixed(2) }})</span
          >
        </template>
        <van-loading color="#fff" v-else />
      </v-button>
    </div>
    <!-- 键盘 -->
    <div v-if="showKeyboard" class="keyboard-wrapper">
      <van-number-keyboard
        v-model="number"
        :show="showKeyboard"
        theme="costom"
        :extra-key="'.'"
        @blur="onBlur"
        :transition="false"
        :hide-on-click-outside="true"
      >
        <template #title-left>
          <div class="left-aside">
            <div @click="addAmount(500)" class="key">+500</div>
            <div @click="addAmount(1000)" class="key">+1000</div>
            <div @click="toMax" class="key max">MAX</div>
            <div @click="onClose" class="key close">
              <IconKeyBoard />
            </div>
          </div>
        </template>
      </van-number-keyboard>
    </div>
  </div>
</template>

<script setup>
import { showNotify } from 'vant'
import { useUserStore } from '@/stores/user'
import { useBetCartStore } from '@/stores/betCart'
import { useFBStore } from '@/stores/fb'
import eventBus from '@/utils/eventBus'
import i18n from '@/i18n'
import { getOddFormat } from '@/hooks/useSportDict'
const fbStore = useFBStore()
const userStore = useUserStore()
const betCartStore = useBetCartStore()

const showKeyboard = ref(false)
const number = ref('')
const isOverMax = ref(false)
const selfOdds = ref(0)
const loading = ref(false)
const emit = defineEmits(['update:modelValue', 'updateIsBooking', 'bookSuccess'])
const props = defineProps({
  bet: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: [String, Number]
  },
  isBooking: {
    type: Boolean,
    default: false
  },
  hasBookFunc: {
    type: Boolean,
    default: false
  },
  max: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },

  disabled: {
    type: Boolean,
    default: false
  },
  alignRight: {
    type: Boolean,
    default: false
  },
  isOneKeyBet: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number
  },
  keyboardIndex: {
    type: Number
  }
})

watchEffect(() => {
  if (props.isOneKeyBet) {
    eventBus.emit('updateOtherKeyboards', number.value)
  }
})
// 金额一键带
eventBus.on('updateOtherKeyboards', (res) => {
  number.value = res
})

eventBus.on('keyboardActive', (res) => {
  if (res !== props.index) {
    showKeyboard.value = false
  }
})

// 初始化预约赔率
selfOdds.value = getOddFormat(props.bet?.betMatchMarket?.odds, fbStore.settings.oddsFormat)
// 初始化输入框金额
number.value = props.modelValue
// 禁用按钮
const disabledBetBtn = computed(() => {
  const unitStake = number.value ? Number(number.value) : 0
  return unitStake < props.min || unitStake > props.max || unitStake > userStore.balance
})
// 可赢
const totalWin = computed(() => {
  return (selfOdds.value - (isHongKong.value ? 0 : 1)) * number.value
})
const isHongKong = computed(() => {
  return fbStore.settings.oddsFormat === 2
})
watch(number, (val) => {
  let num = Number(val)
  console.log(num)
  let balance = Number(userStore.balance)
  let max = props.max
  if (num >= balance) {
    isOverMax.value = true
    number.value = balance
  } else if (num >= max) {
    number.value = max
    isOverMax.value = true
  } else {
    isOverMax.value = false
  }
  // 最终要转string
  number.value = String(number.value)
  emit('update:modelValue', number.value)
})
function onBlur() {
  onClose()
}
function onClose() {
  showKeyboard.value = false
}

const scrollToTop = (num) => {
  document.getElementById('bet-item').scrollTo({
    top: num,
    behavior: 'smooth'
  })
}

function onClick() {
  if (props.disabled) return
  showKeyboard.value = true

  // 键盘唯一展开，并向上滚动展示出键盘
  eventBus.emit('keyboardActive', props.index)
  if (props.index) {
    scrollToTop(props.index * 190)
  }
}
function addAmount(amount) {
  number.value = String(Number(number.value) + amount)
}
function toMax() {
  let balance = Number(userStore.balance)
  let max = props.max
  if (!balance) return
  if (balance >= max) {
    number.value = String(max)
  } else {
    number.value = String(balance)
  }
  isOverMax.value = true
}
// 点击预约
function addBook() {
  emit('updateIsBooking', true, number.value)
}
// 取消预约
function cancelBook() {
  emit('updateIsBooking', false, number.value)
}
// 提交预约
async function bookBet() {
  const betMatchMarket = props.bet.betMatchMarket
  betMatchMarket.odds = Number(selfOdds.value) + (isHongKong.value ? 1 : 0)
  betMatchMarket.oddsFormat = fbStore.settings.oddsFormat
  const reqData = {
    betOptionList: [betMatchMarket],
    unitStake: number.value
  }
  loading.value = true
  try {
    const result = await betCartStore.bookBet(reqData)
    if (result.id) {
      bookSuccess()
      cancelBook()
    }
  } catch (e) {
    console.log(e)
  }
  loading.value = false
}
// 预约成功
function bookSuccess() {
  const item = props.bet
  showNotify({
    type: 'success',
    message: `${item.visible.title} - ${item.visible.marketTitle} ${i18n.global.t(
      'Sportsview.Appointsuccess'
    )}`
  })
  // showToast({
  //   type:'success',
  //   message: `${item.visible.title} - ${item.visible.marketTitle} 预约成功`,
  //   position:'top',
  //   duration:0
  // })
}
watchEffect(() => {
  if (!betCartStore.isOpenBetCart) {
    eventBus.off('updateOtherKeyboards')
    eventBus.off('keyboardActive')
  }
})
</script>

<style lang="scss" scoped>
.tit {
  display: flex;
  align-items: center;

  .amount-input-wrapper {
    position: relative;
    flex: 1;
    .vant-input {
      border-radius: 6px;
      border: 1px solid #ddd;
      align-items: center;
      height: 44px;
      &.hasValue {
        :deep() {
          .van-field__body {
            padding-top: 3px;
          }
        }
      }
      &.warning {
        border: 0.5px solid #f53f3f;
      }
      .left-icon {
        display: flex;
        align-items: center;
        .reserve-icon {
          margin-right: 12px;
          width: 18px;
          height: 18px;
          line-height: 18px;
          border-radius: 50%;
          color: #fff;
          background: #ff9000;
          text-align: center;
        }
        .line {
          width: 0.5px;
          height: 16px;
          background: #eee;
        }
      }
      :deep() {
        .van-cell__value {
          padding-left: 12px;
        }
        .van-field__control {
          font-size: 20px;
          font-weight: 600;
          color: var(--color-text-dark);
          margin-top: -3px;
          &::placeholder {
            font-size: 14px;
          }
        }
      }
    }
  }
  .book-wrapper {
    margin-left: 6px;
    .add-book {
      height: 44px;
      line-height: 44px;
      background: #fff8ef;
      padding: 0 15px;
      border-radius: 6px;
      color: var(--color-primary);
      .sys {
        font-size: 18px;
      }
      span {
        font-weight: 600;
        font-size: 15px;
      }
    }
    .odds-ctrl {
      display: flex;
      align-items: center;
      .odds-sys {
        margin-right: 6px;
        font-size: 20px;
      }
      .steppers {
        border: 1px solid #ddd;
        background: #f2f3f5;
        border-radius: 6px;
        height: 44px;
        display: flex;
        align-items: center;
        padding: 0 5px;
        :deep() {
          .van-stepper__minus,
          .van-stepper__plus {
            background: transparent;
          }
        }
      }
    }
  }
}
// 金额提示
.tip {
  color: #f53f3f;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 6px;
  margin-top: 4px;
  &.alignRight {
    text-align: right;
  }
}

// 预约按钮组
.book-btn-group {
  display: flex;
  align-items: center;
  margin-top: 10px;
  .cancel-book {
    flex-shrink: 0;
    border: 1px solid var(--color-primary);
    padding: 0 15px;
    height: 44px;
    line-height: 44px;
    border-radius: 6px;
    margin-right: 6px;
    color: var(--color-primary);
  }
  button {
    height: 44px;
  }
}

.keyboard-wrapper {
  position: relative;
  margin-top: 6px;
  :deep() {
    .van-number-keyboard {
      position: static;
      padding-bottom: 0;
      padding-left: 80px;
      background: transparent;
      .van-number-keyboard__header {
        height: 0;
        padding: 0;
      }
      .van-key__wrapper:nth-of-type(3n) {
        padding-right: 0;
      }
      .van-key {
        height: 38px;
        border: 1px solid #eee;
        background: #fff;
        color: var(--color-text-dark);
        font-size: 24px;
        font-weight: 600;
      }

      .van-key--delete {
        color: var(--color-text-light);
        .van-key__delete-icon {
          transform: scale(0.7);
        }
      }
    }
  }
  .left-aside {
    position: absolute;
    top: 6px;
    left: -80px;
    width: 80px;
    // border: 1px solid red;
    .key {
      height: 38px;
      line-height: 38px;
      border-radius: 8px;
      margin-bottom: 6px;
      text-align: center;
      border: 1px solid #eee;
      background: #f4f4f4;
      font-size: 16px;
      font-weight: 600;
      &.max {
        color: var(--color-orange);
      }
    }
    .close {
      padding-top: 2px;
    }
  }
}
</style>
