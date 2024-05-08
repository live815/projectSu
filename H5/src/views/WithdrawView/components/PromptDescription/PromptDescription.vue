<template>
  <div class="promptdescription">
    <div class="promptdescription-top">
      <div class="promptdescription-top-title">{{ $t('Wletter.tip104') }}</div>
      <div class="promptdescription-top-text" @click="onClickExplainPopup">
        {{ $t('Wletter.tip99') }}
      </div>
    </div>
    <div class="promptdescription-box">
      <div
        class="promptdescription-box-item"
        v-for="(item, index) in onComputedWdAppointmentList"
        :key="item.id"
        :class="{ active: selectedTab === index }"
        @click="changeTab(item, index)"
      >
        <div class="promptdescription-box-item-title">
          {{ $t('Wletter.tip105', { num: item.wdHours }) }}
        </div>
        <div class="promptdescription-box-item-text" v-if="!item.wdAddPercent">
          {{ $t('Wletter.Noextragifts') }}
        </div>
        <div class="promptdescription-box-item-text" v-else>
          {{ $t('Wletter.tip106', { num: item.wdAddPercent }) }}
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
  <!-- 预约说明弹窗 -->
  <ExplainPopup ref="explainPopupDom"></ExplainPopup>
</template>

<script setup>
import { computed, ref } from 'vue'
import ExplainPopup from '../ExplainPopup/ExplainPopup'

// 定义弹窗ref
const explainPopupDom = ref(null)
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

// 说明弹窗按钮
const onClickExplainPopup = () => {
  explainPopupDom.value.showhide(props.textData)
}
</script>
<style lang="scss" scoped>
.promptdescription {
  // overflow: hidden;
  .promptdescription-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--gray-1, #111);
    font-size: 16px;
    font-weight: 600;
    .promptdescription-top-title {
      color: var(--gray-1, #111);
      font-weight: 600;
      font-size: 16px;
    }
    .promptdescription-top-text {
      color: var(--unnamed, var(--unnamed, #486bb2));
      font-size: 12px;
      font-weight: 400;
    }
  }
  .promptdescription-box {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 16px auto;
    .promptdescription-box-item {
      position: relative;
      width: 80px;
      height: 58px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      border-radius: 8px;
      background: #f7f7f7;
      border: 1px solid #fff;
      .promptdescription-box-item-title {
        color: var(--gray-1, #111);
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
