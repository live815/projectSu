<template>
  <div>
    <van-popup
      class="popup-box"
      v-model:show="showDilog"
      closeable
      round
      position="bottom"
      @click-overlay="onClickOverlay"
      @click-close-icon="onClickCloseIcon"
    >
      <div class="overlay"></div>
      <div class="popup-title">{{ $t('Wletter.tip63') }}</div>
      <div class="date-input-box">
        <van-cell-group inset>
          <input
            readonly
            :class="{ active: showStartPicker }"
            class="input-box"
            type="text"
            :placeholder="$t('Wletter.tip64')"
            :value="startInputText"
            @focus="startInput"
          />
        </van-cell-group>
        <div class="text">{{ $t('Wletter.to') }}</div>
        <van-cell-group inset>
          <input
            readonly
            :class="{ active: !showStartPicker }"
            class="input-box"
            type="text"
            :placeholder="$t('Wletter.Endtime')"
            :value="endInputText"
            @focus="endInput"
          />
        </van-cell-group>
      </div>
      <div class="date-picker-box">
        <van-date-picker
          v-show="showStartPicker"
          v-model="startDate"
          :min-date="minDate"
          :max-date="maxDate"
          :show-toolbar="false"
          :formatter="formatter"
          visible-option-num="5"
          option-height="40px"
          class="picker"
          swipe-duration="500"
          @change="startDateUpdate"
        />
        <van-date-picker
          v-show="!showStartPicker"
          v-model="endDate"
          :min-date="minDate"
          :max-date="maxDate"
          :show-toolbar="false"
          :formatter="formatter"
          visible-option-num="5"
          option-height="40px"
          swipe-duration="500"
          class="picker"
          @change="endDateUpdate"
        />
      </div>
      <div class="footer">
        <VButton class="btn-left" @click="onClickCloseIcon">{{ $t('Wletter.cancel') }}</VButton>
        <VButton class="btn-right" @click="confirmTime">{{ $t('Wletter.sure') }}</VButton>
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import i18n from '@/i18n'

const props = defineProps({
  showTime: Boolean
})

const emit = defineEmits(['update:showTime', 'updateTimeStamp'])

const startDate = ref(['2021', '1', '1'])
const endDate = ref(['2022', '1', '1'])
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2040, 5, 1)
const showStartPicker = ref(true)
const startInputText = ref('')
const endInputText = ref('')

const startTimeStamp = ref()
const endTimeStamp = ref()

const showDilog = computed({
  get() {
    return props.showTime
  },
  set(value) {
    emit('update:showTime', value)
  }
})

const formatter = (type, option) => {
  if (type === 'year') option.text += i18n.global.t('Wletter.year')
  if (type === 'month') option.text += i18n.global.t('Wletter.month')
  if (type === 'day') option.text += i18n.global.t('Wletter.day')
  return option
}

const startInput = () => (showStartPicker.value = true)
const endInput = () => (showStartPicker.value = false)

const startDateUpdate = (val) => {
  startTimeStamp.value = getFormatDate(new Date(val.selectedValues))
  startInputText.value = val.selectedValues.join('/')
  console.log(startTimeStamp.value)
}

const endDateUpdate = (val) => {
  // endTimeStamp.value = new Date(val.selectedValues)
  endTimeStamp.value = getFormatDate(new Date(val.selectedValues))
  endInputText.value = val.selectedValues.join('/')
}
function confirmTime() {
  if (!endTimeStamp.value || !startTimeStamp.value) {
    showToast(i18n.global.t('Wletter.tip133'))
    return
  }
  // console.log(endTimeStamp.value, startTimeStamp.value)
  // return
  if (endTimeStamp.value >= startTimeStamp.value) {
    emit('updateTimeStamp', startTimeStamp.value, endTimeStamp.value)
    onClickCloseIcon()
  } else {
    showToast(i18n.global.t('Wletter.tip65'))
    return
  }
}

const getFormatDate = (time) => {
  const year = time.getFullYear().toString()
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const day = time.getDate().toString().padStart(2, '0')
  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const sec = time.getSeconds().toString().padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${sec}`
}

const onClickOverlay = () => {}
const onClickCloseIcon = () => (showDilog.value = false)
</script>

<style lang="scss" scoped>
$btn-width: 160px;
$btn-height: 44px;

:deep() {
  [class*='van-hairline']:after {
    border: none;
  }
}
.popup-box {
  position: relative;
  .overlay {
    position: absolute;
    z-index: 2022;
    top: 45%;
    left: 40px;
    width: 80%;
    height: 9%;
    background-color: rgba(43, 42, 42, 0.1);
    pointer-events: none;
    border-radius: 10px;
  }
}
.date-input-box {
  position: relative;
  display: flex;
  padding: 20px 29px 0px 29px;
  height: 70px;
  width: 100%;

  .input-box {
    line-height: 30px;
    width: 100%;
    margin-top: 8px;
    text-align: center;
    border-bottom: 2px solid #d9d9d9;
    outline: none;
  }

  .active {
    border-bottom: 2px solid #ff5000;
  }

  .text {
    margin-top: 14px;
    color: #000;
    text-align: center;

    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
  }
}

.popup-title {
  padding: 18px 0 0 18px;
  color: #111;

  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
}

.date-picker-box {
  margin-bottom: 30px;
  .picker {
    margin: 0px 40px 0 40px;
  }
}
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 84px;

  .btn-left {
    float: left;
    width: $btn-width;
    height: 44px;
    margin: 20px 0px 15px 15px;
    flex-shrink: 0;
    color: #ff5000;
    border-radius: 6px;
    border: 0.5px solid #ff5000;
    background: #fff;
  }

  .btn-right {
    float: left;
    width: $btn-width;
    height: 44px;
    margin: 20px 0px 15px 25px;
    flex-shrink: 0;
    border-radius: 6px;
    background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
  }

  .van-picker {
    --van-picker-mask-color: #ff5000;
  }
}
</style>
