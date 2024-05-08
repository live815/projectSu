<template>
  <van-popup
    teleport="body"
    v-model:show="showPicker"
    position="top"
    class="my-time-select"
    :class="{ pop: type === 1 }"
  >
    <!-- round -->
    <van-picker-group
      v-model:active-tab="activeTab"
      :title="$t('common.bookDate')"
      :tabs="[$t('common.startDate'), $t('common.endDate')]"
      @confirm="onConfirm"
      @cancel="onCancel"
      style="padding: 0 15px"
    >
      <template #toolbar>
        <!-- <span></span> -->
        <div class="header">
          <div class="start-end">
            <van-field
              @click="activeTab = 0"
              :placeholder="$t('common.startTime')"
              :class="{ active: activeTab === 0 }"
              class="start"
              :model-value="startDate.join('-')"
              readonly
            ></van-field>
            <span style="margin: 0 10px">{{ $t('common.to') }}</span>
            <van-field
              @click="activeTab = 1"
              :placeholder="$t('common.endTime')"
              :class="{ active: activeTab === 1 }"
              :model-value="endDate.join('-')"
            ></van-field>
          </div>
          <div class="tip">{{ $t('common.queryTip') }}</div>
        </div>
      </template>
      <van-date-picker v-model="startDate" :min-date="minDate" :max-date="maxDate" />
      <van-date-picker v-model="endDate" :min-date="minDate" :max-date="maxDate" />
    </van-picker-group>
    <div class="btn-group">
      <van-button class="cancel" @click="onCancel">{{ $t('common.cancel') }}</van-button>
      <van-button class="submit" @click="onConfirm">{{ $t('common.confirm') }}</van-button>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getDateOffset, formatDateArray } from '@/utils'
import i18n from '@/i18n/index'
const props = defineProps(['showPopup', 'type'])
const emit = defineEmits(['update:showPopup', 'messageToB'])

const activeTab = ref(0)
const minDate = ref(getDateOffset(-30))
const maxDate = ref(new Date())
const startDate = ref(formatDateArray(getDateOffset(-30)))
const endDate = ref(formatDateArray(new Date()))

const showPicker = computed({
  get: () => props.showPopup,
  set: (value) => {
    emit('update:showPopup', value)
  }
})
const onCancel = () => {
  showPicker.value = false
}
const onConfirm = () => {
  const startTime = new Date(startDate.value.join('/')).getTime()
  const endTime = new Date(`${endDate.value.join('/')} 23:59:59`).getTime() + 999

  if (startTime - endTime > 0) {
    showToast(i18n.global.t('common.selectTimeLimit'))
    return
  }
  emit('messageToB', {
    startTime,
    endTime
  })
  showPicker.value = false
}
watchEffect(() => {})
</script>

<style lang="scss">
.my-time-select {
  border-radius: 5%;

  &.van-popup--top {
    top: 170px;
    width: calc(100vw - 30px);
    margin: 0 15px;
  }
  .van-picker__toolbar {
    height: 75px;
  }
  .van-field__control::-webkit-input-placeholder {
    text-align: center;
  }
  .van-tabs__wrap {
    display: none;
  }

  &.pop,
  &.van-popup--top {
    top: 102px;
  }
  .start-end {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .start {
    border-bottom: 1px solid #d9d9d9;
  }
  .active {
    border-bottom: 1px solid var(--color-primary);
  }
  .tip {
    color: var(--color-orange);
    text-align: center;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    // height: 40px;
    // line-height: 14px;
    margin: 0 auto;
  }
  .btn-group {
    margin: 0 15px 20px;
    display: flex;
    justify-content: space-between;
    .cancel {
      border-radius: 6px;
      border: 1px solid var(--color-primary);
      background: #fff;
      width: 145px;
      height: 44px;
      color: var(--color-primary);
      font-size: 15px;
    }
    .submit {
      border-radius: 6px;
      background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
      width: 145px;
      height: 44px;
      color: #fff;
      font-weight: 600;
      font-size: 15px;
      border: 0;
    }
  }
}

.van-picker-group {
}
</style>
