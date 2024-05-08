<template>
  <div class="promptdescription">
    <div class="promptdescription-box">
      <div
        class="promptdescription-box-item"
        v-for="(item, index) in onComputedWdAppointmentList"
        :key="item.id"
        :class="{ active: selectedTab === index }"
        @click="changeTab(item, index)"
      >
        <div class="promptdescription-box-item-title">
          0-{{ item.wdHours }}{{ $t('DepositWithdraw.Hour') }}
        </div>
        <div class="promptdescription-box-item-text" v-if="!item.wdAddPercent">
          {{ $t('DepositWithdraw.NoExtraGifts') }}
        </div>
        <div class="promptdescription-box-item-text" v-else>
          {{ $t('DepositWithdraw.ExtraGift') }}{{ item.wdAddPercent }}%
        </div>
        <div
          class="promptdescription-box-item-tag"
          :class="{ 'promptdescription-box-item-tag-padding': item.wdLabel }"
        >
          {{ item.wdLabel }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { computed, ref } from 'vue'

const selectedTab = ref(null)
const emit = defineEmits(['current'])

const props = defineProps({
  wdAppointmentList: {
    type: Array,
    default: () => []
  },
  textData: {
    type: Object,
    default: () => {}
  }
})

const onComputedWdAppointmentList = computed(() => {
  return props.wdAppointmentList
})

const changeTab = (item, index) => {
  selectedTab.value = index
  emit('current', item)
}
</script>
<style lang='scss' scoped>
.promptdescription {
  width: 100%;
  .promptdescription-box {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 16px auto;
    .promptdescription-box-item {
      position: relative;
      width: 154px;
      height: 58px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      border-radius: 6px;
      background: #1d223c;
      cursor: pointer;
      .promptdescription-box-item-title {
        color: var(--100, #fff);
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 8px;
      }
      .promptdescription-box-item-text {
        color: var(--2, #ff5000);
        font-size: 12px;
        font-weight: 400;
      }
      .promptdescription-box-item-text::first-child {
        color: #666;
        font-size: 12px;
        font-weight: 400;
      }
      .promptdescription-box-item-tag {
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        font-size: 10px;
        border-radius: 2px 5px 0px 8px;
        background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      }
      .promptdescription-box-item-tag-padding {
        padding: 1px 4px;
      }
    }
  }
  .active {
    border: 1px solid var(--1, #ff9000) !important;
    background: var(--4, #fff5f0);
  }
}
</style>
